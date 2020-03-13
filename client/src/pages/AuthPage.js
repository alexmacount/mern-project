import React, {useContext, useEffect, useState} from "react";
import {useHttp} from "../hooks/http.hook";
import {useMessage} from "../hooks/message.hook";
import {AuthContext} from "../context/AuthContext";

export const AuthPage = () =>{
    const auth = useContext(AuthContext)
    const message = useMessage()
    const {loading,request,error,clearError} =useHttp()
    const[form,setForm] = useState({
        username:'',email:'', password:'',registrationDate:new Date()
    })

    useEffect(()=>{
        message(error)
        clearError()
    }, [error,message,clearError])

    useEffect(()=>{
        window.M.updateTextFields()
    },[])

    const changeHandler = event =>{
        setForm({...form, [event.target.name]:event.target.value})
    }

    const registerHandler = async ()=>{
        try {
            const data = await request('/api/auth/register', 'POST', {...form})
            message(data.message)
        }catch (e) {

        }
    }

    const loginHandler = async ()=>{
        try {
            const data = await request('/api/auth/login', 'POST', {...form})
            auth.login(data.token,data.userId)
        }catch (e) {

        }
    }



    return(
        <div className="row">
            <div className="col s6 offset-s3">
                <h1 className="cyan-text text-lighten-2">Note App</h1>
                <div className="card pink lighten-4 ">
                    <div className="card-content white-text">
                     <span className="card-title">Authorization</span>
                         <div>

                             <div className="input-field">
                                 <input
                                     id="username"
                                     type="text"
                                     name="username"
                                     className="white-input"
                                     onChange={changeHandler}
                                 />
                                 <label htmlFor="username">Username</label>
                             </div>

                             <div className="input-field">
                                 <input
                                        id="e-mail"
                                        type="text"
                                        name="email"
                                        className="white-input"
                                        onChange={changeHandler}
                                 />
                                     <label htmlFor="e-mail">E-mail</label>
                             </div>

                             <div className="input-field">
                                 <input
                                     id="password"
                                     type="password"
                                     name="password"
                                     className="white-input"
                                     onChange={changeHandler}
                                 />
                                     <label htmlFor="password">Password</label>
                             </div>

                         </div>
                     </div>
                    <div className="card-action">
                        <button
                            className="btn cyan lighten-2 "
                            style={{marginRight: 10}}
                            onClick={loginHandler}
                            disabled={loading}
                        >
                            Sign in
                        </button>
                        <button
                            className="btn teal accent-3 "
                            onClick={registerHandler}
                            disabled={loading}
                        >
                            Sign up
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}