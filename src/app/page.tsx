import Chat from "@/components/chat/Chat";
import NavBar from "@/components/NavBar/NavBar";
import Stickyboard from "@/components/stickyboard/Stickyboard";


export default function Home() {
    return (
        <div className="h-screen bg-white flex flex-col">
            <NavBar />
            <div className="min-h-0 w-full h-full flex flex-row">
                <Chat />
                <Stickyboard />
            </div>
        </div>
    );
}
