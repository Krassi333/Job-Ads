function parseError(error) {
    if (error.name == 'ValidationError') {
        return Object.values(error.errors).map(v => v.message); //хваща грешките от mongoose(от моделите)
    } else if (Array.isArray(error)) {  //хваща грешките от express-validator
        return error.map(x => x.msg);
    } else {
        return error.message.split('\n');
    }

}

module.exports = {
    parseError
}