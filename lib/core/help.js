 const program = require('commander')

 const helpOptions = () => {
    program.option('-a --auto <a>', 'nothing important')
    program.option('-b --besides <dest>', 'still nothing important')

    program.on('--help', ()=>{
        console.log('-----------');
        console.log('Other options:');
        console.log('-----------');
    })

}

module.exports = helpOptions