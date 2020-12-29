import * as React from "react";
import {RequestService} from "/src/packages/restapi/RequestService";

export class AssetsList extends React.Component {

    constructor(props) {
        super(props);
        this.requestService = new RequestService(this.state);
        this.state = {
            assets: [],
        }
    }

    async componentDidMount() {
        this.getIndexes()
    }

    render() {
        const data = this.state.assets.data

        console.log(data)
        if (data === undefined) {
            return <>
                <span> Not ready yet! </span>
            </>
        } else {
            const listItems = data.map((asset) =>
                <li>{asset.name}</li>
            );
            return <>
                <ul>{listItems}</ul>
            </>

        }
    }

    getIndexes() {
        this.getAssets('indexes');
    }

    getShares() {
        return this.getAssets('shares');
    }

    getBonds() {
        return this.getAssets('bonds');
    }

    getAssets(type, from = 0, size = 20) {
        this.requestService.sendPostRequest(
            'api/assets/' + type + '?from+' + from + '&size=' + size)
            .then(
                value => this.setState({
                    assets: value
                }))
    }
}