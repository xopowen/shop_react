import {observer} from "mobx-react-lite";

import FieldInput from "../../FieldInput";
import PhoneInput from "../../PhoneInput";
import clientState from "../../../mbox/ClientState";



let FormBody = observer(()=>{
    /* Часть форм в котором отображаются поля связанные с информацией о клиенте.
        Поля могут быть заполнены или пусты.
        Зависит от Mbox менеджера состояний clientState
    */
    let data = clientState.info
    let fieldUserList = Object.entries(data.user || {})


    return <div className="form__body">
        {fieldUserList.length > 0 && fieldUserList.map((v,i)=>{
            if(v[0] ==='id'){
                return
            }
            if(v[0] === 'email'){
                return  <FieldInput key = {i} type={v[0]} readOnly={true} placeholder={v[0]} defaultValue = {v[1]}/>
            }
            return   <FieldInput  key = {i}  name={v[0]} type="text"  placeholder={v[1] || v[0]} defaultValue = {v[1]}/>
        })}
        <FieldInput   name={'organization_name'}
                      type="text"
                      defaultValue={data?.organization_name || ''}
                      placeholder={data?.organization_name ||'название организации'}/>
        <FieldInput   name={'person_ident_number'}
                      type="text"
                      defaultValue={data?.person_ident_number|| ''}
                      placeholder={data?.person_ident_number||'персональный идентификационный номер'}/>
        <PhoneInput   name={'phone'}
                      required = {true}
                      defaultValue = {data?.phone}/>
    </div>
})

export default FormBody;