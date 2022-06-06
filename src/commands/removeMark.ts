
import { EditorState, Transaction } from "prosemirror-state";

export default function removeMark(markType: any, attrs: object) {
    return (state: EditorState, dispatch: (tr: Transaction) => void) => {        
      if (dispatch) {     
          let from = state.selection.from
          let to = state.selection.to    
          if (from === to) {
              const position = state.tr.doc.resolve(from)
              const parentInfo = position.parent.childBefore(position.parentOffset)
              from = parentInfo.offset + 1
              to = from + (parentInfo.node?.nodeSize || 0) + 1
        }
        
        dispatch(state.tr.removeMark(from, to, markType))
      }
      return true
    }
  }