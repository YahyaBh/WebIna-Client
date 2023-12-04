import axios from 'axios';
import cookie from 'js-cookie';
import { useState } from 'react';
<<<<<<< HEAD
import { useNavigate } from 'react-router-dom';
=======
>>>>>>> parent of 254428e (Logout Fixing , Cart NAvbar AuthCOntext)

const baseUrl = 'http://localhost:8000';

axios.defaults.withCredentials = true;
axios.defaults.headers.common['Access-Control-Allow-Origin'] = 'http://localhost:3001/';
axios.defaults.headers.common['Cache-Control'] = 'no-cache, private';
axios.defaults.headers.common['X-Xss-Protection'] = '1; mode=block';
axios.defaults.headers.common['X-Content-Type-Options'] = 'nosniff';

<<<<<<< HEAD


export default function AuthUser() {


    const navigate = useNavigate();

=======
export default function AuthUser() {

    const getAdmin = cookie.get('__ADMINISTRAOT_DATA') ? cookie.get('__ADMINISTRAOT_DATA') : null;
    const setAdmin = (data) => { cookie.set('__ADMINISTRAOT_DATA', JSON.stringify(data), { sameSite: 'Lax', secure: true, expires: 3 }) }
>>>>>>> parent of 254428e (Logout Fixing , Cart NAvbar AuthCOntext)

    const getUser = cookie.get('__USER_DATA') ? cookie.get('__USER_DATA') : null;
    const setUser = (data) => { cookie.set('__USER_DATA', JSON.stringify(data), { sameSite: 'Lax', secure: true, expires: 3 }) }

    const [user] = useState(getUser ? JSON.parse(getUser) : null);

    const getToken = cookie.get('TOKEN_') ? cookie.get('TOKEN_') : null;
    const setToken = (data) => { cookie.set('TOKEN_', data, { sameSite: 'Lax', secure: true, expires: 3 }) }

    const accessToken = cookie.get('__ACCESS_TOKEN') ? cookie.get('__ACCESS_TOKEN') : null;
    const setAccessToken = (data) => { cookie.set('__ACCESS_TOKEN', data, { sameSite: 'Lax', secure: true, expires: 3 }) };

    const isAuthenticated = getUser ? true : false;

    const isFirstAccess = cookie.get('__F_ACCESS') ? cookie.get('__F_ACCESS') : null;

    const GetUserSession = cookie.get('__USER_SESSION_LOCAL') ? cookie.get('__USER_SESSION_LOCAL') : null;

    const rememberToken = cookie.get('__remember_token') ? cookie.get('__remember_token') : null;
    const setRememberToken = (data) => { cookie.set('__remember_token', data, { sameSite: 'Lax', secure: true }) };


    const csrf = async () => await http.get('/sanctum/csrf-cookie');



    const http = axios.create({
        baseURL: baseUrl,
        headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'Access-Control-Allow-Origin': 'http://localhost:3001/',
        },
        withCredentials: true,
    })

    const sec_http = getUser ? axios.create({
        baseURL: baseUrl,
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Access-Control-Allow-Origin': 'http://localhost:3001/',
        },
        withCredentials: true,
    }) : null;

    const image_upload = getUser ? axios.create({
        baseURL: `${baseUrl}/api`,
        headers: {
            'content-type': 'multipart/form-data',
            'Authorization': `Bearer ${accessToken}`,
            'Access-Control-Allow-Origin': 'http://localhost:3001/',
        }
    }) : null;

    const file_upload = axios.create({
        baseURL: `${baseUrl}/api`,
        headers: {
            'content-type': 'multipart/form-data',
            'Authorization': `Bearer ${accessToken}`,
            'Access-Control-Allow-Origin': 'http://localhost:3001/',
        }
    });


<<<<<<< HEAD
    const UserSession = () => {
        const rnd = (() => {
            const gen = (min, max) => max++ && [...Array(max - min)].map((s, i) => String.fromCharCode(min + i));

            const sets = {
                num: gen(48, 57),
                alphaLower: gen(97, 122),
                alphaUpper: gen(65, 90),
                special: [...`~!@#$%^&*()_+-=[]\{}|;:'",./<>?`]
            };

            function* iter(len, set) {
                if (set.length < 1) set = Object.values(sets).flat();
                for (let i = 0; i < len; i++) yield set[Math.random() * set.length | 0]
            }

            return Object.assign(((len, ...set) => [...iter(len, set.flat())].join('')), sets);
        })();

        cookie.set('__User_SESSION_LOCAL', rnd(36, rnd.alphaLower), { sameSite: 'Lax', secure: true })
    }

    const logout = () => {
        navigate(`/logout?logout=${GetUserSession}`)
        cookie.remove('__ACCESS_TOKEN');
        cookie.remove('__USER_DATA');
        cookie.remove('__USER_SESSION_LOCAL');
=======
    const logout = () => {
        if (isAuthenticated) {
            cookie.remove('__ACCESS_TOKEN');
            cookie.remove('__USER_DATA');
        } else {
            return;
        }
>>>>>>> parent of 254428e (Logout Fixing , Cart NAvbar AuthCOntext)
    }

    const clearUserData = () => {

        if (!isAuthenticated) {
            cookie.remove('__ACCESS_TOKEN');
            cookie.remove('__USER_DATA');
            cookie.remove('__USER_SESSION_LOCAL');
        } else {
            return;
        }

    }

<<<<<<< HEAD
    const deleteFirstAccess = () => {
        if (isFirstAccess) {
            cookie.remove('__F_ACCESS');
        } else {
            return;
        }
    }
=======
>>>>>>> parent of 254428e (Logout Fixing , Cart NAvbar AuthCOntext)

    return {
        http,
        csrf,
        sec_http,
        image_upload,
        file_upload,
        getUser,
        setUser,
        getToken,
        setToken,
        setAccessToken,
        user,
        accessToken,
        rememberToken,
        setRememberToken,
        isAuthenticated,
        logout,
        clearUserData,
<<<<<<< HEAD
        UserSession,
        GetUserSession,
        isFirstAccess,
        deleteFirstAccess
=======
>>>>>>> parent of 254428e (Logout Fixing , Cart NAvbar AuthCOntext)
    }
}