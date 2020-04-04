import React from 'react';
import './TopBar.css'
import iso3166 from '../../iso3166'


const TopBar = ({onCityChange, onCountryChange, onWeatherClick, onPress,units, onTempChange}) => {

    let fahrenheitClass = "fahrenheit"
    let celsiusClass = "celsius"

    if (units === "metric"){
        celsiusClass+= " active_btn"
    } else {
        fahrenheitClass+= " active_btn"
    }

    return(
        <div className = "top">
            <h2 id = "label">Weather</h2>
            <div className = "inputs">
                <input type = "text" placeholder = "City" id = "city" onChange = {onCityChange} onKeyDown = {onPress}/>
                <select name = "country" onChange={onCountryChange} onKeyDown = {onPress}>
                    <option value = "">Select country</option>
                    {   
                        iso3166.map((country, i)=>{
                            return <option key = {i} value = {country["alpha-2"]}>{`${country.name}`} </option>
                        })
                    }
                </select>
                <button type = "button" onClick = {()=>onWeatherClick(units)}><i className="material-icons md-10">search</i></button>
            </div>
            <div className = "temps">
                <button type = "button" className = {celsiusClass} onClick = {()=>onTempChange("metric")}>Celsius</button>
                <button type = "button" className = {fahrenheitClass} onClick = {()=>onTempChange("imperial")}>Fahrenheit</button>
            </div>
        </div>
    );

}

export default TopBar;