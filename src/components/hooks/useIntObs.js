import {useCallback, useEffect, useRef, useState} from "react";
import {CLASS_ANIM} from "../constants";

export default function useIntObs(options = {},
                                  depth= false,
                                  onlyOne = true) {
    /*
    * options = {
        // без отступов
        rootMargin: '0px',
        // процент пересечения
        threshold: 0
    } - свойства аналогичны IntersectionObserver,
    *
    * depth=false - если true будит искать потомков с для анимации у элемента ,
    * onlyOne = true - нужно ли чтобы  анимация срабатывала только 1 раз
    *
    * ->[ref - ref компонента
    * ,isView: Boolean - виден ли элемент
    * ]
    * */
    const defaultOptions = {
        // без отступов
        rootMargin: '0px',
        // процент пересечения
        threshold: 0
    }
    const classAnim = CLASS_ANIM
    let [isView ,setView] = useState(false)
    let ref = useRef()
    let  addAnimation = useCallback( entry=>{
        entry.classList.forEach(v => {
            if (v in classAnim) {
                entry.classList.add(classAnim[v])
            }
        })
    },[ref])
    useEffect(()=>{
        let intersectionObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setView(true)
                    addAnimation(entry.target)
                    if(onlyOne){
                        observer.unobserve(entry.target)
                    }

                }

            })
        }, Object.assign(defaultOptions,options))
        if(ref.current){
            if(depth){
            for ( let cl in classAnim) {
                let listEl = ref.current.querySelectorAll(`.${cl}`)
                listEl.forEach(v=>{
                    intersectionObserver.observe(v)
                })
            }
        }
            intersectionObserver.observe(ref.current)
        }
    })

    return [ref,isView]
}