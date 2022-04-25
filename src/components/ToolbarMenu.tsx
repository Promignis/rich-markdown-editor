import * as React from "react";
import { EditorView } from "prosemirror-view";
import styled, { withTheme } from "styled-components";
import ToolbarButton from "./ToolbarButton";
import ToolbarSeparator from "./ToolbarSeparator";
import theme from "../styles/theme";
import { MenuItem } from "../types";
import { GithubPicker } from 'react-color';
import baseDictionary from "../dictionary";

type Props = {
  tooltip: typeof React.Component | React.FC<any>;
  commands: Record<string, any>;
  view: EditorView;
  theme: typeof theme;
  items: MenuItem[];
};

const FlexibleWrapper = styled.div`
  display: flex;
`;

class ToolbarMenu extends React.Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      color: 'black',
      open: null
    };
    // this.getvalue = this.getvalue.bind(this)
  }

  // getvalue (item){
  //   if (item.name == 'heading') {
  //     this.props.commands['heading']({ level: 1, color: this.state.color })
  //     return 
  //   } else if (item.name == 'ordered_list')
  //   this.props.commands['ordered_list']()    

  // }
  render() {
    // @ts-ignore
    console.log('color', this.state.color)
    const { view, items } = this.props;
    const { state } = view;
    const Tooltip = this.props.tooltip;
   const handle = ()=> {
    this.setState({ open: true })
   }
    return (
      <FlexibleWrapper>
        {items.map((item, index) => {
          if (item.name === "separator" && item.visible !== false) {
            return <ToolbarSeparator key={index} />;
          }
          if (item.visible === false || !item.icon) {
            return null;
          }
          const Icon = item.icon;
          const isActive = item.active ? item.active(state) : false;
          
          return (
            <ToolbarButton
              key={index}
              onClick={(e) => {
                if (item.name == 'color') {
                  handle()
                } else {
                  item.name && this.props.commands[item.name](item.attrs)
                }
              }
              }
              active={isActive}
            >
              <Tooltip tooltip={item.tooltip} placement="top">
                {!item.option ? <Icon color={this.props.theme.toolbarItem} /> : '' }
              </Tooltip>
              {/* @ts-ignore */}
              {item.option ? !this.state.open ? <button  onClick={handle}>color</button> : <GithubPicker width='220px' onChangeComplete={() =>item.option && this.props.commands[item.name]({ color: this.state.color })} onChange={(color) => this.setState({ color: color.hex })} /> : null}
            </ToolbarButton>
          );
        })}
      </FlexibleWrapper>
    );
  }
}
export default withTheme(ToolbarMenu);
