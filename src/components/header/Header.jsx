import React from 'react'
import logo from '../../assets/logo.png';
import cl from "./header.module.scss";

const Header = () => {
	return (
		<header className={cl.header}>
			<img
				className={cl.header__logo}
				src={logo}
				alt="logo"
				width={200}
			/>
		</header>
	)
}

export default Header
