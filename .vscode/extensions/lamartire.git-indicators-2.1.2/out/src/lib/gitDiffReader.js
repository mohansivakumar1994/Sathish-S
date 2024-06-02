"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const stream_1 = require("stream");
const throttle_debounce_1 = require("throttle-debounce");
const exec_1 = require("./exec");
class GitDiffReader extends stream_1.Readable {
    constructor(workDir, fsWatcher) {
        super({
            objectMode: true
        });
        this.workDir = null;
        this.fsWatcher = null;
        this.inited = false;
        this.debouncedFsCahngesHandler = throttle_debounce_1.debounce(1250, this.fsCahngesHandler.bind(this));
        this.workDir = workDir;
        this.fsWatcher = fsWatcher;
    }
    getWorkDirCd() {
        if (this.workDir[1] === ':') {
            return `${this.workDir.slice(0, 2)} && cd ${this.workDir}`;
        }
        return `cd ${this.workDir}`;
    }
    getRawGitDiff(cdCommand) {
        return __awaiter(this, void 0, void 0, function* () {
            const rawDiff = yield exec_1.exec(`${cdCommand} && git diff --shortstat`);
            return rawDiff;
        });
    }
    getRawGitStatus(cdCommand) {
        return __awaiter(this, void 0, void 0, function* () {
            const rawStatus = yield exec_1.exec(`${cdCommand} && git status -s`);
            return rawStatus;
        });
    }
    getParsedGitDiff(cdCommand) {
        return __awaiter(this, void 0, void 0, function* () {
            const workDirCd = this.getWorkDirCd();
            try {
                const rawDiff = yield this.getRawGitDiff(workDirCd);
                const changedFiles = yield this.getRawGitStatus(workDirCd);
                const changedFilesCount = changedFiles.split('\n').length - 1;
                return this.parseGitDiff(rawDiff, changedFilesCount);
            }
            catch (err) {
                this.emitError(err);
            }
        });
    }
    fsCahngesHandler() {
        return __awaiter(this, void 0, void 0, function* () {
            const gitData = yield this.getParsedGitDiff(this.getWorkDirCd());
            this.push(gitData);
        });
    }
    parseGitDiff(rawDiff, filesCount) {
        if (rawDiff) {
            let added = 0;
            let removed = 0;
            rawDiff.split(', ').forEach(part => {
                const [value] = part.match(/\d+/g);
                if (part.includes('insertion')) {
                    added = value;
                }
                else if (part.includes('deletion')) {
                    removed = value;
                }
            });
            return {
                added,
                removed,
                filesCount
            };
        }
        return {
            added: 0,
            removed: 0,
            filesCount: 0
        };
    }
    emitError(err) {
        this.emit('error', err);
    }
    _read() {
        try {
            if (!this.inited) {
                this.inited = true;
                this.fsWatcher.onDidChange(this.debouncedFsCahngesHandler);
                this.fsWatcher.onDidDelete(this.debouncedFsCahngesHandler);
            }
        }
        catch (err) {
            console.error(`Git indicators error: ${err}`);
        }
    }
}
exports.GitDiffReader = GitDiffReader;
//# sourceMappingURL=gitDiffReader.js.map