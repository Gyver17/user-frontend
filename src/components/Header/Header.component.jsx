import React, { useContext } from "react";
import styles from "./style.module.css";
import { AuthContext } from "../../context/AuthProvider.context";
import { types } from "../../context/authReducer.context";

function Header({ userName }) {
	const [, dispatch] = useContext(AuthContext);

	const handleSubmit = (e) => {
		try {
			e.preventDefault();
			dispatch({ type: types.authLogout });
			localStorage.removeItem("user");
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<>
			<input id={styles.menu} type="checkbox" />
			<input id={styles.user} type="checkbox" />
			<header className={styles.container}>
				<span className={styles.title}>Users Manager</span>
				<div className={styles.group}>
					<div className={styles.menu}>
						<label for={styles.menu}>
							<i class="fa-solid fa-bars" />
						</label>
					</div>
					<div className={styles.user}>
						<span>{userName}</span>
						<label for={styles.user}>
							<i class="fa-solid fa-square-caret-down" />
						</label>
					</div>
				</div>
			</header>
			<div className={styles.background}>
				<div className={styles.sidebar}>
					<label className={styles.close} for={styles.menu}>
						<i class="fa-solid fa-xmark" />
					</label>
					<ul className={styles.list}>
						<li>
							<label htmlFor={styles.menu} onClick={handleSubmit}>
								<i class="fa-solid fa-circle-xmark" />
								<span>Cerrar Sesión</span>
							</label>
						</li>
					</ul>
				</div>
			</div>
			<div className={styles.tooltip}>
				<ul className={styles.list}>
					<li>
						<label htmlFor={styles.user} onClick={handleSubmit}>
							<i class="fa-solid fa-circle-xmark" />
							<span>Cerrar Sesión</span>
						</label>
					</li>
				</ul>
			</div>
		</>
	);
}

export default Header;
