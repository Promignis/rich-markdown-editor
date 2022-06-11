import { toggleMark, wrapIn } from "prosemirror-commands";
import markInputRule from "../lib/markInputRule";
import Mark from "./Mark";
import markRule from "../rules/mark";
import ExtensionManager from "../lib/ExtensionManager";

var color:string
export default class Color extends Mark { 
  delim: string
  ext: ExtensionManager
  get name() {
    return "color";
  }

  getColor(abc) {
    if (abc) {
      color = abc
      const aa = {
        color: {
          open: `##-${color}-`,
          close: "##",
          mixable: true,
          expelEnclosingWhitespace: true,
          escape: true
        }
      }
      return
      // return new MarkdownSerializer({},aa)
      // return this.ext?.serializer()
    } else return
  }

  get schema() {

    return {
      attrs: {
        color: {
          default: null
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
        // this.getColor(node.attrs.color)
        return ["span", {
          class: `custom-color`,
          style: `color:${node.attrs.color}`,
          color: `${node.attrs.color}`
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
    return [markRule({ delim: '##', mark: "color" })];
  }


  get toMarkdown() {
    return {
      // open: `##-${color}-`,
      open: "##",
      close: "##",
      mixable: true,
      expelEnclosingWhitespace: true,
      escape:true
    };
  }

  

  parseMarkdown() {
    return {
      mark: "color",
      getAttrs: token => ({
        color: token.attrGet("color"),
      }),
    };;
  }
}
