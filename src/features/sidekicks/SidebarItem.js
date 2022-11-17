import React, { useState, useEffect } from 'react';

export default function SidebarItem(props) {
    function deselectSidebar()
    {
        props.goToHomeScreen()
    }

    function selecteSidebar()
    {
        props.switchToWorkoutScreen(props.currentDay,props.tab.type)
    }
    return(
        props.selectedSidebar === props.tab.type?<li onClick={deselectSidebar} className="list-group-item col-md-12 col-4 active" style={{cursor:"pointer",border:"0.1rem solid #d9d9d9", borderTopRightRadius:"0", borderBottomRightRadius:"0"}}>
            {props.tab.name}
        </li>:(
        <li onClick={selecteSidebar} className="list-group-item col-md-12 col-4" style={{cursor:"pointer",border:"0.1rem solid #d9d9d9", borderTopRightRadius:"0", borderBottomRightRadius:"0"}}>
            {props.tab.name}
        </li>
        )
    )

}

