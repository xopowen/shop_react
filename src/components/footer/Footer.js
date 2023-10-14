import React   from "react";

import Network from "../subComponents/Network";
import {Link} from "react-router-dom";
import SubMenu from "../header/SubMenu";
import phone from "../../img/icons/phone.svg";
import phone_big from '../../img/icons/phone_big.svg'
import arrow_big from '../../img/icons/arrow-big.svg'
import logo from "../../img/icons/logo.svg";

/**
 *
 * @return {JSX.Element}
 * @description  отображает информацию подвала сайта. Нет state
 */
export default function Footer(){


    function haveScrollDoUp(e){
        // плавный подъём в начало страницы
        window.scroll({
            top: 0,
            left: 0,
            behavior:'smooth'
        })
        e.preventDefault()
    }

    return <footer className="footer">
        <div className="footer__left">
            <div className="footer__imgs">
                <Link to={'/'}>
                    <img id={'logo'} className = {"header_img rubber-img "}
                                  src = {logo} alt={'logo'}/>
                </Link>
                <Network/>
            </div>

            <SubMenu location = {'footer'}/>

        </div>

        <div className="footer__right">
                <article className="footer__info info">
                    <div className="info__header">
                        <Link to={"/request-call-back-page"}
                              className="order-call"
                              title="Заказать обратный звонок">
                            <img src={phone} alt={''}/>Заказать обратный звонок
                        </Link>
                    </div>

                    <address className="info__body">
                        Россия, Республика
                        00000, г. Город, ул. Улица 000
                        тел. 8 (000) 00-00-00
                    </address>
                </article>
                <article className="footer__info info">
                    <p className="info__header">
                        Политика конфиденциальности
                    </p>
                    <p className="info__body">

                        Сайт учебный и непредоставлен никаких услуг.
                    </p>
                </article>
            </div>

        <div className="footer__button-blow">
            <Link to={'/request-call-back-page'} className="button-blow-big">
                <img src={phone_big} alt="phone"/>
            </Link>
            <button onClick={haveScrollDoUp} className="button-blow-big">
                <img src={arrow_big} alt="phone"/>
            </button>
        </div>
    </footer>
}
