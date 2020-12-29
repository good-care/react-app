import * as React from "react";
import {Clock} from "../clock/Clock";
import {AssetsList} from "../assetslist/AssetsList";

export class HomePage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <div>
                    <Clock />
                </div>
                <div>
                    <AssetsList />
                </div>
            </div>
        );
    }
}