import {observer} from "mobx-react-lite";

/**
 * @param {string|Number|undefined} value
 * @type {React.FunctionComponent<{readonly value?: *}>}
 * @description обёртка для вывода количеств элементов от разных state менеджеров
 */
const ElementCounter = observer( ({value})=>{
    return <>{value && <p className={'blow-text sub-menu__amt'}>{value}</p>}</>
})

export default ElementCounter;

