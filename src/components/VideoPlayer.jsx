import React from "react";
import "video.js/dist/video-js.css";
import videojs from "video.js";

const MediaPlayer = ({ mediaUrl, mediaType }) => {
  const mediaRef = React.useRef(null);

  React.useEffect(() => {
    if (mediaType === "video") {
      const player = videojs(mediaRef.current, {
        controls: true,
        autoplay: false,
        preload: "auto",
        userActions: {
          hotkeys: true,
        },
      });

      return () => {
        player.dispose();
      };
    }
  }, [mediaUrl, mediaType]);

  return (
    <div>
      {mediaType === "video" ? (
        <video
          ref={mediaRef}
          className="video-js vjs-default-skin"
          data-setup="{}"
          playsInline
          controlsList="nodownload"
        >
          <source src={mediaUrl} type="video/mp4" />
        </video>
      ) : mediaType === "audio" ? (
        <audio
          controls
          controlsList="nodownload"
          onContextMenu={(e) => e.preventDefault()} // جلوگیری از راست کلیک برای دانلود
          style={{ width: "100%" }}
        >
          <source src={mediaUrl} type="audio/mpeg" />
          مرورگر شما از پخش فایل‌های صوتی پشتیبانی نمی‌کند.
        </audio>
      ) : (
        <p>نوع رسانه پشتیبانی نمی‌شود.</p>
      )}
    </div>
  );
};

export default MediaPlayer;
