import {observer} from "mobx-react-lite";
import {SwiperSlide} from "swiper/react";
import CompareProductCard from "./CompareProductCard";
import stateCompare from "../../mbox/CompareProducts";

let CompareProducts = observer(catalogActive => {
    /*
    * показывает слайдер списка продуктов. Зависит от stateCompare
    * */
    let products =  stateCompare.products

    return <>
        {products && products.map(value=>{
            return   <SwiperSlide key={value.id}>
                <CompareProductCard  data = {value} propertyList = {catalogActive?.property} />
            </SwiperSlide>

        })}
    </>
})
export default CompareProducts;