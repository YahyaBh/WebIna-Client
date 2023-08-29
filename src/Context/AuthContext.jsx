import axios from 'axios';
import cookie from 'js-cookie';
import { useState } from 'react';

const baseUrl = 'https://webina-digital-server.000webhostapp.com';

axios.defaults.withCredentials = true;
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

export default function AuthUser() {

    const getAdmin = cookie.get('__ADMINISTRAOT_DATA') ? cookie.get('__ADMINISTRAOT_DATA') : null;
    const setAdmin = (data) => { cookie.set('__ADMINISTRAOT_DATA', JSON.stringify(data), { sameSite: 'Lax', secure: true, expires: 3 }) }


    const getUser = cookie.get('__USER_DATA') ? cookie.get('__USER_DATA') : null;
    const setUser = (data) => { cookie.set('__USER_DATA', JSON.stringify(data), { sameSite: 'Lax', secure: true, expires: 3 }) }

    const [user] = useState(getUser ? JSON.parse(getUser) : null);
    const [admin] = useState(getAdmin ? JSON.parse(getAdmin) : null);

    const getToken = cookie.get('TOKEN_') ? cookie.get('TOKEN_') : null;
    const setToken = (data) => { cookie.set('TOKEN_', data, { sameSite: 'Lax', secure: true, expires: 3 }) }

    const accessToken = cookie.get('__ACCESS_TOKEN') ? cookie.get('__ACCESS_TOKEN') : null;
    const setAccessToken = (data) => { cookie.set('__ACCESS_TOKEN', data, { sameSite: 'Lax', secure: true, expires: 3 }) };

    const isAuthenticated = getUser ? true : getAdmin ? true : false;


    const rememberToken = cookie.get('__remember_token') ? cookie.get('__remember_token') : null;
    const setRememberToken = (data) => { cookie.set('__remember_token', data, { sameSite: 'Lax', secure: true }) };


    const csrf = async () => await http.get('/sanctum/csrf-cookie');


    const http = axios.create({
        baseURL: baseUrl,
        headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'Access-Control-Allow-Origin': '*',
        },
        withCredentials: true,
    })

    const sec_http = getUser ? axios.create({
        baseURL: baseUrl,
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Access-Control-Allow-Origin': '*'
        }
    }) : null;

    const image_upload = getUser || getAdmin ? axios.create({
        baseURL: `${baseUrl}/api`,
        headers: {
            'content-type': 'multipart/form-data',
            'Authorization': `Bearer ${accessToken}`,
            'Access-Control-Allow-Origin': '*'
        }
    }) : null;

    const file_upload = getAdmin ? axios.create({
        baseURL: `${baseUrl}/api`,
        headers: {
            'content-type': 'multipart/form-data',
            'Authorization': `Bearer ${accessToken}`,
            'Access-Control-Allow-Origin': '*'
        }
    }) : null;

    const admin_http = getAdmin ? axios.create({
        baseURL: baseUrl,
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Access-Control-Allow-Origin': '*'
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

    const clearUserData = () => {

        if (!isAuthenticated) {
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
        logout,
        clearUserData,
    }
}