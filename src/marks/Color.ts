import { toggleMark } from "prosemirror-commands";
import markInputRule from "../lib/markInputRule";
import Mark from "./Mark";
import markRule from "../rules/mark";

export default class Color extends Mark {
  get name() {
    return "color";
  }

  get schema() {
    
    return {
      attrs: {
        color:{
          default:'red'
        }
      },
      parseDOM: [
        { tag: "span" },
        { tag: "label" },
        { style: "color", getAttrs: value => value === "red" },
      ],
      toDOM: (node) => ["span", { style: `color:${node.attrs.color}`}],
    };
  }

  inputRules({ type }) {
    
    return [markInputRule(/(?:\#\#)([^#]+)(?:\#\#)$/, type)];
  }

  keys({ type }) {    
    return {
      "Mod-^": toggleMark(type),
      "Mod-f": toggleMark(type),
    };
  }


  get toMarkdown() {
    return {
      open: "##",
      close: "##",
      mixable: true,
      expelEnclosingWhitespace: true,
    };
  }

  parseMarkdown() {
    return { mark: "span" };
  }
}
