const fs = require('fs');
const path = require('path');
const os = require('os');
const open = require('open');
const { username } = os.userInfo();
const ulid = require('ulid').monotonicFactory();
const defaultConfig = require('./config.json');

let config;
let savefilePath;
let backupFolder;

main();

async function main () {
    console.log('Started Idle Wateland Auto Saver\n');
    try {
        config = loadConfig();
        savefilePath = config.savefilepath.replace('%USERNAME%', username);
        backupFolder = config.backupfolder.replace('%USERNAME%', username);

        if (config.autorestore) {
            console.log(autorestore() + '\n');
        }

        await open(config.gamepath);

        if (fs.existsSync(savefilePath)) {
            if (!fs.existsSync(backupFolder)) {
                fs.mkdirSync(backupFolder);
            }
            while (true) {
                backup(backupFolder, savefilePath);
                await sleep(config.interval * 1000 * 60);
            }
        }
    }
    catch (error) {
        console.log(error);
        console.log('closing in 15 seconds');
        await sleep(15000);
    }
}

function loadConfig () {
    let configPath = path.join(path.resolve(), 'config.json');
    if (!fs.existsSync(configPath)) {
        fs.writeFileSync(configPath, JSON.stringify(defaultConfig));
        return defaultConfig;
    }
    let cfg = JSON.parse(fs.readFileSync(configPath));
    return cfg;
}

function backup () {
    let newBackupFolder = backupFolder + `\\${ulid()}`;
    fs.mkdirSync(newBackupFolder);
    fs.copyFileSync(savefilePath, newBackupFolder + '\\Save.sav');
    console.log(`Created a new savefile backup: ${newBackupFolder}. Date: ${new Date().toLocaleString()}`);
}

function autorestore () {
    if (isFileNullbytes(savefilePath)) {
        let backups = fs.readdirSync(backupFolder);
        for (let i = backups.length; i > 0; i--) {
            if (isFileNullbytes(path.join(backupFolder, backups[i - 1], 'Save.sav'))) continue;
            fs.copyFileSync(path.join(backupFolder, backups[i - 1], 'Save.sav'), savefilePath);
            return 'Save successfully restored';
        }
        return 'Could not restore save';
    }
    return 'Save is not corrupted'
}

function isFileNullbytes (path) {
    let file = fs.readFileSync(path);
    if (file.toString().replace(/\0/g, '').length == 0) return true;
    return false;
}

function sleep (ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
