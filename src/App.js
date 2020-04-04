import React from 'react';
import './App.css';
import TopBar from './components/TopBar/TopBar'
import CardList from './components/CardList/CardList'
import NoResult from './components/NoResult/NoResult'
import Initial from './components/Initial/Initial'

class App extends React.Component{

  constructor(){
    super()
    this.state = {
      weatherC: [],
      weatherF: [],
      city: "",
      country:"",
      date: new Date(),
      currentCity: "",
      currentCountry: "",
      status: "0",
      units: "metric"
    }
  }

  setWeather = (data, units) => {
    this.setState({status: data.cod})
    if (data.cod === "200"){
      this.setState({ currentCity: data.city.name,
        currentCountry: data.city.country})

      let tempWeathers = []
      let collectionWeather = []
      let prevDate = data.list[0].dt_txt.split(' ')[0]
      for (let i = 0; i < data.list.length; i++){
        let currentDate = data.list[i].dt_txt.split(' ')[0]
        if (prevDate !== currentDate){
          collectionWeather.push(tempWeathers)
          prevDate = currentDate;
          tempWeathers = [];
        }
        tempWeathers.push(data.list[i]);
      }
      
      if (units === "metric"){
        this.setState({weatherC: collectionWeather})
      } else {
        this.setState({weatherF:collectionWeather})
      }
    }

  }

  onCityChange = (event) => {
    this.setState({city: event.target.value})
  }

  onCountryChange = (event) => {
    this.setState({country: event.target.value})
  }

  onPress = (event) => {
    if (event.keyCode === 13){
      this.onWeatherClick();
    }
  }

  onTempChange = (units) => {
    this.setState({units: units})
  }

  onWeatherClick = () =>{
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${this.state.city},${this.state.country}&units=metric&appid=2126bbd28f09f65f7a236ed84311da61`)
    .then(response=>response.json())
    .then(data=>this.setWeather(data, "metric"))

    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${this.state.city},${this.state.country}&units=imperial&appid=2126bbd28f09f65f7a236ed84311da61`)
    .then(response=>response.json())
    .then(data=>this.setWeather(data, "imperial"))

  }

  componentDidMount(){
    
  }

  render(){
    return(
      <div className = "app">
        <TopBar
        onCityChange = {this.onCityChange}
        onCountryChange = {this.onCountryChange}
        onWeatherClick = {this.onWeatherClick}
        onPress = {this.onPress}
        units = {this.state.units}
        onTempChange = {this.onTempChange}/>

        <div className = "result_div">
          {
            this.state.status === "0" &&
            <Initial></Initial>
          }

          {
            this.state.status === "200" &&
            <div className = "success_div">
              <p id = "title">{`Five day forecast for ${this.state.currentCity}, ${this.state.currentCountry}`}</p>
              <CardList
              weatherC = {this.state.weatherC}
              weatherF = {this.state.weatherF}
              units = {this.state.units}/>
            </div>
          }
          {
            this.state.status === "404" &&
            <NoResult></NoResult>
          }
        </div>
      </div>

    )
  }
}

export default App;
