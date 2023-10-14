/**
 *
 * @param {HTMLFormElement} form
 * @return {Object}
 * @description получение данный формы из объекта FormData в словарь
 */
export default function fromFormDataToDict(form){
    let data = {}
    try {
        for (let pair of new FormData(form)) {
            data[pair[0]]= pair[1];
        }
    }catch (e) {
    }

    return data
}