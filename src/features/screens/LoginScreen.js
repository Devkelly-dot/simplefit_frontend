import React, { useState, useEffect } from 'react';
import LoginComponent from '../../authentification/components/LoginComponent';
import RegisterComponent from '../../authentification/components/RegisterComponent';
import AccountlessComponent from '../../authentification/components/AccountlessComponent';

export default function LoginScreen(props) {
    const [screenType,setScreenType] = useState('login')
    const [screenComponent,setComponent] = useState(null)
    const components = {
        "login":<LoginComponent  attemptLogin = {attemptLogin}/>,
        "register":<RegisterComponent attemptRegistration={attemptRegistration}/>,
        "accountless":<AccountlessComponent setUserAccountless={setUserAccountless}/>
    }

    useEffect(() => {
        setScreenType('login')
        setComponent(<LoginComponent attemptLogin = {attemptLogin}/>)
      },[]);

    function attemptLogin(username,password)
    {
        props.attemptLogin(username,password)
    }
    
    function attemptRegistration(email,username,password)
    {
        props.attemptRegistration(email,username,password)
    }

    function setUserAccountless(flag)
    {
        props.setUserAccountless(flag)
    }
    const styles = {
        Tab: type=>({
            "border":"0.1rem solid #d9d9d9",
            "borderTopLeftRadius":"10px",
            "borderTopRightRadius":"10px",
            "cursor":"pointer",
            "borderColor":type===screenType?("red"):("black"),
        }),
    }

    function switchTabs(type)
    {
        setScreenType(type)
        setComponent(components[type])
    }

    return(
        <div className="row" id="loginScreenHolder">
            <div className="row" id="loginRegistrationTabRow">
                <div style = {styles.Tab('login')} className="col-6" onClick={()=>switchTabs('login')}>Login</div>
                <div style = {styles.Tab('register')} className="col-6" onClick={()=>switchTabs('register')}>Register</div>
                {/* <div style = {styles.Tab('accountless')} className="col-4" onClick={()=>switchTabs('accountless')}>Accountless</div> */}
            </div>
            <div className="row" id="loginComponentHolder">          
                <div className="col-12" id="loginScreenHolder">
                    {screenComponent!==null?(
                        screenComponent
                    ):(
                        <div>Loading Screen</div>
                    )}
                </div>
            </div>
        </div>
    )

}

