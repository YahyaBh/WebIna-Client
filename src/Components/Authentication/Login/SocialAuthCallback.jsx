import { useState, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from "react-router-dom";
import AuthContext from '../../../Context/AuthContext';

import Loading from '../../Loading/Loading'


function SocialAuthCallback() {

    const [loading, setLoading] = useState(true);


    const location = useLocation();
    const { http, setUser, setAccessToken, UserSession } = AuthContext();

    const { provider } = useParams();
    const navigate = useNavigate();
    useEffect(() => {
        http(`/api/auth/${provider}/callback${location.search}`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
            .then((response) => {
                return response;
            })
            .then((data) => {
                console.log(data);
                setAccessToken(data.data.token);
                setUser(data.data.user);
                setLoading(false);
                UserSession();
                navigate('/')
            })
            .catch ((err) => {
            console.log(err);
        })

});

if (loading) {
    return <Loading />
}
}



export default SocialAuthCallback;