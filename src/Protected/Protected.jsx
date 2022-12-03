import { Navigate } from "react-router-dom";
import React from "react";
const Protected = ({ isLoggedIn, link, children }) => {

    if (!isLoggedIn) {

        return <Navigate to={link} replace={true} />

    }
    return children;
};
export default Protected;