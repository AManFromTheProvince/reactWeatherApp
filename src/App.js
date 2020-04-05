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
      units: "metric",
      timezone: 0
    }
  }


  fixTimeFormat = (adjustedTime) => {
    if (adjustedTime < 10){ //add zero if less than 10
      return("0" + adjustedTime.toString())
    } else {
      return(adjustedTime.toString())
    }
  }

  februaryFix = (prevDate, adjustDate, adjustMonth, adjustYear) => {
    if (this.checkLeapYear(prevDate[0])){
      if (adjustDate > 29){
        return(this.checkDates(adjustDate,adjustMonth,adjustYear,prevDate))
      } else {
        return(this.sameMonthChange(adjustDate, prevDate))
      }
    } else {
      if (adjustDate > 28){
        return(this.checkDates(adjustDate,adjustMonth,adjustYear,prevDate))
      } else {
        return(this.sameMonthChange(adjustDate, prevDate))
      }
    }
  }

  sameMonthChange = (adjustDate, prevDate) => {
    if (adjustDate < 10){
      adjustDate = '0' + adjustDate
    }
    return(prevDate[0]+'-'+prevDate[1]+'-'+adjustDate)
  }

  checkDates = (adjustDate,adjustMonth,adjustYear,prevDate) => {
    if (adjustMonth > 12) {   //if new year
      adjustMonth = '01'
      adjustYear = adjustYear.toString()
      return(adjustYear+'-'+adjustMonth+'-'+adjustDate)
    } else {
      if (adjustMonth < 10){
        return(prevDate[0]+'-0'+adjustMonth+'-'+adjustDate)
      } else {
        return(prevDate[0]+'-'+adjustMonth+'-'+adjustDate)
      }
    }
  }

  checkLeapYear = (year) => {
    if (year%4 === 0){
      if (year%100 === 0 || year %400 ===0){
        return true;
      }
    }
    return false;
  }

  adjustTime = (splitDate, timezoneHrs) => {
    let newDateTime = []
    let prevDate = splitDate[0].split('-')
    let prevTime = splitDate[1]
    let adjustedTime = Number(prevTime.split(':')[0]) + timezoneHrs //adjust time or specifically, hours
    const months31 = [1,3,5,7,8,10,12]

    
    if (adjustedTime >= 24){ //adjust the hours and date (since it overflowed into the next day)
      adjustedTime = adjustedTime%24
      adjustedTime = this.fixTimeFormat(adjustedTime)
      let adjustDate = Number(prevDate[2]) + 1
      let adjustMonth = Number(prevDate[1]) + 1
      let adjustYear = Number(prevDate[0]) + 1

      if (adjustDate > 31 && Number(prevDate[1]) in months31){
        adjustDate = '01'
        newDateTime.push(this.checkDates(adjustDate,adjustMonth,adjustYear,prevDate))
      } else if (adjustDate === 31 && !Number(prevDate[1]) in months31 && Number(prevDate[1]) !== 2){ // for months with 30 days only
        adjustDate = '01'
        newDateTime.push(this.checkDates(adjustDate,adjustMonth,adjustYear,prevDate))
      } else if (Number(prevDate[1]) === 2){    //special case for february
        newDateTime.push(this.februaryFix(prevDate, adjustDate, adjustMonth, adjustYear))
      }else {         //within the same month
        newDateTime.push(this.sameMonthChange(adjustDate, prevDate))
      }
      newDateTime.push(adjustedTime+':00:00')
    } else if (adjustedTime < 0){
      adjustedTime = 24+adjustedTime;
      adjustedTime = this.fixTimeFormat(adjustedTime);
      //fix date
      let adjustDate = Number(prevDate[2]) - 1
      let adjustMonth = Number(prevDate[1]) - 1
      let adjustYear = Number(prevDate[0]) - 1

      if (Number(prevDate[2]) === 1 && Number(prevDate[1])===1){    //rolled back to the prev year
        newDateTime.push(adjustYear+'-12-31') //go back to dec 31, year-1
      } else if (Number(prevDate[2])===1 && !adjustMonth in months31 && adjustMonth !== 2) {  //to months with 30 days not including february
        adjustDate = '30'
        newDateTime.push(this.checkDates(adjustDate, adjustMonth, adjustYear, prevDate))
      } else if (Number(prevDate[2]) ===1 && adjustMonth in months31) {
        adjustDate = "31"
        newDateTime.push(this.checkDates(adjustDate,adjustMonth,adjustYear,prevDate))
      } else if (adjustMonth === 2){
        newDateTime.push(this.februaryFix(prevDate, adjustDate, adjustMonth, adjustYear))
      } else {
        newDateTime.push(this.sameMonthChange(adjustDate, prevDate))
      }
      newDateTime.push(adjustedTime+':00:00')
    } else {
      adjustedTime = this.fixTimeFormat(adjustedTime)
      newDateTime.push(prevDate[0]+'-'+prevDate[1]+'-'+prevDate[2])
      newDateTime.push(adjustedTime+':00:00')
    }
    newDateTime = newDateTime.join(' ')
    return(newDateTime)
  }

  setWeather = (data, units) => {
    console.log(data)
    this.setState({status: data.cod})
    if (data.cod === "200"){
      let timezoneHrs = (data.city.timezone)/(60*60)
      this.setState({ currentCity: data.city.name,
        currentCountry: data.city.country,
        timezone:timezoneHrs})

      let tempWeathers = []
      let collectionWeather = []

      let splitDate = data.list[0].dt_txt.split(' ')  // ['2020-04-05', '15:00:00']
      let newDateTime = this.adjustTime(splitDate, timezoneHrs)
      let prevDate = newDateTime.split(' ')[0]
      for (let i = 0; i < data.list.length; i++){
        splitDate = data.list[i].dt_txt.split(' ')
        data.list[i].dt_txt = this.adjustTime(splitDate, timezoneHrs)
        let loopNewDateTime = data.list[i].dt_txt
        let currentDate = loopNewDateTime.split(' ')[0]
        if (prevDate !== currentDate){
          collectionWeather.push(tempWeathers)
          prevDate = currentDate;
          tempWeathers = [];
        }
        tempWeathers.push(data.list[i]);
      }
      collectionWeather.push(tempWeathers)
      
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
