import React from "react";
import {Link, useLocation} from "react-router-dom";

import useIntObs from "../../hooks/useIntObs";
import PictureMixin from "../../helpFunction/PictureMixin";


/**
 *
 * @param {Object}data
 * @return {JSX.Element}
 * @constructor
 * @example
 * data ->{
 *      "id":3,
 *      "name":"Дефибреляторы",
 *      "img":"http://localhost:8000/media/ ",
 *      "order":1  }
 * @description карточка каталога.

 * */
export default function CatalogItem({data}){


    let location = useLocation()
    let [ref,] = useIntObs({},true)

    return  <article ref={ref}  className="card-catalog card-catalog_small blue-vision">
        <div className="card-catalog__body appear">
            <div className="card-catalog__header">
                <h3 className="card-catalog__head">
                    {data.name}
                </h3>
                <Link to={`${location.pathname=== "/" ? '/catalogs/' : location.pathname +"/" }${data.name}`} className="card-catalog__subtext blow-text">
                    перейти в каталог
                </Link>
            </div>
        </div>
        <div className="card-catalog__img appear">
            <PictureMixin img={ data.img } alt=""/>
        </div>
    </article>
}