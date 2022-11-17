import React, { useState, useEffect } from 'react';

export default function AccountlessComponent(props) {
    const styles = {
        FormField:{
            "marginBottom":"1rem"
        },
    }
    function setUserAccountless(e)
    {
        e.preventDefault()
        props.setUserAccountless(true)
    }
    return(
        <div id="accountlessScreenHolder">
            <div className="row" id="accountlesscreenHeader">
                <div className="col-12">
                    <p>You will not be able to log your workouts without an account</p>
                </div>
            </div>
            <div className="row" id="accountlessScreenForm">
                <div className="col"></div>
                <div className="col-12">
                    <form onSubmit={setUserAccountless}>
                        <button type="submit" className="btn btn-primary btn-block mb-4" style={Object.assign(styles.FormField,{"width":"100%"})}>Use app without account</button>
                    </form>
                </div>
                <div className="col"></div>
            </div>
        </div>
    )
}