import Link from '@/components/Link'
import Image from 'next/image'
import React from 'react'

const About = () => {
    return (
        <div className="w-full h-full flex flex-col px-14 py-8 gap-10  bg-image bg-fixed bg-cover bg-center">
            <div className="bg-white flex items-center justify-center gap-10 text-4xl rounded-2xl shadow-lg w-fit py-8 px-12 mx-auto">
                <h1 className="border-b-4 border-accent">About Facets</h1>
                <Image
                    src="/static/facets-next.png"
                    width={56}
                    height={56}
                    alt="facets-next logo"
                />
            </div>
            <div className="flex justify-around">
                <div className="bg-white rounded-2xl shadow-2xl p-8 flex flex-col gap-4 w-[45%]">
                    <h1 className="border-b-2 border-accent w-fit text-4xl">
                        Facets
                    </h1>
                    <p>
                        Facets is a project connecting several differently
                        implemented projects unified by a single function and a
                        familir user interface.
                    </p>
                    <p>
                        I wanted to learn a variety of different web frameworks,
                        while still making the project meaningful enough that I
                        would be interested in it while using the
                        framework&apos;s most powerful features.
                    </p>
                    <p>
                        Armed with the knowledge of each framework and library,
                        I would then finally gain the experience to solve the
                        daunting question: what tech stack is the best.
                    </p>
                </div>
                <div className="bg-white rounded-2xl shadow-2xl p-8 flex flex-col gap-4 w-[45%]">
                    <h1 className="border-b-2 border-accent w-fit text-4xl">
                        Facets-Next
                    </h1>
                    <p>Facets-Next was built with Typescript and Node.js.</p>
                    <div>
                        Frontend was accomplished with{' '}
                        <Link
                            className="font-semibold text-accent"
                            text="React"
                            href="https://react.dev/"
                        />
                        , utilizing{' '}
                        <Link
                            className="font-semibold text-accent"
                            text="Radix-ui"
                            href="https://www.radix-ui.com/primitives"
                        />{' '}
                        and{' '}
                        <Link
                            className="font-semibold text-accent"
                            text="TailwindCSS"
                            href="https://tailwindcss.com/"
                        />{' '}
                        for styling, and{' '}
                        <Link
                            className="font-semibold text-accent"
                            text="Supabase-js"
                            href="https://supabase.com/docs/reference/javascript/introduction"
                        />{' '}
                        for client-side data fetching and authentication.
                    </div>
                    <div>
                        Backend was accomplished with{' '}
                        <Link
                            className="font-semibold text-accent"
                            text="Next.js"
                            href="https://nextjs.org/"
                        />{' '}
                        server function and API routes, utilizing{' '}
                        <Link
                            className="font-semibold text-accent"
                            text="Prisma ORM"
                            href="https://www.prisma.io/orm"
                        />{' '}
                        for CRUD operations, and{' '}
                        <Link
                            className="font-semibold text-accent"
                            text="Supabase SSR"
                            href="https://supabase.com/docs/guides/auth/server-side/creating-a-client"
                        />{' '}
                        again for authentication.
                    </div>
                    <div>
                        <Link
                            className="font-semibold text-accent"
                            text="View this Facets-Next GitHub here"
                            href="https://github.com/3than0ls/facets-next"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default About
