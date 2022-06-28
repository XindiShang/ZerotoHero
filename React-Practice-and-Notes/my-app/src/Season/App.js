import React from "react";
// import ReactDOM from 'react-dom';
// Note: ReactDom has been replaced by createRoot in React 18
import { createRoot } from "react-dom/client";
import SeasonDisplay from "./SeasonDisplay";
import Spinner from "./Spinner";

// console.log(React.Component)
class App extends React.Component {
  // constructor(props) {
  //   super(props);
  //   // initialize state method 1
  //   // this.state = { lat: null, errorMessage: "" };
  // }

  // initialize state method 2
  // Why this works: Babel.js will automatically compile the code below to a constructor function (with super called) in ES5
  state = { lat: null, errorMessage: "" };

  getLat() {
    const that = this;
    function success(pos) {
      let lat = pos.coords.latitude.toFixed(2);
      that.setState({ lat });
    }

    function error(err) {
      that.setState({ errorMessage: err.message });
    }

    window.navigator.geolocation.getCurrentPosition(success, error);
  }

  componentDidMount() {
    this.getLat();
  }

  renderContent() {
    const { lat, errorMessage } = this.state;

    if (errorMessage && !lat) {
      return <p>Error: {errorMessage}</p>;
    } else if (!errorMessage && lat) {
      return <SeasonDisplay lat={lat} />;
    }
    return <Spinner />;
  }

  // componentDidUpdate() {
  //   console.log("componentDidUpdate");
  // }

  // render fn is required by React
  render() {
    return <div className="border red">{this.renderContent()}</div>;
  }
}

// Render the react component to the DOM
// createRoot(document.getElementById("root")).render(<App />);
