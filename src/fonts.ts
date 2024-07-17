/* eslint-disable camelcase */

import { Plus_Jakarta_Sans } from 'next/font/google'
import { Caveat_Brush } from 'next/font/google'

const PJSFont = Plus_Jakarta_Sans({
    subsets: ['latin'],
})

export const PJSFontClassName = PJSFont.className

const CBFont = Caveat_Brush({
    subsets: ['latin'],
    weight: '400',
})

export const CBFontClassName = CBFont.className
