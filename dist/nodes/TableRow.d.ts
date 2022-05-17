/// <reference types="react" />
import Node from "./Node";
export default class TableRow extends Node {
    get name(): string;
    get schema(): {
        content: string;
        tableRole: string;
        parseDOM: {
            tag: string;
        }[];
        toDOM(): import("react").ReactText[];
    };
    parseMarkdown(): {
        block: string;
    };
}
//# sourceMappingURL=TableRow.d.ts.map