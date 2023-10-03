import React, {useEffect, useState} from "react";

import Network from "../subComponents/Network";
import PictureMixin from "../helpFunction/PictureMixin";

import {Link} from "react-router-dom";
import BurgerMenu from "./Burger-menu";
import Search from "./Search";
import SubMenu from "./SubMenu";
import ajaxFetch from "../helpFunction/ajaxFetch";

import logo from "../../img/icons/logo.svg";
import menu  from './../../img/menu 1.png';
import phone from  "./../../img/icons/phone.svg"


export default function Header(props){
    /* отображает верхнюю часть header
      запрашивает заголовок csrf-token нужный для форм*/
    let [showPopupMenu,setShow] = useState(false)

    useEffect(()=>{
        ajaxFetch({
            url:'/csrf-token/',
            method:'HEAD'
        })
    },[])

    function haveShowBurgerMenu(value=false){
        setShow(value)
    }


    return<header  className="header ">
        <section className="header__top">
            <Link to={'/'}>
                <img src={logo}  className="header__img" alt="logo"/>
            </Link>
            <div className='header__catalog'>
                <button className="button-not-background " >
                    <PictureMixin img = {menu} onClick={e =>haveShowBurgerMenu(!showPopupMenu) } />
                </button>
                <Link to={'catalogs/'} className="upper-text blow-text" >каталог</Link>
            </div>

            <Search/>

            <address className="address">
                <p className="blow-text order-call header__order-call  ">
                    <Link to={"/request-call-back-page"} title="Заказать обратный звонок">
                        <img src={phone} alt={'phone'} />Заказать обратный звонок</Link>
                </p>
                <p className="phone-number">8 (3412) 65-08-77</p>
            </address>
            <Network className = {'header__network network'}/>

        </section>

        {showPopupMenu && <BurgerMenu haveShow = {haveShowBurgerMenu}/>}
        <SubMenu/>
    </header>







}












