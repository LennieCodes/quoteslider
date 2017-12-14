const wallpaper = require('wallpaper');
const fs = require('fs');
const request = require('request');
const config = require('./quoteslider.config.js');

// wrap in setInterval Function

let filename = 'wallpaper-' + createHash(4) + '.jpg';
const path = '/Users/Lenny/Documents/applications/quoteslider/dist/';
const fullpath = path + filename;

request('https://quotefancy.com/download/64000/original/wallpaper.jpg')
    .pipe(fs.createWriteStream(fullpath))
    .on('finish', setWallpaper);

function setWallpaper() {
    wallpaper.set(fullpath).then(() => {
        console.log('done');
    })
}

