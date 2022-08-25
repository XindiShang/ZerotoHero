import React, { useEffect, useRef } from "react";
import flv from "flv.js";
import { connect } from "react-redux";
import { fetchStream } from "../../actions";

const StreamShow = (props) => {
  const { id } = props.match.params;
  const { fetchStream } = props;
  const { title, description } = props.stream;

  const videoRef = useRef(null); // ref => { current: null }
  let player;

  const createPlayer = () => {
    if (player || !videoRef.current) return;
      
    player = flv.createPlayer({
      type: "flv",
      url: `http://localhost:8000/live/${id}.flv`,
    });

    player.attachMediaElement(videoRef.current);
    player.load();
  }

  useEffect(() => {
    fetchStream(id);
    createPlayer();
    return () => {
      // Anything in here will run when the component unmounts
      player.destroy()
    }
  }, [id, fetchStream]);

  const renderContent = () => {
    if (!props.stream) {
      return "Loading...";
    }
    return (
      <div>
        <video ref={videoRef} style={{width: '100%'}} controls />
        <h3>{title}</h3>
        <h4>{description}</h4>
        <hr />
      </div>
    );
  };

  return <div>{renderContent()}</div>;
};

const mapStateToProps = (state, ownProps) => {
  return {
    stream: state.streams[ownProps.match.params.id],
  };
};

export default connect(mapStateToProps, { fetchStream })(StreamShow);
