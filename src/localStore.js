//数据持久化  
export function save(){
    return window.localStorage.setItem(key,JSON.stringify(value))
}
export function load(key){
    return JSON.parse(window.localStorage.getItem(key))
}