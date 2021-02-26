import _http from '@/utils/request.js'

export function getCode({ code, phone }) {
    return _http({
        url: '/sendsms',
        method: 'POST',
        data: {
            code: code,
            phone: phone
        },
        
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
        
    })
}

export function loginApi ({phone,password,code}){
    return _http({
        url: '/login',
        method: 'POST',
        data:{
            phone,
            password,
            code
        }
    })
}

export function getUserInfoApi(){
    return _http({
        url: '/info'
    })
}

export function logoutApi(){
    return _http({
        url: '/logout'
    })
}