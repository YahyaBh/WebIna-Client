import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import AuthUser from '../../../Context/AuthContext';
import Cookies from 'js-cookie';
import Swal from 'sweetalert2';
import Loading from '../../Loading/Loading';
import { Helmet } from 'react-helmet-async';

const VerifyEmail = () => {

    const { email, token, id } = useParams();
    const navigate = useNavigate();

    const { http, setAccessToken, setUser, csrf } = AuthUser();



    useEffect(() => {

        if (email && token && id) {
            csrf();

            http.post('/api/register/verification/email', { email: email, emailToken: token, id: id })
                .then((res) => {
                    navigate('/store/home');
                    setAccessToken(res.data.token);
                    setUser(res.data.user);
                    Cookies.set('__F_ACCESS', true);
                })
                .catch((err) => {
                    Swal.fire('error', err.response.data.message)
                    navigate('/')
                })

        } else {
            navigate('/')
        }

    }, [])


    return (<>
        <Helmet>
            <title>WEBINA DIGITAL | Email Verifying...</title>
        </Helmet>

        <Loading />

    </>
    )
}

export default VerifyEmail