import { useRef } from "react";

export function useFlyToCartAnimation(cartIconRef: React.RefObject<HTMLElement>) {
  const productImageRef = useRef<HTMLImageElement>(null);

  const triggerAnimation = () => {
    const img = productImageRef.current;
    const cart = cartIconRef.current;

    if (!img || !cart) return;

    const imgRect = img.getBoundingClientRect();
    const cartRect = cart.getBoundingClientRect();

    const clone = img.cloneNode() as HTMLImageElement;
    clone.style.position = 'fixed';
    clone.style.left = `${imgRect.left}px`;
    clone.style.top = `${imgRect.top}px`;
    clone.style.width = `${imgRect.width}px`;
    clone.style.height = `${imgRect.height}px`;
    clone.style.transition = 'all 0.8s ease-in-out';
    clone.style.zIndex = '9999';
    document.body.appendChild(clone);

    // Kích hoạt transition
    void clone.offsetWidth;

    clone.style.left = `${cartRect.left + cartRect.width / 2}px`;
    clone.style.top = `${cartRect.top + cartRect.height / 2}px`;
    clone.style.width = `0px`;
    clone.style.height = `0px`;
    clone.style.opacity = '0.3';

    setTimeout(() => {
      document.body.removeChild(clone);
    }, 800);
  };

  return {
    productImageRef, // gắn vào <img ref={productImageRef} />
    triggerAnimation, // gọi khi "Thêm vào giỏ"
  };
}