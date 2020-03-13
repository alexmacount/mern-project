import React from "react"
import {TablePage} from "./pages/TablePage"
import {Switch, Route, Redirect} from 'react-router-dom'
import {NotesPage} from "./pages/NotesPage";
import {AuthPage} from "./pages/AuthPage";

export const useRoutes = isAuthenticated =>{
    if (isAuthenticated) {
        return(
            <Switch>
                <Route path="/notes" exact>
                 <NotesPage />
                </Route>
                <Route path="/table" exact>
                 <TablePage />
                </Route>
                <Redirect to="/table"/>
            </Switch>
        )
    }

    return (
        <Switch>
            <Route path="/" exact>
                <AuthPage />
            </Route>
            <Redirect to="/"/>
        </Switch>
    )
}