import React, { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import VideoList from "./VideoList";
import VideoDetail from "./VideoDetail";
import useVideos from "../hooks/useVideos";

const App = () => {
  const [selectedVideo, setSelectedVideo] = useState(null);

  const [videos, search] = useVideos('js')

  // since the app component will be re-rendered every time a piece of state (search term) changes, we can use useEffect to update the selected video whenever the video results changed.

  useEffect(() => { 
    setSelectedVideo(videos[0]);
  }, [videos])


  return (
    <div className="ui container">
      <SearchBar handleSubmit={search} />
      <div className="ui grid">
        <div className="ui row">
          <div className="eleven wide column">
            <VideoDetail video={selectedVideo} />
          </div>
          <div className="five wide column">
            <VideoList
              handleSelect={setSelectedVideo}
              videos={videos}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
