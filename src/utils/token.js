//封装用来操作本地localstorage中的 token
function setToken(value) {
    window.localStorage.setItem('token', value)
}
function getToken() {
    return window.localStorage.getItem('token')
}
function removeToken() {
    window.localStorage.removeItem('token')
}
export { setToken, getToken, removeToken }