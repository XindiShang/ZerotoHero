import React from "react";

class SearchBar extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.state = { term: "" };
  //   // solution 1: use bind
  //   this.onFormSubmit = this.onFormSubmit.bind(this);
  // }
  state = { term: "" };

  // onFormSubmit(e) {
  //   e.preventDefault();
  //   console.log(this)
  //   console.log(this.state.term);
  // }

  // solution 2: arrow fn
  onFormSubmit = (e) => {
    e.preventDefault();
    console.log(this.state.term);
    const { handleSubmit } = this.props;
    handleSubmit(this.state.term);

    this.resetInput();
  };

  resetInput() {
    this.setState({ term: "" });
  }

  render() {
    return (
      <div className="ui segment">
        <form onSubmit={this.onFormSubmit} className="ui form">
          <div className="field">
            <label>Image Search</label>
            <input
              value={this.state.term}
              onChange={(e) => this.setState({ term: e.target.value })}
              type="text"
              placeholder="Search..."
            />
          </div>
        </form>
      </div>
    );
  }
}

export default SearchBar;
