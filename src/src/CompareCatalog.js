import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import ajaxFetch from "../components/helpFunction/ajaxFetch";

import {Swiper} from "swiper/react";
import {SwiperSlide} from "swiper/react";
import {useMemo} from "react";
import {observer} from "mobx-react-lite";
import stateCompare from "../components/mbox/CompareProducts";
import CompareProductCard from "../components/main/compare/CompareProductCard";


/**
 * 
 * @return {React.FunctionComponent<object>}
 * @description  Страница сравнения товаров по свойствам зависящих от их каталога.
 * @dependents stateCompare
 * @see stateCompare
 * @description получает список товаров для сравнения с сервера.
 * @url - `/comparisons/${catalogName}/`
 * @description catalogName get from useParams.
 */
let  CompareCatalog = observer(()=>{

    let {catalogName} = useParams()

    /** @type {Object}
     * @example
     * {"catalog":
     *      {"id":3,
     *      "name":"Дефибреляторы",
     *      "img":"",
     *      "order":1,
     *      "property":[
     *          {"id":6,
     *          "name":"способ работы",
     *          "show_popup":true,
     *          "show_filter":true,
     *          "selected":false,
     *          "catalog":3}]},
     *      "products":[
     *          {"id":4,
     *          "img":[{"link":""}],
     *          "feedback":[
     *              {"id":1,
     *              "client":{
     *                  "id":1,
     *                  "username":"xopowen-admin",
     *                  "first_name":"Паша1",
     *                  "last_name":"Иванов",
     *                  "email":"xopowen@mail.com"},
     *               "object_id":4,
     *               "score":3,
     *               "comment":"",
     *               "date":"2023-09-09T10:47:09.462780Z",
     *               "content_type":11}],
     *      "name":" ДКИ-Н-11",
     *      "description":null,
     *      "act":97530,
     *      "amt":0,
     *      "price":14000.0,
     *      "old_price":15000.0,
     *      "currency":"₽",
     *      "technical_feature":"",
     *      "article":"000 000",
     *      "YTP":null,
     *      "date":"2023-09-09T08:42:35.563386Z",
     *      "visibility":false,
     *      "manufacturer":3,
     *      "catalog":3,
     *      "avg_score":3,
     *      "property":[
     *          {"id":3,
     *           "value":{
     *              "id":1,
     *              "value":"test",
     *              "show_menu":true,
     *              "show_popup":true,
     *              "show_filter":true,
     *              "selected":true,
     *              "property":6},
     *           "property":
     *              {"id":6,
     *              "name":"способ работы",
     *              "show_popup":true,
     *              "show_filter":true,
     *              "selected":false,
     *              "catalog":3},
     *         "product":4},
     *         {"id":4,
     *         "value":{
     *              "id":3,
     *              "value":"дом",
     *              "show_menu":false,
     *              "show_popup":false,
     *              "show_filter":true,
     *              "selected":false,
     *              "property":7},
     *          "property":{
     *              "id":7,
     *              "name":"Назначение",
     *              "show_popup":false,
     *              "show_filter":false,
     *              "selected":false,
     *              "catalog":null},
     *          "product":4
     *              }
     *           ]
     *         }
     *     ]
     * }
     * */
    let [catalogActive,setActiveCatalog] = useState()
    const ratioWindows  = useMemo(()=>{
            return Math.min(Math.round(window.screen.width/300),4)},
        [])
    let products = stateCompare.products
    
    
    useEffect(()=>{
        ajaxFetch({
            url:`/comparisons/${catalogName}/`,
            method:'GET',
        }).then(response=>{
            let [ok,]=response
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