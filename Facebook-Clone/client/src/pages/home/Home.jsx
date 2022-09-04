import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import "./home.scss";

export default function Home() {
  return (
    <>
      <Topbar />
      <div className="home">
        <Sidebar />
        <Feed />
        <Rightbar />
      </div>
    </>
  );
}
