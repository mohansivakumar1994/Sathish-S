"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const childProcess = require("child_process");
const tp = require("typed-promisify");
exports.exec = tp.promisify(childProcess.exec);
//# sourceMappingURL=exec.js.map