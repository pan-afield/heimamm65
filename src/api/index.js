import _http from '@/utils/request.js'

export function getCode({ code, phone }) {
    return _http({
        url: '/sendsms',
        method: 'POST',
        data: {
            code: code,
            phone: phone
        },
        withCredentials: true
    })
}
export function registerApi({ username, phone, email, avatar, password, rcode }) {
    return _http({
        url: '/register',
        method: 'POST',
        data: {
            username: username,
            phone: phone,
            email: email,
            avatar: avatar,
            password: password,
            rcode: rcode
        },
        withCredentials: true
    })
}