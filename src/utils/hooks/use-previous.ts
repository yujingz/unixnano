import { useEffect, useRef } from "react";

export function usePrevious(value: any) {
  const ref = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}
