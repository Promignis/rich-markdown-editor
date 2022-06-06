import { EditorState, Transaction } from "prosemirror-state";

export default  function setMark(markType: any, attrs: object) {  
  return function (state: EditorState, dispatch: (tr: Transaction) => void) {      
      if (dispatch) {     
          let from = state.selection.from
          let to = state.selection.to
          if (from === to) {
              const position = state.tr.doc.resolve(from)
              const parentInfo = position.parent.childBefore(position.parentOffset)
              from = parentInfo.offset + 1
              to = from + (parentInfo.node?.nodeSize || 0) + 1
        }
        state.tr.setNodeMarkup(from,)
        dispatch(state.tr.addMark(from, to, markType.create(attrs)))
        
      }
      return true
    }
  }
