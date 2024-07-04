"use client"

import React from 'react'
import { useEffect, useState } from 'react';
import * as NM from '@radix-ui/react-navigation-menu';
import { logout } from '@/utils/supabase/authActions';
import { User } from '@supabase/supabase-js';
import { createClient } from '@/utils/supabase/client';


const supabase = createClient()


const ProfileDropdown = () => {
    // TODO: replace Login/Logout with a Profile dropdown, with login logout as an option
    // and view profile as another option, with another page going to that profile
    const [user, setUser] = useState<User | null>(null)

    useEffect(() => {
        const authUser = async () => {
            const { data: { user } } = await supabase.auth.getUser()
            setUser(user)
        }
        authUser()
    }, [])

    const logoutOnClick = async () => {
        await logout()
        setUser(null)
    }

    // TODO: replace Login/Logout with a Profile dropdown, with login logout as an option
    // and view profile as another option, with another page going to that profile


    return user === null ? <NM.Link href="/login">Login</NM.Link> : (
        <button onClick={logoutOnClick}>Logout</button>
    )
}

export default ProfileDropdown