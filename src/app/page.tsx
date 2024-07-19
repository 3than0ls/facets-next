import Link from 'next/link'

export default function Home() {
    return (
        <div className="w-full h-full flex flex-col justify-center items-center gap-12 bg-image bg-fixed bg-cover bg-center">
            <h1 className="text-8xl font-semibold text-black animate-heroTextAnimation">
                What are <i className="mr-4">your</i> thoughts?
            </h1>
            <h4 className="text-3xl">
                Post what you're thinking for everyone to see.
            </h4>
            <div className="flex gap-16">
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
