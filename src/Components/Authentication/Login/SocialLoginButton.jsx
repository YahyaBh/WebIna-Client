import React, { useEffect } from 'react'
import AuthContext from '../../../Context/AuthContext'
import { FacebookLoginButton, GoogleLoginButton } from 'react-social-login-buttons';
import { useNavigate } from 'react-router-dom';


const SocialLoginButton = ({ provider }) => {
    const { http, csrf, user } = AuthContext()



    const handleSocialLogin = async () => {

        csrf();


        try {
            // Send a POST request to your Laravel backend with the selected social provider
            const response = await http.post(`/api/auth/${provider}`);

            // Assuming your backend returns the authentication URL
            const authUrl = response.data.url;

            // Open a pop-up window with the authentication URL
            const popUpWidth = 600;
            const popUpHeight = 400;
            const left = window.innerWidth / 2 - popUpWidth / 2 + window.screenLeft;
            const top = window.innerHeight / 2 - popUpHeight / 2 + window.screenTop;


            const popup = window.open(authUrl, '_blank', `width=${popUpWidth},height=${popUpHeight},left=${left},top=${top}`);

            if (popup) {
                // Check if the popup's location changes
                const checkPopupClosed = setInterval(() => {
                    if (popup.closed) {
                        clearInterval(checkPopupClosed);
                        // Perform additional actions after the popup is closed if needed
                        // navigate('/'); // Redirect to the desired page

                        if (user) {
                            window.location.reload();
                        }
                    }
                }, 1000);
            } else {
                console.error('Popup window could not be opened');
            }

        } catch (error) {
            // Handle login error
            console.error('Social login failed', error);
        }
    };


    return (
        <>
            {provider === 'google' ?
                <GoogleLoginButton provider={provider} onClick={handleSocialLogin}>
                    Login with {provider}
                </GoogleLoginButton>
                :
                <FacebookLoginButton provider={provider} onClick={handleSocialLogin}>
                    Login with {provider}
                </FacebookLoginButton>
            }
        </>
    );
}

export default SocialLoginButton