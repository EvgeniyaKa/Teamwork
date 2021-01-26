import React, { useState } from 'react';
import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

export const TextEditorWysiwyg = () => {
	const [editorState, setEditorState] = useState(() => {
		EditorState.createEmpty();
	});

	const onEditorStateChange = (editorState) => {
		setEditorState(editorState);
		console.log(draftToHtml(convertToRaw(editorState.getCurrentContent())));
	};

	return (
		<div>
			<Editor
				editorState={editorState}
				wrapperClassName="wrapper-class"
				editorClassName="editor-class"
				toolbarClassName="toolbar-class"
				onEditorStateChange={onEditorStateChange}
			/>
			{/* <textarea
				disabled
				value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}
			/> */}
		</div>
	);
};
