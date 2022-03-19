#!/usr/bin/env node

console.log('zf-cli working');
const { program } = require("commander")
const process = require("child_process");
const path = require('path');
const { cwd } = require('process');
const inquirer = require('inquirer');
const ora = require('ora');

program.version('1.0.5', '-v, --version').command('init <name>').action((name) => {

    inquirer.prompt([
        // {
        //     type: 'input',
        //     name:'version',
        //     message: 'Version(1.0.0)',
        //     default: '1.0.0'
        // }
        // ,{
        //     type: 'list',
        //     name: 'testList',
        //     message: 'Please select a project template:',
        //     choices: [
        //       'l1',
        //       'l2',
        //       'l3',
        //     ]
        // }
    ]).then(answers => {
        // console.log(answers);
        // const tmplDir = path.join(__dirname, name) // 模版目录
        // const destDir = cwd() //工作目录
        // console.log(tmplDir, destDir)
        let spinner = ora('downloading... (just take a break, these whole things may take a long time.)')
            spinner.start();
        

        // const gitCommand = 'git clone https://github.com/yzfgithub/react-ts-template.git '+name;
        // process.exec(gitCommand, function(err,stdout,stderr) {
        //     spinner.stop();
        //     if(err !== null && stderr !== null) {
        //         console.log('exec error:' + error);
        //         return ;
        //     }
        //     console.log(stdout);
        //     console.log('clone success')
        // })
    })
})
program.parse(process.argv);