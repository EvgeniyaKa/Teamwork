import React from 'react'

import { Navbar } from 'react-bootstrap'
import logo from '../../img/logo.png'

export const Header = props => {

    return (
        <header className="header">
            <Navbar className="fixed-top">
                <div className="navbar__wrapper">
                    <div className="navbar__header">
                        <Navbar.Brand
                            href="/"
                            className="d-flex align-items-center"
                        >
                            <img
                                src={ logo }
                                width="70"
                                height="64"
                                className="brand__img"
                                alt="School Online"
                            />
                            <span className="brand__title">Education Online</span>
                        </Navbar.Brand>
                        <button
                            className={`btn navbar__toggler${ props.sidebarShrink ? '' : ' active' }`}
                            type="button"
                            onClick={ props.sbToggle }
                        >
                            <span></span>
                            <span></span>
                            <span></span>
                        </button>
                    </div>
                </div>
            </Navbar>
        </header>
    )
}