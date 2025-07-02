"use client"

import dynamic from "next/dynamic"

const DynamicMap = dynamic(() => import("./dynamic-map"), {
    ssr: false,
})

const DEFAULT_WIDTH = 600
const DEFAULT_HEIGHT = 600

interface MapProps {
    width?: number
    height?: number
    center: [number, number]
    zoom: number
    className?: string
}

const Map = (props: MapProps) => {
    const { width = DEFAULT_WIDTH, height = DEFAULT_HEIGHT } = props
    return (
        <div style={{ aspectRatio: width / height }}>
            <DynamicMap {...props} />
        </div>
    )
}

export default Map