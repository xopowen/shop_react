/**
 *
 * @param {Array<String>} errors_list
 * @return JSX.Element
 * @component
 * @description отображает получаемый список ошибок.
 *
 */
export default function ErrorFORM ({errors_list}){
    return   errors_list.map((v,i)=>{
        return <p key={i}  className='form__help-text blow-text'>
            { v}
        </p>
    })
}