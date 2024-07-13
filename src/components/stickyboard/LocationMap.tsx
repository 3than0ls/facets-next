import React, { useEffect } from 'react'

type Point = {
    x: number
    y: number
}

type LocationMapProps = {
    gridSize: number
    offset: Point
    tracking: boolean
}

// in the location map, everything is shrunk down by a factor of 1000
const SHRINKFACTOR = 100

const LocationMap = ({ gridSize, offset, tracking }: LocationMapProps) => {
    useEffect(() => {
        if (tracking) console.log(tracking)
    }, [tracking])

    const outerDivStyle: React.CSSProperties = {
        width: gridSize / SHRINKFACTOR,
        height: gridSize / SHRINKFACTOR,
    }
    const innerDivStyle: React.CSSProperties = {
        width: 5,
        height: 5,
        transform: `translate(${(-offset.x + gridSize / 2) / SHRINKFACTOR - 2.5}px, ${(-offset.y + gridSize / 2) / SHRINKFACTOR - 2.5}px)`,
    }

    return (
        <div
            style={outerDivStyle}
            className={`absolute bottom-8 right-8 outline outline-4 outline-accent ${tracking ? 'opacity-100 delay-0 duration-150' : 'opacity-0 delay-1000 duration-500'} ease-out transition-opacity bg-white`}
        >
            <div style={innerDivStyle} className="bg-black rounded-full"></div>
            <span className="block absolute w-full text-right bottom-0 right-1 text-sm text-gray-500">
                {-offset.x} {-offset.y}
            </span>
        </div>
    )
}

export default LocationMap
