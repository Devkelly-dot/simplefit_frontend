import { current } from '@reduxjs/toolkit';
import React, { useState, useEffect, useRef } from 'react';

export default function ExcersizeList(props) {
    const [hoveredItem,setHoveredItem] = useState(
        {
            "type":null,
            "index":null
        }
    )
    const [currentText,setText] = useState('Delete')
    const verifyText = 'Are you sure?'

    function deleteExcersize()
    {
        props.deleteExcersize(props.index)
    }

    function toggle()
    {
        // eslint-disable-next-line default-case
        switch(currentText)
        {
            case 'Delete':
                setText(verifyText)
            break;
            case verifyText:
                setText('Deleting')
                deleteExcersize()
            break;
        }
    }

    function cancel()
    {
        setText('Delete')
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

    return (
        <div> 
            <div className='col-12' onClick={toggle} style={styles.itemOutline("2rem","del",-1)} onMouseEnter={()=>{setHoveredItem({"type":"del",index:-1})}} onMouseLeave={()=>{setHoveredItem({"type":null,"index":null})}}>
                {currentText}
            </div>
            {
                currentText===verifyText?
                <div className='col-12' onClick={cancel} style={styles.itemOutline("2rem","cancel",-1)} onMouseEnter={()=>{setHoveredItem({"type":"cancel",index:-1})}} onMouseLeave={()=>{setHoveredItem({"type":null,"index":null})}}>
                    Cancel
                </div>:<div></div>
            }
        </div>
    )
}