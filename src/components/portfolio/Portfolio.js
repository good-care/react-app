import * as React from "react";
import {requestService} from "../../services/RequestService";
import {PageSelector} from "../pageselector/PageSelector";

export class Portfolio extends React.Component {
    static defaultProps = {
        token: {}
    }

    constructor(props) {
        super(props);
        this.state = {
            message: "",
            assets: {}
        }
        this.getPortfolio = this.getPortfolio.bind(this)
    }

    getPortfolio() {

        if (this.props.token && this.props.token !== "") {
            requestService.sendPostRequest(
                'api/getPortfolio',
                null,
                this.props.token
            )
                .then(r => {
                    if (r.code === 0) {
                        this.state.message = r.message
                    } else {
                        this.state.assets = r
                    }
                    this.setState(this.state)
                })
        } else {
            this.state.message = 'Please Login first'
            this.setState(this.state)
        }
    }

    render() {
        const data = this.state.assets.data

        if (data === undefined) {
            return <>
                <span>Portfolio: Please login first or add asset to portfolio</span>
                <button onClick={this.getPortfolio}>Get Portfolio</button>
            </>
        } else {
            const listItems = data.map((asset) =>
                <li key={asset.id}>
                    <div>
                        {asset.name}
                    </div>
                    <div>
                        {asset.quotation}
                    </div>
                    <div>
                        {asset.number}
                    </div>
                    <div>
                        {asset.cost}
                    </div>
                    <div>
                        {asset.date_time}
                    </div>
                </li>
            )
            return <>
                <div>
                    <div>NAME</div>
                    <div>QUOTATION</div>
                    <div>NUMBER</div>
                    <div>COST</div>
                </div>
                <ul>{listItems}</ul>
            </>
        }
    }
}