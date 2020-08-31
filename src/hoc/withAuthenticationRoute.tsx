import React from "react"
import {useSelector} from "react-redux";
import {Redirect, Route} from "react-router-dom";
import {RootState} from "../redux/redux-store";

type PropsType = {
    path: string
    component: React.FC
    exact?: boolean
}

export const WithAuthenticationRoute: React.FC<PropsType> = ({component: Component , path, exact, ...rest}) => {
    const isAuth = useSelector((state: RootState) => state.auth.isAuth);
    return (
        <Route
            path={path}
            exact={exact}
            render={() =>
                isAuth ? <Component { ...rest } /> : <Redirect to={'/login'}/>
            }
        />
    )
}

