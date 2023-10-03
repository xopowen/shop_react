import PictureMixin from "../../helpFunction/PictureMixin";
import React from "react";
import useIntObs from "../../hooks/useIntObs";
import {Link} from "react-router-dom";

export default function ManufactureCard({data}) {
    /*
    отображает карточку производителя.

    props->{data->{
   "id":2,
   "name":"ТЕст",
   "img":null,
   "description":""

    }}
    */
    let[ref,isView]=useIntObs()

    return    <article ref={ref} className="manufacture__card card-manufacture appear">
            <Link to={`manufactures/${data.name}/`}  className="card-manufacture__img">
                <PictureMixin  img={data.img} alt={data.name} title={data.name}/>
            </Link>
    </article>
}
