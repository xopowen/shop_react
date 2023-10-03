import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import ajaxFetch from "../components/helpFunction/ajaxFetch";

import {Swiper} from "swiper/react";
import {SwiperSlide} from "swiper/react";
import {useMemo} from "react";
import {observer} from "mobx-react-lite";
import stateCompare from "../components/mbox/CompareProducts";
import CompareProductCard from "../components/main/compare/CompareProductCard";


let  CompareCatalog = observer(props=>{
    /*
    Страница сравнения товаров по свойствам зависящих от их каталога.
    Зависит от stateCompare
* */

    let {catalogName} = useParams()

    let [catalogActive,setActiveCatalog] = useState()
    const ratioWindows  = useMemo(()=>{
            return Math.min(Math.round(window.screen.width/300),4)},
        [window.screen.width])
    let products = stateCompare.products
    useEffect(()=>{
        ajaxFetch({
            url:`/comparisons/${catalogName}/`,
            method:'GET',
        }).then(response=>{
            let [ok,error]=response
            if(ok){
                ok.then(res=>{
                    stateCompare.products = res.products
                    setActiveCatalog(res.catalog)
                })
            }
        })


    },[catalogName])


    return <>
    <section className="sections sections_head-left">
        <div className="sections__header">
            <h2 className="sections__head">
                {catalogName}
            </h2>
        </div>
        <div className="sections__body compare">
            <div className="catalog__catalog-menu catalog-menu">
                <div className="catalog-menu__order-sort">
                    <button className="button-not-background">
                        распечатать
                    </button>
                </div>
            </div>
            <Swiper className={"slider swiper"}
                    slidesPerView= {ratioWindows}
                    spaceBetween = {10}>

                    <div className="catalog__products slider__container swiper-wrapper">
                    <SwiperSlide>
                        <div className="compare__indicators">
                            <h5 className="compare__catalog-name">  {catalogName}</h5>
                            {catalogActive && catalogActive.property.map(value=>{
                                return <p  key={value.id} className="compare__characteristic">
                                    {value.name}
                                </p>
                            })}

                        </div>
                    </SwiperSlide>
                        {products && products.map(value=>{
                            return   <SwiperSlide key={value.id}>
                                <CompareProductCard  data = {value} propertyList = {catalogActive?.property} />
                            </SwiperSlide>

                        })}

                </div>
            </Swiper>
        </div>

    </section>
    </>

})
export default CompareCatalog;