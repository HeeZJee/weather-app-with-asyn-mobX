import {
  action,
  observable,
  runInAction,
  makeObservable,
  extendObservable,
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
}

// 3rd Imp
class WeatherAsycAwait {
  constructor() {
    makeObservable(this, {
      weather: observable,
    });
  }

  weather = {};
  loadWeather = async (city) => {
    const data = await (
      await fetch(
        `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=bb476bd98204485c1cee40f10ae9a686`
      )
    ).json();

    runInAction(() => (this.weather = data));
  };
}

// 4th Imp

function WeatherExtendObservable() {
  extendObservable(this, {
    weather: {},
    loadWeather: async (city) => {
      const data = await (
        await fetch(
          `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=bb476bd98204485c1cee40f10ae9a686`
        )
      ).json();

      runInAction(() => (this.weather = data));
    },
  });
}

const store = new WeatherExtendObservable();
export default store;
