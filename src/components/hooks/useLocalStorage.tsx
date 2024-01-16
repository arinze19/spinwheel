import { useMemo } from 'react';

const useLocalStorage = () => {
  const Actions = useMemo(() => {
    return {
      get: (key: string, defaultValue?: unknown) => {
        let currentValue;

        try {
          currentValue = JSON.parse(
            localStorage.getItem(key) || String(defaultValue)
          );
        } catch (error) {
          currentValue = defaultValue;
        }

        return currentValue;
      },
      set: (key: string, value: unknown) => {
        localStorage.setItem(key, JSON.stringify(value));
      },
    };
  }, []);

  return Actions;
};

export default useLocalStorage;
