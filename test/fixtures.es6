import fs from 'fs';
import path from 'path';
import util from 'util';
import { EventEmitter } from 'events';

function execFixture(fixture, command, callback) {
    var fixturePath = path.join(process.cwd(), 'test/fixtures', fixture);
    fs.readFile(fixturePath, 'utf8', (err, data) => {
        if (err) {
            throw 'Erro reading fixture file.';
        }
        callback(data);
    });
}

function spawnFixture(fixture, command) {
    var fixturePath = path.join(process.cwd(), 'test/fixtures', fixture);
    var spawn = Object.create(EventEmitter.prototype);
    spawn.stderr = Object.create(EventEmitter.prototype);
    fs.readFile(fixturePath, 'utf8', (err, data) => {
        if (err) {
            throw 'Erro reading fixture file.';
        }

        setImmediate(() => {
            data.split(/\r?\n/).forEach(line => spawn.stderr.emit('data', line));
            spawn.emit('close'); 
        });
    });
    return spawn;
}

export default {
    devices: {
        none: execFixture.bind(null, 'devices-none.txt'),
        one: execFixture.bind(null, 'devices-one.txt'),
        two: execFixture.bind(null, 'devices-two.txt')
    },
    pull: {
        success: spawnFixture.bind(null, 'pull-success.txt'),
        interrupt: spawnFixture.bind(null, 'pull-interrupt.txt'),
        noDevice: spawnFixture.bind(null, 'pull-noDevice.txt'),
        noExists: spawnFixture.bind(null, 'pull-noExists.txt')
    }
};
