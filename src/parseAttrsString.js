//To deal with attrsString
export default function parseAttrsString(attrsString) {
    if (attrsString === undefined) return []
    //Whether the current is in quotation marks
    let isYinHao = false
    //breakpoint
    let point = 0
    //result array
    let result = []
    for (let i = 0; i < attrsString.length; i++) {
        let char = attrsString[i]
        if (char === '"') {
            isYinHao = !isYinHao
        } else if (char === " " && !isYinHao) {
            if (!/^\s*?$/.test(attrsString.substring(point, i))) {
                result.push(attrsString.substring(point, i).trim())
                point = i
            }
        }
    }
    result.push(attrsString.substring(point))
    result = result.map(item => {
        const o = item.match(/^(.+)=(.+)$/)
        return {
            name: o[1],
            value: o[2].substring(1, o[2].length - 1)
        }
    })
    return result
}