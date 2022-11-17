import React, { useState, useEffect, useRef } from 'react';
import DeleteButton from './sidekicks/DeleteButton'

export default function ExcersizeList(props) {
    const [defaultValues,setDefaultValues] = useState(null)
    useEffect(()=>{
        let new_defaults = []
        const dayplan_info = props.dayPlanGeneral[props.day]
        const excersizes_list = dayplan_info[props.type]

        for(let i in excersizes_list)
        {
            new_defaults.push(excersizes_list[i].complete)
            let inputDom = document.getElementById(String(props.type)+":"+String(i))
            if(inputDom)
                inputDom.value=new_defaults[i]
        }
        setDefaultValues(new_defaults)
        
    },[props.type,props.day])

    useEffect(()=>{
    },[defaultValues])
    
    const days = ["SU","MO","TU","WE","TH","FR","SA"]
    const day = props.dayPlanGeneral[props.day]

    const [focusedBox,setFocusedBox] = useState(null)
    const [hoveredItem,setHoveredItem] = useState(
        {
            "type":null,
            "index":null
        }
    )

    function updateWorkout(e,day,type,index,new_object)
    {
        e.stopPropagation()
        if(new_object.complete>=0)
        {
            let new_values = defaultValues
            new_values[index] = new_object.complete
            setDefaultValues(new_values)
            props.updateWorkout(day,type,index,new_object)
            let inputDom = document.getElementById(String(props.type)+":"+String(index))
            inputDom.value=new_object.complete

        }
    }

    function switchToExcersizeDetailScreen(day,type,item,index)
    {
        props.switchToExcersizeDetailScreen(day,type,item,index)
    }

    function deleteExcersize(index)
    {
        props.deleteExcersize(index)
    }

    function handleOutFocus(e,index,item)
    {
        setFocusedBox(null)
        let num = 0
        if(e.target.value!=="" && e.target.value!==null)
            num = e.target.value
        else 
        {
            e.target.value = 0
        }
        num = parseInt(num)
        updateWorkout(e,props.day,props.type,index,Object.assign({},item,{"complete":num}))
    }

    function handleFocus(index,day,type)
    {
        setFocusedBox(index)
    }

    function handleInputBoxChange(e,index,item)
    {
        let new_values = defaultValues
        new_values[index] = parseInt(e.target.value)
        setDefaultValues(new_values)
    }

    const styles = {
        dayplanOutline:minHeight=>({
            "border":"0.1rem solid #d9d9d9", 
            "borderRadius":"10px", 
            "marginBottom":"1rem", 
            "minHeight":minHeight,
            "backgroundColor":"white",

        }),
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

    const excersizeENUM={
        "ML":"Miles",
        "MN":"Minutes",
        "LB":"Sets",
        "KG":"Sets"
    }
    
    return(
        <div >
           {
            day[props.type].map((item,index)=>
                <div  key={item.id} className="row" style={styles.dayplanOutline("5rem")}>
                    <div className='col-12'>
                        <div style={{display:"flex",flexDirection:"row",justifyContent:"space-between"}}>
                            {item.weight&&item.weight!==0?<p>{item.weight} {item.measurement}</p>:(<p></p>)}
                            <b>{item.name}</b>
                            {item.reps&&item.reps!==0?<p>{item.reps} reps</p>:(<p></p>)}
                        </div>
                    </div>
                    <div style={{height:"1rem"}}></div>
                    <div className="col-12" style={{display:"flex",flexDirection:"row"}}>
                        <div className="col-4">
                            <div onMouseEnter={()=>{setHoveredItem({"type":"-","index":index})}} onMouseLeave={()=>{setHoveredItem({"type":null,"index":null})}} style={ styles.itemOutline("1rem","-",index)} onClick={(e)=>updateWorkout(e,props.day,props.type,index,Object.assign({},item,{"complete":item.complete-1}))}>
                                -
                            </div>
                        </div>
                        {
                            defaultValues!==null?
                                <div className="col-4" style={{textAlign:"center"}}> 
                                    <input 
                                        id = {String(props.type)+":"+String(index)}
                                        defaultValue={defaultValues[index]}
                                        onFocus={()=>{handleFocus(index)}} 
                                        onBlur={(e)=>{handleOutFocus(e,index,item)}} 
                                        type="text" 
                                        style={{width:"2.5rem",textAlign:"center"}} 
                                        onClick={(e)=>{e.stopPropagation()}}
                                        onKeyPress={(event) => {
                                            if (!/[0-9]/.test(event.key)) {
                                            event.preventDefault();
                                        }}}
                                        onChange={(e)=>handleInputBoxChange(e,index,item)}>
                                    
                                    </input> 
                                    {
                                        item.goal?(<span> / {item.goal}&nbsp; 

                                        {(excersizeENUM[item.measurement])} complete</span>):(<span> Calories</span>)
                                    }
                                    
                                </div>:(
                                    <div>loading</div>
                                    )
                        }
                        
                        <div className="col-4">
                            <div onMouseEnter={()=>{setHoveredItem({"type":"+","index":index})}} onMouseLeave={()=>{setHoveredItem({"type":null,"index":null})}} style={styles.itemOutline("1rem","+",index)} onClick={(e)=>updateWorkout(e,props.day,props.type,index,Object.assign({},item,{"complete":item.complete+1}))}>
                                +
                            </div>
                        </div>
                    </div>
                    <div style={{height:"1rem"}}></div>
                    <div className = 'row' style={{margin:"auto"}}>
                        <div className='col-12' onClick={()=>{switchToExcersizeDetailScreen(props.day,props.type,item,index)}} style={styles.itemOutline("2rem","edit",index)} onMouseEnter={()=>{setHoveredItem({"type":"edit",index:index})}} onMouseLeave={()=>{setHoveredItem({"type":null,"index":null})}}>
                            Edit
                        </div>
                    </div>
                    <DeleteButton deleteExcersize={deleteExcersize} index = {index}/>
                </div>
            )
           }
           <div className="row" onClick={()=>{switchToExcersizeDetailScreen(props.day,props.type,{id:"new"},day[props.type].length)}} onMouseEnter={()=>{setHoveredItem({"type":"new","index":-1})}} onMouseLeave={()=>{setHoveredItem({"type":null,"index":null})}} style={ styles.itemOutline("3rem","new",-1)}>
                <div className="col-12" style={{display:"flex",justifyContent:"center",alignItems:"center",fontSize:"1.4rem"}}>
                    +
                </div>
           </div>
        </div>
    )

}

