import { useEffect, useState } from "react";

interface CounterProps {
  end: number;
  suffix?: string;
  duration?: number; // seconds
}

export function Counter({ end, suffix = "", duration = 2 }: CounterProps) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const increment = end / (duration * 60); // 60 frames per second
    const interval = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(interval);
      } else {
        setCount(Math.ceil(start));
      }
    }, 1000 / 60);

    return () => clearInterval(interval);
  }, [end, duration]);

  return <span>{count}{suffix}</span>;
}
