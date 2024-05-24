import { useEffect, useRef } from 'react';

export function useClickOutside(handler) {
  const ref = useRef();

  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        handler();
      }
    }

    document.addEventListener('click', handleClick, true);

    return () => document.removeEventListener('click', handleClick);
  });

  return ref;
}
