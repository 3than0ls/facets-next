import { useRef, useState } from 'react'

type Point = {
    x: number
    y: number
}

type Vector = Point

const GRIDSIZE = 10_000

/**
 * The grid size is a constant 100,000 pixels (set here and set in tailwind.config.js)
 *
 * @param p Input point
 * @returns New point bound within the limits
 */
const bindInLimits = (p: Point) => {
    p.x = Math.max(-GRIDSIZE / 2 + 250, Math.min(p.x, GRIDSIZE / 2 + 250))
    p.y = Math.max(-GRIDSIZE / 2 + 250, Math.min(p.y, GRIDSIZE / 2 + 250))
    return p
}

/**
 * Seperates a lot of the logic of how the stickyboard works from Stickyboard.tsx
 * @returns {boolean} tracking - Whether or not tracking is active
 * @returns {Vector} offset - The vector, or position, from which the current tracked point is from the origin
 * @returns {function} startTracking - Callback function to start tracking, usually a mouse down event
 * @returns {function} stopTracking - Callback function to stop tracking, usually a mouse down or mouse leave event
 * @returns {function} trackMotion - Callback function to track mouse movement and set the offset, bound within the limits of the grid.
 */
export default function useStickyboardTracker() {
    const [tracking, setTracking] = useState(false)
    const originRef = useRef<Point>({ x: 0, y: 0 })
    const [offset, setOffset] = useState<Vector>({ x: 0, y: 0 })

    const startTracking = (e: React.MouseEvent<HTMLDivElement>) => {
        setTracking(true)
        originRef.current = {
            x: -offset.x + e.screenX,
            y: -offset.y + e.screenY,
        }
        e.preventDefault()
    }

    const stopTracking = () => {
        setTracking(false)
    }

    const trackMotion = (e: React.MouseEvent<HTMLDivElement>) => {
        if (tracking) {
            setOffset(
                bindInLimits({
                    x: e.screenX - originRef.current.x,
                    y: e.screenY - originRef.current.y,
                }),
            )
        }
    }

    return {
        tracking,
        offset,
        startTracking,
        stopTracking,
        trackMotion,
    }
}
