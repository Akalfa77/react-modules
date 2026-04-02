import { useState, useEffect } from "react";

export function useContainerHeight(containerRef, bottomPadding = 40) {
  const [height, setHeight] = useState(500);

  useEffect(() => {
    function calculateHeight() {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const topPosition = rect.top;
      const availableHeight = window.innerHeight - topPosition - bottomPadding;
      const finalHeight = Math.max(200, availableHeight);

      setHeight(finalHeight);
    }

    calculateHeight();
    window.addEventListener("resize", calculateHeight);

    return () => {
      window.removeEventListener("resize", calculateHeight);
    };
  }, [containerRef, bottomPadding]);

  return height;
}
