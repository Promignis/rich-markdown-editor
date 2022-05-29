import {
    ySyncPlugin,
    yCursorPlugin,
    yUndoPlugin,
    undo,
    redo,
  } from "y-prosemirror";
  import { keymap } from "prosemirror-keymap";
  import * as Y from "yjs";
  import Extension from "../lib/Extension";
  
  export default class MultiplayerExtension extends Extension {
    get name() {
      return "multiplayer";
    }
  
    get plugins() {
      const { provider, document: doc, roomName } = this.options;
      const type = doc.get(roomName, Y.XmlFragment);

      return [
        ySyncPlugin(type),
        yCursorPlugin(provider.awareness),
        yUndoPlugin(),
        keymap({
          "Mod-z": undo,
          "Mod-y": redo,
          "Mod-Shift-z": redo,
        }),
      ];
    }
  }
  