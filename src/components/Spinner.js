/**
 *
 * @param addClass
 * @return {JSX.Element}
 * @constructor
 * @description спиннер показываемый для отображения ожидания исхода какого либо действия.
 */
export default function Spinner ({addClass}){

    return <div className={`spinner-border ${addClass ? addClass:'' }`} role="status"  >
        <span className="visually-hidden">Loading...</span>
    </div>
}