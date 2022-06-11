import { toggleMark, wrapIn } from "prosemirror-commands";
import setMark from "../commands/setMark";
import Extension from "../lib/Extension";
import { MarkdownSerializerState } from "prosemirror-markdown";
import { MarkType, Node as ProsemirrorNode } from "prosemirror-model";
export default abstract class Mark extends Extension {
  get type() {
    return "mark";
  }

  abstract get schema();


  get toMarkdown(): Record<string, any> {
    return {};
  }

  // toMarkdownIden(state, node) {
  //   console.error("toMarkdown not implemented", state, node);
  //   // return {};
  // }

  parseMarkdown() {
    return {};
  }

  commands({ type, schema }) {
    if (type.name == 'color' || type.name == 'fonts') {
      return () => schema
    } else {
      return () => toggleMark(type);
    }
  }

  get markdownToken(): string {
    return "";
  }
}
