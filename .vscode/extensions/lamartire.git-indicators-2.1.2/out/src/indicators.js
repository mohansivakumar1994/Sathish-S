"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode_1 = require("vscode");
const gitDiffReader_1 = require("./lib/gitDiffReader");
class Indicators {
    constructor() {
        this.indicators = null;
        this.fsWatcher = null;
        this.reader = null;
    }
    activate() {
        const { rootPath } = vscode_1.workspace;
        const fsWatcher = vscode_1.workspace.createFileSystemWatcher(`${rootPath}/**/*`);
        this.indicators = this.create(vscode_1.StatusBarAlignment.Left);
        if (!this.reader) {
            this.reader = new gitDiffReader_1.GitDiffReader(rootPath, fsWatcher);
            this.reader.on('data', this.handleReaderData.bind(this));
            this.reader.on('error', this.handleReaderError.bind(this));
        }
    }
    create(aligment) {
        let indicators = vscode_1.window.createStatusBarItem(aligment, 10);
        indicators.text = '';
        indicators.tooltip = '';
        indicators.command = 'workbench.view.scm';
        return indicators;
    }
    deactivate() {
        this.reader.removeListener('data', this.handleReaderData);
        this.reader.removeListener('error', this.handleReaderError);
        this.reader = null;
        this.fsWatcher = null;
        this.indicators.hide();
    }
    handleReaderData(data) {
        this.updateIndicators(data);
    }
    handleReaderError(err) {
        vscode_1.window.showErrorMessage(err);
    }
    formatTooltipText(data) {
        const { added, removed, filesCount } = data;
        const tooltipParts = [];
        if (filesCount) {
            tooltipParts.push(`affected files: ${filesCount}`);
        }
        if (added) {
            tooltipParts.push(`insertions: +${added}`);
        }
        if (removed) {
            tooltipParts.push(`deletions: -${removed}`);
        }
        if (tooltipParts.length > 0) {
            const tooltipText = tooltipParts.join(', ');
            return `${tooltipText.charAt(0).toUpperCase()}${tooltipText.slice(1)}`;
        }
        return 'Git indicators';
    }
    formatStatusBarItemText(data) {
        const { added, removed, filesCount } = data;
        const source = filesCount ? [`$(diff) ${filesCount}`] : [];
        if (added && removed) {
            source.push(`$(diff-modified) +${added}, -${removed}`);
        }
        else if (added) {
            source.push(`$(diff-added) ${added}`);
        }
        else if (removed) {
            source.push(`$(diff-removed) ${removed}`);
        }
        if (source.length > 0) {
            return source.join('  ');
        }
        return '';
    }
    updateIndicators(data) {
        const statusBarText = this.formatStatusBarItemText(data);
        const tooltipText = this.formatTooltipText(data);
        if (statusBarText.length > 0) {
            this.indicators.text = statusBarText;
            this.indicators.tooltip = tooltipText;
            this.indicators.show();
        }
        else {
            this.indicators.hide();
            this.indicators.text = statusBarText;
            this.indicators.tooltip = tooltipText;
        }
    }
}
exports.default = Indicators;
//# sourceMappingURL=indicators.js.map