import { Accelerometer } from 'expo-sensors';
import { useEffect, useRef, useState } from 'react';

interface ShakeOptions {
  threshold?: number;
  cooldownMs?: number;
}

export function useShake(
  onShake: () => void,
  options: ShakeOptions = {}
): {
  isAvailable: boolean | null;
} {
  const {
    threshold = 2.2,
    cooldownMs = 1000,
  } = options;

  const [isAvailable, setIsAvailable] =
    useState<boolean | null>(null);

  const lastShake =
    useRef(0);

  const callbackRef =
    useRef(onShake);

  useEffect(() => {
    callbackRef.current = onShake;
  }, [onShake]);

  useEffect(() => {
    let cancelled = false;
    let subscription:
      | ReturnType<typeof Accelerometer.addListener>
      | null = null;

    const setup = async () => {
      const available =
        await Accelerometer.isAvailableAsync();

      if (cancelled) {
        return;
      }

      setIsAvailable(available);

      if (!available) {
        return;
      }

      Accelerometer.setUpdateInterval(100);

      subscription =
        Accelerometer.addListener(
          ({ x, y, z }) => {
            const magnitude = Math.sqrt(
              x * x +
              y * y +
              z * z
            );

            if (magnitude >= threshold) {
              const now = Date.now();

              if (
                now - lastShake.current >=
                cooldownMs
              ) {
                lastShake.current = now;
                callbackRef.current();
              }
            }
          }
        );
    };

    setup();

    return () => {
      cancelled = true;
      subscription?.remove();
    };
  }, [threshold, cooldownMs]);

  return {
    isAvailable,
  };
}