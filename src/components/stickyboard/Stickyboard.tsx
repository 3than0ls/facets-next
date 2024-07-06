import React from 'react'
import Note from './Note'

const Stickyboard = () => {
    const gridSize = 50
    const gridStyle: React.CSSProperties = {
        backgroundImage:
            'repeating-linear-gradient(#ccc 0 1px, transparent 1px 100%), repeating-linear-gradient(90deg, #ccc 0 1px, transparent 1px 100%)',
        backgroundSize: `${gridSize}px ${gridSize}px`,
    }

    return (
        <div className="h-full w-full backdrop" style={gridStyle}>
            <Note
                title="hello"
                text="My name is Ethan Chennault"
                color="cyan"
                position={[80, 80]}
            />
        </div>
    )
}

export default Stickyboard
