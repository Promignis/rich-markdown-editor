import * as React from "react";
import BlockMenuItem, { Props as BlockMenuItemProps } from "./BlockMenuItem";
import styled from "styled-components";

const Emoji = styled.span`
  font-size: 16px;
`;

const MentionName = ({
  title,
}: {
  title: React.ReactNode;
}) => {
  return (
    <p>
      {/* <Emoji className="emoji">{emoji}</Emoji> */}
      &nbsp;&nbsp;
      {title}
    </p>
  );
};

type EmojiMenuItemProps = Omit<BlockMenuItemProps, "shortcut" | "theme"> & {
  // emoji: string;
};

export default function MentionMenuItem(props: EmojiMenuItemProps) {
  return (
    <BlockMenuItem
      {...props}
      title={<MentionName title={props.title} />}
    />
  );
}
