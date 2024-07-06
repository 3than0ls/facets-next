import Chat from "@/components/chat/Chat";
import NavBar from "@/components/NavBar/NavBar";
import Stickyboard from "@/components/stickyboard/Stickyboard";


export default function Home() {
    return (
        <div className="min-h-0 w-full h-screen flex flex-row">
            <Chat />
            <Stickyboard />
        </div>
    );
}
