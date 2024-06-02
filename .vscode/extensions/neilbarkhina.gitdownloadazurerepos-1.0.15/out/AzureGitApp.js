"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
class AzureGitApp {
    constructor(statusbar) {
        this.command1 = '';
        this.command2 = '';
        this.command3 = '';
        this.showStatusBar = true;
        this.sortByLastCommit = false;
        this.resuseExistingTerminal = false;
        this.insertPat = false;
        this.statusBar = statusbar;
        this.refreshSettings();
        vscode.workspace.onDidChangeConfiguration((event) => {
            //show or hide status bar if config was updated
            if (event.affectsConfiguration('azuregit.settings.showStatusBar')) {
                this.refreshSettings();
                if (this.showStatusBar)
                    this.statusBar.show();
                else
                    this.statusBar.hide();
            }
        });
    }
    refreshSettings() {
        this.command1 = vscode.workspace.getConfiguration('azuregit.settings').get('command1');
        this.command2 = vscode.workspace.getConfiguration('azuregit.settings').get('command2');
        this.command3 = vscode.workspace.getConfiguration('azuregit.settings').get('command3');
        this.showStatusBar = vscode.workspace.getConfiguration('azuregit.settings').get('showStatusBar');
        this.sortByLastCommit = vscode.workspace.getConfiguration('azuregit.settings').get('sortByLastCommit');
        this.resuseExistingTerminal = vscode.workspace.getConfiguration('azuregit.settings').get('reuseTerminal');
        this.insertPat = vscode.workspace.getConfiguration('azuregit.settings').get('insertPat');
    }
}
exports.AzureGitApp = AzureGitApp;
//# sourceMappingURL=AzureGitApp.js.map