import React, { useEffect, useState } from 'react'
import AuthAdmin from '../../../Context/AuthContext'
import { useLocation, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'

import Loading from '../../Loading/Loading'

const Logout = () => {

    const [loaing, setLoading] = useState(true);

    const { isAuthenticated, csrf, sec_http, GetAdminSession } = AuthAdmin();

    const navigate = useNavigate();
    const location = useLocation();

    const allowedToLogout = new URLSearchParams(location.search).get('logout') === GetAdminSession;

    useEffect(() => {

        if (isAuthenticated && allowedToLogout) {
            csrf();
            sec_http.post('/api/admin/logout')
                .then((res) => {
                    navigate('/');
                    setLoading(false);
                })
                .catch((err) => {
                    Swal.fire({
                        title: 'Something went wrong !',
                        text: err?.response?.data?.message ?? err?.message,
                        icon: 'error'
                    })
                })
        } else {
            navigate(-1);
        }

    }, [])

    return (loaing ? <Loading /> :
        <div>Logged Out Successfully </div>
    )
}

export default Logout