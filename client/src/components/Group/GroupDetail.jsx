import React from 'react';
import { Link } from 'react-router-dom';
import { GroupTimetable } from './GroupTimetable';

export const GroupDetail = ({ group }) => {
	return (
		<>
			<div className="widget__wrapper has-shadow">
				<div className="widget__header">
					<h3 className="widget__title">{group.training_id.title}</h3>
				</div>
				<div className="widget__body">
					<h4 className="mb-3">Преподаватель: {group.teacher_id.name}</h4>
					<p>Наставники:</p>
					<ul>
						<li className="mb-3">
							<a href="#">Наставник 1</a>
						</li>
						<li className="mb-3">
							<a href="#">Наставник 2</a>
						</li>
						<li className="mb-3">
							<a href="#">Наставник 3</a>
						</li>
					</ul>
				</div>
			</div>
			<div className="widget__wrapper has-shadow">
				<div className="widget__header">
					<h4 className="widget__title">Расписание занятий</h4>
				</div>
				<div className="widget__body">
					<GroupTimetable
						groupId={group._id}
						timetableId={group.timetable_id}
					/>
				</div>
			</div>
			<div className="widget__wrapper has-shadow">
				<div className="widget__header">
					<h4 className="widget__title">Студенты</h4>
				</div>
				<div className="widget__body">
					<div className="table-responsive">
						<table className="table table-hover mb-0">
							<thead>
								<tr>
									<th>Имя</th>
									<th>Email</th>
									<th>Действия</th>
								</tr>
							</thead>
							<tbody>
								{group.students_ids.map((user) => {
									return (
										<tr key={user._id}>
											<td>{user.name}</td>
											<td>{user.email}</td>
											<td className="td-actions">
												<Link
													to={`/user/edit/${user._id}`}
													className="td-actions__link"
													title="Редактировать"
												>
													<i className="la la-edit edit"></i>
												</Link>
												<span
													className="td-actions__link"
													title="Удалить"
													data-id={user._id}
												>
													<i className="la la-close delete"></i>
												</span>
											</td>
										</tr>
									);
								})}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</>
	);
};
