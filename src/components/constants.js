
export const IMAGE_INLINE_SIZE_LIMIT = 0
//стандартный класс изображений
export const CLASS_IMG = 'rubber-img'

export const HEADERS = {
    //заголовки в зависимости от типа запросов
    ajax:{
        'Content-Type': 'application/json;charset=utf-8',
    }
}
let CLASS_NAME = {
    OVER_PAGE:'over-page',
    productCatalog:{
        body:'products-catalog__body',
        buttonShow:'products-catalog__button-show'
    }
}
let EFFECT_CLASS = {
    active:'_active',
    close:'_close'
}
// классы анимаций.
const CLASS_ANIM={'opacity':'opacity_show',
    'appear':'appear_active'}
export {CLASS_NAME,EFFECT_CLASS,CLASS_ANIM}