import React, {useMemo, useState} from "react";
import {Link,Outlet} from "react-router-dom";
import Header from "../header/header";
import Footer from "../footer/footer";
import SubMenu from "../header/subMenu";

export const HeaderHead = React.createContext(
    /*
    * испоьзуется в -> submenu(setHead),PopupMenu(sethead),sections(head),catalog_rpoducts(head)
    * */
    {head:"",setHead:()=>{}});

export function Layout(){
    let {head,setHead} = useState('')
    const value = useMemo(
        () => ({ head, setHead }),
        [head]
    );
    return <HeaderHead.Provider value={value}>
                <Header/>
                <SubMenu/>
                <Outlet/>
                <Footer/>
            </HeaderHead.Provider>
}