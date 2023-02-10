const program = require('commander')
const { 
    createProjectAction,
    createComponentAction,
    addPageRouterAction,
    crateStoreAction
 } = require('./actions')

const createCommands = () =>{
    program
        .command('create <project> [others...]')
        .description('clone a repository into the folder')
        .action(createProjectAction)
    
    program
        .command('addCpn <cnpName>')
        .argument('<string>', 'save path')
        .description('add a comonpent in this project')
        .action((name, path) => {
            createComponentAction(name, path || 'src/components')
        })

    program
        .command('addPage <pageName>')
        .argument('[string]', 'page path')
        .description('add a page and router')
        .action((name, path) => {
            addPageRouterAction(name, path || 'src/pages')
        })

    program
        .command('addStore <storeName>')
        .argument('[string]', 'storepage name')
        .description('add the store.js and types.js')
        .action((name, path) => {
            crateStoreAction(name, path || 'src/store/modules')
        })
}


module.exports = createCommands