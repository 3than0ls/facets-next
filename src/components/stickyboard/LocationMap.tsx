import React from 'react'
import { GRIDSIZE } from './hooks/useStickyboardTracker'

type Point = {
    x: number
    y: number
}

type LocationMapProps = {
    offset: Point
    tracking: boolean
}

// in the location map, everything is shrunk down by a factor of 1000
const SHRINKFACTOR = 100

const LocationMap = ({ offset, tracking }: LocationMapProps) => {
    const outerDivStyle: React.CSSProperties = {
        width: GRIDSIZE / SHRINKFACTOR,
        height: GRIDSIZE / SHRINKFACTOR,
    }
    const innerDivStyle: React.CSSProperties = {
        width: 5,
        height: 5,
        transform: `translate(${(-offset.x + GRIDSIZE / 2) / SHRINKFACTOR - 2.5}px, ${(-offset.y + GRIDSIZE / 2) / SHRINKFACTOR - 2.5}px)`,
    }

    return (
        <div
            style={outerDivStyle}
            className={`absolute bottom-8 right-8 outline outline-4 outline-accent ${tracking ? 'opacity-100 delay-0 duration-150' : 'opacity-0 delay-1000 duration-500'} ease-out transition-opacity bg-white`}
        >
            <div style={innerDivStyle} className="bg-black rounded-full"></div>
            <span className="block absolute w-full text-right bottom-0 right-[2px] text-xs text-gray-500 font-sans">
                {-offset.x} {-offset.y}
            </span>
        </div>
    )
}

export default LocationMap
