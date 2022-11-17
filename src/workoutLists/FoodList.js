import React, { useState, useEffect } from 'react';

export default function FoodList(props) {
    const days = ["SU","MO","TU","WE","TH","FR","SA"]
    const day = props.dayPlanGeneral[props.day]

    useEffect(()=>{
    },[])
    function updateWorkout(day,type,index,new_object)
    {
        props.updateWorkout(day,type,index,new_object)
    }

    return(
        <div>
            <div>Calorie Goal: {day["goal"]}</div>
           {
            day[props.type].map((item,index)=>
                <div key={index}>{item.name}: {item.complete}<button onClick={()=>updateWorkout(
                    props.day,props.type,index,Object.assign({},item,{"complete":item.complete+1})
                )}>+</button></div>
            )
           }
        </div>
    )

}

