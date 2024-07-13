import React from 'react'

type GridBackgroundProps = {
    squareSize?: number
}

/**
 * GRID BACKGROUND SIZE IS 10,000,000 PIXELS IN WIDTH AND 10,000,000 IN HEIGHT.
 */
const GridBackground = ({ squareSize = 50 }: GridBackgroundProps) => {
    const gridSize = squareSize
    const gridStyle: React.CSSProperties = {
        backgroundImage:
            'repeating-linear-gradient(#ccc 0 1px, transparent 1px 100%), repeating-linear-gradient(90deg, #ccc 0 1px, transparent 1px 100%)',
        backgroundSize: `${gridSize}px ${gridSize}px`,
        // transform: `translate(${offset.x}, ${offset.y})`,
    }

    return (
        <div
            className="absolute size-stickyboardGrid -translate-x-1/2 -translate-y-1/2"
            style={gridStyle}
        ></div>
    )
}

export default GridBackground
