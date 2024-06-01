const config = require('./config');

function validateInputs(helmet, temperature, sound, gas) {
    //데이터 입력값 유효성 검사를 위한 코드 
    if (isNaN(helmet) || isNaN(temperature) || isNaN(sound) || isNaN(gas)) {
        return { isValid: false, message: "Invalid input values" };
    }

    if (helmet !== 0 && helmet !== 1) {
        return { isValid: false, message: "Helmet must be 0 or 1" };
    }

    if (temperature < config.TEMPERATURE_RANGE.MIN || temperature > config.TEMPERATURE_RANGE.MAX) {
        return { isValid: false, message: `Temperature out of range (${config.TEMPERATURE_RANGE.MIN} to ${config.TEMPERATURE_RANGE.MAX}°C)` };
    }
    if (sound < config.SOUND_RANGE.MIN || sound > config.SOUND_RANGE.MAX) {
        return { isValid: false, message: `Sound level out of range (${config.SOUND_RANGE.MIN} to ${config.SOUND_RANGE.MAX}dB)` };
    }
    if (gas < config.GAS_RANGE.MIN || gas > config.GAS_RANGE.MAX) {
        return { isValid: false, message: `Gas concentration out of range (${config.GAS_RANGE.MIN} to ${config.GAS_RANGE.MAX}ppm)` };
    }

    return { isValid: true };
}

module.exports = validateInputs;
