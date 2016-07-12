const webserver = require('gulp-webserver');
const vfs = require("vinyl-fs");
const browserify = require("browserify");
const watchify = require("watchify");
const babelify = require('babelify');
const fs = require("fs");
const http = require('http');
const express = require('express');
const proxy = require('./proxy');
const app = express();

const bundler = browserify({
                    entries: ["src/index.js"],
                    debug: true,
                    extensions: ['.js', '.jsx', '.css'],
                })
                .transform("babelify", {
                    presets: ["es2015", "react"]
                })
                .plugin(watchify);

const rebundle = ()=>{
    const date = new Date();
    bundler
        .bundle()
        .on("data",(e)=>{
            process.stdout.write("loading...\r");
        })
        .on("error", (e)=>{
            console.log(e);
        })
        .on("end", ()=>{
            console.log(`[${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}] browserify compile success.`);
        })
        .pipe(fs.createWriteStream('dest/app.js'));
};

bundler.on("update", rebundle);
rebundle();

app.all('/proxy/?*',proxy());

http.createServer(app).listen(3000, function (e) {
    console.log("express server listening on port 3000")
});

vfs.src("./")
    .pipe(webserver({
        livereload: true,
        proxies:[{
            source: './',
            port:3000,
            target:'https://api.twitter.com/1.1',
            options: {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Headers': '*'
                }
            }
        }]
    }));