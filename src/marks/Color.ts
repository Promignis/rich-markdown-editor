import { toggleMark, wrapIn } from "prosemirror-commands";
import markInputRule from "../lib/markInputRule";
import Mark from "./Mark";
import markRule from "../rules/mark";
import getMarkAttrs from "../lib/getMarkAttrs";
import toggleBlockType from "../commands/toggleBlockType";

export default class Color extends Mark { 
  get name() {
    return "color";
  }
  
  get schema() {  
    return {
      attrs: {
        color: {
          default: ''
        }
      },
      group: "block",
      content: "inline*",
      parseDOM: [
        {
          tag: "span",
          getAttrs: node => ({ color: node.getAttribute('color') })
        }
      ],
      toDOM: (node) => {
        return ["span", {
          class: `class-color${node.attrs.color}`,
          style: `color:${node.attrs.color}`
        },
          0
        ]
      },
    };
  }

  inputRules({ type }) { 
    return []
  }

  keys({ type }) {    
    return {
      // "Mod-^": toggleMark(type),
      // "Mod-f": toggleMark(type),
    };
  }

  get rulePlugins() {
    return [markRule({ delim: "##", mark: "color" })];
  }

  get toMarkdown() {
    return {
      open: "##",
      close: "##",
      mixable: true,
      expelEnclosingWhitespace: true,
      escape:true
    };
  }

  parseMarkdown() {
    return { mark: "color" };
  }
}
