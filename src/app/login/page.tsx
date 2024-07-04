import NavBar from '@/components/NavBar/NavBar'
import AuthMenu from '@/components/auth/AuthMenu'
import React from 'react'

export default function Login() {
    return (
        <div className="h-screen bg-primary flex flex-col">
            <NavBar />
            <AuthMenu />
        </div>
    )
}
