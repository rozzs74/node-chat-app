const moment = require('moment');

const generateMessage = (from, text) => {
    return {
        from,
        text,
        createdAt: getTime()
    }
};

const generateLocationMessage = (from, latitude, longitude) => {
    return {
        from,
        url: `https://www.google.com/maps?q=${latitude},${longitude}`,
        createdAt: getTime()
    }
};

const getTime = () => {
    return moment().valueOf();
}

module.exports = { generateMessage, generateLocationMessage };