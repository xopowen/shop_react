import React  from "react";

import basket from '../../img/icons/shopping-cart.svg'
import compare from '../../img/icons/compare.svg'
import profile from '../../img/icons/doctor.svg'
import {Link, NavLink} from "react-router-dom";
import BasketSumAmt from "../main/basket/BasketSumAmt";
import CompareSumAmt from "../main/compare/CompareSumAmt";


function ItemSubMenu({link,text}) {
    /*
     активная ссылка будит отображаться иначе
    * */
    let headActive=({isActive, isPending })=>{
        let CLASS =  "sub-menu__item sub-text "
        if (isActive){

            return CLASS+" sub-menu__item_active"
        }
        return CLASS
    }

    return <NavLink to = {link}
                           head={text}
                           className={headActive}>
        {text}
    </NavLink>
}

export default function SubMenu(props){
    /*
    Отбракует под меню.
    Все данные статичны
    * */


    let menu_list = [{number: 1, text: 'О компании',link: '/about-company'},
       {number: 2, text: 'Производители',link: '/manufactures'},
       {number: 3, text: 'Доставка',link: '/delivery'},
       {number: 4, text: 'Оплата',link: '/payment'},
       {number: 5, text: 'Новости',link: '/news'},
       {number: 6, text: 'Реквизиты',link: '/requisites'},
       {number: 7, text: 'Контакты',link: '/contacts'}]

    let menu_right = [{number: 1, img:compare, text: 'Сравнения',link: '/comparisons'},
       {number: 2, img:basket, text: 'Корзина',link:'/basket'},
       {number: 3,img:profile, text: 'Личный кабинет',link:'/personal-area'}]



        return  <>
            <nav className="sub-menu ">
                <ul className="sub-menu__list sub-menu__left">
                    {menu_list.length>0 && menu_list.map(value => {
                        return <li key={value.number}>
                            <ItemSubMenu  link={value.link} text={value.text}/>
                        </li>
                    })}
                </ul>
                <ul className="sub-menu__right">

                { menu_right.length > 0 && menu_right.map(value => {
                    let nembeOverImg = undefined;
                    if(value.link === '/basket'){
                        nembeOverImg = <BasketSumAmt/>
                    }
                    if(value.link === '/comparisons'){

                        nembeOverImg = <CompareSumAmt/>
                    }
                    return  <li key={value.number}>

                        <Link to={value.link} className="sub-menu__element">
                            {nembeOverImg}
                            <img loading={'lazy'} src={value.img} className="sub-menu__img"/>
                            <p className="sub-text">{value.text}</p>
                        </Link>
                    </li>
                }) }

                </ul>
            </nav>
        </>



}
