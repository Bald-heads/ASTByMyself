export default function parse(templateString) {
    //Pointer
    let index = 0
    //Remaining string
    let restString = ""
    //Start tag
    let startRegExp = /^\<([a-z]+[1-6]?)\>/
    //The end tag
    let endRegExp = /^\<\/([a-z]+[1-6]?)\>/
    //Define two stacks one to store labels and one to store content
    let stackTag = []
    let stackLetter = [{children: []}]
    //Grab the text before the end tag
    let wordRegExp = /^([^\<]+)\<\/[a-z]+[1-6]?\>/
    while (index < templateString.length - 1) {
        restString = templateString.substring(index)
        if (startRegExp.test(restString)) {
            let tag = restString.match(startRegExp)[1]
            //Push the tag and the object onto the stack, respectively
            stackTag.push(tag)
            stackLetter.push({'tag': tag, 'children': []})
            index += tag.length + 2
        } else if (endRegExp.test(restString)) {
            let tag = restString.match(endRegExp)[1]
            let pop_tag = stackTag.pop()
            let pop_letter = stackLetter.pop()
            if (tag === pop_tag) {
                if (stackLetter.length > 0) {
                    stackLetter[stackLetter.length - 1].children.push(pop_letter)
                }
            } else {
                throw new Error(`${stackTag[stackTag.length - 1]} tag is not closed`)
            }
            index += tag.length + 3
        } else if (wordRegExp.test(restString)) {
            let word = restString.match(wordRegExp)[1]
            if (!/^\s+$/.test(word)) {
                //Text is detected on top of stack
                stackLetter[stackLetter.length - 1].children.push({"text": word, 'type': 3})
            }
            index += word.length
        } else {
            index++
        }
    }
    return stackLetter[0].children[0]
}