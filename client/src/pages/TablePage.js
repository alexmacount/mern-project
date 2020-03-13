import React, {useCallback, useContext, useEffect, useState} from "react";
import {useHttp} from "../hooks/http.hook";
import {AuthContext} from "../context/AuthContext";
import {UsersList} from "../components/UsersList";
import {Loader} from "../components/Loader";



export const TablePage = () =>{
    const [users, setUsers] = useState([])
    const {loading, request} = useHttp()
    const {token}= useContext(AuthContext)

    const fetchUsers = useCallback(async ()=>{
            try {
                const fetched = await request('/api/table','GET', null,{
                    Authorization: `Bearer ${token}`
                })
            setUsers(fetched)
            }catch (e) {}
        },[token,request])

    useEffect(()=>{
        fetchUsers()
    },[fetchUsers])

    if (loading) {
        return <Loader/>
    }

    return(
        <>
            {!loading && <UsersList users={users}/>}
        </>
    )
}











