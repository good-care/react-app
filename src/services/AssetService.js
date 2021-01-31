import * as React from "react";
import {requestService} from "./RequestService";


export class AssetService extends React.Component {

    constructor() {
        super();
        this.requestService = requestService;
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

    getType(type) {
        switch (type) {
            case 0:
                return 'index'
            case 1:
                return 'share'
            case 2:
                return 'bond'
            default:
                return 'unknown'
        }
    }

    async assetSelect(id){
        return await this.getQuotations(id)
    }
}

export const assertService = new AssetService();