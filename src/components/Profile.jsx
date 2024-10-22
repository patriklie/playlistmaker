import { useState, useEffect } from 'react';
import axios from 'axios';
import "../css/profile.css"

export default function Profile() {
    const [profile, setProfile] = useState({});


    useEffect(() => {
        const token = window.localStorage.getItem("token");

        const getProfile = async () => {

            const response = await axios.get("https://api.spotify.com/v1/me", {
                headers: {
                    Authorization: `Bearer ${token}`
                    }
            })
            setProfile(response.data)
            console.log(response.data)
        }

        if(token) {
            getProfile();
        }

    }, [])



    return (
        <div className='profile-container'>
           <p className='profile-name'>{profile.display_name}</p>   
           {profile.images && profile.images.length > 0 ? (
                <img className='profile-img' src={profile.images[1].url} alt="" />
            ) : (
                <p>Ingen profilbilder tilgjengelige</p>
            )}      
        </div>
    )
}