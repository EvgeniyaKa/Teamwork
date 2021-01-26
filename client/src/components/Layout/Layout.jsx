import React, { useState, useCallback } from 'react';
import slugify from '@sindresorhus/slugify';
import { Header } from '../Header/Header';
import { Sidebar } from '../Sidebar/Sidebar';
import { Footer } from '../Footer/Footer';
import { Loader } from '../Loader/Loader';

import { Container, Row } from 'react-bootstrap';

export const Layout = ({ page, content }) => {
	const { name } = page;
	const code = slugify(name);
	const [sbShrink, setSbShrink] = useState(true);

	const sidebarToggleHandler = useCallback(() => {
		setSbShrink((prev) => !prev);
	}, []);

	return (
		<div className={`page page__${code}${sbShrink ? '' : ' sidebar-shrink'}`}>
			<Header sbToggle={sidebarToggleHandler} sidebarShrink={sbShrink} />
			<div className="page__content d-flex align-items-stretch">
				<Sidebar sidebarShrink={sbShrink} />
				{(!content || !name) && <Loader />}
				{content && name && (
					<div className={`content__inner ${name}`}>
						<Container fluid>
							{name !== 'home' && (
								<Row>
									<div className="content__header">
										<h1 className="content__header--title">{name}</h1>
										<div className="breadcrumb__wrapper">
											<ul className="breadcrumb__list">
												<li className="breadcrumb__item">
													<a href="/home" className="breadcrumb__link">
														Главная
													</a>
												</li>
												<li className="breadcrumb__item">
													<span className="breadcrumb__link">{name}</span>
												</li>
											</ul>
										</div>
									</div>
								</Row>
							)}
							<Row className="flex-row">{content}</Row>
						</Container>
					</div>
				)}
				{/* <Footer /> */}
			</div>
			<Footer />
		</div>
	);
};
