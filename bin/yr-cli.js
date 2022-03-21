#!/usr/bin/env node

console.log('zf-cli working2');
const { program } = require("commander")
const process = require("child_process");
const path = require('path');
const { cwd } = require('process');
const fs = require('fs');
const inquirer = require('inquirer');
const ora = require('ora');

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

        function modifyPackageJsonItem(file, value, type) {
            var packageJson = fs.readFileSync(`./${file}/package.json`);
            var packageObj = JSON.parse(packageJson);
            packageObj[type] = value
            fs.writeFileSync(`./${file}/package.json`, JSON.stringify(packageObj), function(err) {
                if(err) {
                    console.log(err)
                }
            })

        }

        inquirer.prompt(promptList).then(answers => {

            // const tmplDir = path.join(__dirname, name) // 模版目录
            // const destDir = cwd() //工作目录
            // console.log(tmplDir, destDir)

            console.log(answers);
            if(cmd.typescript || answers.type === 'typescript') {
                let spinner = ora('downloading... (just take a break, these whole things may take a long time.)')
                spinner.start();

                const gitCommand = 'git clone https://github.com/yzfgithub/react-ts-template.git '+name;
                process.exec(gitCommand, function(err,stdout,stderr) {
                    spinner.stop();
                    if(err !== null && stderr !== null) {
                        console.log('exec error:' + error);
                        return ;
                    }
                    console.log(stdout);
                    console.log('clone success')
                    modifyPackageJsonItem(name, answers.version || '1.0.0', 'version')
                    modifyPackageJsonItem(name, name, 'name')
                })
            } else if(cmd.javascript || answers.type === 'javascript') {

            } else if(cmd.nextjs || answers.type === 'nextjs') {

            } else {
                console.log("something wrong!!")
                return ;
            }
            // process.exec('')



        })
        


})
program.parse(process.argv);