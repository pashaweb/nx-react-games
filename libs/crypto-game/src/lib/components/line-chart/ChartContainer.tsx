import { useEffect, useRef } from 'react'
import LineChart, { LineChartRef, LineData } from './LineChart'

export type ChartContainerProps = {
    width?: number
    height?: number
    chartData: number[] | undefined
    color?: string
}

const dataConverter = (data: number[]): LineData[] => {
    const min = Math.min(...data)

    return data.map((value, index) => {
        return [index, value - min]
    })
}

export function ChartContainer(props: ChartContainerProps) {
    const linearChartRef = useRef<LineChartRef | null>(null)
    const lineProps = {
        width: props.width ? props.width : 200,
        height: props.height ? props.height : 70,
        color: props.color ? props.color : 'blue',
    }

    const setChartData = (data: LineData[]) => {
        const el = linearChartRef.current
        if (!el) {
            return
        }
        el.setData(data)
    }

    useEffect(() => {
        const data = props.chartData ? props.chartData : []
        const lineData = dataConverter(data)
        setChartData(lineData)
    }, [props])

    return <LineChart {...lineProps} ref={linearChartRef} />
}

export default ChartContainer
