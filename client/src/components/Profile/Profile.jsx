import React from 'react';

import avatar from '../../img/avatar-01.jpg';

export const Profile = ({ user }) => {
	return (
		<>
			<div className="widget__body">
				<div className="user__img--wrp" title="Upload Image">
					<img
						src={avatar}
						alt="avatar"
						className="user__img"
						width="150"
						height="150"
					/>
					<span className="user__img--upload">
						<input
							type="file"
							name="avatar"
							id="avatar"
							accept=".jpg, .jpeg, .png"
						/>
						<label htmlFor="avatar">
							<span className="user__img--icon la la-camera-retro" />
						</label>
					</span>
				</div>

				<span className="user__name h3">{user.name}</span>
				<span className="user__email h4 mb-4">{user.email}</span>
				<span className="user__position h4 mb-4"></span>
				<hr className="separator-dashed" />
			</div>
		</>
	);
};
