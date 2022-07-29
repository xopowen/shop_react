import star from "../../img/Star.png";
import starWebp from "../../img/wemb/Star.webp";
import React from "react";
import PictureMecsin from "./PictureMecsin";


export default function Product_item(props){
    /*must include
    props.data {
        scare:int,
        img:class,
        act:sting,
        name:sting,
        price:int,
            currency:{₽ or $ or евро}
    }
     */
    return   <div className="card-product blue-vision">
        <div className="card-product_img">
            <div className="score card-product_score">
                {Array(Math.round(props.data.avgScore/2)).fill(0).map((value)=>{
                    return <PictureMecsin key={value} id={''} class_img={'rubber-img'} linkImg={star} linkImgWebp={starWebp}/>
                })}
            </div>
            {props.data.img[0] && <PictureMecsin id={''} class_img={'rubber-img'} linkImg={props.data.img[0].linkImg} linkImgWebp={props.data.img[0].linkImgWebp}/>}
        </div>
        <div className="card-product_content">
            <div className="card-product_header">
                {props.data.act &&  <p className="card-product_act blou-text act-text">арт. 97530</p>}
                <h3 className="card-product_head head head__card sub-text">{props.data.name}</h3>
            </div>
            <div className="card-product_body">
                <div className="card-product_price price-text">
                    <p className="card-product_cost">{props.data.price}</p>
                    <small className="card-product_currency">{props.data.currency }</small>
                </div>
            </div>
            <div className="card-product_fooder">
                <button className="blou-button card-product_button">в корзину</button>
                <button className="white-button card-product_button">купить</button>
            </div>
        </div>
    </div>
}
