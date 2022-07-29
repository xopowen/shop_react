import PictureMecsin from "./PictureMecsin";
import star from "../../img/Star.png";
import starWebp from "../../img/wemb/Star.webp";
import React from "react";
import {Link, useLocation} from "react-router-dom";

export default function Card_info(props){
    const location = useLocation()
    let link;
    if(location.pathname ==='/manufactores'){
        link = <Link to={`/catalog/${props.data.id}`} className="card-info_linkInFull ">перейти в каталог ></Link>
    }else{
        link = <Link to={`/news/${props.data.id}`} className="card-info_linkInFull ">читать дальше ></Link>
    }
    return <div className="news_card card-info">
        <div className="card-info_img">
            {<PictureMecsin id={''}
                            class_img={'rubber-img'}
                            linkImg={props.data.img.linkImg}
                            linkImgWebp={props.data.img.linkImgWebp}/>}
        </div>
        <div className="card-info_header">
            {props.data.date && <p className="card-info_data sub-text__min blou-text">{props.data.date}</p>}
            {props.data.avgScore && <div className="card-info_score score">
                {Array(Math.round(props.data.avgScore/2)).fill(0).map((value)=>{
                    return <PictureMecsin key={value} id={''} class_img={'rubber-img'} linkImg={star} linkImgWebp={starWebp}/>
                })}
            </div>}
        </div>
        <div className="card-info_body">
            <h3 className="sub-text">{props.data.header || props.data.name}</h3>
            {props.data.discription && <p className={'sub-text'}>{props.data.discription}</p>}
        </div>
        <div className="card-info_fooder blou-text">
            {link}
            <p className="card-info_author sub-text__min red-text">{props.data.author}</p>
        </div>
    </div>
}