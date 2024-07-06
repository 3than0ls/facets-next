import * as NM from '@radix-ui/react-navigation-menu'
import ProfileDropdown from './ProfileDropdown'
import Link from '../Link'

const NavBar = () => {
    return (
        <NM.Root>
            <NM.List className="bg-accent w-full h-16 text-lg font-semibold flex justify-end text-white">
                <NM.Item className="px-8 mr-auto my-auto text-2xl font-bold hover:text-primary transition-colors duration-200">
                    <NM.Link href="/">Facets</NM.Link>
                </NM.Item>

                <NM.Item className="my-auto mx-8 hover:text-primary transition-colors duration-200">
                    <Link
                        href="https://www.google.com"
                        text="About"
                        colorTheme="white"
                    />
                </NM.Item>

                <NM.Item className="my-auto mx-8 hover:text-primary transition-colors duration-200">
                    <Link
                        href="https://www.google.com"
                        text="GitHub"
                        colorTheme="white"
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
