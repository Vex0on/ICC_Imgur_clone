import React, { useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router'
import { Link } from 'react-router-dom'

export const ProfilePage = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const currentUser = location.state?.currentUser

    useEffect(() => {
        if (!currentUser) {
            navigate('/login')
        }
    }, [currentUser, navigate])

    return(
        <div>
            <p>You are logged to the profile page</p>
            <Link to='/login'><span style={{ color: 'red' }}>Wyloguj się</span></Link>
        </div>
    )
}