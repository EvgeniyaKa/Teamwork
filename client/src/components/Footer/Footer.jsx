import React from 'react';

export const Footer = () => {
	return (
		<footer className="footer__main fixed-footer">
			<div className="dev">
				Powered By{' '}
				<a href="/" target="_blank" rel="noopener noreferrer">
					Team #olive
				</a>
			</div>
			<div className="footer__links">
				<a href="/" className="footer__link">
					Documentation
				</a>
				<a href="/developers" className="footer__link">
					Разработчики
				</a>
			</div>
		</footer>
	);
};
