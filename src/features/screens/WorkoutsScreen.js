import React, { useState, useEffect } from 'react';
import ExcersizeList from '../../workoutLists/ExcersizeList';
import FoodList from '../../workoutLists/FoodList';

export default function WorkoutsScreen(props) {

    useEffect(()=>{
    },[])
    const days = ["SU","MO","TU","WE","TH","FR","SA"]
    const listComponents = {
        "lift":<ExcersizeList type="lift" dayPlanGeneral = {props.dayPlanGeneral} day={props.day} updateWorkout={updateWorkout} switchToExcersizeDetailScreen={switchToExcersizeDetailScreen} deleteExcersize={deleteExcersize}/>,
        "cardio":<ExcersizeList type="cardio" dayPlanGeneral = {props.dayPlanGeneral} day={props.day} updateWorkout={updateWorkout} switchToExcersizeDetailScreen={switchToExcersizeDetailScreen} deleteExcersize={deleteExcersize}/>,
        "food":<ExcersizeList type="food" dayPlanGeneral = {props.dayPlanGeneral} day={props.day} updateWorkout={updateWorkout} switchToExcersizeDetailScreen={switchToExcersizeDetailScreen} deleteExcersize={deleteExcersize}/>
    }

    const [currentList,setCurrentList] = useState("lift")

    function updateWorkout(day,type,index,new_object)
    {
        props.updateWorkout(day,type,index,new_object)
    }

    function switchToWorkoutScreen(day)
    {
        props.switchToWorkoutScreen(day,props.type)
    }

    function switchToExcersizeDetailScreen(day,type,item,index)
    {
        props.switchToExcersizeDetailScreen(day,type,item,index)
    }

    function deleteExcersize(index)
    {
        props.deleteExcersize(props.day,props.type,index)
    }

    const styles = {
        Tab: day=>({
            "border":"0.1rem solid #d9d9d9",
            "borderTopLeftRadius":"10px",
            "borderTopRightRadius":"10px",
            "cursor":"pointer",
            "borderColor":props.day===day?("red"):("black"),
        }),
    }

    return(
        <div className="col-12" id="workoutsScreenHolder">
            <div className='row'>
                <div className='col-12' style={{display:"flex",flexDirection:"row",textAlign:"center"}}>
                    {days.map((day)=>
                        <div key={day} style={{...styles.Tab(day),...{width:"14.28%"}}} onClick={()=>switchToWorkoutScreen(day)}>{day}</div>
                    )}
                </div>
            </div>
            <div className="row">
                <div className='col-12'>
                    {listComponents[props.type]}
                </div>
            </div>
        </div>
    )

}

