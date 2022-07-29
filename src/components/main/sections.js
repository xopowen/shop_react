import React, {useContext, useState} from "react";
import {useLocation} from "react-router-dom";
import {HeaderHead} from "../layout/layout";




export default function Sections(props){
    let location = useLocation()
    let {head,setHead} = useContext(HeaderHead)
    /*
    * standart conteiner
    * accepts props =>{head - заголовок ,addlClass-дополнитеьный класс}
    * */
    let addlClass = props.addlClass?props.addlClass:''
    let header =()=>{
        if(location.pathname==="/"){
            <h3 className={'sections_head head_big__sections head_big blou-text'}>{props.head}</h3>
        }else{
            <h3 className={'sections_head head_big__sections head_big blou-text'}>{head}</h3>
        }

    }

    return <div className={"sections container " + addlClass }>
                {header()}
                {props.children}
            </div>

}