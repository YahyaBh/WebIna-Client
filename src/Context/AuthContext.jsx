import axios from 'axios';
import cookie from 'js-cookie';
import { useState } from 'react';

axios.defaults.withCredentials = true;
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
axios.defaults.headers.common['Content-Type'] = 'application/json';
axios.defaults.headers.common['Accept'] = 'application/json';
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
axios.defaults.headers.common["Access-Control-Allow-Credentials"] = "true";
axios.defaults.headers.common["Access-Control-Max-Age"] = "1800";
axios.defaults.headers.common["Access-Control-Allow-Headers"] = "content-type";
axios.defaults.headers.common["Access-Control-Allow-Methods"] = "PUT, POST, GET, DELETE, PATCH, OPTIONS";

const baseUrl = 'http://localhost:8000';

export default function AuthContext() {

    const getAdmin = cookie.get('__ADMINISTRAOT_DATA') ? cookie.get('__ADMINISTRAOT_DATA') : null;
    const setAdmin = (data) => { cookie.set('__ADMINISTRAOT_DATA', JSON.stringify(data), { sameSite: 'Lax', secure: true, expires: 3 }) }


    const getUser = cookie.get('__USER_DATA') ? cookie.get('__USER_DATA') : null;
    const setUser = (data) => { cookie.set('__USER_DATA', JSON.stringify(data), { sameSite: 'Lax', secure: true, expires: 3 }) }

    const [user] = useState(getUser ? JSON.parse(getUser) : null);
    const [admin] = useState(getAdmin ? JSON.parse(getAdmin) : null);

    const isAuthenticated = getUser ? true : getAdmin ? true : false;


    const getToken = cookie.get('TOKEN_') ? cookie.get('TOKEN_') : null;
    const setToken = (data) => { cookie.set('TOKEN_', data, { sameSite: 'Lax', secure: true, expires: 3 }) }

    const accessToken = cookie.get('__ACCESS_TOKEN') ? cookie.get('__ACCESS_TOKEN') : null;
    const setAccessToken = (data) => { cookie.set('__ACCESS_TOKEN', data, { sameSite: 'Lax', secure: true, expires: 3 }) };


    const rememberToken = cookie.get('__remember_token') ? cookie.get('__remember_token') : null;
    const setRememberToken = (data) => { cookie.set('__remember_token', data, { sameSite: 'Lax', secure: true }) };

    const http = axios.create({
        baseURL: baseUrl,
    })

    const csrf = async () => await http.get('/sanctum/csrf-cookie');


    const sec_http = getUser ? axios.create({
        baseURL: baseUrl,
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    }) : null;

    const image_upload = getUser || getAdmin ? axios.create({
        baseURL: `${baseUrl}/api`,
        headers: {
            'content-type': 'multipart/form-data',
            'Authorization': `Bearer ${accessToken}`
        }
    }) : null;

    const file_upload = getAdmin ? axios.create({
        baseURL: `${baseUrl}/api`,
        headers: {
            'content-type': 'multipart/form-data',
            'Authorization': `Bearer ${accessToken}`
        }
    }) : null;

    const admin_http = getAdmin ? axios.create({
        baseURL: baseUrl,
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    }) : null;

    const logout = () => {
        if (isAuthenticated) {
            cookie.remove('__ACCESS_TOKEN');
            cookie.remove('__USER_DATA');
        } else {
            return;
        }
    }

    return {
        http,
        csrf,
        sec_http,
        image_upload,
        file_upload,
        user,
        getUser,
        setUser,
        getToken,
        setToken,
        setAccessToken,
        admin,
        setAdmin,
        getAdmin,
        admin_http,
        accessToken,
        rememberToken,
        setRememberToken,
        isAuthenticated,
        logout
    }
}