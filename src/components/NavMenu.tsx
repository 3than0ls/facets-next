"use client"

import { logout } from '@/utils/supabase/authActions';
import { createClient } from '@/utils/supabase/client';
import * as NM from '@radix-ui/react-navigation-menu';
import { User } from '@supabase/supabase-js';
import { useEffect, useState } from 'react';

const supabase = createClient()

const NavMenu = () => {
    const [user, setUser] = useState<User | null>()

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

    const loginLink = user === null ? <NM.Link href="/login">Login</NM.Link> : <button onClick={logoutOnClick}>Logout</button>

    return <NM.Root className='bg-accent text-secondary w-full py-4'>
        <NM.List className='flex justify-end w-full text-white'>
            <NM.Item className='px-8 mr-auto text-2xl font-bold hover:text-primary transition-colors duration-200'>
                <NM.Link href="/">Facets</NM.Link>
            </NM.Item>

            <NM.Item className='my-auto mx-8 hover:text-primary transition-colors duration-200'>
                <NM.Link href="https://www.google.com">About</NM.Link>
            </NM.Item>

            <NM.Item className='my-auto mx-8 hover:text-primary transition-colors duration-200'>
                <NM.Link href="https://www.google.com">Github</NM.Link>
            </NM.Item>

            <NM.Item className='my-auto mx-8 hover:text-primary transition-colors duration-200'>
                {loginLink}
            </NM.Item>
        </NM.List>

        <NM.Viewport />
    </NM.Root>
}

export default NavMenu