import fs from fs;

function fixturesNone(command, callback) {
    fs.readFile('./fixtures/devices-none.txt', 'utf8', (err, data) => {
        if (err) {
            throw 'Erro reading fixture file.';
        }
        callback(data);
    });
}
