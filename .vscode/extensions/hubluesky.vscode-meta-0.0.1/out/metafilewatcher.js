'use strict';
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
exports.deactivate = exports.activate = void 0;
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require("vscode");
const path = require("path");
const fs = require("fs");
let watcher;
let justCreated;
function activate(context) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("Activate Unity & CocosCreator Meta files watcher!");
        watcher = vscode.workspace.createFileSystemWatcher("**/*");
        watcher.onDidCreate(uri => {
            //Ignore meta file
            if (uri.fsPath.endsWith(".meta")) {
                return;
            }
            //Ignore file operations done outside of vscode
            if (!vscode.window.state.focused) {
                return;
            }
            if (justCreated !== undefined) {
                if (uri.fsPath.indexOf(justCreated.fsPath) >= 0) {
                    //Change folder name
                    return;
                }
            }
            //console.log("OnCreate " + uri);
            setTimeout(() => justCreated = undefined, 200);
            justCreated = uri;
        });
        watcher.onDidDelete(uri => {
            //Ignore meta file
            if (uri.fsPath.endsWith(".meta")) {
                return;
            }
            //Ignore file operations done outside of vscode
            if (!vscode.window.state.focused) {
                return;
            }
            //console.log("OnDelete " + uri);
            if (justCreated !== undefined) {
                var justCreatedFsPath = justCreated.fsPath;
                var justDeletedFsPath = uri.fsPath;
                var justCreatedPath = path.parse(justCreatedFsPath);
                var justDeletedPath = path.parse(justDeletedFsPath);
                if (justCreatedPath.dir === justDeletedPath.dir) {
                    //change file name
                    //console.log("FileName changed from " + justDeletedPath.base + " " + justCreatedPath.base);
                    fs.exists(justDeletedFsPath + ".meta", (exist) => {
                        if (exist) {
                            fs.rename(justDeletedFsPath + ".meta", justCreatedFsPath + ".meta", () => { });
                        }
                    });
                }
                else if (justCreatedPath.base === justDeletedPath.base) {
                    //change file location
                    //console.log("File moved from " + justDeletedPath.dir + " " + justCreatedPath.dir);
                    fs.exists(justDeletedFsPath + ".meta", (exist) => {
                        if (exist) {
                            fs.rename(justDeletedFsPath + ".meta", justCreatedFsPath + ".meta", () => { });
                        }
                    });
                }
            }
            else {
                //Just normal delete
                //console.log("File delete from " + uri.fsPath);
                fs.exists(uri.fsPath + ".meta", (exist) => {
                    if (exist) {
                        fs.unlink(uri.fsPath + ".meta", () => { });
                    }
                });
            }
        });
        //watcher.onDidChange(uri => {
        //    console.log("OnChange " + uri)
        //});
    });
}
exports.activate = activate;
function deactivate() {
    return __awaiter(this, void 0, void 0, function* () {
        if (watcher !== undefined) {
            watcher.dispose();
        }
    });
}
exports.deactivate = deactivate;
//# sourceMappingURL=metafilewatcher.js.map