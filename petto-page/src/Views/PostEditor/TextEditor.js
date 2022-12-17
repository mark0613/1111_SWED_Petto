import BraftEditor from 'braft-editor';

import "./Editor.css";
import "./TextEditor.css";


function TextEditor(props) {
    let propOnChange = props.onChange;
    propOnChange = (typeof propOnChange !== 'undefined') ?  propOnChange : console.log;
    const handleBraftEditorChange = (e) => {
        propOnChange(e.toHTML());
    }
    let editorState = {
        placeholder: '請輸入文章標題',
        editorState: BraftEditor.createEditorState(''), 
        outputHTML: props.text,
    }

    return (
        <BraftEditor
            className="editor"
            value={ editorState }
            onChange={ handleBraftEditorChange }
            placeholder="開始撰寫文章!"
            style={{
                width: '100%',
                backgroundColor: "white",
            }}
        />
    )
}

export { TextEditor };
