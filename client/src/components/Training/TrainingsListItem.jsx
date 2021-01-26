import React from 'react';
import { Link } from 'react-router-dom';

export const TrainingsListItem = ({ trainings }) =>
	trainings.length ? (
		<div className="table-responsive">
			<table className="table table-hover mb-0">
				<thead>
					<tr>
						<th>Title</th>
						<th>Description</th>
						<th>Author</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody>
					{trainings.map((el, i) => {
						return (
							<tr key={i}>
								<td>
									<Link to={`/training/${el._id}`}>{el.title}</Link>
								</td>
								<td>{el.description}</td>
								<td>{el.author_id.name}</td>
								<td className="td-actions">
									<Link to={`/training/${el._id}`} className="td-actions__link">
										<i className="la la-edit edit"></i>
									</Link>
									<a className="td-actions__link" href="/">
										<i className="la la-close delete"></i>
									</a>
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	) : (
		<p className="text-center m-0 py-3">Нет доступных тренингов.</p>
	);
