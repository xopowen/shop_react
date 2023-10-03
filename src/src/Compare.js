import {observer} from "mobx-react-lite";
import React  from "react";

import CatalogItem from "../components/main/catalogs/CatalogItem";
import stateCompare from "../components/mbox/CompareProducts";
import Spinner from "../components/Spinner";

let Compare = observer(({head})=>{
    /*
    props->{head - заголовок}
    отображает лист каталогов товаров в сравнении.
    зависит от stateCompare
    * */
    let  catalogs  = stateCompare.catalogs || []
    let  isLoading = stateCompare.isLoading


    return <section className="sections sections_head-left products-catalog">
        <div className="sections__header">
            <h2 className="sections__head">{head}</h2>
        </div>
        <div className={`products-catalog__body  products-catalog__body_active `}>
            {isLoading && <Spinner/> }
            {catalogs.length > 0 && catalogs.map(value => <CatalogItem key={value.id} data = {value}/>) }
        </div>

    </section>

})

export default Compare;