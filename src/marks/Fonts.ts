import { toggleMark } from "prosemirror-commands";
import markInputRule from "../lib/markInputRule";
import Mark from "./Mark";
import markRule from "../rules/mark";
import getMarkAttrs from "../lib/getMarkAttrs";
import { EditorView } from "prosemirror-view";

export default class Fonts extends Mark  {
 
  get name() {
    return "fonts";
  }
  
  get schema() {
    return {
      attrs: {
        fontSize: {
          default: ''
        }
      },
      parseDOM: [
        {
          tag: "span",
          getAttrs: node => ({ fontSize: node.getAttribute('font-size') })
        }
      ],
      toDOM: (node) => {
        return ["span", {
          class: `custom-font ${node.attrs.fontSize}`,
          style: `font-size:${node.attrs.fontSize}px`
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
    return {};
  }

  get rulePlugins() {
    return [markRule({ delim: "^^", mark: "fonts" })];
  }

  get toMarkdown() {
    return {
      open: "^^",
      close: "^^",
      mixable: true,
      expelEnclosingWhitespace: true,
      escape:true
    };
  }

  parseMarkdown() {
    return { mark: "fonts" };
  }

}
