import {useCallback, useEffect, useRef, useState} from "react";
import {CLASS_ANIM} from "../constants";

/**
 *
 * @param {Object} options - свойства аналогичны IntersectionObserver,
 * @default {
 * без отступов
 * rootMargin: '0px',
 * процент пересечения
 * threshold: 0
 * }
 * @param {Boolean} depth - если true будит искать потомков на наложения анимаций и на них.
 * @default false
 * @param {Boolean} onlyOne - нужно ли чтобы анимация срабатывала только 1 раз
 * @default false
 * @return {[React.MutableRefObject<ref>,boolean]}
 * @description накладывая анимацию на элемент согласно классам объекта.
 * @description ищет анимации в {@link CLASS_ANIM}
 * @see CLASS_ANIM
 * @description если depth
 * @example
 * return ->[ref - ref компонента
 *     * ,isView: Boolean - виден ли элемент
 *     * ]
 */
export default function useIntObs(options = {}, depth = false, onlyOne = true) {

    const defaultOptions = {
        // без отступов
        rootMargin: '0px', // процент пересечения
        threshold: 0
    }
    const classAnim = CLASS_ANIM
    let [isView, setView] = useState(false)
    let ref = useRef()
    let addAnimation = useCallback(entry => {
        entry.classList.forEach(v => {
            if (v in classAnim) {
                entry.classList.add(classAnim[v])
            }
        })
    }, [ref])

    useEffect(() => {
        let intersectionObserver = new IntersectionObserver((entries,
                                                                    observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setView(true)
                    addAnimation(entry.target)
                    if (onlyOne) {
                        observer.unobserve(entry.target)
                    }
                }
            })
        }, Object.assign(defaultOptions, options))
        if (ref.current) {
            if (depth) {
                for (let cl in classAnim) {
                    let listEl = ref.current.querySelectorAll(`.${cl}`)
                    listEl.forEach(v => {
                        intersectionObserver.observe(v)
                    })
                }
            }
            intersectionObserver.observe(ref.current)
        }
    })

    return [ref, isView]
}