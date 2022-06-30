#!/usr/bin/env node

console.log('zf-react-cli working');

import { program } from 'commander'
import process from 'child_process'
import inquirer from 'inquirer'
import { runDownload } from '../utils/index.js'

program.command('init <name>')
    // .option('-f --force',"如果存在输入的项目目录，就强制删除项目目录")
    .option("--typescript","创建react+ts项目")
    .option("--javascript", "创建react+js项目")
    .option("--nextjs", "创建react + Next.js项目")
    .action((name, cmd) => {

        const promptList = JSON.stringify(cmd) === '{}' ? [
            {
                type: 'input',
                name:'version',
                message: 'Version(1.0.0)',
                default: '1.0.0'
            },{
                type: 'list',
                name: 'type',
                message: 'Please select a project template:',
                choices: [
                  'typescript',
                  'javascript',
                  'nextjs',
                ]
            }
        ] : [{
            type: 'input',
            name:'version',
            message: 'Version(1.0.0)',
            default: '1.0.0'
        }]

        inquirer.prompt(promptList).then(answers => {

            // const tmplDir = path.join(__dirname, name) // 模版目录
            // const destDir = cwd() //工作目录
            // console.log(tmplDir, destDir)

            console.log(answers);
            if(cmd.typescript || answers.type === 'typescript') {
                const gitAddress = 'https://github.com/yzfgithub/react-ts-template.git';
                runDownload(gitAddress, answers, name)
            } else if(cmd.javascript || answers.type === 'javascript') {
                const gitAddress = 'https://github.com/yzfgithub/react-js-template.git';
                runDownload(gitAddress, answers, name)
            } else if(cmd.nextjs || answers.type === 'nextjs') {
                const gitAddress = 'https://github.com/yzfgithub/nextjs-template.git';
                runDownload(gitAddress, answers, name)
            } else {
                console.log("something wrong!!")
                return ;
            }
            // process.exec('')



        })
        


})
program.parse(process.argv);

