# ChecksumJS

Node checksum utility - Simple as Useful

[![Build Status](https://travis-ci.com/Loxoz/ChecksumJS.svg?branch=master)](https://travis-ci.com/Loxoz/ChecksumJS)
[![NPM version](https://img.shields.io/npm/v/checksumjs.svg)](https://npmjs.org/package/checksumjs)

### Import:

```javascript
const Checksum = require("checksumjs");
/* as standalone in your ./libs folder (download from github) */
const Checksum = require("./libs/Checksum.js");
```

### Example & Tutorial:

Note: they don't actually returns Promises for this experimental commit, coming later.

```javascript
/**
 * Global options = Checksum.defaultoptions:
 *   {String} algorithm (default: sha1)
 *    -> hash algorithm, values depends on your OpenSSL,
 *       use Checksum.getHashes() for the list,
 *   {String} encoding (default: hex)
 *    -> encoding of the string
 */
var defaultoptions = Checksum.defaultoptions;

/**
 * Checksum from string:
 *  Checksum(value, options) -> return String
 *   {String} value   -> String to sum from hash,
 *   {Object} options -> Global options
 */
var sum = Checksum("Hello World!", { algorithm: 'md5' });
/* -> ed076287532e86365e841e92bfc50d8c */

if (sum == 'ed076287532e86365e841e92bfc50d8c') {
    console.log("Valid string!");
}

/**
 * Checksum from file:
 *  Checksum.file(file,[ options,][ callback]) -> return Promise
 *   {File} file           -> file to checksum
 *   {Object} [options]    -> Global options
 *   {Function} [callback] -> callback function
 */
Checksum.file("archive.zip", (err, sum) => {
    if (sum == 'blah') {
        console.log("Valid archive!");
    }
});

Checksum.file("archive.zip", { algorithm: 'md5' }, (err, sum) => {
    console.log("Archive md5: " + sum);
});

/**
 * Checksum from stream:
 *  Checksum.stream(stream,[ options,][ callback]) -> return Promise
 *   {Stream} stream       -> stream to checksum
 *   {Object} [options]    -> Global options
 *   {Function} [callback] -> callback function
 */
Checksum.stream(mystream, (err, sum) => {
    console.log("Sum of stream: " + sum);
});

/**
 * Get available hashes:
 *  Checksum.getHashes() -> return Array of string
 */
if (Checksum.getHashes().indexOf('sha1') >= 0) {
    console.log('sha1 hash supported!');
} else {
    console.log('aww! sha1 hash not avalible here');
}

/* This is easy as that! */
```

_wink to checksum package_ 😉

> #### Hope you ❤️Enjoy my work, Leave a ⭐️Star if you found it useful to support me
