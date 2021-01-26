import React from 'react';
import ReactDOM from 'react-dom';
import { Editor, EditorState } from 'draft-js';

import 'draft-js/dist/Draft.css';
import './style.scss';

export const TextEditorDraft = () => {
	const [editorState, setEditorState] = React.useState(() =>
		EditorState.createEmpty(),
	);

	return <Editor editorState={editorState} onChange={setEditorState} />;
};
