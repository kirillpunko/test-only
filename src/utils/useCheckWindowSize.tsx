import { useEffect, useState } from "react";

export function useCheckWindowSize(breakpoint: number = 1024) {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      setWindowHeight(window.innerHeight);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [breakpoint]);

  const isWindowWidthLower = (breakpoint: number) => {
    return windowWidth < breakpoint;
  };
  const isWindowHeightLower = (breakpoint: number) => {
    return windowHeight < breakpoint;
  };
  return { isWindowWidthLower, isWindowHeightLower };
}
