import parse from "./parse";

let templateString = `<div>
        <h3>Hello</h3>
        <ul>
            <li>A</li>
            <li>B</li>
            <li>C</li>
        </ul>
    </div>`

const AST = parse(templateString)
console.log(AST)