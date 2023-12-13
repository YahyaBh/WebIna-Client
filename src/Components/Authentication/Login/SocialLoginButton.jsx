import React, { useEffect } from 'react'
import AuthContext from '../../../Context/AuthContext'
import { FacebookLoginButton, GoogleLoginButton } from 'react-social-login-buttons';
import { useNavigate } from 'react-router-dom';


const SocialLoginButton = ({ provider, register }) => {
    const { http, csrf, user } = AuthContext()



    const handleSocialLogin = async () => {

        csrf();


        try {
            // Send a POST request to your Laravel backend with the selected social provider
            const response = await http.post(`/api/auth/${provider}`);

            // Assuming your backend returns the authentication URL
            const authUrl = response.data.url;


            window.location.replace(authUrl);

        } catch (error) {
            // Handle login error
            console.error('Social login failed', error);
        }
    };


    return (
        <>
            {provider === 'google' ?
                <GoogleLoginButton provider={provider} onClick={handleSocialLogin}>
                    {register ? 'Register' : 'Login'} with {provider}
                </GoogleLoginButton>
                :
                <FacebookLoginButton provider={provider} onClick={handleSocialLogin}>
                    {register ? 'Register' : 'Login'} with {provider}
                </FacebookLoginButton>
            }
        </>
    );
}

export default SocialLoginButton