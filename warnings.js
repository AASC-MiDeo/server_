const config = require('./config');

function checkWarnings(helmet, temperature, sound, gas) {
    const conditions = [
        { condition: helmet === 0, message: "Helmet is not worn!", errorCode: config._HELMET_WARNING },
        { condition: temperature > config.TEMPERATURE_THRESHOLD, message: `Temperature exceeded ${config.TEMPERATURE_THRESHOLD}°C!`, errorCode: config._TEMPERATURE_WARNING },
        { condition: sound > config.SOUND_THRESHOLD, message: `Sound level exceeded ${config.SOUND_THRESHOLD}dB!`, errorCode: config._SOUND_WARNING },
        { condition: gas > config.GAS_THRESHOLD, message: `Gas concentration exceeded ${config.GAS_THRESHOLD}ppm!`, errorCode: config._GAS_WARNING }
    ];

    let errNum = [];
    let warnings = [];

    conditions.forEach(({ condition, message, errorCode }) => {
        if (condition) {
            warnings.push(message);
            errNum.push(errorCode);
        }
    });

    return [errNum, warnings];
}

module.exports = checkWarnings;
