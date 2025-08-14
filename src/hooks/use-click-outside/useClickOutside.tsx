import { useEffect } from "react";

function useClickOutside<T extends HTMLElement | null>(
  ref: React.RefObject<T>,
  onOutsideClick: () => void
) {
  useEffect(() => {
    function handleClick(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onOutsideClick();
      }
    }

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [ref, onOutsideClick]);
}

export default useClickOutside;
