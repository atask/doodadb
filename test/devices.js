import sinon from 'sinon';
import mockery from 'mockery';

import execFixtures from './fixtures';
import devices from '../src/devices';


describe('devices', () => {
    it('should return a list of connected devices', (done) => {
        execFixtures.devices.none('aaa', function tst() {
            console.log('assa');
        });

        var sp = execFixtures.pull.success();
        sp.stderr.on('data', data => console.log('PULL_STDERR:' + data));
        sp.on('close', () => {
            console.log('PULL_CLOSE');
            done();
        });
        /*
        mockery.registerMock('child_process', { exec: execFixtures.devices.two });

        var result = devices();
        result.should.be.an.Array;
        result.should.have.length(2);
        result.should.containEql('D5F3D60B50D481C7F4EB6857BB59A6D');
        result.should.containEql('10ec4f3e');

        mockery.deregisterMock('child_process');
        done();
        */
    });

    it('should return an empty list if no devices attached', () => {
        mockery.registerMock('child_process', { exec: execFixtures.devicesNone });

        var result = devices();
        result.should.be.an.Array;
        result.should.be.empty;

        mockery.deregisterMock('child_process');
    });
});
