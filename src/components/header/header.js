import React from "react";

import logo from './../../img/logo.png';
import logo_wemb  from './../../img/wemb/logo.webp';
import menu  from './../../img/menu 1.png';
import menu_wemb  from './../../img/wemb/menu 1.webp';
import loupe  from './../../img/loupe 1.png';
import loupe_wemb  from './../../img/wemb/loupe 1.webp';


import SubMenu from "./subMenu";
import Network from "../subComponents/Network";
import PictureMecsin from "../subComponents/PictureMecsin";
import PopupMenus from "../subComponents/PopupMenus";
import {Link} from "react-router-dom";

export const header_order_call =  <div className="header_order-call  method-bond_call">
                                <p><Link to={'call-back/'} className="blou-text">✆ Заказать обратный звонок</Link></p>
                            </div>
const phone_nomer =   <p className="phone-nomer">8 (3412) 65-08-77</p>


class Header extends React.Component{
    constructor(props) {
        super(props);
        this.state = {showPopupMenu:false}
    }

    showPopupMenu = (e)=>{
        this.setState({showPopupMenu:!this.state.showPopupMenu})

}


    render() {

        let screen = window.screen.width > 760

        return  <header>
                <div  className={ 'header'}>
                    <Link to={'/'}>
                        <PictureMecsin class_img = {"header_img rubber-img"} linkImg = {logo} linkImgWebp = {logo_wemb}/>
                    </Link>
                    <div className="header_catalog" onClick={this.showPopupMenu}>
                        <PictureMecsin class_img = {"rubber-img"} linkImg = {menu} linkImgWebp = {menu_wemb}/>
                        <p className="upper-text" >каталог</p>
                    </div>
                    <form className="header_quest" action="" method="post">
                        <button type="submit">
                            <PictureMecsin class_img = {"rubber-img"} linkImg = {loupe} linkImgWebp = {loupe_wemb}/>
                        </button>
                        <input name="s" placeholder="Поиск медицинского оборудования" type="search"/>
                    </form>
                    { screen && [header_order_call,phone_nomer,<Network/>]}
                    {this.state.showPopupMenu && <PopupMenus/>}
                </div>


                </header>

    }
}

export default Header;












