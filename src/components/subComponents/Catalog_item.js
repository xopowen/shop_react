import PictureMecsin from "./PictureMecsin";
import {Link} from "react-router-dom";


export function Catalog_item(props) {
    return <div className={'card-catalog ' + 'card-catalog__' + props.class + ' blue-vision'}>
        <div className={'card-catalog_body ' + 'card-catalog_body__' + props.class }>
            {props.data.category && <div className="card-catalog_baner">
                <PictureMecsin id={''} class_img={"rubber-img"} linkImgWebp={props.data.img.linkImgWebp}
                               linkImg={props.data.img.linkImg}/>
            </div>}
            <div className="card-catalog_header">
                <h3 className="card-catalog_head head_big">
                    {props.data.head || props.data.name || ''}
                </h3>
                {props.data.subtitle &&
                    < p className="card-catalog_subtext sub-text__average">
                        {props.data.subtitle}
                    </p>
                }
                {props.class == 'small' && <p><a href={'/'} className=" sub-text__average">
                    перейти в каталог >
                </a></p>}
            </div>
            {props.class === 'big' &&
                <div className="card-catalog_fooder">
                    <button className="blou-button"><Link to={'catalog/'+props.data.id}>перейти в каталог</Link></button>
                    {props.children}
                </div>
            }
        </div>
        <div className= {'card-catalog_img ' + 'card-catalog_img__' + props.class}>
            {props.data.catalog &&
                <PictureMecsin id={''} class_img={"rubber-img"} linkImgWebp={props.data.catalog.img.linkImgWebp}
                               linkImg={props.data.catalog.img.linkImg}/>}
            {props.data.name && <PictureMecsin id={''} class_img={"rubber-img"} linkImgWebp={props.data.img.linkImgWebp}
                                               linkImg={props.data.img.linkImg}/>}
        </div>
    </div>
}
