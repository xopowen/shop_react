import React, {useState} from "react";

import {Link} from "react-router-dom";

import PictureMixin from "../../helpFunction/PictureMixin";
import ProductAddedBasket from "../ProductAddedBasket";
import useIntObs from "../../hooks/useIntObs";
import StarsScore from "../../subComponents/StarsScore";
import stateBasket from "../../mbox/BasketState";
import Spinner from "../../Spinner";


/**
 *
 * @param {Object} data
 * @description отображает карточку товара.
 * @description в случаи если товар добавят в корзину отобразит окно подтверждения.
 * @example
 * data->{
 *         "id":6,
 *         "name":"АВТОМАТИЧЕСКИЙ ДЕФИБРИЛЛЯТОР PRIMEDIC HEARTSAVE PAD",
 *         "catalog":{"id":3,
 *                    "name":"Дефибреляторы",
 *                    "img":"http://localhost:8000/media/catalog/6V280.png","order":1},
 *         "act":1,
 *         "price":1.0,
 *         "currency":"₽",
 *         "feedback":[],
 *         "img":[],
 *         "avg_score":0}
 *     }}
 *
 * @return {JSX.Element}
 * @constructor
 */
export default function ProductCard({data}){

    let [ref,] = useIntObs({},true)
    let [showOverPageElement,setShow] = useState()
    let [loadStats,setLoadStats] = useState()


    /**
     * @see  stateBasket.addToBasket
     * @param e
     * @description
     */
    function haveShow(e){
        setLoadStats(true)
        stateBasket.addToBasket(data.id).then((request) => {
            if(request.ok){
                setShow(true)
            }

        }).finally(()=>{
            setLoadStats(false)
        })
        e.preventDefault()
    }

    function haveShowOverPageElement(value=false){
        setShow(value)
    }
    return <>
    <article ref={ref} className="card-product">
        <div className="card-product__img appear">
            <div className="score card-product__score">
                <StarsScore score={data?.avg_score  }/>
            </div>
            {data?.img[0] && <PictureMixin  img={data.img[0].link} />}
        </div>
        <div className="card-product__content appear">
            <div className="card-product__header ">
                <p className="card-product__act">{data?.act && data?.act}</p>
                <h3 className="card-product__head head head_card">
                    <Link to={`/catalogs/${data?.catalog.name}/${data?.id}`}>{data.name}</Link>
                </h3>
            </div>
            <div className="card-product__body">
                <p className="card-product__price">
                    {data?.price && <>
                        <span className="card-product__cost"> {data.price} </span>
                        <span className="card-product__currency">{data?.currency && data.currency}</span>
                    </>}
                </p>
            </div>
            <div className="card-product__footer  ">
                <button onClick={haveShow} className="blow-button">
                    {
                        loadStats && <Spinner/>
                    }
                    {!loadStats && <>в корзину</> }
                </button>
                <Link to={`form-set-order/${data.id}`}>
                    <button className="white-button">
                        купить
                    </button>
                </Link>
            </div>
        </div>
    </article>

        {showOverPageElement && <ProductAddedBasket producID={data.id} haveShow={haveShowOverPageElement}/>}

    </>
}
