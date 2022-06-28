import React from "react";

const VideoDetail = ({ video }) => {
  if (!video) {
    return <div>Loading...</div>;
  }

  const videoSrc = `https://www.youtube.com/embed/${video.id.videoId}`;

  return (
    <div className="ui embed">
      <h4 className="ui header">{video.snippet.title}</h4>
      <iframe
        title="video player"
        src={videoSrc}
        frameBorder="0"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default VideoDetail;
