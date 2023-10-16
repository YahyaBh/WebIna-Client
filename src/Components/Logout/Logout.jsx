import React, { useEffect } from 'react'
import AuthContext from '../../Context/AuthContext'
import { useNavigate } from 'react-router-dom';
import Loading from '../Loading/Loading';

const Logout = () => {

    const { isAuthenticated, sec_http, logout, csrf } = AuthContext();
    const navigate = useNavigate();

    useEffect(() => {

        if (isAuthenticated) {
            handleLogout()
        } else {
            navigate('/')
        }

    })


    const handleLogout = async () => {
        csrf()
        await sec_http.post('/api/logout')
            .then((res) => {
                logout()
                navigate('/');
            })
            .catch((err) => {
                console.log(err)
            })
    }

    return (
        <div>
            {isAuthenticated ? <Loading/> : 'Redirecting'}
        </div>
    )
}

export default Logout