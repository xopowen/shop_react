import StarsScore from "../../subComponents/StarsScore";
import PictureMixin from "../../helpFunction/PictureMixin";
import useIntObs from "../../hooks/useIntObs";
//img
import close from '../../../img/icons/close.svg';
import stateCompare from "../../mbox/CompareProducts";
import stateBasket from "../../mbox/BasketState";
import React, {useState} from "react";
import ProductAddedBasket from "../ProductAddedBasket";
import Spinner from "../../Spinner";

/**
 *
 * @param {Object} data
 * @param {Object} propertyList - список свойств который нужно найти в data.property

 * @constructor
 * @description отображает карточку товара в Compare.
 * @example
 * data - {"id":3,
 *       "img":[{"link":""}],
 *       "feedback":[],
 *       "name":"АВТОМАТИЧЕСКИЙ ДЕФИБРИЛЛЯТОР PRIMEDIC HEARTSAVE PAD",
 *       "description":null,
 *       "act":97530,
 *       "amt":0,
 *       "price":15000.0,
 *       "old_price":15000.0,
 *       "currency":"₽",
 *       "technical_feature":""
 *       "article":"000 000",
 *       "YTP":null,
 *       "date":"2023-08-31T13:37:47.048345Z",
 *       "visibility":false,
 *       "manufacturer":2,
 *       "catalog":3,
 *        "avg_score":1,
 *    "property":[
 *       {"id":2,
 *        "value":{
 *                "id":4,
 *                "value":"работа",
 *                "show_menu":false,
 *                "show_popup":false,
 *                "show_filter":true,
 *                "selected":false,
 *                "property":7
 *                 },
 *        "property":{"id":7,
 *                    "name":"Назначение",
 *                    "show_popup":false,
 *                    "show_filter":false,
 *                    "selected":false,
 *                    "catalog":null
 *                    },
 *        "product":3},
 * }
 *
 *  propertyList->{"id":6,
 *             "name":"способ работы",
 *              "show_popup":true,
 *              "show_filter":true,
 *              "selected":false,
 *              "catalog":3

 * }
 * @descriptionесли свойства нет нечего не отображать.
 * @return {JSX.Element}
 * */
export default function CompareProductCard({data,propertyList}){

    let [ref,] = useIntObs({},true)
    let [showOverPageElement,setShow] = useState(false)
    let [loadStats,setLoadStats] = useState(false)

    function delFromCompare(e){
        stateCompare.delFromCompare(data.id)
        e.preventDefault()
    }
    function haveShow(e){
        setLoadStats(true)
        stateBasket.addToBasket(data.id).then((request) => {
            if(request.ok){
                setShow(true)
            }

        }).finally(()=>{
            setLoadStats(false)
        })
    }

    function haveShowOverPageElement(value=false){
        setShow(value)
    }

    return <>
    <article ref={ref} className="card-product swiper-slide">
        <div className="card-product__img appear">
            <div className="score card-product__score">
                <StarsScore score={data.avg_score}/>
            </div>
            <PictureMixin img={data.img.length> 0 ? data.img[0].link : '' }/>
        </div>
        <div className="card-product__content appear">
            <div className="card-product__header">
                <h3 className="card-product__head head head_card">
                    {data?.name}
                </h3>
            </div>
            <div className="card-product__body">
                <p className="card-product__price">
                    <span className="card-product__cost">{data?.price}</span>
                    <span className="card-product__currency">{data?.currency}</span>
                </p>
            </div>
        </div>
        { propertyList && propertyList.map(catalogProperty=>{
            let productProperty = data.property.find(propertyItem=>propertyItem.property.id===catalogProperty.id)
            return   <p key={catalogProperty.id} className="card-product__characteristic">
                {productProperty?.value.value}
            </p>
        }) }

        <div className="card-product__footer appear">
            <button onClick={haveShow} className="blow-button">
                {
                    loadStats && <Spinner/>
                }
                {!loadStats && <>в корзину</> }
            </button>
            <button className="white-button">купить</button>
        </div>
        <button onClick={delFromCompare}
                className="button-not-background card-product__del-compare">
            <img src={close} alt="close"/>
        </button>
    </article>

    {showOverPageElement && <ProductAddedBasket
        producID={data.id}
        haveShow={haveShowOverPageElement}/>}
    </>

}