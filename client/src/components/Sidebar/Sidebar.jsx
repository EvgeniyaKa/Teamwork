import React, { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

import { Nav } from 'react-bootstrap';
import { ReactComponent as IconUsers } from '../../img/users.svg';
import { ReactComponent as IconUser } from '../../img/user.svg';
import { ReactComponent as IconUserTwo } from '../../img/user-2.svg';
import { ReactComponent as OpenBook } from '../../img/open-book.svg';
import { ReactComponent as IconStudy } from '../../img/study.svg';
import { ReactComponent as LogOut } from '../../img/logout.svg';

export const Sidebar = (props) => {
	const history = useHistory();
	const auth = useContext(AuthContext);

	const dropdownToggler = (event) => {
		event.target.closest('.sb-dropdown').classList.toggle('open');
	};

	const logoutHandler = (event) => {
		event.preventDefault();
		auth.logout();
		history.push('/');
	};

	return (
		<div className="sidebar sidebar__default">
			<div className={`side-navbar${props.sidebarShrink ? ' shrink' : ''}`}>
				<Nav className="side-navbar__list flex-column flex-nowrap">
					{auth.userRoles && auth.userRoles.includes('admin') && (
						<>
							<li className="side-navbar__item sb-dropdown">
								<span
									className="side-navbar__link sb-dropdown__toggler"
									onClick={dropdownToggler}
								>
									<IconUserTwo className="side-navbar__icon icon-group" />
									<span className="side-navbar__link--title">Пользователи</span>
								</span>
								<ul className="nav sb-dropdown__menu flex-column">
									<li className="nav-item sb-dropdown__item">
										<Link to="/users" className="sb-dropdown__link">
											Все пользователи
										</Link>
									</li>
									<li className="nav-item sb-dropdown__item">
										<Link to="/user/create" className="sb-dropdown__link">
											Добавить пользователя
										</Link>
									</li>
								</ul>
							</li>
							<li className="side-navbar__item sb-dropdown">
								<span
									className="side-navbar__link sb-dropdown__toggler"
									onClick={dropdownToggler}
								>
									<IconUsers className="side-navbar__icon icon-group" />
									<span className="side-navbar__link--title">Группы</span>
								</span>
								<ul className="nav sb-dropdown__menu flex-column">
									<li className="nav-item sb-dropdown__item">
										<Link to="/groups" className="sb-dropdown__link">
											Все группы
										</Link>
									</li>
									<li className="nav-item sb-dropdown__item">
										<Link to="/group/create" className="sb-dropdown__link">
											Добавить группу
										</Link>
									</li>
								</ul>
							</li>
							<li className="side-navbar__item sb-dropdown">
								<span
									className="side-navbar__link sb-dropdown__toggler"
									onClick={dropdownToggler}
								>
									<OpenBook className="side-navbar__icon icon-trainings" />
									<span className="side-navbar__link--title">Тренинги</span>
								</span>
								<ul className="nav sb-dropdown__menu flex-column">
									<li className="nav-item sb-dropdown__item">
										<Link to="/trainings" className="sb-dropdown__link">
											Все тренинги
										</Link>
									</li>
									<li className="nav-item sb-dropdown__item">
										<Link to="/training/create" className="sb-dropdown__link">
											Добавить тренинг
										</Link>
									</li>
								</ul>
							</li>
						</>
					)}
					<li className="side-navbar__item">
						<Link to="/trainings" className="side-navbar__link">
							<IconStudy className="side-navbar__icon icon-edu" />
							<span className="side-navbar__link--title">Обучение</span>
						</Link>
					</li>
					<li className="side-navbar__item">
						<Link to="/profile" className="side-navbar__link">
							<IconUser className="side-navbar__icon icon-user" />
							<span className="side-navbar__link--title">Профиль</span>
						</Link>
					</li>
					<li className="side-navbar__item">
						<a href="/" className="side-navbar__link" onClick={logoutHandler}>
							<LogOut className="side-navbar__icon icon-logout" />
							<span className="side-navbar__link--title">Выход</span>
						</a>
					</li>
				</Nav>
			</div>
		</div>
	);
};
