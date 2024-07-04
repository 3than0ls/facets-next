"use client"

import Chat from "@/components/chat/Chat";
import NavMenu from "@/components/NavMenu";
import Stickyboard from "@/components/stickyboard/Stickyboard";
import AuthProvider from "@/context/AuthContext";


export default function Home() {
    return (
        <AuthProvider>
            <div className="h-screen bg-white flex flex-col">
                <NavMenu />
                <div className="min-h-0 w-full h-full flex flex-row">
                    <Chat />
                    <Stickyboard />
                </div>
            </div>
        </AuthProvider>
    );
}
