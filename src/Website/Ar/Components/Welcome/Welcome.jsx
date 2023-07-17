import React, { useLayoutEffect } from 'react'
import AuthContext from '../../../../Context/AuthContext'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom'

const Welcome = () => {

    const navigate = useNavigate()
    const { user } = AuthContext()

    useLayoutEffect(() => {
        if (Cookies.get('__F_ACCESS') === true) {
            Cookies.set('__F_ACCESS', false);
        } else {
            navigate('/');
        }
    }, []);

    return (
        <div>Welcome {user.name}</div>
    )
}

export default Welcome