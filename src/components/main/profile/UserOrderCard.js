import PictureMixin from "../../helpFunction/PictureMixin";


export default function UserOrderCard({data}){
    /*
    Отобразить карточку оформленного товара.
    props->{data->{
        id	5
        name:"ДЕФИБРИЛЛЯТОР-МОНИТОР ДКИ-Н-11"
        catalog :Catalog,
        act:0
        price:10000
        currency:"₽"
        feedback	[  ]
        img:[   ]
        avg_score:0
        amt:1
        issued:true
    }}
    * */

    let product = data.product
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
        <p className="basket-card__price">
            <span>{product.price}</span>
            <span className="basket-card__currency">{product.currency}</span>
        </p>
        <label> <input className="amt__answer"
                       type = {'text'}
                       readOnly={true}
                       value={ data.amt > 0 && data.amt }
        /></label>

        <p className="basket-card__price">
            <span data-amt="sum">
                {product.price * data.amt}
            </span>
            <span data-amt="currency" className="basket-card__currency">
                {product.currency}
            </span>
        </p>
        <p className="">
            {new Date( new Date().setMonth(new Date().getMonth()+1)).toLocaleDateString()}
        </p>
    </article>
}