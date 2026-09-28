/**
 * Utilitário para rolagem suave lenta e controlada (smooth scroll cinemático)
 * Permite que a descida pela página seja suave e visível o suficiente para o cliente
 * visualizar as seções intermediárias (como Diferenciais, Pacotes e Vídeos).
 */

interface SmoothScrollOptions {
  duration?: number; // Duração em ms (padrão: 4200ms para uma descida agradável e perceptível)
  offset?: number;   // Compensação da altura do cabeçalho fixo
  onComplete?: () => void;
}

export function smoothScrollToElement(
  target: HTMLElement | string,
  options: SmoothScrollOptions = {}
): () => void {
  if (typeof window === 'undefined') return () => {};

  const {
    duration = 4200,
    offset = 80,
    onComplete
  } = options;

  const element = typeof target === 'string' ? document.getElementById(target) : target;
  if (!element) return () => {};

  // Forçar scroll-behavior 'auto' temporariamente para evitar conflitos com animações nativas do navegador
  const htmlElem = document.documentElement;
  const bodyElem = document.body;
  const prevHtmlScrollBehavior = htmlElem.style.scrollBehavior;
  const prevBodyScrollBehavior = bodyElem.style.scrollBehavior;

  htmlElem.style.scrollBehavior = 'auto';
  bodyElem.style.scrollBehavior = 'auto';

  // Obter posição atual de rolagem de forma compatível com todos os navegadores
  const getScrollY = (): number => {
    return window.pageYOffset || htmlElem.scrollTop || bodyElem.scrollTop || 0;
  };

  const startY = getScrollY();
  const elementRect = element.getBoundingClientRect();
  const targetY = Math.max(0, elementRect.top + startY - offset);
  const distance = targetY - startY;

  // Se a distância for insignificante, apenas posiciona
  if (Math.abs(distance) < 15) {
    window.scrollTo(0, targetY);
    htmlElem.style.scrollBehavior = prevHtmlScrollBehavior;
    bodyElem.style.scrollBehavior = prevBodyScrollBehavior;
    onComplete?.();
    return () => {};
  }

  let startTime: number | null = null;
  let animationFrameId: number | null = null;
  let isCancelled = false;
  let canCancel = false;

  // Permitir cancelamento por interação manual apenas após 600ms de carência
  // Isso evita que o próprio clique do botão ou eventos residuais de toque cancelem a animação no início
  const graceTimer = window.setTimeout(() => {
    canCancel = true;
  }, 600);

  /**
   * Curva easeInOutSine:
   * Aceleração suave no início, velocidade de cruzeiro constante e moderada
   * (velocidade máxima de apenas ~1.57x a média, sem picos bruscos como o cubic),
   * e desaceleração suave ao chegar no destino.
   */
  const easeInOutSine = (t: number): number => {
    return -(Math.cos(Math.PI * t) - 1) / 2;
  };

  const setScrollPosition = (y: number) => {
    window.scrollTo({
      top: y,
      left: 0,
      behavior: 'instant' as ScrollBehavior
    });
    // Fallback garantido para navegadores mais antigos ou WebViews
    htmlElem.scrollTop = y;
    bodyElem.scrollTop = y;
  };

  const cleanup = () => {
    window.clearTimeout(graceTimer);
    window.removeEventListener('wheel', onWheelInteraction);
    window.removeEventListener('touchmove', onTouchMoveInteraction);
    window.removeEventListener('keydown', onKeyInteraction);
    htmlElem.style.scrollBehavior = prevHtmlScrollBehavior;
    bodyElem.style.scrollBehavior = prevBodyScrollBehavior;
  };

  const cancel = () => {
    if (!isCancelled) {
      isCancelled = true;
      if (animationFrameId !== null) {
        cancelAnimationFrame(animationFrameId);
      }
      cleanup();
    }
  };

  function onWheelInteraction(e: WheelEvent) {
    if (!canCancel) return;
    // Cancela apenas se houver movimento intencional da roda do mouse (evita micro-jitters)
    if (Math.abs(e.deltaY) > 15 || Math.abs(e.deltaX) > 15) {
      cancel();
    }
  }

  function onTouchMoveInteraction() {
    if (!canCancel) return;
    // Cancela se o usuário arrastar a tela com o dedo
    cancel();
  }

  function onKeyInteraction(e: KeyboardEvent) {
    if (!canCancel) return;
    // Cancela se o usuário pressionar teclas de rolagem
    if (['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End', ' '].includes(e.key)) {
      cancel();
    }
  }

  window.addEventListener('wheel', onWheelInteraction, { passive: true });
  window.addEventListener('touchmove', onTouchMoveInteraction, { passive: true });
  window.addEventListener('keydown', onKeyInteraction, { passive: true });

  const step = (currentTime: number) => {
    if (isCancelled) return;

    if (startTime === null) {
      startTime = currentTime;
    }

    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const easedProgress = easeInOutSine(progress);

    const currentY = startY + (distance * easedProgress);
    setScrollPosition(currentY);

    if (progress < 1) {
      animationFrameId = requestAnimationFrame(step);
    } else {
      setScrollPosition(targetY);
      cleanup();
      onComplete?.();
    }
  };

  animationFrameId = requestAnimationFrame(step);
  return cancel;
}
