import React from "react";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
// import { Search } from "";
const SearchBar = () => {
	// const search = useLocation().search;
	// let page = new URLSearchParams(search).get("pagina") ?? 1;
	// const navigate = useNavigate();

	return (
		<div className="container-fluid">
			<div className="row">
				<div className="col"></div>

				<form
					className="d-flex my-3 col-10 gap-1"
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
						<i className="bi bi-search"></i>
					</button>
				</form>
				<div className="col"></div>
			</div>
		</div>
	);
};

export default SearchBar;
