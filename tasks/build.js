const webserver = require('gulp-webserver');
const vfs = require("vinyl-fs");
const browserify = require("browserify");
const watchify = require("watchify");
const babelify = require('babelify');
const fs = require('fs');
const server = require('./server');

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

if(process.env.NODE_ENV !== "production"){
    vfs.src("./")
        .pipe(webserver({
            port:8000,
            livereload: true,
            middleware:(req,res,next)=>{
                res.end("You cannot use this port. This port is for livereload.");
            }
        }));
}

server();