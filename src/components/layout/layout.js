import React, {useMemo, useState} from "react";
import {Link,Outlet} from "react-router-dom";
import Header from "../header/Header";
import SubMenu from "../header/SubMenu";
import Footer from "../footer/Footer";




export const HeaderHead = React.createContext(
    /*
    * испоьзуется в -> submenu(setHead),PopupMenu(sethead),sections(head),
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
                <main className={'container'}>
                    <Outlet/>
                </main>

                <Footer/>
            </HeaderHead.Provider>
}