import {Swiper, SwiperSlide} from 'swiper/react';

import React, { useEffect, useMemo, useRef, useState} from 'react';

import SlideNavicationButton from "../../subComponents/SlideNavicationButton";
import ajaxFetch from "../../helpFunction/ajaxFetch";
import ProductCard from "./ProductCard";
import {Navigation} from "swiper";


export default function SliderProducts(props){
    /*
       Отобразить слайдер новых товаров.
       url:'/new-products/',
       в зависимости от размеров экрана слайд будит отображать от 1 до 4 карточек одновременно.
    */
    const [cardItems,setCardItems]  = useState([])

    const ratioWindows  = useMemo(()=>{
        return Math.min(Math.round(window.screen.width/300),4)},
        [window.screen.width])
    const swiperRef = useRef();


    useEffect(()=>{
        ajaxFetch({
            url:'/new-products/',
            method:"GET"
        }).then(response=>{
            let [ok,error]= response
            if (ok){
                ok.then(res=>setCardItems(res))
            }
        })
    },[])

    return <section className="sections ">
        <h2 className="sections__head">
            Новинки
        </h2>
        <div className="sections__body swiper slider product-slider">

            <Swiper
                loop={true}
                spaceBetween = {10}
                slidesPerView= {ratioWindows}
                ref = {swiperRef}
                modules={Navigation}

                className={" slider__container swiper-wrapper"}
                >
                { cardItems.length > 0 &&  cardItems.map((v)=>{

                    return <SwiperSlide key={v.id}>
                        <ProductCard  data = {v} key={v.id}/>
                    </SwiperSlide>}) }


            </Swiper>
            <SlideNavicationButton swiperItem={swiperRef?.current?.swiper} direction={'pre'}/>
            <SlideNavicationButton swiperItem={swiperRef?.current?.swiper} direction={'last'}/>




        </div>

    </section>
}