import {
  configure,
  action,
  observable,
  runInAction,
  flow,
  decorate,
  makeObservable,
} from "mobx";

// Imp 1

class Weather {
  constructor() {
    makeObservable(this, {
      weather: observable,
      setWeather: action,
    });
  }

  weather = {};
  loadWeather = (city) => {
    fetch(
      `https://abnormal-weather-api.herokuapp.com/cities/search?city=${city}`
    )
      .then((response) => response.json())
      .then((data) => {
        this.setWeather(data);
      });
  };

  setWeather = (data) => {
    this.weather = data;
  };
}

// Imp 2

class WeatherInAction {
  constructor() {
    makeObservable(this, {
      weather: observable,
      setWeather: action,
    });
  }

  weather = {};
  loadWeather = (city) => {
    fetch(
      `https://abnormal-weather-api.herokuapp.com/cities/search?city=${city}`
    )
      .then((response) => response.json())
      .then((data) => runInAction(() => (this.weather = data)));
  };

  setWeather = (data) => {
    this.weather = data;
  };
}

const store = new WeatherInAction();
export default store;
