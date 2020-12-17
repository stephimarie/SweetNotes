const express = require("express");
const path = require("path");
const db = require("./db/db.json");
const uniqid = require("uniqid");
const fs = require("fs");


const app = express();
const PORT = process.env.Port || 5000;
