const { promisify } = require('util')

const download = promisify(require('download-git-repo'))
const open = require('open')
const path = require('path')

const { vueRepo } = require('../config/repo.config')
const { commandSpawn } = require('../utils/terminal')
const { 
    compile, 
    writeToFile, 
    createDirSync,
    writeWithFolder 
} = require('../utils/utils')

// create project
const createProjectAction = async(project) =>{
    console.log('\x1B[32m%s\x1B[0m', 'autoCli start to create your project...');

    const command = process.platform === 'win32' ? 'npm.cmd': 'npm'

    await download(vueRepo, project, {clone: true})
    await commandSpawn( command, ['install'], {cwd: `./${project}`})
    await commandSpawn( command, ['run', 'serve'], {cwd: `./${project}`})

}

// create component
const createComponentAction = async(cpnName, dest) =>{
    const compiledCpn = await compile('component.vue.ejs', {name: cpnName, className: cpnName.toLowerCase()})

    const cpnPath = path.resolve(dest, `${cpnName}.vue`)
    await writeToFile(cpnPath, compiledCpn)
    console.log('\x1B[32m%s\x1B[0m','component has been created！');

}

// create a component and add router
const addPageRouterAction = async(pageName, dest) => {
    const data = {name: pageName, className: pageName.toLowerCase()}

    const compiledPage = await compile('component.vue.ejs', data)
    const compiledRouter = await compile('router.vue.ejs', data)
    writeWithFolder (dest, pageName, 'page', [compiledPage,compiledRouter])
}

const crateStoreAction = async(storeName, dest) => {
    const compiledStore = await compile('store.vue.ejs', {})
    const compiledType = await compile('types.vue.ejs', {})

    writeWithFolder (dest, storeName, 'store', [compiledStore,compiledType])
}

module.exports = {
    createProjectAction,
    createComponentAction,
    addPageRouterAction,
    crateStoreAction
}