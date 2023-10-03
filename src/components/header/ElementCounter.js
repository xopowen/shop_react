import {observer} from "mobx-react-lite";

const ElementCounter = observer( ({value})=>{
    //обёртка для вывода количеств элементов от разных state менеджеров

    return <>{value && <p className={'blou-text sub-menu__amt'}>{value}</p>}</>
})

export default ElementCounter;

