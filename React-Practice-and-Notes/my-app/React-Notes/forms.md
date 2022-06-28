## Forms

### 1. React user events

1.1 onClick/onChange/onSubmit

Naming convention: on + name + event OR handle + name + event

```jsx
class SearchBar extends React.Component {
  onInputChange(event) {
    console.log(event.target.value);
  }

  render() {
    return (
      <div className="ui segment">
        <form className="ui form">
          <div className="field">
            <label>Image Search</label>
            <input
              onChange={this.onInputChange}
              type="text"
              placeholder="Search..."
            />
          </div>
        </form>
      </div>
    );
  }
}
```

1.2 Solve "this" pointer

- bind
- arrow fn in class (same syntax as state)
- arrow fn in jsx event handler

```jsx
class SearchBar extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.state = { term: "" };
  //   // ********** solution 1: use bind **********
  //   this.onFormSubmit = this.onFormSubmit.bind(this);
  // }

  state = { term: "" };

  // onFormSubmit(e) {
  //   e.preventDefault();
  //   console.log(this)
  //   console.log(this.state.term);
  // }

  // ********** solution 2: arrow fn **********
  onFormSubmit = (e) => {
    e.preventDefault();
    console.log(this.state.term);
  };

  render() {
    return (
      <div className="ui segment">
        <form onSubmit={this.onFormSubmit} className="ui form"></form>
      </div>
    );
  }
}
```

1.3 Two-way data binding

```jsx
<input
  value={this.state.term}
  onChange={(e) => this.setState({ term: e.target.value })}
  type="text"
  placeholder="Search..."
/>
```

1.4 Parent-child communication

- App.js

```jsx
class App extends React.Component {
  // pass a callback fn to custom event, and then pass the event to the child as a prop
  onSearchSubmit(term) {
    console.log(term);
  }
  render() {
    return (
      <div className="ui container mt-10">
        <SearchBar handleSubmit={this.onSearchSubmit} />
      </div>
    );
  }
}
```

- SearchBar.js

```jsx
onFormSubmit = (e) => {
    e.preventDefault();
    const { handleSubmit } = this.props;
    handleSubmit(this.state.term);

  };

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

```

### 2. refs

```jsx
class ImageCard extends React.Component {
  constructor(props) {
    super(props);
    this.imageRef = React.createRef();
    this.state = { spans: 0 };
  }

  componentDidMount() {
    // wait for loading to finish, use a callback fn
    this.imageRef.current.addEventListener("load", this.setSpans);
  }

  setSpans = () => {
    const imageHeight = this.imageRef.current.clientHeight;
    const spans = Math.ceil(imageHeight / 10);
    this.setState({ spans });
  };

  render() {
    const { urls, alt_description } = this.props.image;

    return (
      <div
        style={{ gridRowEnd: `span ${this.state.spans}` }}
        className="image-card"
      >
        <img ref={this.imageRef} src={urls.regular} alt={alt_description} />
      </div>
    );
  }
}
```
