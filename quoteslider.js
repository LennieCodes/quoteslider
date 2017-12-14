const wallpaper = require('wallpaper');
const fs = require('fs');
const request = require('request');
const config = require('./quoteslider.config.js');
const del = require('del');
const interval = 60000;
const path = '/Users/Lenny/Documents/applications/quoteslider/tmp/';
let index = 0;
let filename =  'wallpaper-' + index + '.jpg';
let fullpath = path + filename;

// wrap in setInterval Function

main();

setInterval(main, interval);

function main() {
    const imageNum = randomIntFromInterval(485, 5000000);

    del(path + '*.jpg').then(function() {
        
        request('https://quotefancy.com/download/' + imageNum + '/original/wallpaper.jpg')
        .pipe(fs.createWriteStream(fullpath))
        .on('finish', setWallpaper)
        .then(function() {
            filename = index === 0 ?  'wallpaper-' + 1 + '.jpg' :  'wallpaper-' + 0 + '.jpg'; // wallpaper won't change unless image name is different.
            index = index === 0 ? 1 : 0;
            fullpath = path + filename;
        }); 
       
    });
}

function setWallpaper() {
    return wallpaper.set(fullpath).then(() => {
        console.log('wallpaper replaced');

    });
}

// https://stackoverflow.com/questions/4959975/generate-random-number-between-two-numbers-in-javascript
function randomIntFromInterval(min,max) {
    return Math.floor(Math.random()*(max-min+1)+min);
}

