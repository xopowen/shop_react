import PictureMixin from "../../helpFunction/PictureMixin";
import React from "react";
import useIntObs from "../../hooks/useIntObs";
import {Link} from "react-router-dom";

/**
 *
 * @param {Object} data
 * @example
 * data->{
 *    "id":2,
 *    "name":"ТЕст",
 *    "img":null,
 *    "description":""
 *     }
 * @return {JSX.Element}
 * @description отображает карточку производителя.
 * @constructor
 */
export default function ManufactureCard({data}) {

    let[ref,isView]=useIntObs()

    return    <article ref={ref} className="manufacture__card card-manufacture appear">
            <Link to={`/manufactures/${data.name}`}  className="card-manufacture__img">
                <PictureMixin  img={data.img} alt={data.name} title={data.name}/>
            </Link>
    </article>
}
