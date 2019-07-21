const Checksum = require('..');

describe('ChecksumJS', () => {
    it('should be a function', () => {
        expect(Checksum).toBeInstanceOf(Function);
    });
    it('should support sha1', () => {
        expect(Checksum.getHashes().indexOf('sha1') >= 0).toBeTruthy();
    });
    it('should support md5', () => {
        expect(Checksum.getHashes().indexOf('md5') >= 0).toBeTruthy();
    });
    it('should support sha256', () => {
        expect(Checksum.getHashes().indexOf('sha256') >= 0).toBeTruthy();
    });
    it('should return sha1 for Hello World!', () => {
        expect(Checksum("Hello World!", { algorithm: 'sha1' })).toBe("2ef7bde608ce5404e97d5f042f95f89f1c232871");
    });
    it('should return sha256 from file hello.txt', () => {
        Checksum.file('./test/checkfiles/hello.txt', { algorithm: 'sha256' }, (err, hash) => {
            expect(hash).toBe("f48d1f74bf9189a3eab943667fa8d0a9a669f2442562948e817e260199d5402e");
        });
    });
    it('should return sha256 from file tile.png', () => {
        Checksum.file('./test/checkfiles/tile.png', { algorithm: 'sha256' }, (err, hash) => {
            expect(hash).toBe("f84cfac5264bf0235d64fef48f8e7f203a8e3c42b1a335a8fc342a5cbdc3a85e");
        });
    });
});
