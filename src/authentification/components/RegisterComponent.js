import React, { useState, useEffect } from 'react';

export default function RegisterComponent(props) {
    const [form,setForm] = useState(
        {
            "email":"",
            "username":"",
            "password":"",
            "repassword":""
        }
    )

    function attemptRegistration(e)
    {
        e.preventDefault()
        if(props.attemptRegistration)
            props.attemptRegistration(form["email"],form["username"],form["password"])
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
        <div id="registerScreenHolder">
            <div className="row" id="registerScreenHeader">
                <div className="col-12">
                    <p>Registration</p>
                </div>
            </div>
            <div className="row" id="registerScreenForm">
                <div className="col"></div>
                <div className="col-12">
                    <form onSubmit={attemptRegistration}>
                        <input type="email" className="form-control" placeholder = "Email" style={styles.FormField} onChange={(e)=>handleFormChange(e,'email')} value={form["email"]}/>
                        <input type="username" className="form-control" placeholder = "Username" style={styles.FormField} onChange={(e)=>handleFormChange(e,'username')} value={form["username"]}/>
                        <input type="password" className="form-control" placeholder = "Password" style={styles.FormField} onChange={(e)=>handleFormChange(e,'password')}/>
                        <input type="password" className="form-control" placeholder = "Re-enter Your Password" style={styles.FormField} onChange={(e)=>handleFormChange(e,'repassword')}/>
                        <button type="submit" className="btn btn-primary btn-block mb-4" style={Object.assign(styles.FormField,{"width":"100%"})}>Sign Up</button>
                    </form>
                </div>
                <div className="col"></div>
            </div>
        </div>
    )
}