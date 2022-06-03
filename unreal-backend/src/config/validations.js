import _ from 'lodash';
import moment from 'moment';
import validUrl from 'valid-url';

export const errorFormatterV2 = error => ({
    param: error.param,
    message: error.msg,
    value: error.value,
    location: error.location,
    nestedErrors: error.nestedErrors
});

export const customValidators = {
    isNumber: value => _.isNumber(value),
    isArray: value => Array.isArray(value),
    isNumArray: array => {
        let isNum = true;
        array.forEach(value => {
            if (!_.isNumber(value)) isNum = false;
        });
        return isNum;
    },
    isValidPercentage: value => value >= 0 && value <= 100,
    arrayElemNotDuplicated: array => {
        if (array && array.length > 1) {
            let values = _.filter(array, (value, index, iteratee) => _.includes(iteratee, value, index + 1));

            if (values.length) return false;
            else return true;
        } else {
            return true;
        }
    },
    arrayIsNotEmpty: array => {
        if (array && array.length) {
            return true;
        } else {
            return false;
        }
    },
    isUserIdValid: value => /^(\+\d{1,3}[- ]?)?\d{10}$/.test(value) ||
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value),
    isDeviceTypeValid: value => value == global.config.deviceTypes[0] || value == global.config.deviceTypes[1],
    isUserTypeValid: value => value == global.config.userTypes[0] || value == global.config.userTypes[1],
    isPhoneNumberValid: value => {
        let regex = /^(?:(?:\+?1\s*(?:[.-]\s*)?)?(?:\(\s*([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9])\s*\)|([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]))\s*(?:[.-]\s*)?)?([2-9]1[02-9]|[2-9][02-9]1|[2-9][02-9]{2})\s*(?:[.-]\s*)?([0-9]{4})(?:\s*(?:#|x\.?|ext\.?|extension)\s*(\d+))?$/;
        let IndoRegex = /^(\+62 ((\d{3}([ -]\d{3,})([- ]\d{4,})?)|(\d+)))|(\(\d+\) \d+)|\d{3}( \d+)+|(\d+[ -]\d+)|\d+$/;
        return /^((\+92)|(0092)|(92))-{0,1}\d{3}-{0,1}\d{7}$|^\d{11}$|^\d{4}-\d{7}$/.test(value) || regex.test(value) || IndoRegex.test(value);
    },
    isLatLongValid: value => /^(\-?\d+(\.\d+)?),\s*(\-?\d+(\.\d+)?)$/.test(value),
    nonNegative: value => value >= 0,
    isValidDateAndTime: value => moment(value).isValid(),
    isValidDate: value => moment(value, 'DD-MM-YYYY').isValid(),
    isValidEmailOrPhone: value => {
        if (/^(\+\d{1,3}[- ]?)?\d{10}$/.test(value)) {
            return true;
        } else if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
            return true;
        } else {
            return false;
        }
    },
    isValidCurrentOrFutureDate: value => {
        let date = moment(value);
        let currentDate = moment().unix();
        return moment(date).isAfter(currentDate);
    },
    isValidEmail: value => /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value),
    isValidObjectId: value => {
        let checkForHexRegExp = new RegExp('^[0-9a-fA-F]{24}$');

        if (checkForHexRegExp.test(value)) {
            return true;
        } else {
            return false;
        }
    },
    isValidDeviceType: value => {
        if (value === 'android' || value === 'ios' || value === 'web') {
            return true;
        } else {
            return false;
        }
    },
    isValidWhoWillValue: value => {
        value = parseInt(value);
        if (value === 1 || value === 2 || value === 3) {
            return true;
        } else {
            return false;
        }
    },
    isMessageContainsContent: ({ length }) => {
        if (length > 0) {
            return true;
        } else {
            return false;
        }
    },
    isValidUrl: value => {
        if (value) {
            if (validUrl.isUri(value)) {
                return true;
            } else {
                return false;
            }
        } else {
            return true;
        }
    },
    validateAge: value => {
        if (value) {
            let dob = moment(value, 'DD-MM-YYYY');
            let years = moment().diff(dob, 'years');
            if (years >= 18) {
                return true;
            } else {
                return false;
            }
        } else {
            return true;
        }
    },
    isValidName: name => {
        let regex = /^[a-zA-Z ]{2,30}$/;
        if (regex.test(name)) {
            return true;
        } else {
            return false;
        }
    },
    isValidDistanceArea: value => {
        if (value) {
            if (value > -1 && value < 501) {
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    },
    isValidImageIndex: value => {
        if (value && (value > -1 && value <= 5)) {
            return true;
        } else {
            return false;
        }
    },
    isValidSlotMinutes: minutes => {
        if (minutes === 0 || minutes === 15 || minutes === 30 || minutes === 45) {
            return true;
        } else {
            return false;
        }
    },
    isValidCurrentOrFutureUnixTimeStamp: value => {
        let date = moment.unix(value);
        let currentDate = moment();
        return moment(date).isAfter(currentDate);
    },
    isValidAddressType: type => {
        if (type === 'Home' || type === 'Work' || type === 'Other') {
            return true;
        } else {
            return false;
        }
    },
    isArrayNotEmpty: ({ length }) => {
        if (length) {
            return true;
        }
        return false;
    },
    isValidUnixTimeStamp: value => moment.unix(value).isValid(),
    isBoolean: value => _.isBoolean(value),
    isValidPassword: ({ length }) => {
        if (length < 8) {
            return false;
        }
        return true;
    },
    isValidHour: value => {
        if (value.length < 0 || value > 23) {
            return false;
        }
        return true;
    },
    isValidMinute: value => {
        if (value.length < 0 || value > 59) {
            return false;
        }
        return true;
    },
    isValidMonth: value => {
        if (value < 0 || value > 11) {
            return false;
        }
        return true;
    },
    isValidYear: value => {
        if (value < 1900 || value > moment().year()) {
            return false;
        }
        return true;
    },
    enum: (value, options) => {
        if (options.includes(value)) {
            return true;
        }
        return false;
    },
    validateRadius: (value) => {
        const reg = /^\d+$/;
        if (reg.test(value)) {
            if (value <= 0) {
                return false;
            }
            return true;
        } else {
            return false;
        }
    }
};