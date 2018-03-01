var validatePhoneNumber = (phoneNumber) => {
    if (phoneNumber.length == 10) {
        return true;
    }
    return false;
}

module.exports = validatePhoneNumber;