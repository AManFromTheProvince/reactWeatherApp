import React from 'react';
import './Message.css'
import question from '../../assets/questions.svg'

const NoResult = ({onCityChange, onCountryChange, onWeatherClick, onPress}) => {

    return(
        <div className= "result">
            <img src = {question} alt = "Question"/>
            <p>City doesn't exist</p>
        </div>
    );

}

export default NoResult;