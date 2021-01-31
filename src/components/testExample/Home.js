import * as React from "react";
import "./Home.scss";

export class Home extends React.Component{
    render() {
        return (<Hello name="Andrey" />);
    }
}

export default function Hello(props) {
    if (props.name) {
        return <h1>Hello, {props.name}!</h1>;
    } else {
        return <span>Hey, stranger</span>;
    }
}