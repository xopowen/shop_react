export function getCookie(name) {
    //получение cookie по имени
    // name-> document.cookie[name]
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2)
        return parts.pop().split(';').shift();
}