import React, { useEffect, useState } from "react";
import Spinner from "react-bootstrap/Spinner";
import { useLocation } from "react-router-dom";
import Filter from '../components/filter';
import Diapositives from '../components/Diapositives';
import { ClockHistory } from 'react-bootstrap-icons';
import { Cart } from 'react-bootstrap-icons';
import Button from 'react-bootstrap/Button';
const Index = ({afegirProducteAlCarret}) => {
	const [videojocs, setvideojocs] = useState([]);
	const [TotalPages, setTotalPages] = useState(1);
	const [CurrentPage, setCurrentPage] = useState(1);
	const numero = [];
	const [showGames, setshowGames] = useState(false);
	useEffect(() => {
		getVideojocsFromServer();
	}, []);
	const search = useLocation().search;
	let page = new URLSearchParams(search).get("pagina") ?? 1;
	let pagina=`?pagina=${page}` ?? ``;
	let filtrar = new URLSearchParams(search).get("filtrar") ?? "identificador";
	let filt=`&filtrar=${filtrar}` ?? ``;
	let orden = new URLSearchParams(search).get("orden") ?? "ASC";
	let ord = `&orden=${orden}` ?? "";
	const getVideojocsFromServer = async () => {
		page=page<=0?1:page;	
		let pag=`${parseInt(page)}`;
		let parametro=`&parametro=${filtrar}`;
		let ordenar=`&sort=${orden}`;
		let results=`&results=12`;

		const url={
			"link1":`http://vos.es/api/v1/videojocs?page=${page}${results}${parametro}${ordenar}`,
			"link2":`http://vos.es/api/v1/videojocs?page=${page}${results}`
		}	
		let link;
		filtrar && ordenar?link=url.link1:link=url.link2;

		
		// const response = await fetch(`http://vos.es/api/v1/videojocs?page=${page}${parametro}${ordenar}`);
		const response = await fetch(link);
		const videojoscArray = await response.json();
		setTotalPages(videojoscArray.Tamany);
		setvideojocs(videojoscArray.Resultat);
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

	const onSubmit=(e)=>{
		
			console.log(e.target.value);
	}
	const afegirAlCarret=(joc)=>{
		console.log(joc);
		afegirProducteAlCarret(joc);
	}
	for (let i = 1; i <= TotalPages; i++) {
		numero.push(
			<li key={i} className="page-item">
				{/* <a className="page-link" href={`?pagina=${i}`}> */}
				<a className="page-link" href={`?pagina=${i}${filt}${ord}`}>
					{i}
				</a>
			</li>
		);
	}
	

	return (
		<div>
		<div className="container-fluid">
					<div className="row">
							<div className="col-12">
								{page>1 || page===undefined?"":<Diapositives></Diapositives>}
							</div>
						</div>
		</div>
		<div className="mt-9 container">
			<div className="row">
				<div className="col-2"></div>
				<div className="col-8">
					<div className="row">
					<Filter></Filter>
				
						{videojocs.length < 1 ? infiniteSpinner() : ""}
						{videojocs &&
							videojocs.map((joc, index) => (
								<div className="col col-lg-4 border-2 my-3 my-3 gap-4" key={joc.id}>
									<a href={`/videojoc/${joc.id}`}>
										<img
										loading="lazy"
											src={joc.portada}
											title={`${joc.titul}"`}
											className={`w-100 h-auto`}
											alt=""
										/>
									</a>
									<h5>
										<a href={`/videojoc/${joc.id}`}>{joc.id}-{joc.titul}</a>
									</h5>
									<p>Preu: {joc.preu}€</p>
									<p><ClockHistory className="me-1"></ClockHistory>Fecha Estreno: {new Date(joc.fechaEstreno).toLocaleDateString()}</p>
									<div className="d-flex justify-content-around">
									<Button onClick={()=>afegirAlCarret(joc)} title="Poner en " variant="secondary"><Cart></Cart></Button>{' '}
									<Button title="Comprar ya" variant="primary">Comprar ya</Button>{' '}
									</div>
								</div>
							))}
						<div className=" mb-9 d-flex justify-content-center">
							<nav aria-label="Page navigation example">
								<ul className="pagination d-flex m-0">
									{numero}
									</ul>
							</nav>
						</div>
					</div>
				</div>
				<div className="col-2"></div>
			</div>
		</div>
		</div>
	);
};

export default Index;
