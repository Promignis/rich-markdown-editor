import { InputRule, wrappingInputRule } from "prosemirror-inputrules";
import nameToEmoji from "gemoji/name-to-emoji.json";
import Node from "./Node";
import emojiRule from "../rules/emoji";
import markRule from "../rules/mark";
import mentionsRule from "../rules/mentions";

export default class Mention extends Node {
  get name() {
    return "mention";
  }

  get schema() {
    return {
      attrs: {
        style: {
          default: "",
        },
        "data-name": {
          default: undefined,
        },
      },
      inline: true,
      content: "text*",
      marks: "",
      group: "inline",
      selectable: false,
      parseDOM: [
        {
          tag: "span.mention",
          preserveWhitespace: "full",
          getAttrs: (dom: HTMLDivElement) => ({
            "data-name": dom.dataset.name,
          }),
          contentElement: ".mention"
        },
      ],
      toDOM: node => {
        let mention = document.createElement("span")
        mention.innerText = `@${node.attrs["data-name"]}`
        mention.addEventListener('click', () => {
          console.log('clik',node.attrs["data-name"]);
        })
        return [
          "span",
          {
            class: "mention",
            "data-name": node.attrs["data-name"],
          },
          mention,
        ];
      },
    };
  }

  get rulePlugins() {
    return [mentionsRule];
  }

  commands({ type }) {
    return attrs => (state, dispatch) => {
      const { selection } = state;
      const position = selection.$cursor
        ? selection.$cursor.pos
        : selection.$to.pos;
      const node = type.create(attrs);
      const transaction = state.tr.insert(position, node);
      dispatch(transaction);
      return true;
    };
  }

  inputRules({ type }) {    
    return [
      new InputRule(/^\@([a-zA-Z0-9_+-]+)\@$/, (state, match, start, end) => {
        const [okay, markup] = match;
        const { tr } = state;
        if (okay) {
          tr.replaceWith(
            start - 1,
            end,
            type.create({
              "data-name": markup,
              markup,
            })
          );
        }
        return tr;
      }),
    ];
  }

  toMarkdown(state, node) {
    const name = node.attrs["data-name"];
    if (name) {
      const label = state.esc(name || '');
      const uri = state.esc(`mention://${name}/${name}`);
      state.write(`@[${label}](${uri})`);
    }
  }

  parseMarkdown() {
    return {
      node: "mention",
      getAttrs: tok => {        
        return { "data-name": tok.mention.type.trim() };
      },
    };
  }
}