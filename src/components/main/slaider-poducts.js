import {Swiper, SwiperSlide} from 'swiper/react';
import React, {useCallback, useEffect, useRef, useState} from 'react';

import {SlideNavicationButton} from "./main_slaider";
import sendPequest, {MAIN_REQUEST_SERFER} from "../../index";
import Product_item from "../subComponents/Product_item";

//let test_data = {"name":"Автматичекий дефибрелятор PRIMEDIC HEARTSAVE PAD","act":234,"price":177500.0,"currency":"₽","feedbacks":[{"score":5},{"score":3}],"img":[{"name":"дефибрилляторы","linkImg":"/media/shopModul/static/shop/img/2022/07/09/%D0%B1%D0%B0%D0%BD%D0%BD%D0%B5%D1%80_%D0%B4%D0%B8%D1%84%D1%8B_1.png","linkImgWepb":"/media/shopModul/static/shop/img/2022/07/09/%D0%B1%D0%B0%D0%BD%D0%BD%D0%B5%D1%80_%D0%B4%D0%B8%D1%84%D1%8B_1.webp"}],"avgScore":4.0},{"name":"Импланты","act":46,"price":1212.0,"currency":"₽","feedbacks":[{"score":4}],"img":[{"name":"ИМПЛАНТЫ","linkImg":"/media/shopModul/static/shop/img/2022/07/11/%D0%B8%D0%BC%D0%BF%D0%BB%D0%B0%D0%BD%D1%82%D1%8B_1.png","linkImgWepb":"/media/shopModul/static/shop/img/2022/07/11/%D0%B8%D0%BC%D0%BF%D0%BB%D0%B0%D0%BD%D1%82%D1%8B_1.webp"}],"avgScore":4.0}
export default function SlaiderPoducts(props){
    const [cardItems,setCardItems]  = useState([])
    const [statusGetData,setStatusGetData] = useState(false)
    const [ratioWindows,setRatioWindows] = useState(Math.min(Math.round(window.screen.width/300),4))
    const swiperRef = useRef(null);
    const prevSlide = useCallback(() => {
        swiperRef.current?.swiper.slidePrev();
    }, [swiperRef]);

    const nextSlide = useCallback(() => {
        swiperRef.current?.swiper.slideNext();
    }, [swiperRef]);

    useEffect(()=>{
        if(!statusGetData)
        sendPequest(MAIN_REQUEST_SERFER+'/new-price/',"POST").then(result=>{
            setCardItems(result)
            setStatusGetData(!statusGetData)
        })
    })
    return<>

            <div className={'slaider-container'}>
                <SlideNavicationButton onClick={nextSlide} class={'slaider_navication slaider_navication__next'} direction={'pre'}/>
                <SlideNavicationButton onClick={prevSlide} class={'slaider_navication slaider_navication__last'} direction={'last'}/>
                <Swiper modules = {Navigator} loop={true}
                        spaceBetween = {12}
                        slidesPerView= {ratioWindows}
                        ref = {swiperRef}>
                    { cardItems.map((v)=>{
                        return <SwiperSlide>
                            <Product_item data = {v} />
                        </SwiperSlide>}) }
                </Swiper>
            </div>
           </>
}