import React, { Component } from 'react'
import './index.css'
import Swal from 'sweetalert2';

import search_icon from '../Assests/search.png';
import clear_icon from '../Assests/clear.png';
import cloud_icon from '../Assests/cloud.png';
import drizzle_icon from '../Assests/drizzle.png';
import humidity_icon from '../Assests/humidity.png';
import rain_icon from '../Assests/rain.png';
import snow_icon from '../Assests/snow.png';
import wind_icon from '../Assests/wind.png';
class WeatherApp extends Component {
  api_key = "__YOUR_API_KEY__";
  state = {
    city: "",
    name: "",
    temperature: "",
    humidity: "",
    windSpeed: "",
    description: "",
    isFetching: false,
  }
  search = async (e) => {
    e.preventDefault();
    if (this.state.city === "") {
      Swal.fire(
        "Error", "Please Enter a City to Search", "error"
      );
      return;
    }
    this.setState({
      isFetching: true,
    });
    let weather_url = `https://api.openweathermap.org/data/2.5/weather?q=${this.state.city}&units=Metric&appid=${this.api_key}`
    let response = await fetch(weather_url);
    if (!response.ok) {
      if (response.status === 404) {
        Swal.fire("City Not Found", "Please enter a valid city name", "error");
      } else {
        Swal.fire("Error", "An error occurred while fetching weather data", "error");
      }
      this.setState({
        isFetching: false,
      });
      return;
    }

    let json_response = await response.json();
    this.setState({
      isFetching: false,
      temperature: json_response.main.temp,
      humidity: json_response.main.humidity,
      windSpeed: json_response.wind.speed,
      name: json_response.name,
      description: json_response.weather[0].description,
    });
    console.log(json_response);
  }
  getWeatherIcon = (description) => {
    switch (description) {
      case "clear sky":
        return clear_icon;
      case "few clouds":
        return cloud_icon;
      case "scattered clouds":
        return cloud_icon;
      case "shower rain":
        return rain_icon;
      case "rain":
        return rain_icon;
      case "thunderstorm":
        return drizzle_icon;
      case "snow":
        return snow_icon;
      case "mist":
        return wind_icon;
      default:
        return cloud_icon;
    }
  }
  render() {
    return (
      <div className='main-cointainer'>
        <div className='cointainer'>
          <div className="top-bar">
            <input type="search" className="search-input" placeholder="Search"
              onChange={envt => this.setState({
                city: envt.target.value
              })}
            />
            <div className="search-icon" onClick={this.search}>
              <img src={search_icon} alt="Search-Icon" />
            </div>
          </div>
          {this.state.isFetching &&
            <div class="loader">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          }
          {!this.state.isFetching &&
            <>
              <div className="weather-image">
                <img src={this.state.description ? this.getWeatherIcon(this.state.description) : cloud_icon} alt={this.state.description} />
              </div>
              <div className="weather">
                {this.state.description ? this.state.description.toUpperCase : "CLOUDS"}
              </div>
              <div className="weather-temp">
                {this.state.temperature ? this.state.temperature : "24"}
                °c</div>
              <div className="weather-location">
                {this.state.name ? this.state.name.toUpperCase() : "COIMBATORE"}
              </div>
              <div className="data-container">
                {/* Element 1 */}
                <div className="element">
                  <img src={humidity_icon} alt="" className="icon" />
                  <div className="data">
                    <div className="humdity-percent">
                      {this.state.humidity ? this.state.humidity : "64"}%
                    </div>
                    <div className="text">Humidity</div>
                  </div>
                </div>
                {/* Element 1 */}
                <div className="element">
                  <img src={wind_icon} alt="" className="icon" />
                  <div className="data">
                    <div className="wind-speed">
                      {this.state.windSpeed ? this.state.windSpeed : "20"}
                      Km/h
                    </div>
                    <div className="text">Wind Speed</div>
                  </div>
                </div>
              </div>
            </>
          }

        </div>
      </div>
    )
  }
}

export default WeatherApp;
