// import Swiper core and required modules
import {Navigation} from 'swiper';
import {useEffect, useState} from "react";
// Direct React component imports\
import {Swiper, SwiperSlide} from 'swiper/react';
import {useSwiper} from 'swiper/react';
// Styles must use direct files imports
import 'swiper/css';
import 'swiper/css/navigation';
//img
import slidePrev from './../../img/pre.png'
import slidePrevWemb from './../../img/wemb/pre.webp'
import slideNext from './../../img/next.png'
import slideNextWemb from './../../img/wemb/next.webp'

import sendPequest, {MAIN_REQUEST_SERFER} from "../../index";

import PictureMecsin from "../subComponents/PictureMecsin";
import {Catalog_item} from "../subComponents/Catalog_item";

export function SlideNavicationButton(props) {
    //direction:str -  next or pre
    const swiper = useSwiper();
    let pictur;
    if (props.direction == 'last') {
        pictur = <PictureMecsin id={''} class_img={'rubber-img'} linkImg={slideNext} linkImgWebp={slideNextWemb}/>
    } else {
        pictur = <PictureMecsin id={''} class_img={'rubber-img'} linkImg={slidePrev} linkImgWebp={slidePrevWemb}/>
    }
    function move(){
        if(props.onClick){
            return props.onClick
        }
        return () => props.direction == 'last' ? swiper.slideNext() : swiper.slidePrev()
    }
    return (
        <div className={props.class}
             onClick={move()}> {pictur} </div>
    );
}


function Main_slaider() {
    const [slaidItem, setslaidItem] = useState([])
    useEffect(() => {
        if (slaidItem.length == 0) {
            sendPequest(MAIN_REQUEST_SERFER + "/main-slaider/", "POST")
                .then((row_result = []) => {

                    let result = row_result.sort((a, b) => a.order | 0 - b.order | 0)
                    setslaidItem(result)
                })
        }
    })
    let slaider_items = slaidItem.map((v, i) => {
        return <SwiperSlide key={i}>
            <Catalog_item data={v} class={'big'}>
                <SlideNavicationButton direction={'next'}
                                       class={'slaider_navication '}/>
                <SlideNavicationButton direction={'last'}
                                       class={"slaider_navication "}/>
            </Catalog_item>
        </SwiperSlide>
    })
    return <div className={'container main-slaider'}>
        <Swiper modules={Navigation} loop={true}>
            {slaider_items}
        </Swiper>
    </div>
}

export default Main_slaider;