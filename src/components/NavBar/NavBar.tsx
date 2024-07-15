import * as NM from '@radix-ui/react-navigation-menu'
import ProfileDropdown from './ProfileDropdown'
import Link from '../Link'
import Image from 'next/image'

const NavBar = () => {
    return (
        <NM.Root>
            <NM.List className="bg-white border-b-4 border-accent w-full h-16 text-lg font-semibold flex justify-end text-white">
                <NM.Item className="group mx-8 mr-auto my-auto">
                    <NM.Link
                        className="flex flex-row-reverse justify-center items-center gap-3"
                        href="/"
                    >
                        <span className=" text-2xl font-bold text-black group-hover:text-accent group-hover:-translate-x-[50px] transition-all duration-200">
                            Facets
                        </span>
                        <Image
                            className="group-hover:rotate-[330deg] group-hover:translate-x-[90px] transition-all duration-300 ease-in-out"
                            src="/static/facets-next.png"
                            width={40}
                            height={40}
                            alt="facets-next logo"
                        />
                    </NM.Link>
                </NM.Item>

                <NM.Item className="my-auto mx-8 hover:text-primary transition-colors duration-200">
                    <Link
                        href="https://www.google.com"
                        text="About"
                        colorTheme="black"
                    />
                </NM.Item>

                <NM.Item className="my-auto mx-8 hover:text-primary transition-colors duration-200">
                    <Link
                        href="https://github.com/3than0ls/facets-next"
                        newTab
                        text="GitHub"
                        colorTheme="black"
                    />
                </NM.Item>

                <NM.Item className="my-auto mx-8 hover:text-primary transition-colors duration-200">
                    <ProfileDropdown />
                </NM.Item>
            </NM.List>

            <NM.Viewport />
        </NM.Root>
    )
}

export default NavBar
