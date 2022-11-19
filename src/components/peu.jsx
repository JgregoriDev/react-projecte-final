import React from "react";
import "../assets/style/footer.css";
import { Link } from "react-router-dom";
export const Peu = () => {
	return (
		<div className="container-fluid bg-dark footer">
			<div className=" d-flex h-100">
				<div className="w-25 d-none d-md-block"></div>
				<div className="w-25 d-flex">
					<nav className="d-flex w-100 justify-content-center flex-column align-items-center">
						<Link
							to="/sobre-nosotros"
							className="icon nav-link"
							title="Sobre nosaltres"
						>
							Sobre nosaltres
						</Link>
						<Link
							to="/galletes"
							className="icon nav-link"
							title="Sobre nosaltres"
						>
							Sobre les galletes
						</Link>
					</nav>
				</div>
				
				<div className="d-flex w-25 justify-content-between align-items-center">
					<a
						href="https://www.twitter.com"
						title="Twitter vos"
						className="icon nav-link"
					>
						<i className="bi bi-twitter"></i>
					</a>
					<a
						href="https://www.facebook.com"
						title="Facebook vos"
						className="icon nav-link"
					>
						<i className="bi bi-facebook"></i>
					</a>
					<a
						href="https://www.instagram.com"
						title="Instagram vos"
						className="icon nav-link"
					>
						<i className="bi bi-instagram"></i>
					</a>
				</div>
				<div className="w-25 d-none d-md-block"></div>
			</div>
		</div>
	);
};
