/**
 * Checksum.JS
 *  Node checksum utility - Simple as Useful
 *   by Loxoz
 */

const crypto = require('crypto');
const fs = require('fs');

module.exports = Checksum;
Checksum.string = Checksum;
Checksum.file = ChecksumFile;
Checksum.stream = ChecksumStream;

/**
 * default config
 */
Checksum.defaultoptions = {
    algorithm: 'sha1',
    encoding: 'hex'
}

/**
 * Checksum - Get sum from String
 * 
 *  Examples:
 * 
 *     var sum = Checksum("Hello World!", { algorithm: 'md5' });
 *     
 *     if (sum == 'ed076287532e86365e841e92bfc50d8c') { console.log("Valid string!"); }
 * 
 * @param {String} [value] Value of the String to sum
 * @param {Object} [options] Options for hashing
 * @return {String} Returns the sum
 */
function Checksum(value, options = {}) {
    if (typeof options == 'object' && !Array.isArray(options)) {
        options = Object.assign(Object.create(Checksum.defaultoptions), options);
    }
    else {
        options = Object.create(Checksum.defaultoptions);
    }
  
    var hash = crypto.createHash(options.algorithm);
  
    if (hash.write) { 
        /* v0.9+ streaming crypto */
        hash.write(value);
        return hash.digest(options.encoding);
  
    } else {
        hash.update(value);
        return hash.digest(options.encoding);
    }
}

/**
 * Checksum - Get sum from File
 * 
 *  Examples:
 * 
 *     Checksum.file("archive.zip", (err, sum) => {
 *       if (sum == 'blah') { console.log("Valid archive!"); }
 *     });
 * 
 * @constructor
 * @param {File} [file] File path to read
 * @param {Object} [options] Options for hashing (can be replaced by callback)
 * @param {Function} [callback] Callback(err, sum)
 * @return {Promise} Returns a Promise
 *//**
 * @constructor
 * @param {File} [file] File path to read
 * @param {Function} [callback] Callback(err, sum)
 * @return {Promise} Returns a Promise
 *//**
 * Callback
 *
 * @callback ChecksumFileCallback
 * @param {Error} [err] if Error
 * @param {String} [sum] sum (string)
 */
function ChecksumFile(file, options = {}, callback = (err, sum) => {}) {
    if (typeof options == 'function') {
        callback = options;
        options = {}
    }
    if (typeof options == 'object' && !Array.isArray(options)) {
        options = Object.assign(Object.create(Checksum.defaultoptions), options);
    }
    else {
        options = Object.create(Checksum.defaultoptions);
    }

    fs.stat(file, (err, stat) => {
        if (!err && !stat.isFile()) err = new Error('Not a file');
        if (err) return callback(err);

        var hash = crypto.createHash(options.algorithm);
        var fileStream = fs.createReadStream(file);

        fileStream.on('error', (err) => {
            callback(err);
        });

        Checksum.stream(fileStream, options, callback);
    });

    return new Promise((resolve, reject) => {
        resolve(hash);
    });
}

function ChecksumStream(stream, options = {}, callback = (err, sum) => {}) {
    if (typeof options == 'function') {
        callback = options;
        options = {}
    }
    if (typeof options == 'object' && !Array.isArray(options)) {
        options = Object.assign(Object.create(Checksum.defaultoptions), options);
    }
    else {
        options = Object.create(Checksum.defaultoptions);
    }

    if (!stream.readable) {
        let err = new Error('Stream is not readable');
        err.code = 'STREAMNOREAD';
        return callback(err);
    }

    var hash = crypto.createHash(options.algorithm)

    if (hash.write) {
        /* v0.9+ streaming crypto */
        hash.setEncoding(options.encoding);
        stream.pipe(hash, { end: false });
    
        stream.on('end', () => {
            hash.end();
            callback(null, hash.read());
        })
    } else {
        stream.on('data', (data) => {
            hash.update(data);
        });
    
        stream.on('end', () => {
            callback(null, hash.digest(options.encoding));
        });
    }

}

/**
 * Get supported Hashes based on your OpenSSL
 * 
 *  Examples:
 * 
 *     if (Checksum.getHashes().indexOf('sha1') >= 0) {
 *       console.log('sha1 hash supported!');
 *     } else {
 *       console.log('aww! sha1 hash not avalible here');
 *     }
 * 
 *  @return {Array} Returns an Array of hashes (strings)
 */
Checksum.getHashes = crypto.getHashes;