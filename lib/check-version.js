/**
 * @file check-version.js
 * @desc 检查node版本
 * @author huangzhichao<huangzhichao@baidu.com>
*/

const semver = require('semver');
const chalk = require('chalk');
const exec = require('child_process').execSync;
const packageConfig = require('../package.json');

module.exports = cb => {
    if (!semver.satisfies(process.version, packageConfig.engines.node)) {
        return console.log(chalk.red(
            '\n  You must upgrade node to >=' + packageConfig.engines.node + '.x to use bend-cli'
        ));
    }

    // 检测最新版本
    const cmdStr = 'npm view bend-cli --json';
    const latestVersion = JSON.parse(exec(cmdStr).toString()).version;
    const localVersion = packageConfig.version;

    if (semver.lt(localVersion, latestVersion)) {
        console.log();
        console.log(chalk.yellow('  A newer version of bend-cli is available.'));
        console.log();
        console.log('  latest:    ' + chalk.green(latestVersion));
        console.log('  installed: ' + chalk.red(localVersion));
        console.log(chalk.green('npm install -g bend-cli') + '来安装最新版本');
        console.log();
    }

    cb();
};
