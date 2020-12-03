'use strict';

const fs = require('fs');

const MESSAGE_INDEX = 1;

const createJson = function (body) {
    return new Promise((resolve, reject) => {
        const name = body.name;
        const message = body.message;

        fs.readFile(__dirname + '/template.json', 'utf-8', function (err, data) {
            if (err) {
                console.error(err);
                reject(err);
            }

            let jsonParsed = JSON.parse(data);

            jsonParsed.timeline.tracks[MESSAGE_INDEX].clips[1].asset.html = '<p>'+name+'</p>';
            jsonParsed.timeline.tracks[MESSAGE_INDEX].clips[4].asset.html = '<p>'+message+'</p>';

            const json = JSON.stringify(jsonParsed);

            return resolve(json);
        });
    });
}

module.exports = {
    createJson
}