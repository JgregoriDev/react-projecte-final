import Form from "react-bootstrap/Form";
import { Link,useNavigate } from "react-router-dom";
// import { Search } from "";
const SearchBar = () => {
	// const search = useLocation().search;
	// let page = new URLSearchParams(search).get("pagina") ?? 1;
	const navigate = useNavigate();
	const onSubmit = (e) => {
		e.preventDefault();
		navigate(`/buscar/${e.target[0].value}`);
	}
	return (
			<div className="">
				<h5>Buscar</h5>
				<form
					className="d-flex flex-row gap-1"
					onSubmit={(e) => { onSubmit(e) }}
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
			</div>
	);
};

export default SearchBar;
