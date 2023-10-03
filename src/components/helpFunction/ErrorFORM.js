export default function ErrorFORM ({errors_list}){
    // отображает получаемый список ошибок.
    return   errors_list.map((v,i)=>{
        return <p key={i}  className='form__help-text blow-text'>
            { v}
        </p>
    })
}