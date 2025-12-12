// src//components/VideoPlayer.jsx

import "../styles/components/videoplayer.css";
import "../styles/theme.css";

function VideoPlayer({ src, poster }) {
  return (
    <div className="video-player">
      <video controls src={src} poster={poster} />
    </div>
  );
}

export default VideoPlayer;
