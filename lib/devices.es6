import { exec } from 'child_process';

export function devices() {
    return new Promise((resolve, reject) => {
        exec('adb devices', (error, stdout, stderr) => {
            if(error) {
                reject(error);
            }
            var devices = [];
            stdout.split('\n').forEach(deviceLine => {
                devices.push(deviceLine.split(' devicei')[0]);
            });
            resolve(devices);
        });
    });
}
