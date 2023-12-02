import axios from 'axios';
import cookie from 'js-cookie';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const baseUrl = 'http://localhost:8000';

axios.defaults.withCredentials = true;
axios.defaults.headers.common['Access-Control-Allow-Origin'] = 'http://localhost:3000';
axios.defaults.headers.common['Cache-Control'] = 'no-cache, private';
axios.defaults.headers.common['X-Xss-Protection'] = '1; mode=block';
axios.defaults.headers.common['X-Content-Type-Options'] = 'nosniff';




export default function AuthUser() {


    useEffect(() => {

        // Add a response interceptor
        sec_http?.interceptors.response.use(
            // Handle successful responses
            (response) => {
                return response;
            },
            // Handle errors
            (error) => {
                // Check if the error response status is 401
                if (error.response && error.response.status === 401) {
                    // Trigger your function or redirect to login page
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'Your session has expired. Please login again.',
                    });

                    // Remove the token from the cookie
                    clearUserData();
                    setTimeout(() => {
                        navigate('/login')
                    }, 3000);
                }

                // If it's not a 401 error, forward the error to the next handler
                return Promise.reject(error);
            }
        );

    }, [])

    const navigate = useNavigate();

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


    const GetUserSession = cookie.get('__USER_SESSION_LOCAL') ? cookie.get('__USER_SESSION_LOCAL') : null;


    const csrf = async () => await http.get('/sanctum/csrf-cookie');


    const http = axios.create({
        baseURL: baseUrl,
        headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'Access-Control-Allow-Origin': 'http://localhost:3000',
        },
        withCredentials: true,
    })

    const sec_http = getUser ? axios.create({
        baseURL: baseUrl,
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Access-Control-Allow-Origin': 'http://localhost:3000',
        },
        withCredentials: true,
    }) : null;

    const image_upload = getUser || getAdmin ? axios.create({
        baseURL: `${baseUrl}/api`,
        headers: {
            'content-type': 'multipart/form-data',
            'Authorization': `Bearer ${accessToken}`,
            'Access-Control-Allow-Origin': 'http://localhost:3000',
        }
    }) : null;

    const file_upload = getAdmin ? axios.create({
        baseURL: `${baseUrl}/api`,
        headers: {
            'content-type': 'multipart/form-data',
            'Authorization': `Bearer ${accessToken}`,
            'Access-Control-Allow-Origin': 'http://localhost:3000',
        }
    }) : null;

    const admin_http = getAdmin ? axios.create({
        baseURL: baseUrl,
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Access-Control-Allow-Origin': 'http://localhost:3000',
        }
    }) : null;


    const clearUserData = () => {

        if (!isAuthenticated) {
            cookie.remove('__ACCESS_TOKEN');
            cookie.remove('__USER_DATA');
        } else {
            return;
        }
    }


    const UserSession = () => {
        const generateRandomString = (len, set) => {
            if (set.length < 1) set = [...'~!@#$%^&*()_+-=[]{}|;:\'",./<>?']
            let result = '';
            for (let i = 0; i < len; i++) {
                result += set[Math.floor(Math.random() * set.length)]
            }
            return result;
        }

        const sets = {
            num: generateRandomString(10, [...Array(10)].map((_, i) => String.fromCharCode(48 + i))),
            alphaLower: generateRandomString(26, [...Array(26)].map((_, i) => String.fromCharCode(97 + i))),
            alphaUpper: generateRandomString(26, [...Array(26)].map((_, i) => String.fromCharCode(65 + i))),
            special: generateRandomString(32, [...'~!@#$%^&*()_+-=[]{}|;:\'",./<>?'])
        };

        const rnd = (len, ...set) => {
            if (set.length < 1) set = Object.values(sets).flat();
            return generateRandomString(len, set.flat());
        };

        cookie.set('__USER_SESSION_LOCAL', rnd(36, sets.alphaLower), { sameSite: 'Lax', secure: true })
    }


    const logout = () => {
        // if (isAuthenticated) {
            navigate(`/logout?logout=${GetUserSession}`)
            cookie.remove('__ACCESS_TOKEN');
            cookie.remove('__USER_DATA');
            cookie.remove('__USER_SESSION_LOCAL');
        // } else {
        //     clearUserData();
        //     navigate('/login');
        // }
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
        GetUserSession,
        UserSession
    }
}