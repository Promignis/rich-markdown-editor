import * as React from "react";
import theme from "../styles/theme";
export declare type Props = {
    selected: boolean;
    disabled?: boolean;
    onClick: () => void;
    theme: typeof theme;
    icon?: typeof React.Component | React.FC<any>;
    title: React.ReactNode;
    shortcut?: string;
    containerId?: string;
};
declare const _default: React.ForwardRefExoticComponent<{
    disabled?: boolean | undefined;
    title: React.ReactNode;
    icon?: typeof React.Component | React.FC<any> | undefined;
    onClick: () => void;
    selected: boolean;
    shortcut?: string | undefined;
    containerId?: string | undefined;
} & {
    theme?: any;
}>;
export default _default;
//# sourceMappingURL=BlockMenuItem.d.ts.map