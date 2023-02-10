const ejs = require('ejs')
const path = require('path')
const fs = require('fs')
const { resolve } = require('path')

const compile = (template, data) => {
    const templatePosition =  `../templates/${template}`
    const templatePath = path.resolve(__dirname, templatePosition)

    return new Promise((resolve, reject)=>{
        ejs.renderFile(templatePath, {data}, {}, (error, result) =>{
            if(error){
                reject(error)
                return
            }
            resolve(result)
        })
    })
}

const writeToFile = (path, content) => {
    return fs.promises.writeFile(path, content)
}

const createDirSync = (filePath) =>{
    if(fs.existsSync(filePath)) {
        return true
    }else {
        if(createDirSync(path.dirname(filePath))) {
            fs.mkdirSync(filePath)
            return true
        }
    }
}

const writeWithFolder = async (dest, name, fileType, compiledDetail) =>{
    const targetPath = path.resolve(dest, name.toLowerCase())

    if(createDirSync(targetPath)){
        await writeToFile((path.resolve(targetPath, fileType==='page' ? `${name}.vue` : `${name}.js`)), compiledDetail[0])
        await writeToFile((path.resolve(targetPath, fileType==='page' ? 'router.js' : 'types.js')), compiledDetail[1])

        console.log('\x1B[32m%s\x1B[0m', `${fileType} file has been created！`);
    }
}

module.exports = {
    compile,
    writeToFile,
    createDirSync,
    writeWithFolder
}