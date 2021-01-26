import React from 'react';
import { Link } from 'react-router-dom';

export const UsersListItem = ({ users, getUserGroups }) => {
	return (
		<div className="table-responsive">
			<table className="table table-hover mb-0">
				<thead>
					<tr>
						<th>Имя</th>
						<th>Email</th>
						<th>Роли</th>
						<th>Группы</th>
						<th>Действия</th>
					</tr>
				</thead>
				<tbody>
					{users.map((user, i) => {
						const user_groups = getUserGroups(user._id);

						return (
							<tr key={user._id}>
								<td>{user.name}</td>
								<td>{user.email}</td>
								<td>
									{user.roles.length > 0 &&
										user.roles.map((el, i) => {
											if (el !== 'all') {
												return (
													<span key={i} className="d-block mb-2">
														{el}
													</span>
												);
											}
											return null;
										})}
								</td>
								<td>
									{user_groups.length > 0 &&
										user_groups.map((el, i) => {
											return (
												<span
													key={i}
													title={el.description}
													className="d-block mb-2"
												>
													{el.name}
												</span>
											);
										})}
								</td>
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
	);
};
