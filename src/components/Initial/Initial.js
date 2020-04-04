import React from 'react';
import '../NoResult/Message.css'
import question from '../../assets/weather.svg'

const Initial = ({onCityChange, onCountryChange, onWeatherClick, onPress}) => {

    return(
        <div className = "result">
            <img src = {question} alt = "Question"/>
            <p>Just type the city and country you want to search</p>
        </div>
    );

}

export default Initial;