import React from "react";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
// import { Search } from "";
const SearchBar = () => {
	// const search = useLocation().search;
	// let page = new URLSearchParams(search).get("pagina") ?? 1;
	// const navigate = useNavigate();
	const onSubmit = (e) => {
		e.preventDefault();
		const busqueda = e.target[0].value;
		// navigate(`/buscar?buscar=${busqueda}`);

		window.location.href = `/buscar?buscar=${busqueda}`;
	};
	return (
		<div className="container-fluid">
			<div className="row">
				<div className="col"></div>

				<form
					className="d-flex my-3 col-10 gap-1"
					onSubmit={onSubmit}
					action=""
					method="get"
				>
					<input
						className="form-control"
						type="text"
						formMethod="GET"
						placeholder="Buscar"
					/>
					<button type="submit" title="Buscar" className="btn btn-primary">
						{" "}
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="16"
							height="16"
							fillRule="currentColor"
							className="bi bi-search"
							viewBox="0 0 16 16"
						>
							<path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
						</svg>
					</button>
				</form>
				<div className="col"></div>
			</div>
		</div>
	);
};

export default SearchBar;
