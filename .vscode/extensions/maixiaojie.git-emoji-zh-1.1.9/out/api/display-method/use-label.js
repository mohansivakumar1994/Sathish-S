"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function use_label(emoji) {
    return {
        label: `${emoji.emoji} ${emoji.description}`,
        code: emoji.code,
        emoji: emoji.code + ' ',
        description: '[' + emoji.name + ']',
    };
}
exports.use_label = use_label;
//# sourceMappingURL=use-label.js.map