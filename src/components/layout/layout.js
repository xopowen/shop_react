import React from "react";
import { Outlet} from "react-router-dom";
import Header from "../header/Header";

import Footer from "../footer/Footer";

export function Layout(){

    return <>
        <Header/>
        <main className={'container'}>
            <Outlet/>
        </main>
        <Footer/>
    </>


}