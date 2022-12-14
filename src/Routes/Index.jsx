import React, { useEffect, useState } from "react";
import Spinner from "react-bootstrap/Spinner";
import { useLocation } from "react-router-dom";
import Button from "react-bootstrap/Button";

import { Link, useParams } from "react-router-dom";
import Filter from "../components/Filter";
import FilterPreu from "../components/Filtratge";
import Diapositives from "../components/diapositives";
import SearchBar from '../components/search';
import useTitle from "../Hooks/useTitle";
import Toast from "../components/toast";
import "../assets/style/thumbnails.css";
import "../assets/style/Space.css";
import "../assets/style/Hover.css";
import BackToTop from "../components/ButtonScrollToTop";
const Index = ({ afegirProducteAlCarret, title, editarJoc }) => {
	useTitle(title);
	const params = useParams("");
	const [Videojocs, setVideojocs] = useState([]);
	const [Login, setLogin] = useState(false);

	const [Show, setShow] = useState();
	const [TotalPages, setTotalPages] = useState(1);
	const numero = [];
	const [showGames, setshowGames] = useState(false);

	const search = useLocation().search;
	let page = new URLSearchParams(search).get("pagina") ?? 1;
	let pagina = `?pagina=${page}` ?? ``;
	let filtrar = new URLSearchParams(search).get("filtrar") ?? "preu";
	let filt = `&filtrar=${filtrar}` ?? ``;
	let orden = new URLSearchParams(search).get("orden") ?? "ASC";
	let ord = `&orden=${orden}` ?? "";
	let min = new URLSearchParams(search).get("filtrarMin") ?? '';
	let max = new URLSearchParams(search).get("filtrarMax") ?? '';

	useEffect(() => {
		getVideojocsFromServer();
	}, [pagina]);

	useEffect(() => {
		getVideojocsFromServer();
	}, [filtrar, orden])
	useEffect(() => {
		const token = localStorage.getItem('token');
		if (token) {
			setLogin(true);
		}
	}, [])


	const getVideojocsFromServer = async () => {
		page = page <= 0 ? 1 : page;
		let pag = `${parseInt(page)}`;
		let parametro = `&parametro=${filtrar}`;
		let ordenar = `&sort=${orden}`;
		let results = `&results=12`;

		const url = {
			// link1: `http://vos.es/api/v1/videojocs?page=${page}${results}${parametro}${ordenar}`,
			// link1: `http://vos.es/api/v1/video?page=${page}${results}${parametro}${ordenar}`,
			"link1": `${process.env.REACT_APP_DOMAIN_API}videojocs?page=${page}${results}${parametro}${ordenar}`,
			// link2: `http:/vos.es/api/v1/videojocs?page=${page}${results}`,
			// link2: `http:/vos.es/api/v1/video?page=${page}${results}`,
			"link2": `${process.env.REACT_APP_DOMAIN_API}videojocs?page=${page}${results}`
		};
		let link;
		filtrar && ordenar ? (link = url.link1) : (link = url.link2);

		// const response = await fetch(`http://vos.es/api/v1/videojocs?page=${page}${parametro}${ordenar}`);
		const response = await fetch(link);
		const videojoscArray = await response.json();
		setTotalPages(videojoscArray.Tamany);
		setVideojocs(videojoscArray.Resultat);
	};

	const infiniteSpinner = () => {
		return (
			<div className="text-center">
				<Spinner animation="border" role="status">
					<span className="visually-hidden">Carregant jocs...</span>
				</Spinner>
			</div>
		);
	};

	const mostrar = () => {
		setShow(!Show);
		setTimeout(() => {
			setShow(false);
		}, 1500);
	};

	const onSubmit = (e) => {
		// e.preventDefault();
		// console.log(e.target.value);
	};

	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: 'smooth'
		});
	};

	const afegirAlCarret = (joc) => {
		afegirProducteAlCarret(joc);

	};
	let anterior = page - 1;
	let seguent = parseInt(page) + 1;
	if (anterior <= 1)
		anterior = 1;
	if (seguent >= TotalPages)	
		seguent = TotalPages;
	numero.push(
		<Link
			className={`page-link`}
			title={`Pàgina anterior ${anterior}`}
			{...(anterior === 1 ? { disabled: true } : {})}
			to={{
				pathname: "",
				search: `pagina=${anterior}${filt}${ord}`,
			}}
		>
			&lt;
		</Link>
	);
	for (let i = 1; i <= TotalPages; i++) {
		numero.push(
			<Link
				className={`page-link ${page === i ? "active" : ""}`}
				onClick={() => scrollToTop()}
				title={`Pàgina ${i}`}
				to={{
					pathname: "",
					search: `pagina=${i}${filt}${ord}`,
				}}
			>
				{i}
			</Link>
		);
	}
	numero.push(
		<Link
			title={`Pàgina següent ${seguent}`}
			{...(seguent === TotalPages ? { disabled: true } : {})}
			className={`page-link`}
			onClick={() => scrollToTop()}
			to={{
				pathname: "",
				search: `pagina=${seguent}${filt}${ord}`,
			}}
		>
			&gt;
		</Link>
	);

	return (
		<div className="h-75-vh">
			{/* Diapositives */}
			<div className="container-fluid">

				<div className="row">
					<div className="d-none d-lg-block col-12">
						{page > 1 || page === undefined ? (
							""
						) : (
							<Diapositives></Diapositives>
						)}
					</div>
				</div>
			</div>
			<div className="mt-5 container-fluid ">
				<div className="row">
					<div className="d-none d-lg-block col col-lg-2"></div>
					<div className="col col-lg-8">
						{/* Blog de busqueda i filtratge per preu només sera visible en mobil */}
						<div className="d-block d-lg-none">
							<SearchBar width={`w-100`}></SearchBar>
							<FilterPreu width={`w-100`} />
						</div>
						<Filter props={[`/`, orden, filtrar]}></Filter>


						<h1 id="Ancora">Videojocs Pàgina {page}</h1>
						{Videojocs.length < 1 ? infiniteSpinner() : ""}
						<div className="row">
							{Videojocs &&
								Videojocs.map((joc, index) => (
									<div
										className="col-12 col-md-6 border border-1 col-lg-4 justify-content-center border-2 my-3 gap-9"
										key={joc.id}
									>
										<Link className="d-blockw-100 h-auto" to={`/videojoc/${joc.titul}`}>

											<div className="sombra">
												<img

													loading="lazy"
													src={joc.portada}
													title={`${joc.titul}`}
													className={`thumbnails sombra`}
													alt=""
												/>
											</div>

										</Link>
										<h5 className="my-3">
											<Link to={`/videojoc/${joc.titul}`}>
												{joc.titul}
											</Link>
										</h5>
										<p>Preu: {joc.preu}€</p>
										<p>
											<i className="bi bi-clock me-1	"></i>
											Fecha Estreno:{" "}
											{new Date(joc.fechaEstreno).toLocaleDateString()}
										</p>
										<div className="d-flex justify-content-around my-2 py-2">
											<Button
												onClick={() => {
													mostrar();
													afegirAlCarret(joc);
												}}
												title="Posar videojoc en  carret"
												variant="secondary"
											>
												<i className="bi bi-cart"></i>

											</Button>
											{/* <form  className={`w-100 ${false?'d-none':''}`} action={`https://app.11josep.daw.iesevalorpego.es/api/v1/pago`} onSubmit={onSubmit} method="POST">
											<input type="hidden" name="arrayProductes" value={JSON.stringify({"nom":joc.titul, "preu":joc.preu})} />
											<input type="hidden" name="productes" value={JSON.stringify({"nom":joc.titul, "preu":joc.preu})} />
											<input type="hidden" name="preu" value={joc.preu} />
											* <button className="btn btn-primary mx-2" onClick={()=>localStorage.setItem("producteIndividual",JSON.stringify(joc))} {...(!Login ? {disabled: true} : {})} title="Comprar videojoc ja"  type="submit">
												Comprar ja
											</button> 
										</form> */}
											<Link className="btn btn-primary mx-2" to={"/pagament"} onClick={(e) => {
												editarJoc(joc);
											}} {...(!Login ? { disabled: true } : {})} title="Comprar videojoc ja" >
												Comprar ja
											</Link>
										</div>
									</div>
								))}
							{Show ? (
								<Toast message={`Has afegit un producte al carret`}></Toast>
							) : (
								""
							)}
						</div>
						<div className="py-3 d-flex justify-content-center">
							<nav aria-label="Page navigation example">
								<ul className="pagination d-flex m-0">{numero}</ul>
							</nav>
						</div>
					</div>
					<div className="d-none d-lg-flex flex-column col col-lg-2">
						{/* Blog de busqueda i filtratge per preu només sera visible en tamany tablet */}
						<SearchBar width={`w-75`}></SearchBar>
						<FilterPreu width={`w-75`} />
					</div>
				</div>
			</div>
			<BackToTop></BackToTop>
		</div>
	);
};

export default Index;
