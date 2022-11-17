import React, { useState, useEffect, useRef} from 'react';
export default function ExcersizeDetailsScreen(props) {
const [hoveredItem,setHoveredItem] = useState(
    {
        "type":null,
        "index":null
    }
)

const formInfo = {
    "lift":
    {
        fields:["name","description","weight","goal","complete","measurement","reps"],
        fieldNames:["Name","Description","Weight","Sets","(sets complete)","LB/KG","Rep Goal"],
        fieldVarTypes:["str","str","num","num","num","str","num"],
        goalName:"sets",
        measurementTypes:["LB","KG"],
        fieldTypes:[
            <input defaultValue={props.item.name} type="text" placeholder="Bench Press" id="name" style={{width:"100%"}}></input>,
            <input defaultValue={props.item.description} type="text" placeholder="Touch your chest" id="description" style={{width:"100%"}}></input>,
            <input defaultValue={props.item.reps}  
            onKeyPress={(event) => {
                if (!/[0-9]/.test(event.key)) {
                event.preventDefault(); }}}
                id="weight"
                style={{width:"100%"}}>
            </input>,
            <input defaultValue={props.item.goal} 
                    onKeyPress={(event) => {
                if (!/[0-9]/.test(event.key)) {
                event.preventDefault(); }}} 
                id="goal"
                style={{width:"100%"}}>
            </input>,
            <input defaultValue={props.item.complete} 
                    onKeyPress={(event) => {
                if (!/[0-9]/.test(event.key)) {
                event.preventDefault(); }}}
                id="complete"
                style={{width:"100%"}}>
            </input>,
            <select id="measurement" style={{width:"25%"}}>
                <option value="LB">LB</option>
                <option value="KG">KG</option>
            </select>,
            <input defaultValue={props.item.reps} 
                    onKeyPress={(event) => {
                if (!/[0-9]/.test(event.key)) {
                event.preventDefault(); }}}
                id="reps"
                style={{width:"100%"}}>
            </input>
        ]
    },
    "cardio":
    {
        fields:["name","description","goal","complete","measurement"],
        fieldNames:["Name","Description","Goal","Complete","(Minutes / Miles)"],
        fieldVarTypes:["str","str","num","num","str"],
        goalName:"sets",
        measurementTypes:["ML","MN"],
        fieldTypes:[
            <input defaultValue={props.item.name} type="text" placeholder="Treadmill" id="name" style={{width:"100%"}}></input>,
            <input defaultValue={props.item.description} type="text" placeholder="Run an hour" id="description" style={{width:"100%"}}></input>,

            <input defaultValue={props.item.goal} 
                    onKeyPress={(event) => {
                if (!/[0-9]/.test(event.key)) {
                event.preventDefault(); }}} id="goal"
                style={{width:"100%"}}>
            </input>,
            <input defaultValue={props.item.complete} 
                    onKeyPress={(event) => {
                if (!/[0-9]/.test(event.key)) {
                event.preventDefault(); }}} id="complete"
                style={{width:"100%"}}>
            </input>,
            <select id="measurement" style={{width:"25%"}}>
                <option value="MN">Minutes</option>
                <option value="ML">Miles</option>
            </select>
        ]
    },
    "food":
    {
        fields:["name","description","complete"],
        fieldNames:["Name","Description","Calories"],
        fieldVarTypes:["str","str","num"],
        fieldTypes:[
            <input defaultValue={props.item.name} type="text" placeholder="Corn" id="name" style={{width:"100%"}}></input>,
            <input defaultValue={props.item.description} type="text" placeholder="Lots of corn" id="description" style={{width:"100%"}}></input>,

            <input defaultValue={props.item.complete} 
                    onKeyPress={(event) => {
                if (!/[0-9]/.test(event.key)) {
                event.preventDefault(); }}} id="complete"
                style={{width:"100%"}}>
            </input>
        ]
    }
}

function switchToWorkoutScreen()
{
    props.switchToWorkoutScreen(props.day,props.type)
}

const styles = {
    itemOutline:(minHeight,type,index)=>({
        "border":"0.1rem solid #CBCBCB", 
        "borderRadius":"10px", 
        "marginBottom":"1rem", 
        "minHeight":minHeight,
        "display":"flex",
        "justifyContent":"center",
        "alignItems":"center",
        "cursor":"pointer",
        "transition":"0.175s",
        "userSelect": "none",
        "backgroundColor":type==hoveredItem["type"]&&index==hoveredItem["index"]?"#212121":"white",
        "color":type==hoveredItem["type"]&&index==hoveredItem["index"]?"white":"black",
    }),
}

function handleSave()
{
    let updatedObj = {}
    for(let i in formInfo[props.type].fields)
    {   
        let element = document.getElementById(formInfo[props.type].fields[i])

        if(element)
        {
            let value = element.value 
            if(value === "" || value===null)
            {
                if(formInfo[props.type].fieldVarTypes[i] === "num")
                    value = 0
                else value = "Excersize"
            }
            else if(formInfo[props.type].fieldVarTypes[i] === "num")
                value = parseInt(value)
                
            updatedObj[formInfo[props.type].fields[i]] = value
        }
        else 
        {
            return false
        }
    }

    const newObj = Object.assign({}, props.item, updatedObj)
    updateWorkout(newObj)
}
function updateWorkout(object)
{
    if(props.item.id!=="new")
        props.updateWorkout(props.day,props.type,props.index,object)
    else 
    {
        props.createExcersize(props.day,props.type,object,props.index)
    }
}

return(
    <div className='col-12'>
        <div className='row'>
            <div className='col-4' style={styles.itemOutline("1rem","back",-1)} onMouseEnter={()=>{setHoveredItem({"type":"back","index":-1})}} onMouseLeave={()=>{setHoveredItem({"type":null,"index":null})}} onClick={switchToWorkoutScreen}>back</div>
            <div className='col'></div>
        </div>
        <div className='col-12'>
            {
                formInfo[props.type].fields.map((field,index)=>
                <div key={field} className="row">
                    <div className="col-12">
                        {formInfo[props.type].fieldNames[index]}
                    </div>
                    <div className="col-12" style={{width:"100%"}}>
                        {formInfo[props.type].fieldTypes[index]}
                    </div>
                    <div style={{marginBottom:"1rem"}}></div>
                </div>)
            }
        </div>
        <div className="row" onMouseEnter={()=>{setHoveredItem({"type":"save","index":-1})}} onMouseLeave={()=>{setHoveredItem({"type":null,"index":null})}} style={ styles.itemOutline("3rem","save",-1)}>
            <div className="col-12" style={{display:"flex",justifyContent:"center",alignItems:"center",fontSize:"1.2rem"}} onClick={handleSave}>
                Save
            </div>
        </div>
    </div>
)
}