import * as React from "react";
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';
import {AssetService} from "../../services/AssetService";


export class Chart extends React.Component {

    assetService = new AssetService();
    static count = 0;

    constructor(props) {
        super(props);
        this.state = {
            quotations: {},
            width: 500
        }
    }

    static defaultProps = {
        assetId: 2,
        width: 500
    }

    updateQuotations(assetId) {
        let state = this.state
        this.assetService.getQuotations(assetId)
            .then(
                value => {
                    state.quotations = value
                    this.setState(state)
                }
            )
    }

    componentDidUpdate(prevProps) {
        const assetId = this.props.assetId
        const width = this.props.width
        if (prevProps.assetId !== assetId) {
            this.updateQuotations(assetId);
        }
        if (prevProps.width !== width) {
            const state = this.state
            state.width = width
            this.setState(state);
        }
    }


    render() {
        const data = this.state.quotations.data
        let listForChart
        if (data === undefined) {
            return <>
                <span> Please select an asset </span>
            </>
        } else {
            listForChart = data.map(obj => {
                let rObj = {}
                const date = new Date(obj.date_time)
                rObj.date = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
                rObj.value = obj.quotation
                return rObj
            })
            console.log(listForChart)
        }

        return <>
            <LineChart
                width={this.props.width}
                height={300}
                data={listForChart}
                margin={{
                    top: 10, right: 20, left: 0, bottom: 0,
                }}
            >
                <CartesianGrid strokeDasharray="3 3"/>
                <XAxis dataKey="date" />
                <YAxis/>
                <Tooltip/>
                <Legend/>
                <Line type="monotone" dataKey="value" stroke="#8884d8" activeDot={{r: 8}}/>
            </LineChart>
        </>
    }
}