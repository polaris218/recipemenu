"use strict";
require('dotenv').config()
const express = require('express');
const RouterWrapper = require('./RouterWrapper');
const DatabaseLayer = require('./DBLayer');
const Server = require('./Server');

// Launch server
let server = new Server(express, new RouterWrapper(express.Router()), DatabaseLayer);