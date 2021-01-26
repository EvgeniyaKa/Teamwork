import React, { useState, useContext, useCallback, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { useHttp } from '../../hooks/http.hook';
import { Loader } from '../Loader/Loader';

import { Form, Button } from 'react-bootstrap';

export const GroupTimetable = ({ groupId, timetableId }) => {
	const { loading, request } = useHttp();
	const { token } = useContext(AuthContext);
	const history = useHistory();
	const [timetableGroup, setTimetableGroup] = useState();
	const [timetableForm, setTimetableForm] = useState([]);
	const locPathname = history.location.pathname;

	const getTimeTableGroup = useCallback(async () => {
		if (!timetableId) return;
		try {
			const data = await request(
				`/api/timetable_groups/${timetableId}`,
				'GET',
				null,
				{
					Authorization: `Bearer ${token}`,
				},
			);

			setTimetableGroup(data);
		} catch (e) {}
	}, [token, request, timetableId]);

	useEffect(() => {
		getTimeTableGroup();
	}, [getTimeTableGroup, timetableId]);

	const changeHandler = (event) => {
		setTimetableForm({
			...timetableForm,
			[event.target.name]: event.target.value,
		});
	};

	const saveHandler = async (event) => {
		event.preventDefault();

		const timetableArr = [];

		for (let key in timetableForm) {
			timetableArr.push({
				subject_id: key,
				start_date: timetableForm[key],
			});
		}

		/* try {
			const data = await request(
				'/api/timetable_groups/create',
				'POST',
				{
					group_id: groupId,
					timetable: timetableArr,
				},
				{ Authorization: `Bearer ${token}` },
			);

		} catch (e) {} */
		console.log(timetableArr);
	};

	if (loading) return <Loader />;

	if (!loading && !timetableGroup) return <p>У группы нет расписания.</p>;

	return (
		<div className="table-responsive">
			<table className="table table-hover mb-0">
				<thead>
					<tr>
						<th>Дата</th>
						<th>Тема</th>
						{locPathname.includes('edit') && <th>Изменить дату</th>}
					</tr>
				</thead>
				<tbody>
					{timetableGroup.timetable.map((el, i) => {
						return (
							<tr key={i}>
								<td>{new Date(el.start_date).toLocaleDateString()}</td>
								<td>{el.subject_id.title}</td>
								{locPathname.includes('edit') && (
									<td className="text-nowrap">
										<Form.Group controlId={`inputDate_${el.subject_id._id}`}>
											<Form.Control
												type="date"
												name={el.subject_id._id}
												value={timetableForm.start_date}
												onChange={changeHandler}
											/>
										</Form.Group>
									</td>
								)}
							</tr>
						);
					})}
				</tbody>
			</table>
			{locPathname.includes('edit') && (
				<Button
					className="btn btn-primary btn__gradient btn__grad-danger btn__sign-in"
					type="submit"
					onClick={saveHandler}
					disabled={loading}
				>
					Сохранить расписание
				</Button>
			)}
		</div>
	);
};
