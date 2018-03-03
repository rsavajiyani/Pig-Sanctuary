//validates phone number length; used as our unit test

var validatePhoneNumber = (phoneNumber) => {
    if (phoneNumber.length == 10) {
        return true;
    }
    return false;
}

module.exports = validatePhoneNumber;