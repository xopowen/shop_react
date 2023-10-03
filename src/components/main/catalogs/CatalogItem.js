import React from "react";
import {Link, useLocation} from "react-router-dom";

import useIntObs from "../../hooks/useIntObs";
import PictureMixin from "../../helpFunction/PictureMixin";


export default function CatalogItem({data}){
    /*
    * карточка каталога.
    * data ->{
    * "id":3,
    * "name":"Дефибреляторы",
    * "img":"http://localhost:8000/media/ ",
    * "order":1
    * }
    * */

    let location = useLocation()
    let [ref,isView] = useIntObs({},true)

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