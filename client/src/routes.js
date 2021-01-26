import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { AuthPage } from './pages/AuthPage';
import { HomePage } from './pages/HomePage';
import { GroupsPage } from './pages/GroupsPage';
import { GroupCreatePage } from './pages/GroupCreatePage';
import { GroupEditPage } from './pages/GroupEditPage';
import { GroupDetailPage } from './pages/GroupDetailPage';
import { UsersPage } from './pages/UsersPage';
import { UserCreatePage } from './pages/UserCreatePage';
import { UserEditPage } from './pages/UserEditPage';
import { TrainingsPage } from './pages/TrainingsPage';
import { TrainingCreatePage } from './pages/TrainingCreatePage';
import { TrainingDetailPage } from './pages/TrainingDetailPage';
import { SubjectCreatePage } from './pages/SubjectCreatePage';
import { SubjectEditPage } from './pages/SubjectEditPage';
import { SubjectDetailPage } from './pages/SubjectDetailPage';
import { ProfilePage } from './pages/ProfilePage';
import { DevelopersPage } from './pages/DevelopersPage';

export const useRoutes = (isAuthenticated) => {
	if (isAuthenticated) {
		return (
			<Switch>
				<Route path="/home" exact>
					<HomePage />
				</Route>
				<Route path="/groups" exact>
					<GroupsPage />
				</Route>
				<Route path="/group/create" exact>
					<GroupCreatePage />
				</Route>
				<Route path="/group/edit/:id">
					<GroupEditPage />
				</Route>
				<Route path="/group/:id">
					<GroupDetailPage />
				</Route>
				<Route path="/users" exact>
					<UsersPage />
				</Route>
				<Route path="/user/create" exact>
					<UserCreatePage />
				</Route>
				<Route path="/user/edit/:id">
					<UserEditPage />
				</Route>
				<Route path="/trainings" exact>
					<TrainingsPage />
				</Route>
				<Route path="/training/create" exact>
					<TrainingCreatePage />
				</Route>
				<Route path="/training/:id">
					<TrainingDetailPage />
				</Route>
				<Route path="/subject/create" exact>
					<SubjectCreatePage />
				</Route>
				<Route path="/subject/edit/:id">
					<SubjectEditPage />
				</Route>
				<Route path="/subject/:id">
					<SubjectDetailPage />
				</Route>
				<Route path="/profile" exact>
					<ProfilePage />
				</Route>
				<Route path="/developers" exact>
					<DevelopersPage />
				</Route>
				<Redirect to="/home" />
			</Switch>
		);
	}

	return (
		<Switch>
			<Route path="/" exact>
				<AuthPage action="login" />
			</Route>
			<Route path="/register" exact>
				<AuthPage action="register" />
			</Route>
			<Redirect to="/" />
		</Switch>
	);
};
