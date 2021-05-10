import * as React from "react";
import {requestService} from "./RequestService";


export class AssetService extends React.Component {

    constructor() {
        super()
        this.requestService = requestService
    }

    async getAssetsByType(type, from = 0, size = 100) {
        return await this.requestService.sendPostRequest(
            'api/assets/' + type + '?from=' + from + '&size=' + size)
    }

    async getAssets(from = 0, size = 100) {
        return await this.requestService.sendPostRequest(
            'api/assets?from=' + from + '&size=' + size)
    }

    async getIndexes(from = 0, size = 100) {
        return await this.getAssets('indexes', from, size)
    }

    async getShares(from = 0, size = 100) {
        return await this.getAssets('shares', from, size)
    }

    async getBonds(from = 0, size = 100) {
        return await this.getAssets('bonds', from, size)
    }

    async getQuotations(id, from = 0, size = 100) {
        return await this.requestService.sendPostRequest(
            'api/quotations/' + id + '?from=' + from + '&size=' + size)
    }

    async getAssetInfo(id) {
        return await this.requestService.sendPostRequest(
            'api/assetInfo/' + id)
    }

    getType(type) {
        switch (type) {
            case 0:
                return 'index'
            case 1:
                return 'share'
            case 2:
                return 'bond'
            default:
                return ''
        }
    }

    getCurrency(currency){
        switch (currency) {
            case 0:
                return 'RUB'
            case 1:
                return 'USD'
            case 2:
                return 'EUR'
            default:
                return ''
        }
    }

    addToPortfolio(asset, token){

        //     if (token && token !== "")
        //         requestService.sendPostRequest('api/userdata', null, token)
        //             .then(r => {
        //                 if (r.code === 1) {
        //                     this.setUserData(r.data)
        //                 } else
        //                     this.setErrorMessage(r.message)
        //             })
        //     else
        //         this.setErrorMessage('Please Login first')
        // }
    }
}

export const assertService = new AssetService();