/**
 *
 * @param {string} name
 * @return {string}  document.cookie[name]
 * @description возвращает данные из cookie
 */
export function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2)
        return parts.pop().split(';').shift();
}