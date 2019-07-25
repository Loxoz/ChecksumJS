/**
 * Checksum.JS
 *  Node checksum utility - Simple as Useful
 *   by Loxoz
 */

const crypto = require('crypto');
const fs = require('fs');
const { promisify } = require('util');

module.exports = Checksum;
Checksum.string = Checksum;
Checksum.file = ChecksumFile;
Checksum.fileAsync = promisify(Checksum.file);
Checksum.stream = ChecksumStream;
Checksum.streamAsync = promisify(Checksum.stream);

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
function Checksum(value = String.prototype, options = {}) {
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
 *//**
 * @constructor
 * @param {File} [file] File path to read
 * @param {Function} [callback] Callback(err, sum)
 *//**
 * Callback
 *
 * @callback ChecksumFileCallback
 * @param {Error} [err] if Error
 * @param {String} [sum] sum (string)
 */
function ChecksumFile(file = String.prototype, options = {}, callback = (err, sum) => {}) {
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
        if (!err && !stat.isFile()) { err = new Error('Not a file'); err.code = 'NOTFILE'; };
        if (err) { return callback(err); };

        return Checksum.stream(fs.createReadStream(file), options, callback);
    });
}

/**
 * Checksum - Get sum from stream
 * 
 *  Examples:
 * 
 *     Checksum.stream(mystream, (err, sum) => {
 *       console.log("Sum of stream: " + sum);
 *     });
 * 
 * @constructor
 * @param {ReadableStream} [stream] Stream to read
 * @param {Object} [options] Options for hashing (can be replaced by callback)
 * @param {Function} [callback] Callback(err, sum)
 *//**
 * @constructor
 * @param {ReadableStream} [stream] Stream to read
 * @param {Function} [callback] Callback(err, sum)
 *//**
 * Callback
 *
 * @callback ChecksumStreamCallback
 * @param {Error} [err] if Error
 * @param {String} [sum] sum (string)
 */
function ChecksumStream(stream = fs.ReadStream.prototype, options = {}, callback = (err, sum) => {}) {
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
        callback(err)
        return new Promise((resolve, reject) => { reject(err); });
    }

    stream.on('error', (err) => {
        callback(err);
    });

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
    return true;
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