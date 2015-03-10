import sinon from "sinon";
import mockery from "mockery";

import devices from "../src/devices";

describe('devices', () => {
    it('should return a list of connected devices', (done) => {
        var child_processMock = {
            exec: (command, callback) => {
                callback('Mockerytest');
            }
        };
        mockery.registerMock('child_process', child_processMock);

        var result = devices();
        result.should.be.an.Array;
        result.should.have.length(2);
        result.should.containEql('fooDevice');
        result.should.containEql('barDevice');

        mockery.deregisterMock('child_process');
    });

    it('should return an empty list if no devices attached', () => {
        var child_processMock = {
            exec: (command, callback) => {
                callback('Mockerytest');
            }
        };
        mockery.registerMock('child_process', child_processMock);

        var result = devices();
        result.should.be.an.Array;
        result.should.be.empty;

        mockery.deregisterMock('child_process');
    });
});
