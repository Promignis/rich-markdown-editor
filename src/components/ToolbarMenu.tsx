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

const SelectMenu = styled.select`
  display: block;
  position: relative;
  right: 8px;
  cursor: pointer;
  background: none;
  background-color: #2f3336;
  color: white;
`;

const ColorBtn = styled.button`
  border: none;
  background: none;
`;

class ToolbarMenu extends React.Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      open: null
    };
  }
  render() {
    const { view, items } = this.props;
    const { state } = view;
    const Tooltip = this.props.tooltip;    
    const handle = () => {
      this.setState({ open: true })
    }

    const customFonts = (e,item) => {
      item.name && this.props.commands[item.name]({fontSize:e.fontSize})  
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
                e.preventDefault()
                e.stopPropagation()
                if (item.name === 'color') {
                  handle()
                } else if (item.name === 'fonts') {
                  return 
                } else {
                  item.name && this.props.commands[item.name](item.attrs)
                }
              }
              }
              active={isActive}
            >
              <Tooltip tooltip={item.tooltip} placement="top">
                {!item.option  ? <Icon color={this.props.theme.toolbarItem} setFont={(e)=>{customFonts(e,item)}} /> : '' }
              </Tooltip>
              {/* @ts-ignore */}
              {item.option ? !this.state.open ? <ColorBtn onClick={handle}><Icon color={this.props.theme.toolbarItem} /></ColorBtn> :
                <GithubPicker
                  width='220px'
                  onChangeComplete={(color) => {                    
                    this.props.commands['color']({ color: color.hex })
                  }}
                  />
                : null}
            </ToolbarButton>
          );
        })}
      </FlexibleWrapper>
    );
  }
}

export const FontOptions:React.FC<any> = ({ setFont }) => {

  const fontSizes = [8, 10, 12, 14, 16, 18, 20, 24, 28, 32, 38, 46, 54, 62, 72]
  return (
    <>
      <div>
          <SelectMenu  name="fonts" onChange={(e) => setFont({ fontSize: e.target.value })}>
            {fontSizes.map(val => {
              return (<option value={val}>{val}</option>)
            })}
          </SelectMenu>
      </div>
    </>
  )
}
export default withTheme(ToolbarMenu);
