import * as React from "react";
import "./Clock.scss"

export class Clock extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            date: new Date()
        }
    }

    componentDidMount() {
        this.timer = setInterval(
            () => this.tick(),
            1000
        );
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    tick() {
        this.setState({
            date: new Date()
        });
        // this.setState((state, props) => ({
        //         date: new Date(),
        //         count: state.count + 1
        //     })
        // );
        // this.setState(function (state, props) {
        //     return {
        //         date: new Date(),
        //         count: state.count + 1
        //     };
        // });
    }
    render() {
        return (
            <span className={"clock-style"}>
                {this.state.date.toLocaleTimeString()}
            </span>
        );
    }
}