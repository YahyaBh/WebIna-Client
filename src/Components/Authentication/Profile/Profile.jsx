import React, { useContext, useEffect, useState } from 'react'
import AuthContext from '../../Context/AuthContext'
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'
import Loading from '../../Loading/Loading'

const Profile = () => {

    const [loading, setLoading] = useState();


    const { user, setUser, sec_http } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {

        if (user) {
            getUserData();
        } else {
            navigate('/login', { replace: true });
        }
    }, [])


    const getUserData = async () => {

        await sec_http.get('/user')
            .then((res) => {
                setUser(res.data.user)
                setLoading(false)
            })
            .catch((err) => {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: err.response.data.message
                })
            });
    }

    const updateUserInfo = async (e) => {
        e.preventDefault();
    }

    return (
        <div>

            {loading ? <Loading /> :
                <>


                    <form onSubmit={updateUserInfo}>

                        <img src="" alt="User_Image" />

                        <input type="file" name='image' />

                        <input type="text" name='name' />

                        <input type="email" name='email' />

                        <input type="password" name='password'/>

                        <input type="tel" name='phone'  />

                        <button type='submit'>Update</button>

                    </form>


                </>


            }
        </div>
    )
}

export default Profile