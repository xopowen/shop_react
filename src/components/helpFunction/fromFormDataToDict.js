
export default function fromFormDataToDict(form){
    //получение данный формы из объекта FormData в словарь
    // form -> Dict
    let data = {}
    for (let pair of new FormData(form)) {
        data[pair[0]]= pair[1];
    }
    return data
}