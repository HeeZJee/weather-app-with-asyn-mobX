import React from "react";
import { observer, inject } from "mobx-react";

class App extends React.Component {
  componentDidMount() {
    this.props.store.loadWeather("Toronto,ON, Canada");
  }

  render() {
    console.log(this.props.store);
    const weather = this.props.store.weather;
    return (
      <div>
        <pre> {JSON.stringify(weather, null, 2)}</pre>
      </div>
    );
  }
}

export default inject("store")(observer(App));
