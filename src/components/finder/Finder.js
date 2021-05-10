import * as React from "react";
import "./Finder.scss"

export class Finder extends React.Component {

    render() {
        return <>

            <div id="input_container">
                <input type="text" id="input" />
                <img src="https://cdn1.iconfinder.com/data/icons/CornerStone/PNG/arrow%20right.png" id="input_img"/>
            </div>


            <label>
                Find object:
                <select >
                    <option value="grapefruit">Грейпфрут</option>
                    <option value="lime">Лайм</option>
                    <option value="coconut">Кокос</option>
                    <option value="mango">Манго</option>
                </select>
            </label>
        </>
    }
}