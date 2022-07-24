import React from "react";
import unsplash from "../api/unsplash";
import SearchBar from "./SearchBar";
import ImageList from "./ImageList";
import "../../app.css";

class App extends React.Component {
  state = { images: [] };

  onSearchSubmit = async (term) => {
    const res = await unsplash.get("search/photos", {
      params: { query: term },
    });
    console.log(res);

    this.setState({ images: res.data.results });
  };

  render() {
    return (
      <div className="ui container mt-10">
        <SearchBar handleSubmit={this.onSearchSubmit} />
        <ImageList images={this.state.images} />
      </div>
    );
  }
}

export default App;
