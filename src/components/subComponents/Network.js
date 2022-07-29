import React from "react";
import viber from "../../img/viber .png";
import viber_wemb from "../../img/wemb/viber .webp";
import telegram from "../../img/telegram .png";
import telegram_wemb from "../../img/wemb/telegram .webp";
import whatsapp from "../../img/whatsapp .png";
import whatsapp_wemb from "../../img/wemb/whatsapp .webp";
import PictureMecsin from "../subComponents/PictureMecsin";


export default function Network (){
     return   <div className="header_network network">
        <PictureMecsin id={'viber'} class_img = {"rubber-img"} linkImg = {viber} linkImgWebp = {viber_wemb}/>
        <PictureMecsin  id={'telegram'} class_img = {"rubber-img"} linkImg = {telegram} linkImgWebp = {telegram_wemb}/>
        <PictureMecsin id={'whatsapp'} class_img = {"rubber-img"} linkImg = {whatsapp} linkImgWebp = {whatsapp_wemb}/>
    </div>;
}


