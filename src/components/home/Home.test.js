import React from "react";
import {render, unmountComponentAtNode} from "react-dom";
import {act} from "react-dom/test-utils";
import Hello from "./Home";

let testContainer = null;

beforeEach(() => {
    testContainer = document.createElement("div");
    document.body.appendChild(testContainer);
});

afterEach(() => {
    unmountComponentAtNode(testContainer);
    testContainer.remove();
    testContainer = null;
})

test("renders with or without a name", () => {
    act(() => {
        render(<Hello />, testContainer);
    });
    expect(testContainer.textContent).toBe("Hey, stranger");

    act(() => {
        render(<Hello name="Jenny" />, testContainer);
    });
    expect(testContainer.textContent).toBe("Hello, Jenny!");

    act(() => {
        render(<Hello name="Margaret" />, testContainer);
    });
    expect(testContainer.textContent).toBe("Hello, Margaret!");
});

