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
```javascript
/*
 * Global options = Checksum.defaultoptions:
 *   {String} algorithm (default: sha1) -> hash algorithm, values depends on your OpenSSL, use Checksum.getHashes() for the list,
 *   {String} encoding (default: hex) -> encoding of the string
 */
var defaultoptions = Checksum.defaultoptions;

/* 
 * Checksum from string:
 *  Checksum(value, options) -> return String    (or Checksum.string())
 *   {String} value   -> String to hash,
 *   {Object} options -> Global options
 */
var sum = Checksum("Hello World!", { algorithm: 'md5' }); /* -> ed076287532e86365e841e92bfc50d8c */

if (sum == 'ed076287532e86365e841e92bfc50d8c') { console.log("Valid string!"); }

/* This is easy as that! */
```

> #### Hope you ❤️Enjoy my work, Leave a ⭐️Star if you found it useful to support me
