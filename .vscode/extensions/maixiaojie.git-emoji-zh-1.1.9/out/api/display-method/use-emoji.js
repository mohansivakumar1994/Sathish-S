"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function use_emoji(emoji) {
    return {
        label: `${emoji.emoji} ${emoji.description}`,
        code: emoji.code,
        emoji: emoji.emoji + ' ',
        description: '[' + emoji.name + ']',
    };
}
exports.use_emoji = use_emoji;
//# sourceMappingURL=use-emoji.js.map