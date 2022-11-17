import React, { useState, useEffect } from 'react';

export default function LoginComponent(props) {
    const [form,setForm] = useState(
        {
            "username":"",
            "password":""
        }
    )

    function attemptLogin(e)
    {
        e.preventDefault()
        if(props.attemptLogin)
            props.attemptLogin(form["username"],form["password"])
    }

    function handleFormChange(e,type)
    {
        let formUpdate = {}
        formUpdate[type] = e.target.value
        const accumulative = {
            ...form,
            ...formUpdate
          }
        setForm(accumulative)
    }

    const styles = {
        FormField:{
            "marginBottom":"1rem"
        },
    }
    
    return(
        <div id="loginScreenHolder">
            <div className="row" id="loginScreenHeader">
                <div className="col-12">
                    <p>Please Login</p>
                </div>
            </div>
            <div className="row" id="loginScreenForm">
                <div className="col"></div>
                <div className="col-12">
                    <form onSubmit={attemptLogin}>
                        <input type="username" className="form-control" placeholder = "Username" style={styles.FormField} onChange={(e)=>handleFormChange(e,'username')} value={form["username"]}/>
                        <input type="password" className="form-control" placeholder = "Password" style={styles.FormField} onChange={(e)=>handleFormChange(e,'password')}/>
                        <button type="submit" className="btn btn-primary btn-block mb-4" style={Object.assign(styles.FormField,{"width":"100%"})}>Sign in</button>
                    </form>
                </div>
                <div className="col"></div>
            </div>
        </div>
    )
}