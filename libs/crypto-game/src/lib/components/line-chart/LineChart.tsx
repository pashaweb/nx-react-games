import * as d3 from 'd3'
import { forwardRef, useImperativeHandle, useRef } from 'react'
import styles from './LineChart.module.scss'

export type LineChartProps = {
    width: number
    height: number
    color?: string
}
export type LineData = [number, number]

const dataUpdate = (
    data: LineData[],
    width: number,
    height: number,
    pathElement: SVGPathElement
) => {
    const pData = linePath(data, width, height)

    if (pathElement) {
        d3.select(pathElement)
            .transition()
            .duration(1000)
            .ease(d3.easeLinear)
            .attr('d', pData)
        //d3.select(pathElement).attr("d", pData);
    }
}

export type LineChartRef = {
    setData: (data: LineData[]) => void
}

export type LineChartMargin = {
    top: number
    right: number
    bottom: number
    left: number
}

function getMargin(marging: number): LineChartMargin {
    return {
        top: marging,
        right: marging,
        bottom: marging,
        left: marging,
    }
}

function linePath(data: LineData[], width: number, height: number) {
    const marging = getMargin(15)

    let xMax = d3.max(data, (d) => d[0])
    xMax = xMax ? xMax : 100
    let yMax = d3.max(data, (d) => d[1])
    yMax = yMax ? yMax : 100

    const xScale = d3
        .scaleLinear()
        .domain([0, xMax])
        .range([marging.left, width - marging.right])
    const yScale = d3
        .scaleLinear()
        .domain([0, yMax])
        .range([height - marging.bottom, marging.top])
    const line = d3
        .line<LineData>()
        .x((d) => xScale(d[0]))
        .y((d) => yScale(d[1]))
    const pathData = line(data)
    return pathData ? pathData : ''
}

export const LineChart = forwardRef<LineChartRef, LineChartProps>(
    ({ width, height, color = '#26a69a' }, ref) => {
        useImperativeHandle(ref, () => ({
            setData: (data: LineData[]) => {
                const el = pathElement.current
                if (!data || el === null) {
                    return
                }
                oldData.current = data
                dataUpdate(data, width, height, el)
            },
        }))

        const pathElement = useRef<SVGPathElement | null>(null)
        const yAxisRef = useRef<SVGGElement | null>(null)
        const xAxisRef = useRef<SVGGElement | null>(null)
        const oldData = useRef<LineData[]>([])

        return (
            <div className={styles['container']}>
                <svg
                    width={width}
                    height={height}
                    viewBox={`0 0 ${width} ${height}`}
                    className={styles['svg-box']}
                >
                    <g ref={yAxisRef} className={styles['y-axis']} />
                    <g ref={xAxisRef} className={styles['x-axis']} />
                    <path
                        stroke={color}
                        strokeWidth="4"
                        fill="none"
                        ref={pathElement}
                    />
                </svg>
            </div>
        )
    }
)
export default LineChart
