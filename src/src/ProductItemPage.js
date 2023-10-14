import {Link, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import ajaxFetch from "../components/helpFunction/ajaxFetch";
import StarsScore from "../components/subComponents/StarsScore";
import PictureMixin from "../components/helpFunction/PictureMixin";
import React from "react";
import Counter from "../components/subComponents/Counter";
import stateBasket from "../components/mbox/BasketState";
import Spinner from "../components/Spinner";
import SliderProducts from "../components/main/product-slider/SliderProducts";
import VideoPlair from "../components/main/VideoPlair";
import ProductAddedBasket from "../components/main/ProductAddedBasket";
import stateCompare from "../components/mbox/CompareProducts";
import {observer} from "mobx-react-lite";
import FormFeedBackAdd from "../components/formComponents/forms/FormFeedBackAdd";
//img
import compare_black from '../img/icons/compare-black.svg'
import print_black from '../img/icons/print-black.svg'
import documents_folder from '../img/icons/documents-folder.svg'



/**
 *
 * @type {React.FunctionComponent<object>}
 * @description  Страница с подробными данными о товаре
 * @return JSX.Element
 * @description страничка товара
 * @url - `/catalogs/${catalogName}/${productID}/`
 * @description параметры url берутся с useParams.
 */
let ProductItemPage = observer(( )=>{

    /**
     * @example
     * data ->{"id":5,
     *     "img":[{"link":"http://localhost:8000/media/img/2023/09/18/product.png"}],
     *     "video":[{"id":1,"object_id":5,"link":"http://localhost:8000/media/move/2023/09/19/o.mp4",
     *     "content_type":11}],
     *     "documents":[],
     *     "feedback":[
     *         {"id":3,
     *         "client":{
     *             "id":1,
     *             "username":"xopowen-admin",
     *             "first_name":"Паша",
     *             "last_name":"Иванов",
     *             "email":"xopowen@mail.com"
     *             },
     *         "object_id":5,
     *         "score":0,
     *         "comment":"",
     *         "date":"2023-09-19T09:51:26.869236Z",
     *         "content_type":11}]
     *      ,"manufacturer":{
     *             "id":3,
     *             "name":"Promedic",
     *             "img":"http://localhost:8000/media/manufacturer/medtrinic_covidien_logo_1.png",
     *             "description":""
     *             },
     *      "catalog":{
     *         "id":3,
     *         "name":"Дефибреляторы",
     *         "img":"http://localhost:8000/media/catalog/xb6V280.png",
     *         "order":1
     *         },
     *      "proportion":[],
     *      "name":"ДЕФИБРИЛЛЯТОР-МОНИТОР  ДКИ-Н-11",
     *      "description":null or '',
     *      "act":0,
     *      "amt":0,
     *      "price":10000.0,
     *      "old_price":10998.0,
     *      "currency":"₽",
     *      "technical_feature":"" -> (большой текст которыйюудит разделятся по '\n' на абзацы )
     *       "article":"000 000",
     *       "YTP":null,
     *       "date":"2023-09-18T08:38:56.642915Z",
     *       "visibility":false,
     *       "avg_score":0
     *       }
     */
    let [showOverPageElement,setShow] = useState(false)
    let {catalogName,productID} = useParams()
    let [data,setData] = useState()
    let [loadStats,setLoadStats] = useState(false)



    useEffect(()=>{
        ajaxFetch({
            url:`/catalogs/${catalogName}/${productID}/`,
            method:'GET'
        }).then(response=>{
            let [ok]=response
            if(ok){
                ok.then(res=>setData(res))
            }
        })
    },[catalogName, productID])

    function haveAddtoBasket(e){
        setLoadStats(true)
        stateBasket.addToBasket(data.id)
            .then( () => {
                setShow(true)
            })
            .finally(()=> setLoadStats(false))
        e.preventDefault()
    }

    function haveAddToCompare(e){
        stateCompare.addToCompare(productID)
        e.preventDefault()
    }

    function haveShowOverPageElement(value=false){
        setShow(value)
    }
    function haveSendComment(newComment){
        data.feedback.push(newComment)
        setData({...data})
    }

    return <>
        {showOverPageElement && <ProductAddedBasket producID={data.id} haveShow={haveShowOverPageElement}/>}
        <section className="sections">
            <article className="card-product card-product_big">
                <div className="card-product__img">
                    <div className="card-product__score">
                        <StarsScore score={data?.avg_score}/>
                    </div>
                    {data?.img[0] && <PictureMixin  img={data.img[0].link} />}
                </div>
                <div className="card-product__body">
                    <div className="card-product__up-element">
                        <div className="card-product__header">
                            <p className="card-product__act">арт. {data?.act}</p>
                            <h2 className="card-product__head">
                                {data?.name}
                            </h2>
                            <p className="card-product__subtext">
                                {data?.description}
                            </p>
                            <p className="card-product__price">
                                {data?.price}<span className="card-product__currency">{data?.currency}</span>
                            </p>
                        </div>
                        <div className="card-product__control">
                            <p  className={`add-compare opacity ${stateCompare.checkProductToCompare(productID)?"opacity_show":""}`}>
                                товар добавлен
                                в сравнения
                            </p>
                            <button onClick={haveAddToCompare} className="button-not-background">
                                <img src={compare_black} alt="compare"/>
                                    Сравнить
                            </button>
                            <button className="button-not-background">
                                <img src={print_black} alt="print"/>
                                    Распечатать
                            </button>
                        </div>
                    </div>
                    <div className="card-product__average-element">
                        <ul className="select-size">
                            {data?.proportion && data.proportion.map(v=>{
                                return <li key={v.id} className="select-size__option">
                                    <p>{v.number} {v.prefix}</p>
                                    <Counter name={`amt-${v.id}`} mainClass={''} placeholder={0}  />
                                </li>
                                })}
                        </ul>
                        <div className="card-product__footer">
                            <button onClick={haveAddtoBasket} className="card-product__button blow-button">
                                {
                                    loadStats && <Spinner/>
                                }
                                {!loadStats && <>в корзину</> }
                            </button>
                            <Link to={`form-set-order/${data?.id}/`}>
                                <button className="card-product__button white-button">
                                    купить в 1 клик
                                </button>
                            </Link>
                        </div>
                    </div>

                    <ul className="card-product__down-element">
                        <li className="card-product__anchor-link">
                            <a href="#specifications">Технические характеристики</a>
                        </li>
                        <li className="card-product__anchor-link">
                            <a href="#certificate">
                                Документы (сертификаты)
                            </a>
                        </li>
                        <li className="card-product__anchor-link">
                            <a href="#feedback">Отзывы</a>
                        </li>
                        <li className="card-product__anchor-link">
                            <a href="#video-review">Видеообзор</a>
                        </li>
                    </ul>
                </div>
            </article>
        </section>

        <section id="specifications" className="sections sections_head-left sections_full-page">
            <h2 className="sections__head">
                Технические характеристики
            </h2>
            <div className="sections__body specifications">
                <div className="specifications__el">
                    <p>Тип дефибриллятора: автоматический</p>
                    <p> Подача разряда без необходимости подтверждения разрада оператором</p>
                </div>
                {data?.technical_feature && data.technical_feature.split('\n').map((v,i)=>{
                    return <p key={i}>{v} </p>
                })}
            </div>
        </section>

        <section id="certificate" className="sections sections_head-left sections_full-page">
            <h2 className="sections__head">
                Документы (сертификаты)
            </h2>
            <div className="sections__body certificate">
                <ul className="certificate__list">
                    {data?.documents && data.documents.map(v=>{
                        return <li key={v.id} className="certificate__item">
                            <a href={v.file} download="true">
                                <img src={documents_folder} alt={'файл:'}/>
                                <span>{v.file}</span>
                            </a>
                        </li>
                    })}
                </ul>
            </div>
        </section>

        <section id="feedback" className="sections sections_head-left sections_full-page">
            <h2 className="sections__head">
                Отзывы
            </h2>
            <div className="sections__body feedback">
                {data?.feedback && data.feedback.map(cardFeedBack=>{
                    return <article key={cardFeedBack.id} className="feedback__card feed-back-card">
                        <div className="feed-back-card__header">
                            <p className="feed-back-card__name">{cardFeedBack.client.first_name || cardFeedBack.client.username}</p>
                            <div className="feed-back-card__score">
                                <StarsScore score={cardFeedBack?.score}/>
                            </div>
                        </div>
                        <p className="feed-back-card__text">
                            {cardFeedBack.comment}
                        </p>
                    </article>
                })}
                {data && <FormFeedBackAdd
                    url={`/product/${data.id}/feedback/add/`}
                    sendedFeedBack={haveSendComment}/>}
            </div>
        </section>

        {data?.video && <VideoPlair videos={data.video}/> }

        <SliderProducts/>

    </>
})

export default ProductItemPage;