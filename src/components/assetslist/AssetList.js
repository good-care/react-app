import * as React from "react";
import {AssetService} from "../../services/AssetService";
import "./AssetList.scss"
import {PageSelector} from "../pageselector/PageSelector";
import {Chart} from "../chart/Chart";

export class AssetList extends React.Component {

    assetService = new AssetService();

    constructor(props) {
        super(props)
        this.changeListPage = this.changeListPage.bind(this)
        this.stateUpdate = this.stateUpdate.bind(this)
        this.state = {
            assets: {},
            assetsNumber: 20,
            pageSelector: {
                pageNumber: 10,
                currentPage: 1,
                showPageNumber: 5
            },
            selectId: 0,
        }
        this.chart = React.createRef()
    }

    componentDidMount() {
        this.getAssets(0, this.state.assetsNumber)
    }

    stateUpdate() {
        this.setState(this.state)
    }

    getAssets(from = 0, size = 20) {
        this.assetService.getAssets(from, size)
            .then(
                value => {
                    this.state.assets = value
                    this.state.pageSelector.pageNumber = Math.ceil(this.state.assets.dataInfo / this.state.assetsNumber)
                    this.stateUpdate()
                }
            )
    }

    changeListPage(currentPage) {
        const assetsNumber = this.state.assetsNumber
        this.getAssets((currentPage - 1) * assetsNumber, assetsNumber)
        this.state.pageSelector.currentPage = currentPage
        this.stateUpdate()
    }

    changeSelectId(id) {
        this.state.selectId = id
        this.stateUpdate()
    }

    render() {
        const data = this.state.assets.data
        let currentWidth = 500
        if (this.chart.current !== null)
            currentWidth = this.chart.current.offsetWidth

        if (data === undefined) {
            return <>
                <span> Connect to {process.env.PHP_API_HOST}:{process.env.PHP_API_PORT}! </span>
            </>
        } else {
            const listItems = data.map((asset) =>
                    <li onClick={() => {
                        this.changeSelectId(asset.id);
                    }}
                        className={(this.state.selectId === asset.id) ? 'assets-table-select-row' : 'assets-table-row'}
                        key={asset.id}>
                        <div className={'assets-table-column-security-id'}>
                            {asset.security_id}
                        </div>
                        <div className={'assets-table-column'}>
                            {asset.name}
                        </div>
                        <div className={'assets-table-column-type'}>
                            {this.assetService.getType(asset.assettype)}
                        </div>
                    </li>
                )
            ;
            return <>
                <div ref={this.chart} className={'assets-table'}>
                    <div className={'assets-table-title'}>
                        <div className={'assets-table-title-column-security-id'}>SECURITY ID</div>
                        <div className={'assets-table-title-column'}>NAME</div>
                        <div className={'assets-table-title-column-type'}>TYPE</div>
                    </div>
                    <ul className={'asset-table-list'}>{listItems}</ul>
                    <div className={'assets-table-page-selector'}>
                        <div className={'assets-table-page-selector-column'}>
                            <PageSelector pageSelector={this.state.pageSelector} changeListPage={this.changeListPage}/>
                        </div>
                    </div>
                </div>
                <div>
                    <Chart assetId={this.state.selectId} width={currentWidth}/>
                </div>

            </>
        }
    }
}