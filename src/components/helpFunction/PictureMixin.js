import React, {  useState} from "react";
import {CLASS_IMG} from "../constants";



export default function PictureMixin({img,...props}){
    /*
    * добавляет source с webp если ссылка на такой элемент ест и она рабочая.
    * важно чтобы файл с расширением webp имел имя тоже что и передаваемый img.
    * иначе оставляет просто img
    * */

    props['className']= props['className'] || CLASS_IMG
    let [load,setLoad] = useState(0)
    let [error,setError] = useState(0)
    let webp = img ? img.split('.'):['png']
    webp.length--;
    webp.push('webp')

    let isExistHidden =  load === 0  &&  error === 0


    return<picture {...props}>
        {/*{ isExistHidden && <img src={webp.join('.')} onLoad={()=>setLoad(load+1)} onError={()=>setError(error+1)} hidden={true} alt=""/>}*/}
        {/*{load === 1 &&  <source  srcSet = {webp.join('.')} type = "image/webp"/>}*/}
        <img src = {  img   } alt = {props?.alt ?props?.alt: ''} />
    < /picture>
}

