import * as Tabs from '@radix-ui/react-tabs'
import React from 'react'
import LoginMenu from './LoginMenu'
import CreateAccountMenu from './CreateAccountMenu'

const AuthMenu = () => {
    return (
        <Tabs.Root className="m-auto w-1/3 min-w-36 p-2 rounded-xl bg-white border-accent border-4 flex flex-col" defaultValue="login">
            <Tabs.List className="flex flex-row justify-center text-lg my-4">
                <Tabs.Trigger
                    className="w-1/3 border-b-2 border-gray-100  hover:border-gray-200 data-[state=active]:border-gray-200 data-[state=active]:text-accent mx-8 transition-colors duration-200"
                    value="login"
                >
                    Log In
                </Tabs.Trigger>
                <Tabs.Trigger
                    className="w-1/3 border-b-2 border-gray-100  hover:border-gray-200 data-[state=active]:border-gray-200 data-[state=active]:text-accent mx-4 transition-colors duration-200"
                    value="create"
                >
                    Create Account
                </Tabs.Trigger>
            </Tabs.List>
            <Tabs.Content className="w-full flex flex-col items-center" value="login">
                <LoginMenu />
            </Tabs.Content>
            <Tabs.Content className="w-full flex flex-col items-center" value="create">
                <CreateAccountMenu />
            </Tabs.Content>
        </Tabs.Root >
    )

}

export default AuthMenu