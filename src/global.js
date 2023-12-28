// Import the 'express' module
const express = require('express');

// Extend the 'Request' object
express.Request.prototype.user = undefined;
express.Request.prototype.session = undefined;
