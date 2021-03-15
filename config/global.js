
module.exports = function (global) {
	global.flatry = require('flatry');
	global.bcrypt = require('bcryptjs');
	global.crypto = require("crypto");
	global.express = require('express');
	global.mongoose = require('mongoose');
	global.moment = require('moment');
	global.momenttz = require('moment-timezone');
	global.axios = require('axios');
	global.async = require('async');
	global.qs = require('qs');
	global.urlexist = require('url-exist-sync');
	global.response = require('./response');
	// global.timestamp = Math.floor(Date.now() / 1000)
}
