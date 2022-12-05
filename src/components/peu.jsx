import React from "react";
import "../assets/style/footer.css";
import { Link } from "react-router-dom";
export const Peu = () => {
	return (
		<div className="h-25 container-fluid bg-dark footer">
			<div className="row">
				<div className="d-none d-lg-block col col-lg-3"></div>
				
				<div className="d-flex justify-content-center py-5 gap-3 my-lg-0 col-12 col-lg-3 justify-content-center">
					<nav className="d-block d-lg-flex justify-content-center flex-column align-items-center">
						<Link
							to="/sobre-nosotros"
							className="icon d-block nav-link"
							title="Sobre nosaltres"
						>
							Sobre nosaltres
						</Link>
						<Link
							to="/galletes"
							className="icon d-block nav-link"
							title="Sobre nosaltres"
						>
							Sobre les galletes
						</Link>
						<Link
							to="/FAQ"
							className="icon d-block nav-link"
							title="Preguntes i respostes de com treballem"
						>
							FAQ
						</Link>
					</nav>
				</div>			
				<div className="d-flex d-lg-flex py-5  col-12 col-lg-3   justify-content-around align-items-center">
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
				<div className="d-none d-lg-block col col-lg-3"></div>
			</div>
		</div>
	);
};
