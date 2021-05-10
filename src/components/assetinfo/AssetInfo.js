import * as React from "react";
import {assertService} from "../../services/AssetService";
import {AddToPortfolio} from "../portfolio/AddToPortfolio";

export class AssetInfo extends React.Component {
    static defaultProps = {
        asset: {},
        token: {},
        width: 500
    }

    constructor(props) {
        super(props);
        this.assetService = assertService;
        this.state = {
            showAdd: false
        }
    }

    componentDidUpdate(prevProps) {
    }

    render() {
        const asset = this.props.asset
        return <>
            <p>
                <span>Type:</span> {this.assetService.getType(asset.assettype)}
            </p>
            <p>
                <span>Currency:</span> {this.assetService.getCurrency(asset.assettype)}
            </p>
            <p>
                <span>Available for trade:</span> {asset.is_trade ? 'yes':"no"}
            </p>
            <p>
                <span>Asset name:</span> {asset.name}
            </p>
            <p>
                <span>Short Name:</span> {asset.security_id}
            </p>
            <AddToPortfolio assetId={asset.id} assetName={asset.security_id} token={this.props.token}/>
        </>
    }
}