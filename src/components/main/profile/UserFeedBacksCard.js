import PictureMixin from "../../helpFunction/PictureMixin";
import StarsScore from "../../subComponents/StarsScore";

export default function UserFeedBacksCard({product,feedback}){
    /*
    отобразить карточку комментария на товар.

    props->{product->{
    "id":4,
    "name":"ДЕФИБРИЛЛЯТОР-МОНИТОР  ДКИ-Н-11",
    }
    ,feedback->{"id":1,
                 "object_id":4,
                 "score":3,
                 "comment":"",
                 "date":"2023-09-09T10:47:09.462780Z",
                 "content_type":11,"client":1
                 }
                 }

     * */

    return <article className="basket__card basket-card">
        <div className="basket-card__col-1">
            <input   type="checkbox" id={`basket-card-${product.id}`}/>
            <label htmlFor={`basket-card-${product.id}`}>
            </label>
            <PictureMixin img={product.img.length > 0 ? product.img[0].link:0}/>
        </div>

        <h5 className="basket-card__title">
            {product?.name}
        </h5>
        <div className="basket-card__score">
            <StarsScore score={feedback?.score || 0}/>
        </div>
        <p className="basket-card__comment ">
            {feedback?.comment}
        </p>

    </article>

}