import React from "react";
import { observer, inject } from "mobx-react";

class App extends React.Component {
  state = {
    query: "",
  };

  constructor() {
    super();
    this.handleSearch = this.handleSearch.bind(this);
    this.textInput = React.createRef();
  }

  componentDidMount() {
    this.props.store.loadWeather("");
    this.textInput.current.focus();
  }

  componentDidUpdate(prevProps) {
    if (this.props.user !== prevProps.user) {
      this.handleSearch();
    }
  }

  handleSearch(e) {
    e.preventDefault();
    this.props.store.loadWeather(this.state.query);
  }

  render() {
    const weather = this.props.store.weather;
    return (
      <div>
        <form onClick={this.handleSearch}>
          <input
            type="text"
            onChange={(e) => this.setState({ query: e.target.value })}
            placeholder="Enter City"
            ref={this.textInput}
          />
          <button>Check Weather</button>
        </form>
        <pre>
          {weather !== {} ? JSON.stringify(weather, null, 2) : "Search City"}
        </pre>
      </div>
    );
  }
}

export default inject("store")(observer(App));
