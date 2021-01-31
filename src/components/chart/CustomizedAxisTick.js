import * as React from "react";

export class CustomizedAxisTick extends React.Component{
    render() {
        const {x, y, stroke, payload} = this.props;

        return (
            <g transform={`translate(${x},${y})`}>
                <text x={0} y={0} dy={16} textAnchor="end" fill="#666" transform="rotate(-90)">{payload.value}</text>
            </g>
        );
    }
}