'use strict';

const fs = require('fs');
const Joi = require('joi');

const MESSAGE_TRACK_INDEX = 0;
const RECIPIENT_INDEX = 1;
const MESSAGE_INDEX = 2;
const FROM_INDEX = 4;


const validateBody = (body) => {
    const schema = Joi.object({
        name: Joi.string().min(1).max(30).required(),
        message: Joi.string().min(1).max(50).required(),
        from: Joi.string().min(1).max(30).required(),
    });

    return schema.validate({
        name: body.name,
        message: body.message,
        from: body.from
    });
}

const createJson = (body) => {
    return new Promise((resolve, reject) => {
        const valid = validateBody(body);

        if (valid.error) {
            reject(valid.error.details[0].message);
        }

        const name = body.name;
        const message = body.message;
        const from = body.from;

        fs.readFile(__dirname + '/template.json', 'utf-8', (err, data) => {
            if (err) {
                console.error(err);
                reject(err);
            }

            let jsonParsed = JSON.parse(data);

            jsonParsed.timeline.tracks[MESSAGE_TRACK_INDEX].clips[RECIPIENT_INDEX].asset.html = '<p>' + name + '</p>';
            jsonParsed.timeline.tracks[MESSAGE_TRACK_INDEX].clips[MESSAGE_INDEX].asset.html = '<p>' + message + '</p>';
            jsonParsed.timeline.tracks[MESSAGE_TRACK_INDEX].clips[FROM_INDEX].asset.html = '<p>' + from + '</p>';

            const json = JSON.stringify(jsonParsed);

            return resolve(json);
        });
    });
}

module.exports = {
    createJson
}
