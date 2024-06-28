import * as NM from '@radix-ui/react-navigation-menu';

export default function NavMenu() {
    return <NM.Root className='bg-accent text-secondary w-full py-4'>
        <NM.List className='flex justify-end w-full text-white'>
            <NM.Item className='px-8 mr-auto text-2xl font-bold'>
                Facets
            </NM.Item>

            <NM.Item className='my-auto mx-8'>
                <NM.Link href="https://www.google.com">About</NM.Link>
            </NM.Item>

            <NM.Item className='my-auto mx-8'>
                <NM.Link href="https://www.google.com">Github</NM.Link>
            </NM.Item>

        </NM.List>

        <NM.Viewport />
    </NM.Root>
}