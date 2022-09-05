"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("./types");
const isString = (text) => {
    return typeof text === "string" || text instanceof String;
};
const isDate = (date) => {
    return Boolean(Date.parse(date));
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return Object.values(types_1.Gender).includes(param);
};
const parseTextField = (input, fieldName) => {
    if (!input || !isString(input)) {
        throw new Error(`Incorrect or missing ${fieldName} info`);
    }
    return input;
};
const parseDate = (date) => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error("Incorrect or missing date of birth info");
    }
    return date;
};
const parseGender = (gender) => {
    if (!gender || !isGender(gender)) {
        throw new Error("Incorrect or missing gender info");
    }
    return gender;
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const toNewPatienEntry = (obj) => {
    const newEntry = {
        name: parseTextField(obj.name, "name"),
        dateOfBirth: parseDate(obj.dateOfBirth),
        gender: parseGender(obj.gender),
        occupation: parseTextField(obj.occupation, "occupation"),
        ssn: parseTextField(obj.ssn, "ssn"),
    };
    return newEntry;
};
exports.default = toNewPatienEntry;
