// Import necessary libraries
import React, { useState } from 'react';
import AuthUser from '../../../Context/AuthContext';

// Your React component
const Paypal = () => {
    const [transactionData, setTransactionData] = useState({});
    const [error, setError] = useState(null);

    const { sec_http } = AuthUser();

    // Function to initiate the transaction
    const handleTransaction = async () => {
        try {
            // Make a request to your Laravel backend
            const response = await sec_http.get('/api/create-transaction');
            setTransactionData(response.data);

            // Assuming your backend returns the authentication URL
            const authUrl = response.data.approve_url;

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

                    }
                }, 1000);
            } else {
                console.error('Popup window could not be opened');
            }
        } catch (err) {
            setError(err.response.data.error || 'Something went wrong');
        }
    };

    return (
        <div>
            <h1>PayPal Transaction</h1>
            <button onClick={handleTransaction}>Initiate Transaction</button>
            {error && <p>Error: {error}</p>}
        </div>
    );
};

export default Paypal;
