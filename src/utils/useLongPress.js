import { useState, useCallback, useEffect } from "react";

const useLongPress = (callback = () => {}) => {
  const [isLongPress, setIsLongPress] = useState(false);

  useEffect(() => {
    if(isLongPress) {
      const id = setInterval(callback, 100);
      return () => {
        clearInterval(id);
      };
    }
  }, [isLongPress, callback]);

  const onMouseDown = useCallback(() => {
    setIsLongPress(true);
  }, []);

  const onMouseUp = useCallback(() => {
    setIsLongPress(false);
  }, []);

  return {
    onMouseDown,
    onMouseUp,
  }
};

export default useLongPress;