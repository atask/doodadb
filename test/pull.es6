import sinon from 'sinon';
import mockery from 'mockery';

import fixtures from './fixtures';
import pull from '../lib/pull';

describe('devices', () => {

    it('should emit on each file pull and on end of transfer', done => {
        mockery.registerMock('child_process', { spawn: fixtures.pull.success });
        var pulledFiles = [];
        pull('/path/to/source', 'path/to/dest')
            .on('file', file => pulledFiles.push(file))
            .on('end', stats => {
                pulledFiles.should.have.length(9);
                pulledfiles[0].should.be.an.Object.and.have.properties({
                    src: 'sdcard/a.jpg',
                    dst: './a.jpg'
                });
                stats.should.be.an.Object.and.have.properties({
                    bytes: 314548,
                    sec: 0.122
                });
                pull.removeAllListeners();
                mockery.deregisterMock('child_process');
                done();
            });
    });

    it('should emit an error on interruped transfers', done => {
        mockery.registerMock('child_process', { spawn: fixtures.pull.interrupt });
        var errorFlag = false;
        pull('/path/to/source', 'path/to/dest')
            .on('error', () => errorFlag = true)
            .on('end', stats => {
                stats.should.equal(undefined);
                pull.removeAllListeners();
                mockery.deregisterMock('child_process');
                done();
            });
    });

    it('should emit an error if no device is attached', done => {
        mockery.registerMock('child_process', { spawn: fixtures.pull.noDevice });
        var errorFlag = false;
        pull('/path/to/source', 'path/to/dest')
            .on('error', () => errorFlag = true)
            .on('end', stats => {
                stats.should.equal(undefined);
                pull.removeAllListeners();
                mockery.deregisterMock('child_process');
                done();
            });
    });

    it('should emit an error if remote object does not exist', done => {
        mockery.registerMock('child_process', { spawn: fixtures.pull.noExists });
        var errorFlag = false;
        pull('/path/to/source', 'path/to/dest')
            .on('error', () => errorFlag = true)
            .on('end', stats => {
                stats.should.equal(undefined);
                pull.removeAllListeners();
                mockery.deregisterMock('child_process');
                done();
            });
    });
});
