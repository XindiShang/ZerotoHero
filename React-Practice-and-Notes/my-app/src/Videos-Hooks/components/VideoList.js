import React from "react";
import VideoItem from "./VideoItem";

const VideoList = ({ videos, handleSelect }) => {
  const onVideoSelect = (video) => {
    handleSelect(video);
  }

  const videoItems = videos.map((video) => {
    return <VideoItem handleItemSelect={onVideoSelect} key={video.id.videoId} video={video} />;
  });


  return <div className="ui relaxed divided list">{videoItems}</div>;
};

export default VideoList;
