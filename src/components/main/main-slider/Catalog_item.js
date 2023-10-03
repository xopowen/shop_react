import PictureMixin from "../../helpFunction/PictureMixin";
import {Link} from "react-router-dom";
import useIntObs from "../../hooks/useIntObs";

export function Catalog_item(props) {
    let data = props.data
    let [ref,isView] = useIntObs({},true)
    /*
    * {"id":1,
    * "manufacturer":{"id":3,
    *                 "name":"Promedic",
    *                 "img":"http://localhost:8000/media/manufacturer/medtrinic_covidien_logo_1.png",
    *                 "description":""},
    * "catalog":{"id":3,
    *           "name":"Дефибреляторы",
    *           "img":"http://localhost:8000/media/catalog/product_%D0%B4%D0%B8%D1%84%D1%8B_h77Gw5G.png",
    *           "order":1},
    * "order":0,
    * "img":"http://localhost:8000/media/banners/baner-metrax.png",
    * "head":"Ручные и автоматические дефибрилляторы «Primedic»",
    * "subtitle":"высокое качество и выгодные цены."}
    * */

    return <article ref={ref} className="swiper-slide card-catalog card-catalog_big blue-vision ">
        <div className={'card-catalog_body card-catalog__body' }>
            {data?.img &&  <div className="card-catalog__banner appear">
                <PictureMixin img={data.img } alt = {data.name} load={'lazy'}/>
            </div>}

            <div className="card-catalog__header appear">
                <h3 className="card-catalog__head">
                    {data?.head && data.head}
                </h3>
                <p className="card-catalog__subtext sub-text_average">
                    {data?.subtitle && data.subtitle}
                </p>
            </div>
            <div className="card-catalog__footer appear">
                <Link to={`/manufactures/${data.manufacturer.name}/`}>
                    <button className="blow-button">перейти в каталог</button>
                </Link>
                {props.children}
            </div>
        </div>

        <div className="card-catalog__img appear">
            {data?.catalog?.img &&
                <PictureMixin img={data.catalog.img} alt={data.catalog.name}/>
            }
        </div>

    </article>
}
