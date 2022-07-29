import React, {useContext} from "react";
import Header from "./header";
import {MAIN_REQUEST_SERFER} from "../../index";
import sendPequest from "../../index";

import {Link, Routes, Route, NavLink} from "react-router-dom";
import PictureMecsin from "../subComponents/PictureMecsin";

import {HeaderHead} from "../layout/layout";


function Item_subMenu(props) {
    let {head,setHead} = useContext(HeaderHead)
    let headActive=({isActive})=>{
        let CLASS =  "sub-menu_section sub-text"
        if (isActive){
            setHead(props.text)
            return CLASS+" blou-text"
        }
        return CLASS
    }

    return <NavLink to = {props.link}  className={headActive}>{props.text}</NavLink>
}

class Sub_menu_element extends React.Component {
    /*
    props includes {linkImg:    link from img,
                    linkImgWebp: link webp,
                    altText:    alternative text on img,
                    text:       text under img
                }
     */
    render() {
        let imgs = this.props.imgs
        return <div className="sub-menu_element">
            <PictureMecsin class_img={'sub-menu_img'} linkImg={imgs[0].linkImg} linkImgWebp={imgs[0].linkImgWebp}
                           alt={imgs[0].name}/>
            <p className="sub-text">{this.props.text}</p>
        </div>
    }
}

class SubMenu extends React.Component {
    constructor(props) {
        super(props);
        //this.changeMainSection = this.changeMainSection.bind(this)
        this.state = {

menu_list:[],
menu_right: []

           /*
       menu_list: [{nember: 1, text: 'О компании',link: '/'},
           {nember: 2, text: 'Производители',link: '/manufactores'},
           {nember: 3, text: 'Доставка',link: '/delivery'},
           {nember: 4, text: 'Оплата',link: '/payment'},
           {nember: 5, text: 'Новости',link: '/news'},
           {nember: 6, text: 'Реквизиты',link: '/requisites'},
           {nember: 7, text: 'Контакты',link: '/Contacts'}],
       menu_right: [
           {nember: 1, img:[{linkImg: polylines, linkImgWebp: polylines_webp, altText: ''}], text: 'Сравнения',link: '/Comparisons'},
           {nember: 2, img:[{linkImg: shopping, linkImgWebp: shopping_webp, altText: ''}], text: 'Корзина',link:'/Basket'},
           {nember: 3,img:[{ linkImg: doctor, linkImgWebp: doctor_webp, altText: ''}], text: 'Личный кабинет',link:'/Personal-Area'}]
           */
    }
    }

    componentDidMount() {
        sendPequest(MAIN_REQUEST_SERFER + "/shopModul/","POST").then((result=[])=>{
            let row_menu_list = []
            let row_menu_right = []
            result.sort((a, b) => a.nember - b.nember).forEach((v,i)=>{
                if(v.side == "L"){
                    row_menu_list.push(v)

                }else {
                    row_menu_right.push(v)
                }

            })
            this.setState({menu_list: row_menu_list,menu_right:row_menu_right})

        })
    }

   // changeMainSection(e) {
    //    console.log(e.target.nember)
    //    e.preventDefault();
   // }

    render() {

        let part_one = this.state.menu_list.splice(0,Math.round(this.state.menu_list.length / 2)).map((v, i) => {
            return <Item_subMenu link={v.link} key={v.nember} text={v.text}/>})
        let part_two = this.state.menu_list.map((v, i) => {
            return <Item_subMenu link={v.link} key={v.nember} text={v.text}/>})

        if(this.props.location ==='footer'){
            part_one = <div className={'footer_menu-selection'}>{part_one}</div>
            part_two  = <div className={'footer_menu-selection'}><Item_subMenu link={'/catalog'} text={'каталог'}/>{part_two}</div>
        }

        let menu_right =  this.state.menu_right.map((v, i) => {
            return <Sub_menu_element key={v.nember}  imgs = {v.img}
                                     text={v.text}/>})
        let menu_list = <>
                        {[part_one ,part_two]}
                        </>;

        return  <>
            <div className={"sub-menu"}>
                <div className="sub-menu_left">
                    <nav className="sub-menu_list">
                        {menu_list}
                    </nav>
                </div>
                {this.props.location !='footer' && <div className="sub-menu_right">
                    { menu_right}
                </div>}
            </div>

        </>


    }
}

export default SubMenu