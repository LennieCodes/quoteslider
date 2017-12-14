const wallpaper = require('wallpaper');
const fs = require('fs');
const request = require('request');
const config = require('./quoteslider.config.js');
const del = require('del');
const interval = 60000;
const path = '/Users/Lenny/Documents/applications/quoteslider/tmp/';
let index = 0;
// wrap in setInterval Function
setInterval(function() {
    const filename = 'wallpaper-' + index + '.jpg';
    const fullpath = path + filename;
    const imageNum = randomIntFromInterval(485, 5000000);

    del(path + '*.jpg').then(function() {
        
        request('https://quotefancy.com/download/' + imageNum + '/original/wallpaper.jpg')
        .pipe(fs.createWriteStream(fullpath))
        .on('finish', setWallpaper);

        index === 0 ? 1 : 0; // wallpaper won't change unless image name is different.

    });

}, interval)


function setWallpaper() {
    wallpaper.set(fullpath).then(() => {
        console.log('wallpaper replaced');
    })
}

// https://stackoverflow.com/questions/4959975/generate-random-number-between-two-numbers-in-javascript
function randomIntFromInterval(min,max) {
    return Math.floor(Math.random()*(max-min+1)+min);
}

