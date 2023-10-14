import {observer} from "mobx-react-lite";
import {SwiperSlide} from "swiper/react";
import CompareProductCard from "./CompareProductCard";
import stateCompare from "../../mbox/CompareProducts";

/**
 * @param {Object} catalogActive
 * @description показывает слайдер списка продуктов.
 * @depend stateCompare
 * @see stateCompare
 * @type {React.FunctionComponent<object>}
 */
let CompareProducts = observer(catalogActive => {

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