import {useSwiper} from "swiper/react";
import PictureMixin from "../helpFunction/PictureMixin";
import slideNext from "../../img/next.png";

/**
 *
 * @param {string} direction next or pre
 * @param  swiperItem
 * @return {JSX.Element}
 * @constructor
 * @description  элементы управления слайдером swiper
 * @see Swiper
 */
export default function SlideNavicationButton({direction,swiperItem=undefined}) {

    const swiper = useSwiper() || swiperItem;

    if ( direction === 'last') {
        return <button onClick={()=>swiper.slideNext()} className="slider__navigation slider__navigation_next">
            <PictureMixin   img={slideNext} />
        </button>

    } else {
        return <button onClick={()=>swiper.slidePrev()} className="slider__navigation slider__navigation_last">
            <PictureMixin    img={slideNext}  />
        </button>
    }

}

