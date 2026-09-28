/**
 * Utilitário para rolagem suave controlada (smooth scroll com duração personalizada)
 * Permite que a rolagem seja lenta o suficiente para o usuário visualizar as seções
 * intermediárias (como Pacotes, Diferenciais, etc.), e cancela suavemente se o usuário
 * interagir (scroll do mouse, toque no celular, etc.).
 */

interface SmoothScrollOptions {
  duration?: number; // Duração em milissegundos (padrão: 2400ms para permitir leitura visual dos blocos)
  offset?: number;   // Compensação de cabeçalho fixo (offset)
  onComplete?: () => void;
}

export function smoothScrollToElement(
  target: HTMLElement | string,
  options: SmoothScrollOptions = {}
): () => void {
  if (typeof window === 'undefined') return () => {};

  const {
    duration = 2400,
    offset = 80,
    onComplete
  } = options;

  const element = typeof target === 'string' ? document.getElementById(target) : target;
  if (!element) return () => {};

  // Respeita acessibilidade para quem prefere movimento reduzido
  const prefersReducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches;
  
  const elementPosition = element.getBoundingClientRect().top;
  const startY = window.pageYOffset || document.documentElement.scrollTop;
  const targetY = Math.max(0, elementPosition + startY - offset);
  const distance = targetY - startY;

  if (prefersReducedMotion || duration <= 0 || Math.abs(distance) < 10) {
    window.scrollTo({
      top: targetY,
      behavior: 'auto'
    });
    onComplete?.();
    return () => {};
  }

  let startTime: number | null = null;
  let animationFrameId: number | null = null;
  let isCancelled = false;

  // Curva de aceleração e desaceleração suave (easeInOutCubic)
  // Início gradual, velocidade de cruzeiro controlada e frenagem sutil
  const easeInOutCubic = (t: number): number => {
    return t < 0.5 
      ? 4 * t * t * t 
      : 1 - Math.pow(-2 * t + 2, 3) / 2;
  };

  const removeListeners = () => {
    window.removeEventListener('wheel', cancelOnInteraction);
    window.removeEventListener('touchstart', cancelOnInteraction);
    window.removeEventListener('pointerdown', cancelOnInteraction);
    window.removeEventListener('keydown', cancelOnInteraction);
  };

  const cancel = () => {
    if (!isCancelled) {
      isCancelled = true;
      if (animationFrameId !== null) {
        cancelAnimationFrame(animationFrameId);
      }
      removeListeners();
    }
  };

  function cancelOnInteraction() {
    cancel();
  }

  // Se o usuário tocar ou rolar a página manualmente, encerra a animação imediatamente
  window.addEventListener('wheel', cancelOnInteraction, { passive: true });
  window.addEventListener('touchstart', cancelOnInteraction, { passive: true });
  window.addEventListener('pointerdown', cancelOnInteraction, { passive: true });
  window.addEventListener('keydown', cancelOnInteraction, { passive: true });

  const step = (currentTime: number) => {
    if (isCancelled) return;

    if (startTime === null) {
      startTime = currentTime;
    }

    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const easedProgress = easeInOutCubic(progress);

    window.scrollTo(0, startY + (distance * easedProgress));

    if (progress < 1) {
      animationFrameId = requestAnimationFrame(step);
    } else {
      removeListeners();
      onComplete?.();
    }
  };

  animationFrameId = requestAnimationFrame(step);
  return cancel;
}
