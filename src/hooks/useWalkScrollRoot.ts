import { useEffect, useRef, useState } from 'react';

/** The portfolio scrolls inside `.walk`, not the window — use this ref as whileInView root. */
export function useWalkScrollRoot() {
  const ref = useRef<HTMLElement | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const el = document.querySelector('.walk');
    ref.current = el instanceof HTMLElement ? el : null;
    setReady(true);
  }, []);

  return { ref, ready };
}
