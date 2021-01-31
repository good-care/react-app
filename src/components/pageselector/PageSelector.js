import * as React from "react";
import "./PageSelector.scss"

export class PageSelector extends React.Component {

    static defaultProps = {
        pageSelector: {
            pageNumber: 10,
            currentPage: 1,
            showPageNumber: 5
        },
        changeListPage: () => {
        }
    }


    pageLeft(page) {
        this.props.changeListPage((page > 1) ? --page : 1)
    }

    pageRight(page) {
        const pageNumber = this.props.pageSelector.pageNumber
        this.props.changeListPage((page >= pageNumber) ? pageNumber : ++page)
    }

    pageSelect(page) {
        this.props.changeListPage(page)
    }

    pageGroupLeft(page) {
        const showPageNumber = this.props.pageSelector.showPageNumber
        this.props.changeListPage((page > showPageNumber) ? page - showPageNumber : 1)
    }

    pageGroupRight(page) {
        const showPageNumber = this.props.pageSelector.showPageNumber
        const pageNumber = this.props.pageSelector.pageNumber
        this.props.changeListPage((page >= pageNumber - showPageNumber) ? pageNumber : page + showPageNumber)
    }

    pageFirst() {
        this.props.changeListPage(1)
    }

    pageLast() {
        this.props.changeListPage(this.props.pageSelector.pageNumber)
    }

    render() {
        const showPageNumber = this.props.pageSelector.showPageNumber
        const pageNumber = this.props.pageSelector.pageNumber
        const currentPage = this.props.pageSelector.currentPage
        let startPage = currentPage - Math.floor(showPageNumber / 2)
        startPage = (startPage > pageNumber - showPageNumber) ? pageNumber - showPageNumber + 1 : startPage
        startPage = (startPage > 0) ? startPage : 1

        let stopPage = startPage + showPageNumber - 1
        stopPage = (stopPage > pageNumber) ? pageNumber : stopPage

        const buttonList = Array
            .apply(null, {length: stopPage - startPage + 1})
            .map((value, index) => index + startPage)

        const buttons = buttonList.map(value =>
            <button className={(value === currentPage) ? 'selector-button currentPage' : 'selector-button otherPage'}
                    onClick={() => this.pageSelect(value)} key={value}>
                {value}
            </button>
        )

        return <>
            <button className={'selector-button otherPage'} onClick={() => this.pageFirst()}>&lt;&lt;</button>
            <button className={'selector-button otherPage'} onClick={() => this.pageLeft(currentPage)}>&lt;</button>
            {
                startPage > 1 &&
                <button className={'selector-button otherPage'} onClick={() => this.pageGroupLeft(currentPage)}>...</button>
            }
            {buttons}
            {
                stopPage < pageNumber &&
                <button className={'selector-button otherPage'} onClick={() => this.pageGroupRight(currentPage)}>...</button>
            }
            <button className={'selector-button otherPage'} onClick={() => this.pageRight(currentPage)}>&gt;</button>
            <button className={'selector-button otherPage'} onClick={() => this.pageLast()}>&gt;&gt;</button>
        </>
    }
}