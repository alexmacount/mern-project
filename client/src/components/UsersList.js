import React from "react";

export const UsersList = ({users,setUsers})=>{
    if (!users.length){
        return <p className="center">Users have not exist yet</p>
    }
    return(
        <table>
            <thead  className="pink-text text-lighten-3">
            <tr>
                <th>
                    <label className="pink-text text-lighten-3">
                        <input type="checkbox" className="filled-in"/>
                        <span>Mark all</span>
                    </label>
                </th>
                <th>N%</th>
                <th>Id</th>
                <th>Username</th>
                <th>E-mail</th>
                <th>Registration Date</th>
            </tr>
            </thead>

            <tbody>
            {users.map((user,index) => {
                return(
            <tr key={user._id}>
                <td>
                    <label className="pink-text text-lighten-3">
                        <input
                        //     onChange={event => {
                        //     let checked = event.target.checked
                        //     setUsers(user.map(data=>{
                        //         if (user._id===data._id){
                        //             data.select=checked
                        //         }
                        //         return data
                        //     }))
                        // }}
                            type="checkbox" className="filled-in" /*checked={user.select}*/ />
                        <span></span>
                    </label>
                </td>
                <td className="pink-text text-lighten-3">{index+1}</td>
                <td className="blue-grey-text ">{user._id}</td>
                <td className="blue-grey-text ">{user.username}</td>
                <td className="blue-grey-text ">{user.email}</td>
                <td className="blue-grey-text ">{user.registrationDate}</td>
            </tr>
            )
            }) }
            </tbody>
        </table>
    )
}










