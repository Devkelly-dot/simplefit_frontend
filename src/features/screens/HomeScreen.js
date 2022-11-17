import React, { useState, useEffect } from 'react';

export default function HomeScreen(props) {
    const days = ["SU","MO","TU","WE","TH","FR","SA"]

    const [hoveredItem,setHoveredItem] = useState({day:null,type:null})

    useEffect(()=>{
    },[])
    function switchToWorkoutScreen(day,type)
    {
        props.switchToWorkoutScreen(day,type)
    }

    const styles = {
        dayplanOutline:minHeight=>({
            "border":"0.1rem solid #d9d9d9", 
            "borderRadius":"10px", 
            "marginBottom":"1rem", 
            "minHeight":minHeight,
            "backgroundColor":"white"

        }),
        itemOutline:(minHeight,day,type)=>({
            "border":"0.1rem solid #CBCBCB", 
            "borderRadius":"10px", 
            "marginBottom":"1rem", 
            "minHeight":minHeight,
            "display":"flex",
            "justifyContent":"center",
            "alignItems":"center",
            "cursor":"pointer",
            "backgroundColor":hoveredItem["day"]===day&&hoveredItem["type"]===type?"#212121":(""),
            "color":hoveredItem["day"]===day&&hoveredItem["type"]===type?"white":("black"),
            "transition":"0.175s"
        }),
    }

    function switchHover(day,type)
    {
        setHoveredItem({"day":day,"type":type})
    }

    function handleOutFocus(e,day)
    {
        let goal = e.target.value
        if(goal==="" || goal===null)
        {
            e.target.value = "0"
            goal = 0
        }
        
        goal = parseInt(goal)
        props.updateDayCalorieGoal(day,goal,props.dayPlanGeneral[day])
    }

    return(
        <div className="col-12" id="homeScreenHolder">
            <div className='row' id="homeScreenHeader" style={{alignItems:"center"}}>
                <div style={{height:"1rem"}}></div>
                <div className="col-6">
                    Your Dayplans
                </div>
                <div className='col-6' style={{textAlign:"right"}}>
                    <button className="btn btn-outline-dark" onClick={props.userLogout}>Logout</button>
                </div>
                <div className='col-12'>
                    <div style={{height:"1rem"}}></div>
                    <hr style={{width:"90%",margin:"auto"}}/>
                    <div style={{height:"1rem"}}></div>
                </div>
            </div>
            <div className="row">
                <div className="col"></div>
                <div className='col-12 col-md-10'>
                {
                    days.map((day)=>
                        <div className="row" key = {day} style={styles.dayplanOutline("7rem")}>
                            <div className="col-12" style={{textAlign:"center", color:"#5e5e5e"}}>
                                <b>{props.dayPlanGeneral[day].day}</b>
                            </div>
                            <div className="col-12">
                                Calorie Goal: 
                                &nbsp;{props.dayPlanGeneral[day].complete} /&nbsp;
                                <input 
                                    style={{width:"4rem",textAlign:"center"}}
                                    defaultValue = {props.dayPlanGeneral[day].goal}
                                    onBlur={(e)=>{handleOutFocus(e,day)}}
                                    onKeyPress={(event) => {
                                        if (!/[0-9]/.test(event.key)) {
                                        event.preventDefault();
                                    }}}
                                />
                            </div>
                            <div style={{height:"0.5rem"}}></div>
                            <div className='12' style={{display:"flex",flexDirection:"row"}}>
                                <div className="col-4" onMouseLeave={()=>{setHoveredItem({"day":null,type:"null"})}} onMouseOver={()=>{switchHover(day,'lift')}} onClick={()=>{switchToWorkoutScreen(day,'lift')}} style={styles.itemOutline("3rem",day,"lift")}>
                                    Lifts
                                </div>
                                <div className="col-4" onMouseLeave={()=>{setHoveredItem({"day":null,type:"null"})}} onMouseOver={()=>{switchHover(day,'cardio')}} onClick={()=>{switchToWorkoutScreen(day,'cardio')}} style={styles.itemOutline("3rem",day,"cardio")}>
                                    Cardio
                                </div>
                                <div className="col-4" onMouseLeave={()=>{setHoveredItem({"day":null,type:"null"})}} onMouseOver={()=>{switchHover(day,'food')}} onClick={()=>{switchToWorkoutScreen(day,'food')}} style={styles.itemOutline("3rem",day,"food")}>
                                    Food
                                </div>
                            </div>
                        </div>
                    )
                }
                </div>
                <div className="col"></div>
            </div>

        </div>
    )

}

