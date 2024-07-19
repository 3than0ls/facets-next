import Link from 'next/link'

export default function Home() {
    return (
        <div className="w-full h-full flex flex-col justify-center items-center gap-12 bg-image bg-fixed bg-cover bg-center">
            <h1
                style={{ animationDuration: '1000ms' }}
                className="text-8xl font-semibold text-black animate-heroTextAnimation"
            >
                What are <i className="mr-4">your</i> thoughts?
            </h1>
            <h4
                style={{ animationDuration: '1600ms' }}
                className="text-3xl transition duration-1000 animate-heroTextAnimation"
            >
                Post what you're thinking for everyone to see.
            </h4>
            <div
                style={{ animationDuration: '2000ms' }}
                className="flex gap-16 animate-heroTextAnimation delay-300"
            >
                <Link
                    href="/board"
                    className={`bg-accent text-white flex items-center justify-center rounded-full shadow-2xl transform hover:scale-105 px-10 py-5 text-2xl bg-left bg-gradient-to-r from-black to-black bg-[length:0_100%] bg-no-repeat hover:bg-[length:100%_100%] transition-all duration-300 ease-in-out`}
                >
                    Visit the board
                </Link>
                <a
                    href="https://github.com/3than0ls/facets-next"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`bg-black text-white flex items-center justify-center rounded-full shadow-2xl transform hover:scale-105 px-10 py-5 text-2xl bg-left bg-gradient-to-r from-accent to-accent bg-[length:0_100%] bg-no-repeat hover:bg-[length:100%_100%] transition-all duration-300 ease-in-out`}
                >
                    Visit the GitHub
                </a>
            </div>
        </div>
    )
}
