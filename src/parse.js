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
    let stackLetter = []
    //Grab the text before the end tag
    let wordRegExp = /^([^\<]+)\<\/[a-z]+[1-6]?\>/
    while (index < templateString.length - 1) {
        restString = templateString.substring(index)
        if (startRegExp.test(restString)) {
            let tag = restString.match(startRegExp)[1]
            //Push the tag and the empty array onto the stack, respectively
            stackTag.push(tag)
            stackLetter.push([])
            index += tag.length + 2
        } else if (endRegExp.test(restString)) {
            let tag = restString.match(endRegExp)[1]
            if (tag === stackTag[stackTag.length - 1]) {
                stackTag.pop()
            } else {
                throw new Error(`${stackTag[stackTag.length - 1]} tag is not closed`)
            }
            index += tag.length + 3
        } else if (wordRegExp.test(restString)) {
            let word = restString.match(wordRegExp)[1]
            if (!/^\s+$/.test(word)){
                console.log("检测到文字", word)
            }
            index += word.length
        } else {
            index++
        }
    }
    console.log(stackTag, stackLetter)
    return templateString

}