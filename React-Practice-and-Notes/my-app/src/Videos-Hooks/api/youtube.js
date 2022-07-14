import axios from "axios";

const KEY = "AIzaSyAaHdYe9N00Bf37afNdO5aye25otzxOQls"

export default axios.create({
  baseURL: "https://www.googleapis.com/youtube/v3",
  params: {
    part: "snippet",
    type: "video",
    maxResults: 5,
    key: KEY

  }
})