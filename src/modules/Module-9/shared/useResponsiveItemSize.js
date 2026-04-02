import { useState, useEffect } from "react";

export function useResponsiveItemSize() {
  function getItemSize() {
    const width = window.innerWidth;

    if (width <= 480) return 120;
    if (width <= 768) return 150;

    return 180;
  }

  const [itemSize, setItemSize] = useState(getItemSize);
  useEffect(() => {
    function handleResize() {
      const newSize = getItemSize();
      setItemSize(newSize);
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return itemSize;
}
