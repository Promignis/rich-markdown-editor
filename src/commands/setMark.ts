import { EditorState, Transaction } from "prosemirror-state";
import { DOMParser } from "prosemirror-model"
import { EditorView } from "prosemirror-view";

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
        
        // dispatch(state.tr.addStoredMark(markType.create(attrs)))
        dispatch(state.tr.addMark(from, to, markType.create(attrs)))
      // let ab =   EditorState.create({
      //     doc: DOMParser.fromSchema(markType.schema).parse(markType)
      //   })
      //   console.log(ab);
        // new EditorView(document.body, {ab})
        // console.log('tr.storedMarks',state.tr.storedMarks);
      }
      return true
    }
  }
