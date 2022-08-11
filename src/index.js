import parse from "./parse";

let templateString = `<div>
        <h3 class="demo" id="cmd">Hello</h3>
        <ul>
            <li id="bid">A</li>
            <li>B</li>
            <li>C</li>
        </ul>
    </div>`

const AST = parse(templateString)
console.log(AST)