import React from "react";

export default function PictureMecsin(props){
    /*
    * props or  props._data => {linkImg : link img,
    * linkImgWebp : link img.webp,
    * class_img: class(null='rubber-img')}
     */
    const _data = props?._data||props

    return<picture className ={props._data?.class_img||props?.class_img||"rubber-img"} >
        < source  srcSet = { _data.linkImgWebp } type = "image/webp" />
        < source  srcSet = { _data.linkImg } type = "image/jpg" />
        < img src = { props.linkImg } alt = "" /> < /picture>
}

