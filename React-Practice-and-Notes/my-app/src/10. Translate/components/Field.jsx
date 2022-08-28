import React, { Component } from "react";
import LanguageContext from "../contexts/LanguageContext";

class Field extends Component {
  // 1. use this.context
  // static contextType = LanguageContext;

  // 2. use Consumer
  // The consumer component will automatically call the function inside of it.

  renderLabel = (value) => {
    const text = value === "english" ? "Name" : "Naam";
    return <label>{text}</label>;
  };

  render() {
    // const text = this.context === "english" ? "Name" : "Naam";
    return (
      <div className="ui field">
        <LanguageContext.Consumer>
          {this.renderLabel}
        </LanguageContext.Consumer>
        {/* <label>{text}</label> */}
        <input type="text" />
      </div>
    );
  }
}

export default Field;
