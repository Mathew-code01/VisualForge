// src/hooks/useImagePreloader.js
// src/hooks/useImagePreloader.js
// src/hooks/useImagePreloader.js
import { useState, useEffect } from "react";

export default function useImagePreloader(imageArray) {
  const [imagesPreloaded, setImagesPreloaded] = useState(false);

  useEffect(() => {
    let isCancelled = false;

    async function preloadImages() {
      const promises = imageArray.map((src) => {
        return new Promise((resolve) => {
          // Optimization: Check if browser supports 'fetch' priority
          if ('fetch' in window) {
            fetch(src, { priority: 'high' })
              .then(resolve)
              .catch(resolve);
          } else {
            const img = new Image();
            img.src = src;
            img.onload = resolve;
            img.onerror = resolve;
          }
        });
      });

      // Race against a timeout: Don't let slow internet kill the UX
      const timeout = new Promise((resolve) => setTimeout(resolve, 5000));

      await Promise.race([Promise.all(promises), timeout]);
      
      if (!isCancelled) setImagesPreloaded(true);
    }

    preloadImages();
    return () => { isCancelled = true; };
  }, [imageArray]);

  return imagesPreloaded;
}