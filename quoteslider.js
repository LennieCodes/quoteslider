const wallpaper = require('wallpaper');
const fs = require('fs');
const request = require('request');
const config = require('./quoteslider.config.js');
const del = require('del');
const createHash = require('hash-generator');
let filename = '';

main();

function main() {
    if (config.shouldDelete) {
        del(path + '*.jpg').then(quoteSlider);
    }
    else {
        quoteSlider();    
    }
}

function quoteSlider() {
    const imageNum = randomIntFromInterval(485, 5000000);
    
    while (config.oldHash === config.newHash) {
        config.newHash = createHash(config.hashLength);
    }

    config.oldHash = config.newHash;
    config.filename = 'wallpaper-' + config.newHash + '.jpg';

    request('https://quotefancy.com/download/' + imageNum + '/original/wallpaper.jpg')
    .pipe(fs.createWriteStream(config.path + config.filename))
    .on('finish', finish);
}

function finish() {
    setWallpaper();
    setTimeout(main, config.interval);
}

function setWallpaper() {
    return wallpaper.set(config.path + config.filename).then(() => {
        console.log('wallpaper replaced');
    });
}

// https://stackoverflow.com/questions/4959975/generate-random-number-between-two-numbers-in-javascript
function randomIntFromInterval(min,max) {
    return Math.floor(Math.random()*(max-min+1)+min);
}

