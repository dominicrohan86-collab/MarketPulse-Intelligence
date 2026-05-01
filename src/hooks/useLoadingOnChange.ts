import { useEffect, useRef, useState } from 'react';

export function useLoadingOnChange(dependencies: unknown[], delay = 420) {
  const [isLoading, setIsLoading] = useState(false);
  const hasMounted = useRef(false);

  useEffect(() => {
    if (!hasMounted.current) {
      hasMounted.current = true;
      return undefined;
    }
    setIsLoading(true);
    const timeout = window.setTimeout(() => setIsLoading(false), delay);
    return () => window.clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);

  return isLoading;
}
