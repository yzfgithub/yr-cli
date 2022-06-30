import ora from 'ora'
import fs from 'fs'


export function modifyPackageJsonItem(file, value, type) {
    var packageJson = fs.readFileSync(`./${file}/package.json`);
    var packageObj = JSON.parse(packageJson);
    packageObj[type] = value
    fs.writeFileSync(`./${file}/package.json`, JSON.stringify(packageObj, null, '\t'), function(err) {
        if(err) {
            console.log(err)
        }
    })
}


export function runDownload(gitAddress, answers, name) {
    let spinner = ora('downloading... (just take a break, these whole things may take a long time.)')
    spinner.start();
    const gitCommand = 'git clone '+ gitAddress +' '+ name
    process.exec('git clone '+ gitCommand +' '+ name, function(err,stdout,stderr) {
        spinner.stop();
        if(err !== null && stderr !== null) {
            console.log('exec error:' + err);
            return ;
        }
        console.log(stdout);
        console.log('clone success')
        modifyPackageJsonItem(name, answers.version || '1.0.0', 'version')
        modifyPackageJsonItem(name, name, 'name')
    })
}