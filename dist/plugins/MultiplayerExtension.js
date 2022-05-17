"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const y_prosemirror_1 = require("y-prosemirror");
const prosemirror_keymap_1 = require("prosemirror-keymap");
const Y = __importStar(require("yjs"));
const Extension_1 = __importDefault(require("../lib/Extension"));
const y_websocket_1 = require("y-websocket");
class MultiplayerExtension extends Extension_1.default {
    get name() {
        return "multiplayer";
    }
    get plugins() {
        let { provider, document: doc, type } = this.options;
        doc = new Y.Doc();
        provider = new y_websocket_1.WebsocketProvider('ws://localhost:1234', 'another', doc);
        type = doc.get("another", Y.XmlFragment);
        return [
            y_prosemirror_1.ySyncPlugin(type),
            y_prosemirror_1.yCursorPlugin(provider.awareness),
            y_prosemirror_1.yUndoPlugin(),
            prosemirror_keymap_1.keymap({
                "Mod-z": y_prosemirror_1.undo,
                "Mod-y": y_prosemirror_1.redo,
                "Mod-Shift-z": y_prosemirror_1.redo,
            }),
        ];
    }
}
exports.default = MultiplayerExtension;
//# sourceMappingURL=MultiplayerExtension.js.map