
export default function Spinner ({addClass}){
    //спиннер показываемый для отображения ожидания исхода какого либо действия.
    return <div className={`spinner-border ${addClass}`} role="status"  >
        <span className="visually-hidden">Loading...</span>
    </div>
}