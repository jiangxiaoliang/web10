const fs = require('fs')
const path = require('path')
const parser = require('@babel/parser') // 转换成抽象语法树
const traverse = require('@babel/traverse').default // 遍历抽象语法树
const babel = require('@babel/core') // 将抽象语法树转换成浏览器可识别的代码

const entry = filename => {
    const content = fs.readFileSync(filename, 'utf-8')
    // 转换成抽象语法树
    const ast = parser.parse(content, {
        sourceType: 'module'
    })
    const dependecies = {}
    traverse(ast, {
        ImportDeclaration({node}) {
            const dirname = path.dirname(filename)
            const newfile = './' + path.join(dirname, node.source.value)
            dependecies[node.source.value] = newfile
        }
    })
    const { code } = babel.transformFromAst(ast, null, {
        presets: ['@babel/preset-env']
    })
    return {
        filename,
        dependecies,
        code
    }
}

// const info = entry('./src/index.js')
// console.log(info)

const deepModule = (filename) => {
    const entryInfo = entry(filename)
    const deepModuleArr = [entryInfo]
    for (let i = 0; i < deepModuleArr.length; i++) {
        const item = deepModuleArr[i]
        const { dependecies } = item
        if (dependecies) {
            for (let j in dependecies) {
                deepModuleArr.push(entry(dependecies[j]))
            }
        }
    }
    const graph = {}
    deepModuleArr.forEach(item => {
        graph[item.filename] = {
            dependecies: item.dependecies,
            code: item.code
        }
    })
    return graph
    // console.log(graph)
}

// deepModule('./src/index.js')

const generateCode = (entry) => {
    const graph = JSON.stringify(deepModule(entry))
    return `
        (function(graph) {
            function require(module) {
                function localRequire(relativePath) {
                    return require(graph[module].dependecies[relativePath])
                }
                var exports = {};
                (function(require, exports, code) {
                    eval(code)
                })(localRequire, exports, graph[module].code)
                return exports;
            }
            require('${entry}')
        })(${graph})
    `;
};

const code = generateCode('./src/index.js')
console.log(code)