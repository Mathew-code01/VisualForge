// src/components/SmartVideo.jsx
// src/components/SmartVideo.jsx



import { useEffect, useRef, useState } from "react";

import "../styles/components/smart-video.css";

export default function SmartVideo({
  project,
  className = "",
  threshold = 0.45,
  rootMargin = "200px",
}) {
  const containerRef = useRef(null);
  const videoRef = useRef(null);

  const [isVisible, setIsVisible] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [canRender, setCanRender] = useState(false);

  // Lazy render before entering viewport
  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setCanRender(true);
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(containerRef.current);

    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  // Play / Pause
  useEffect(() => {
    const video = videoRef.current;

    if (!video) return;

    if (isVisible) {
      const promise = video.play();

      if (promise !== undefined) {
        promise.catch(() => {});
      }
    } else {
      video.pause();
    }
  }, [isVisible]);

  if (!project) {
    return (
      <div
        ref={containerRef}
        className={`${className} home-media--empty`}
      />
    );
  }

  // ==========================
  // Vimeo
  // ==========================

  if (project.platform === "vimeo" && project.resourceId) {
    return (
      <div
        ref={containerRef}
        className="smart-video"
      >
        {canRender && (
          <iframe
            className={`${className} smart-video__media`}
            src={`https://player.vimeo.com/video/${project.resourceId}?background=1&autoplay=${
              isVisible ? 1 : 0
            }&muted=1&loop=1&title=0&byline=0&portrait=0`}
            title={project.title || "Video"}
            allow="autoplay; fullscreen"
            loading="lazy"
            frameBorder="0"
          />
        )}

        <div
          className={`smart-video__loader ${
            canRender ? "smart-video__loader--hide" : ""
          }`}
        />
      </div>
    );
  }

  // ==========================
  // MP4
  // ==========================

  return (
    <div
      ref={containerRef}
      className="smart-video"
    >
      {canRender && (
        <video
          ref={videoRef}
          className={`${className} smart-video__media ${
            loaded ? "is-loaded" : ""
          } ${isVisible ? "is-playing" : ""}`}
          src={project.url}
          poster={project.thumbnail || undefined}
          muted
          loop
          playsInline
          preload="metadata"
          onLoadedData={() => setLoaded(true)}
        />
      )}

      {!loaded && (
        <div className="smart-video__loader">
          <div className="smart-video__shimmer" />
        </div>
      )}
    </div>
  );
}