import React, { useState, useCallback, useContext, useEffect } from 'react';
// import { AuthContext } from '../../context/AuthContext';
import { AnswerStudent } from '../Answers/AnswerStudent.jsx';

export const SubjectDetail = ({ subject }) => {
	//  const { userRoles }  = useContext(AuthContext);
	//  const userRol = userRoles.filter(rol => rol === 'student')

	return (	
		<div className="widget__wrapper has-shadow">
			<div className="widget__header">
				<h4 className="widget__title">{subject.title}</h4>
			</div>
			<div className="widget__body">
				<div className="mb-3">{subject.context}</div>
				<div> 									
					<AnswerStudent />					
				</div>
			</div>
		</div>
	);
};
