
import { useEffect, useState, useRef } from "react";

type IntersectionOptions = {
  threshold?: number;
  rootMargin?: string;
  root?: Element | null;
};

export const useIntersectionObserver = (
  options: IntersectionOptions = {}
) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [hasIntersected, setHasIntersected] = useState(false);
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
        
        if (entry.isIntersecting && !hasIntersected) {
          setHasIntersected(true);
        }
      },
      {
        threshold: options.threshold || 0.1,
        rootMargin: options.rootMargin || "0px",
        root: options.root || null,
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [options.threshold, options.rootMargin, options.root, hasIntersected]);

  return { ref, isIntersecting, hasIntersected };
};

export const useParallax = (speed: number = 0.5) => {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;
      
      const scrollTop = window.scrollY;
      const elementTop = ref.current.offsetTop;
      const distance = scrollTop - elementTop;
      
      if (distance > -window.innerHeight && distance < window.innerHeight) {
        ref.current.style.transform = `translateY(${distance * speed}px)`;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [speed]);

  return ref;
};
