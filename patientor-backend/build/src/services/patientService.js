"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const patients_1 = __importDefault(require("../../data/patients"));
const types_1 = require("../types");
const uuid_1 = require("uuid");
const patients = patients_1.default;
const getPatient = (id) => {
    var _a;
    const patientFound = patients_1.default.find((p) => p.id === id);
    if (patientFound) {
        const gender = (_a = Object.entries(types_1.Gender).find(([_key, value]) => value === patientFound.gender)) === null || _a === void 0 ? void 0 : _a[0];
        return Object.assign(Object.assign({}, patientFound), { gender });
    }
    else {
        return null;
    }
};
const getEntries = () => {
    return patients;
};
const addPatient = (entry) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    const id = (0, uuid_1.v1)();
    const newPatientEntry = Object.assign({ id }, entry);
    patients.push(newPatientEntry);
    return newPatientEntry;
};
exports.default = {
    getEntries,
    getPatient,
    addPatient,
};
