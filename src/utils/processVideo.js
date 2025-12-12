// src/utils/processVideo.js

export async function extractMetadata(file) {
  return new Promise((resolve) => {
    const video = document.createElement("video");
    video.src = URL.createObjectURL(file);
    video.muted = true;

    const cleanup = () => {
      video.pause();
      video.removeAttribute("src");
      video.load();
      URL.revokeObjectURL(video.src);
    };

    video.onloadedmetadata = () => {
      resolve({
        duration: +video.duration.toFixed(2),
        resolution: `${video.videoWidth}x${video.videoHeight}`,
      });
      cleanup();
    };

    video.onerror = () => {
      resolve({ duration: 0, resolution: "" });
      cleanup();
    };
  });
}

export async function generateThumbnail(file) {
  return new Promise((resolve) => {
    const video = document.createElement("video");
    video.src = URL.createObjectURL(file);
    video.muted = true;
    video.playsInline = true;

    video.onloadeddata = () => {
      try {
        const canvas = document.createElement("canvas");
        canvas.width = 160;
        canvas.height = 90;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

        resolve(canvas.toDataURL("image/png"));
      } catch (err) {
        console.log(err)
        resolve(null);
      }
      video.remove();
    };

    video.onerror = () => {
      resolve(null);
      video.remove();
    };
  });
}
