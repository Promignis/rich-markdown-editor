import React from "react";
import gemojies from "gemoji";
import FuzzySearch from "fuzzy-search";
import CommandMenu, { Props } from "./CommandMenu";
import EmojiMenuItem from "./EmojiMenuItem";
import MentionMenuItem from "./MentionMenuItem";

type Emoji = {
  name: string;
  title: string;
  //   emoji: string;
  email: string;
  attrs: { markup: string; "data-name": string };
};

const people = [{
  name: {
    firstName: 'Jesse',
    lastName: 'Bowen',
  },
  state: 'Seattle',
},
{
  name: {
    firstName: 'juniad',
    lastName: 'Bowen',
  },
  state: 'junaid',

},
{
  name: {
    firstName: 'juniad',
    lastName: 'adam',
  },
  state: 'adam',
},
{
  name: {
    firstName: 'no-name',
    lastName: 'yes-name',
  },
  state: 'name',
}
];

const searcher = new FuzzySearch(people, ['name.firstName', 'state'], {
  caseSensitive: true,
  sort: true,
});
type onCreateLink = (title: string) => Promise<void>
class MentionMenu extends React.Component<
  Omit<
    Props<Emoji & onCreateLink>,
    | "renderMenuItem"
    | "items"
    | "onLinkToolbarOpen"
    | "embeds"
    | "onClearSearch"
  >
> {
  get items(): Emoji[] {
    const { search = "" } = this.props;

    const n = search.toLowerCase();
    const result = searcher.search(n).map(item => {
      const email = item.name.firstName;
      const name = item.state;
      return {
        ...item,
        name: "mention",
        title: name,
        email,
        attrs: { markup: name, "data-name": name },
      };
    });

    return result.slice(0, 10);
  }

  clearSearch = () => {
    const { state, dispatch } = this.props.view;

    // clear search input
    dispatch(
      state.tr.insertText(
        "",
        state.selection.$from.pos - (this.props.search ?? "").length - 1,
        state.selection.to
      )
    );
  };


  render() {
    return (
      <CommandMenu
        {...this.props}
        id="emoji-menu-container"
        filterable={false}
        onClearSearch={this.clearSearch}
        onCreateLink={this.props.onCreateLink}
        renderMenuItem={(item, _index, options) => {
          return (
            <MentionMenuItem
              onClick={options.onClick}
              selected={options.selected}
              title={item.title}
              //   emoji={item.emoji}
              containerId="emoji-menu-container"
            />
          );
        }}
        items={this.items}
      />
    );
  }
}

export default MentionMenu;
