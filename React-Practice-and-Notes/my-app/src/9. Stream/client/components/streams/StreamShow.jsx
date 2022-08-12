import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchStream } from "../../actions";

const StreamShow = (props) => {
  const { id } = props.match.params;
  const { fetchStream } = props;
  const { title, description } = props.stream;

  useEffect(() => {
    fetchStream(id);
  }, [id, fetchStream]);

  const renderContent = () => {
    if (!props.stream) {
      return "Loading...";
    }
    return (
      <div>
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
