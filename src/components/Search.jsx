import React from "react";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import { Search } from "react-bootstrap-icons";
const SearchBar = () => {
  // const search = useLocation().search;
	// let page = new URLSearchParams(search).get("pagina") ?? 1;
	// const navigate = useNavigate();
	const onSubmit = (e) => {
		e.preventDefault();
		const busqueda = e.target[0].value;
		// navigate(`/buscar?buscar=${busqueda}`);

    window.location.href=`/buscar?buscar=${busqueda}`;
	};
	return (
		<div className="">
			<form
				className="d-flex my-3 gap-1"
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
					<Search></Search>
				</button>
			</form>
		</div>
	);
};

export default SearchBar;
