import React from 'react';
import Card from '../Card/Card'
import './CardList.css'


const month = new Array(12);
month[0] = "Jan";
month[1] = "Feb";
month[2] = "Mar";
month[3] = "Apr";
month[4] = "May";
month[5] = "Jun";
month[6] = "Jul";
month[7] = "Aug";
month[8] = "Sep";
month[9] = "Oct";
month[10] = "Nov";
month[11] = "Dec";

var date = new Date()


const CardList = ({weatherC, weatherF, units}) => {

    var weather;
    if (units === "imperial"){
        weather = weatherF
    } else {
        weather = weatherC
    }

    if (weather.length > 0){
        var first = weather[0].map((w,i)=>{
            return <Card key = {i} weather = {w} units = {units}></Card>
        })
        var date1 = month[date.getMonth()] + " " + (date.getDate()) + ", " + date.getFullYear()

        var second = weather[1].map((w,i)=>{
            return <Card key = {i} weather = {w} units = {units}></Card>
        })
        var date2 = month[date.getMonth()] + " " + (date.getDate()+1) + ", " + date.getFullYear()

        var third = weather[2].map((w,i)=>{
            return <Card key = {i} weather = {w} units = {units}></Card>
        })
        var date3 = month[date.getMonth()] + " " + (date.getDate()+2) + ", " + date.getFullYear()

        var fourth =weather[3].map((w,i)=>{
            return <Card key = {i} weather = {w} units = {units}></Card>
        })
        var date4 = month[date.getMonth()] + " " + (date.getDate()+3) + ", " + date.getFullYear()

        var fifth = weather[4].map((w,i)=>{
            return <Card key = {i} weather = {w} units = {units}></Card>
        })
        var date5 = month[date.getMonth()] + " " + (date.getDate()+4) + ", " + date.getFullYear()

        if (weather.length === 6){
            var sixth = weather[5].map((w,i)=>{
                return <Card key = {i} weather = {w} units = {units}></Card>
            })
            var date6 = month[date.getMonth()] + " " + (date.getDate()+5) + ", " + date.getFullYear()
        }
        
    }


    return(
        <div>
            <h3>{date1}</h3>
            <div className = "cardList">
                {first}
            </div>
            
            <h3>{date2}</h3>
            <div className = "cardList">
                {second}
            </div>
            <h3>{date3}</h3>
            <div className = "cardList">
                {third}
            </div>
            <h3>{date4}</h3>
            <div className = "cardList">
                {fourth}
            </div>
            <h3>{date5}</h3>
            <div className = "cardList">
                {fifth}
            </div>
            { weather.length === 6 &&
            <div>
                <h3>{date6}</h3>
                <div className = "cardList">
                    {sixth}
                </div>
            </div>


            }
        </div>
    )
}

export default CardList;