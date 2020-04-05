import React from 'react';
import './Card.css'
import CLEAR_N from '../../assets/CLEAR0.png'
import CLEAR_D from '../../assets/CLEAR1.png'
import FOG from '../../assets/FOG.png'
import MCLOUDY_N from '../../assets/MCLOUDY0.png'
import MCLOUDY_D from '../../assets/MCLOUDY1.png'
import PCLOUDY_N from '../../assets/PCLOUDY0.png'
import PCLOUDY_D from '../../assets/PCLOUDY1.png'
import RAIN_N from '../../assets/RAIN0.png'
import RAIN_D from '../../assets/RAIN1.png'
import SHOWER_N from '../../assets/SHOWER0.png'
import SHOWER_D from '../../assets/SHOWER1.png'
import SLEET_N from '../../assets/SLEET0.png'
import SLEET_D from '../../assets/SLEET1.png'
import SNOW_N from '../../assets/SNOW0.png'
import SNOW_D from '../../assets/SNOW1.png'
import TSTORM_N from '../../assets/TSTORM0.png'
import TSTORM_D from '../../assets/TSTORM1.png'
import WINDY from '../../assets/WINDY.png'
import TORNADO from '../../assets/TORNADO.png'



const Card = ({weather, units}) => {
    var newIdName = "weather_icon"
    var newParaId = "active"

    let currentDate = new Date();
    let currentHour=currentDate.getHours();
    let currentMinutes=currentDate.getMinutes();
    let currentSecs=currentDate.getSeconds();
    let currentMonth=currentDate.getMonth()+1;
    let currentDay=currentDate.getDate();

    if (currentHour < 10){
        currentHour = "0"+currentHour
    }
    if (currentMinutes < 10){
        currentMinutes = "0"+currentMinutes
    }

    if (currentSecs < 10){
        currentSecs = "0"+currentSecs
    }

    if (currentMonth < 10){
        currentMonth = "0"+currentMonth
    }

    if (currentDay < 10){
        currentDay = "0"+currentDay
    }



    let split_time = weather.dt_txt.split(' ')
    let currentTime = currentHour + ":" + currentMinutes + ":" + currentSecs
    let currentFullDate = currentDate.getFullYear() + "-" + currentMonth + "-" + currentDay
    if (currentTime > split_time[1] && currentFullDate === split_time[0]){
        newIdName= "inactive_icon"
        newParaId = "inactive"
    }



    let time = split_time[1]
    let orig_time = split_time[1]

    time = time.split(':')
    time.pop()
    time = time.join(":")

    let temp = weather.main.temp.toString().split('.')[0];
    let weatherId = weather.weather[0].id
    let description = weather.weather[0].description
    let descArray = description.split(' ')
    for (let i = 0; i < descArray.length ; i++){
        descArray[i] = descArray[i][0].toUpperCase() + descArray[i].substring(1)
    }

    description = descArray.join(' ')
    var img_src;
    if (weatherId >= 200 && weatherId <=299){
        if (orig_time >= '18:00:00' || orig_time < '06:00:00'){ //night orig_time
            img_src = TSTORM_N
        } else { //day orig_time
            img_src = TSTORM_D
        }
    } else if (weatherId >= 300 && weatherId <=399){
        if (orig_time >= '18:00:00' || orig_time < '06:00:00'){ //night orig_time
            img_src = SHOWER_N
        } else { //day orig_time
            img_src = SHOWER_D
        }
    } else if (weatherId >= 500 && weatherId <=599){
        if (orig_time >= '18:00:00' || orig_time < '06:00:00'){ //night orig_time
            img_src = RAIN_N
        } else { //day orig_time
            img_src = RAIN_D
        }
    } else if ((weatherId >= 600 && weatherId <=602)){
        if (orig_time >= '18:00:00' || orig_time < '06:00:00'){ //night orig_time
            img_src = SNOW_N
        } else { //day orig_time
            img_src = SNOW_D
        }
    } else if ((weatherId >= 603 && weatherId <=699)){
        if (orig_time >= '18:00:00' || orig_time < '06:00:00'){ //night orig_time
            img_src = SLEET_N
        } else { //day orig_time
            img_src = SLEET_D
        }
    } else if (weatherId >= 700 && weatherId <=799 && weatherId !== 741 && weatherId !== 781){
        img_src = WINDY
    } else if (weatherId === 741){
        img_src = FOG
    } else if (weatherId === 781){
        img_src = TORNADO
    } else if (weatherId === 800){
        if (orig_time >= '18:00:00' || orig_time < '06:00:00'){ //night orig_time
            img_src = CLEAR_N
        } else { //day orig_time
            img_src = CLEAR_D
        }
    } else if ((weatherId === 801 || weatherId === 802)){
        if (orig_time >= '18:00:00' || orig_time < '06:00:00'){ //night orig_time
            img_src = PCLOUDY_N
        } else { //day orig_time
            img_src = PCLOUDY_D
        }
    } else if ((weatherId === 803 || weatherId === 804)){
        if (orig_time >= '18:00:00' || orig_time < '06:00:00'){ //night orig_time
            img_src = MCLOUDY_N
        } else { //day orig_time
            img_src = MCLOUDY_D
        }
    }

    var unit = "C"
    if (units === "imperial"){
        unit = "F"
    }

    return(
        <div className = "weatherCard">
            <h2 id = {newParaId}>{`${temp}°${unit}`}</h2>
            <p id = {newParaId}>{time}</p>
            <img src = {img_src} alt = "Weather" id = {newIdName}/>
            <p id = {newParaId}>{description}</p>
        </div>
    )
}

export default Card;