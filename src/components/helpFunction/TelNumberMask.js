

class TelNumberMask{

    /*patter - строчка, которая определяет желаемый шаблон который будит в поле набора номера телефона
    пример:"+ 7 (___)-___-__-__".
    replacementChar - > символ, который будит заменятся вводимыми числами.
    ignoreChar - строчка с игнорируемыми символами. При удалении курсор будит перескакивать эти символы
     пример:")-".( символа"(" нет так как его перескакивать уже не нужно).
     fields - список полей к которым будут прикреплены слушатели событий focus и input.
    * */

    constructor(
        field,
        pattern='+ 7 (___)-___-__-__',
        replacementChar = '_',
        ignoreChar=')-',
    ) {
        this.pattern = pattern
        this.replacementChar = replacementChar
        this.ignoreChar = ignoreChar
        this.field = field
        this.field.addEventListener('focus',  this.focus)
        this.field.addEventListener('input',  this.input)
    }
    setInvalid(){
        this.field.setAttribute('aria-invalid',this.field.value.includes(this.replacementChar))
    }

    focus = ()=>{
        this.setCursorToChar()
        this.setInvalid()
    }


    input=()=>{
        let value = this.field.value.split('')
        let startLength = +value.length.toString()
        value.length = this.pattern.length
        for (let i = 0; i < this.pattern.length; i++) {
            if(  this.replacementChar.includes(this.pattern[i]) &&
                !Number.isNaN(parseInt(value[i])) ){
                continue
            }
            value[i] = this.pattern[i]
        }
        this.field.value = value.join('')
        this.setCursorToChar(this.field)

        if( startLength < this.pattern.length){

            if(this.ignoreChar.includes(value[this.field.selectionStart-1] ) ){
                while (this.ignoreChar.includes(value[this.field.selectionStart-1] ) ){
                    this.field.selectionStart = this.field.selectionStart-1
                    this.field.selectionEnd = this.field.selectionStart
                }

            }
        }

        this.setInvalid()
    }
    setCursorToChar() {

        let indexEmptyEl = this.field.value.indexOf(this.replacementChar)

        this.field.selectionStart = indexEmptyEl !== -1 ? indexEmptyEl :  this.field.value.length
        this.field.selectionEnd = indexEmptyEl !== -1 ? indexEmptyEl :  this.field.value.length
    }

    defEvents(){
        this.field.removeEventListener('input',this.input)
        this.field.removeEventListener('focus',this.focus)
    }


}



export default TelNumberMask;

