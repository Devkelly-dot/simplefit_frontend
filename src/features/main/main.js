import React, { useState, useEffect } from 'react';
import LoginScreen from '../screens/LoginScreen';
import attemptLogin from '../../common/attemptLogin'
import authFetch from '../../common/authFetch';
import retrieveDayplan from '../../common/retrieveDayplanGeneral';
import HomeScreen from '../screens/HomeScreen';
import WorkoutsScreen from '../screens/WorkoutsScreen';
import updateDayplanItem from '../../common/updateDayplanItem';
import deleteDayplanExcersize from '../../common/deleteDayplanExcersize';
import SidebarItem from '../sidekicks/SidebarItem';
import ExcersizeDetailsScreen from '../screens/ExcersizeDetailsScreen';
import createDayplanExcersize from '../../common/createDayplanExcersize';
import updateDayplanGoal from '../../common/updateDayplanGoal';

export default function Main() {
  const [loggedIn,setLoggedIn] = useState(false)
  const [currentAppScreen, setCurrentScreen] = useState(null)
  const [isAccountless,setIsAccountless] = useState(false)
  const [selectedSidebar,setSelectedSidebar] = useState(null)
  const [currentDay,setCurrentDay] = useState("SU")
  const [dayPlanGeneral,setDayPlanGeneral] = useState(
    {
      "SU":{
        "id":null,
        "goal":0,
        "complete":0,
        "day":"Sunday",
        "food": [],
        "cardio": [],
        "lift": []
      },
      "MO":{
        "id":null,
        "goal":0,
        "complete":0,
        "day":"Monday",
        "food": [],
        "cardio": [],
        "lift": []
      },
      "TU":{
        "id":null,
        "goal":0,
        "complete":0,
        "day":"Tuesday",
        "food": [],
        "cardio": [],
        "lift": []
      },
      "WE":{
        "id":null,
        "goal":0,
        "complete":0,
        "day":"Wednesday",
        "food": [],
        "cardio": [],
        "lift": []
      },
      "TH":{
        "id":null,
        "goal":0,
        "complete":0,
        "day":"Thursday",
        "food": [],
        "cardio": [],
        "lift": []
      },
      "FR":{
        "id":null,
        "goal":0,
        "complete":0,
        "day":"Friday",
        "food": [],
        "cardio": [],
        "lift": []
      },
      "SA":{
        "id":null,
        "goal":0,
        "complete":0,
        "day":"Saturday",
        "food": [],
        "cardio": [],
        "lift": []
      }
    }
  )
  
  const sidebar_tabs = {
    "lift":{
      "name":"Lifts",
      "type":"lift"
    },
    "cardio":{
      "name":"Cardio",
      "type":"cardio"
    },
    "food":{
      "name":"Food",
      "type":"food"
    },
    "logs":{
      "name":"Logs",
      "type":"log"
    }
  }

  const weekDays = ["SU","MO","TU","WE","TH","FR","SA"]
  const getDayplan = async (token) =>{
    const data = await retrieveDayplan(token)
    if(data["Success"])
    {
      initLocalStorageDayplan(data["Success"])
      setCurrentScreen(<HomeScreen userLogout = {userLogout} dayPlanGeneral = {data["Success"]} switchToWorkoutScreen={switchToWorkoutScreen} updateDayCalorieGoal={updateDayCalorieGoal}/>)
      return data["Success"]
    }
    else
    {
      if(localStorage.getItem("dayplan")===null)
      {
        initLocalStorageDayplan()
      }
      return false 
    }
  }

  useEffect(() => { 
    setSelectedSidebar(null)

    const localAuthToken = localStorage.getItem('authToken') || null
    if(!localStorage.getItem("dayplan"))
    {
      initLocalStorageDayplan()
    }

    if(localAuthToken || isAccountless)
    {
      setLoggedIn(true)
      if(!isAccountless)
      {
        getDayplan(localAuthToken)
      }
      else 
      {
        setCurrentScreen(<HomeScreen userLogout = {userLogout} dayPlanGeneral = {dayPlanGeneral} switchToWorkoutScreen={switchToWorkoutScreen} updateDayCalorieGoal={updateDayCalorieGoal}/>)
      }
    }
    else
    {
      setCurrentScreen(<LoginScreen attemptLogin={userLogin} attemptRegistration={attemptRegistration} setUserAccountless={setUserAccountless}/>)
      setLoggedIn(false)
    }
  },[]);

  // useEffect(()=>{
  //   if(loggedIn)
  //   {
  //     console.log("setting home from login")
  //     setCurrentScreen(<HomeScreen userLogout = {userLogout} dayPlanGeneral = {dayPlanGeneral} switchToWorkoutScreen={switchToWorkoutScreen} updateDayCalorieGoal={updateDayCalorieGoal}/>)
  //   }
  //   else
  //   {
  //     setCurrentScreen(<LoginScreen attemptLogin={userLogin} attemptRegistration={attemptRegistration} setUserAccountless={setUserAccountless}/>)
  //   }
  // },[loggedIn])

  function setUserAccountless(flag)
  {
    setIsAccountless(flag)
    if(flag)
      setLoggedIn(true)
  }

  async function userLogin(username,password)
  {
    const loginRes = await attemptLogin(username,password)
    if(!loginRes)
    {
      alert("Couldn't login for some reason")
      return false
    }
    if(loginRes["Error"])
    {
      alert(loginRes["Error"])
      return false
    }

    if(loginRes["Success"])
    {
      const token = loginRes["Success"]
      if(token!==undefined && token!==null)
      {
        localStorage.setItem('authToken',token)
        setLoggedIn(true)
        setCurrentScreen(<div>Logged in successfully</div>)
        getDayplan(token)
      }
    }
  }

  async function attemptRegistration(email,username,password)
  {
    const url = process.env.REACT_APP_API+'dayplan/users/register/'

    const bodd = JSON.stringify(
      {
          email,
          username:username,
          password:password
      }
    )

    const res = await authFetch(url, {
        method: "POST",
        body:bodd
    })
    const data = await res.json()
    const userInfo = data[0]

    if(userInfo && userInfo["username"])
    {
      userLogin(userInfo["username"],password)
    }
    else if(data["Error"])
    {
      alert(data["Error"])
    }
  }

  
  function userLogout()
  {
    setCurrentScreen(<LoginScreen attemptLogin={userLogin} attemptRegistration={attemptRegistration} setUserAccountless={setUserAccountless}/>)
    setLoggedIn(false)
    localStorage.removeItem('authToken')
  }

  function jsonToLocalStorage(key,json)
  { 
    localStorage.setItem(key,JSON.stringify(json))
  }

  function localStorageToJSON(key)
  {
    return JSON.parse(localStorage.getItem(key))
  }

  function initLocalStorageDayplan(given_dayplan)
  {
    if(given_dayplan===undefined)
    {

      const dayPlan = {
        "SU":{
          "id":null,
          "goal":0,
          "complete":0,
          "day":"Sunday",
          "food": [],
          "cardio": [],
          "lift": []
        },
        "MO":{
          "id":null,
          "goal":0,
          "complete":0,
          "day":"Monday",
          "food": [],
          "cardio": [],
          "lift": []
        },
        "TU":{
          "id":null,
          "goal":0,
          "complete":0,
          "day":"Tuesday",
          "food": [],
          "cardio": [],
          "lift": []
        },
        "WE":{
          "id":null,
          "goal":0,
          "complete":0,
          "day":"Wednesday",
          "food": [],
          "cardio": [],
          "lift": []
        },
        "TH":{
          "id":null,
          "goal":0,
          "complete":0,
          "day":"Thursday",
          "food": [],
          "cardio": [],
          "lift": []
        },
        "FR":{
          "id":null,
          "goal":0,
          "complete":0,
          "day":"Friday",
          "food": [],
          "cardio": [],
          "lift": []
        },
        "SA":{
          "id":null,
          "goal":0,
          "complete":0,
          "day":"Saturday",
          "food": [],
          "cardio": [],
          "lift": []
        }
      }
      jsonToLocalStorage("dayplan",dayPlan)
      setDayPlanGeneral(dayPlan)
    }
    else
    {
      jsonToLocalStorage("dayplan",given_dayplan)
      setDayPlanGeneral(given_dayplan)
      setCurrentScreen(<HomeScreen userLogout = {userLogout} dayPlanGeneral = {given_dayplan} switchToWorkoutScreen={switchToWorkoutScreen} updateDayCalorieGoal={updateDayCalorieGoal}/>)
    }
  }

  async function getDayplanDetails(id,token)
  {
    const url = process.env.REACT_APP_API+`dayplan/dayplans/${id}/view/`

    const res = await authFetch(url, {
      token:token
    })

    const data = await res.json()
    return data
  }

  async function switchToWorkoutScreen(workout_day,type)
  {
    const currentDayplan = localStorageToJSON("dayplan")
    setCurrentDay(workout_day)
    if(currentDayplan === null)
    {
      return
    }

    let day_information = currentDayplan[workout_day]
    if(day_information.id===null)
    {

      return 
    }

    if(localStorage.getItem("authToken"))
    {
      const token = localStorage.getItem("authToken")
      const data = await getDayplanDetails(day_information.id,token)
      const types = ["cardio","lift","food"]

      let clone_dayplan = dayPlanGeneral

      for(let i in weekDays)
      {
        clone_dayplan[weekDays[i]].id = currentDayplan[weekDays[i]].id
      }

      for(let i in types)
      {
        const current_type = types[i]
        const items = data[current_type]
        let clone_day = dayPlanGeneral[workout_day]
        clone_day[current_type] = items
        clone_dayplan[workout_day] = clone_day
      }

      
      setDayPlanGeneral(clone_dayplan)
      initLocalStorageDayplan(clone_dayplan)
      setCurrentScreen(<WorkoutsScreen dayPlanGeneral = {clone_dayplan} day = {workout_day} type={type} updateWorkout={updateWorkout} switchToWorkoutScreen={switchToWorkoutScreen} switchToExcersizeDetailScreen={switchToExcersizeDetailScreen} deleteExcersize={deleteExcersize}/>)
      setSelectedSidebar(type)
    }
    else
    {
      setLoggedIn(false)
    }
    
  }

  async function updateWorkout(day,type,index,new_object)
  {
    let clone_dayplan = dayPlanGeneral
    clone_dayplan[day][type][index] = new_object

    setDayPlanGeneral(clone_dayplan)
    initLocalStorageDayplan(clone_dayplan)

    setCurrentScreen(<WorkoutsScreen dayPlanGeneral = {clone_dayplan} day = {day} type={type} updateWorkout={updateWorkout} switchToWorkoutScreen={switchToWorkoutScreen} switchToExcersizeDetailScreen={switchToExcersizeDetailScreen} deleteExcersize={deleteExcersize}/>)

    if(!isAccountless)
    {
      const token = localStorage.getItem("authToken")
  
      if(token)
      {
        const res = updateDayplanItem(token,type,new_object)
      }
    }
  }
  
  function goToHomeScreen()
  {
    setSelectedSidebar(null)
    setCurrentDay("SU")
    const token = localStorage.getItem("authToken")
    if(token)
    {
      getDayplan(token)
    }
    else 
    {
      setCurrentScreen(<HomeScreen userLogout = {userLogout} dayPlanGeneral = {dayPlanGeneral} switchToWorkoutScreen={switchToWorkoutScreen} updateDayCalorieGoal={updateDayCalorieGoal}/>)
    }
  }

  function switchToExcersizeDetailScreen(day,type,item,index)
  {
    setCurrentScreen(<ExcersizeDetailsScreen day={day} type={type} item={item} index={index} switchToWorkoutScreen={switchToWorkoutScreen} updateWorkout={updateWorkout} createExcersize={createExcersize}/>)
  }

  async function createExcersize(day,type,new_object,index)
  {
    if(!isAccountless)
    {
      const token = localStorage.getItem("authToken")
  
      if(token)
      {
        const dayplan_id = dayPlanGeneral[day].id
        const res = await createDayplanExcersize(token,dayplan_id,type,new_object)

        updateWorkout(day,type,index,res[0])
      }
    }
  }

  async function deleteExcersize(day,type,index)
  {
    const token = localStorage.getItem("authToken")
    if(token)
    {
      const res = await deleteDayplanExcersize(token,type,dayPlanGeneral[day][type][index].id)
    }

    let dayPlanClone = dayPlanGeneral
    dayPlanClone[day][type].splice(index,1)
    setDayPlanGeneral(dayPlanClone)
  }

  async function updateDayCalorieGoal(day,goal,day_object)
  {
    let dayplan_clone = dayPlanGeneral
    dayplan_clone[day].goal = goal
    const token = localStorage.getItem('authToken')
    if(token)
    {
      let res = await updateDayplanGoal(token,day_object.id,goal)
    }
    setDayPlanGeneral(dayplan_clone)
  }

  return (
    <div className="row" style={{margin:"0"}}>
      <div className="col"></div>
        <div className="col-10 col-md-8" id="siteContainer">
          <div className="row" id="siteHeader">
            <div className="col-12" style={{textAlign:"center"}}>
              <h1>Note Fitness</h1>
            </div>
          </div>
          <div className="row" id="appScreen">
            <div className="col-12 col-md-2" id="appSidebar">
              <ul className = "list-group row" id="sideBarList" style={{flexDirection:"row"}}>
                <SidebarItem tab={sidebar_tabs["lift"]} selectedSidebar={selectedSidebar} goToHomeScreen={goToHomeScreen} switchToWorkoutScreen={switchToWorkoutScreen} currentDay={currentDay}/>
                <SidebarItem tab={sidebar_tabs["cardio"]} selectedSidebar={selectedSidebar} goToHomeScreen={goToHomeScreen} switchToWorkoutScreen={switchToWorkoutScreen} currentDay={currentDay}/>
                <SidebarItem tab={sidebar_tabs["food"]} selectedSidebar={selectedSidebar} goToHomeScreen={goToHomeScreen} switchToWorkoutScreen={switchToWorkoutScreen} currentDay={currentDay}/>
                {/* <SidebarItem tab={sidebar_tabs["logs"]} selectedSidebar={selectedSidebar} goToHomeScreen={goToHomeScreen}/> */}
              </ul>
            </div>
            <div className="col-12 col-md-10" id="appHolder" style={{border:"0.1rem solid #d9d9d9", borderRadius:"10px", borderTopLeftRadius:"0", borderBottomLeftRadius:"0",minHeight:"30rem"}}>
              {currentAppScreen!==null?(
                currentAppScreen
              ):(
                <div>Loading App</div>
              )}
            </div>
            <div className="col"></div>
          </div>
        </div>
      <div className="col"></div>
      <div style={{marginBottom:"2rem"}}></div>
    </div>
  )
}
