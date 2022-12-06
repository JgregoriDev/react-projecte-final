import Form from "react-bootstrap/Form";
import { Link,useNavigate } from "react-router-dom";
import {useState} from 'react';
// import { Search } from "";
const SearchBar = ({width}) => {
	const [BuscarError, setBuscarError] = useState("")
	// const search = useLocation().search;
	// let page = new URLSearchParams(search).get("pagina") ?? 1;
	const navigate = useNavigate();
	const onSubmit = (e) => {

		e.preventDefault();
		const search=e.target[0].value.trim();
		if(search===""){
			setBuscarError("Error no pots buscar una cadena de text buida");
			return;
		}
		navigate(`/buscar/${e.target[0].value}`);
	}
	return (
			<div className="">
				<h5>Buscar</h5>
				<form
					className="d-flex flex-column gap-1 justify-content-center"
					onSubmit={(e) => { onSubmit(e) }}
					method="get"
				>
					<input
						className={`form-control ${width} mb-2`}
						type="text"
						formMethod="GET"
						placeholder="Buscar"
					/>
					<div className="mb-3 text-warning">
						{BuscarError}
					</div>
					<button type="submit" title="Buscar" className={`btn btn-primary ${width}`}>
				
						<i className="bi bi-search"></i>
					</button>
				</form>
			</div>
	);
};

export default SearchBar;
