import { useState, useEffect } from "react";
import youtube from "../api/youtube";

const useVideos = (defaultSearchTerm) => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    search(defaultSearchTerm);
  }, [defaultSearchTerm]);

  const search = async (term) => {
    const res = await youtube.get("/search", {
      params: { q: term },
    });
    setVideos(res.data.items);
  };

  // it's also okay to return {videos, search}
  return [videos, search];
}

export default useVideos;