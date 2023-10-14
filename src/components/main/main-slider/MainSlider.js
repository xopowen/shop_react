// import Swiper core and required modules
import {Navigation} from 'swiper';
import {useEffect, useState} from "react";
// Direct React component imports\
import {Swiper, SwiperSlide} from 'swiper/react';
// Styles must use direct files imports
import 'swiper/css';
import 'swiper/css/navigation';

import {Catalog_item} from "./Catalog_item";

import ajaxFetch from "../../helpFunction/ajaxFetch";
import SlideNavicationButton from "../../subComponents/SlideNavicationButton";

/**
 * @description отображает список полученных банеров. взятых с сервера
 * @return {JSX.Element}
 * @constructor
 * @url "/main-slider/",
 */
export default function MainSlider() {

    const [slaidItem, setslaidItem] = useState([])
    useEffect(() => {
         ajaxFetch({
             url:"/main-slider/",
             method:"GET"
         }).then(result => {
             let [ok,] = result
             if(ok){
                 ok.then(slides=> {
                         setslaidItem(slides)
                     })
             }
         })

    },[])

    return <section id="main-slider" className="main-slider swiper ">
        <Swiper   spaceBetween={15} modules={Navigation} loop={true} className="swiper-wrapper">
            {slaidItem.length > 0 &&  slaidItem.map((v) => {
                return <SwiperSlide key={v.id}>
                    <Catalog_item data={v}  >
                        <SlideNavicationButton direction={'next'} />
                        <SlideNavicationButton direction={'last'} />
                    </Catalog_item>
                </SwiperSlide>
            })}
        </Swiper>

    </section>
}


