import { Outlet } from "react-router-dom";
import React from "react";
export default function Layout(){
    return (
        <>
            <h2>layout</h2>
            <Outlet />
        </>
    )
}