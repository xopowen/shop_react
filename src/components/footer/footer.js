import React from "react";
import {header_order_call } from "../header/header";
import logo from "../../img/logo.png";
import logo_wemb from "../../img/wemb/logo.webp";
import SubMenu from "../header/subMenu";
import PictureMecsin from "../subComponents/PictureMecsin";
import Network from "../subComponents/Network";
import {Link} from "react-router-dom";


export default function Footer(props){
//<SubMenu location = {'footer'}/>
    return <footer className={'sub-text'}>
            <div className="container footer">
                <div className="footer_left">
                    <div className="footer_feedback">
                        <Link to={'/'}>
                            <PictureMecsin class_img = {"header_img rubber-img"} linkImg = {logo} linkImgWebp = {logo_wemb}/>
                        </Link>
                        <Network/>
                    </div>
                 <><SubMenu location = {'footer'}/></>
                </div>
                {window.screen.width>720 &&
                <div className="footer_right">
                    <div className="footer_info info">
                        <div className="info_header">
                            {header_order_call}
                        </div>
                        <div className="info_body">
                            Россия, Удмуртская Республика
                            426011, г. Ижевск, ул. Пушкинская 290
                            тел. 8 (3412) 65-08-77
                        </div>
                    </div>
                    <div className="footer_Privacy-Policy footer_info info">
                        <div className="info_header">
                            Политика конфиденциальности
                        </div>
                        <div className="info_body">
                            ООО «Boksmed» © 2015 - 2022.
                            Сайт носит информационный характер и не является публичной офертой.
                        </div>
                    </div>
                </div>}
            </div>
        </footer>
}
