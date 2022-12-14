import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Link, useParams } from "react-router-dom";
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import Spinner from "react-bootstrap/Spinner";
import "../assets/style/Space.css"
import useTitle from "../Hooks/useTitle";

const Plataforma = ({ title }) => {
	const { id } = useParams();
	const search = useLocation().search;
	let genere = new URLSearchParams(search).get("genere") ?? 0;
	const [Jocs, setJocs] = useState([]);
	const [Error, setError] = useState('');
	const [IsLoading, setIsLoading] = useState(false);
	const [Plataforma, setPlataforma] = useState("");
	const [Marca, setMarca] = useState([]);
	const [Generes, setGeneres] = useState([]);
	const [Genere, setGenere] = useState([]);
	useTitle(title);
	useEffect(() => {
		// console.log(id);
		
		conseguirJocsPlataforma()
			.then((result) => {
				if (Array.isArray(result.plataforma_videojocs)) {
					setJocs(result.plataforma_videojocs);
					setIsLoading(true);
					if(result?.plataforma){
						setPlataforma(result.plataforma);
					}
				} else {
					setTimeout(() => {
						setError("Ha hagut un error no s'ha pogut carregar les dades");
					}, 500);
				}
			}).catch((err) => {
				console.error(err);
			});
		conseguirGeneresPlataforma();
	}, [id]);
	useEffect(() => {
		genere = new URLSearchParams(search).get("genere") ?? 0;
		setGenere(genere);
		if (genere === 0) {
			setIsLoading(false);
			conseguirJocsPlataforma()
				.then((result) => {
					if (Array.isArray(result.plataforma_videojocs)) {
						if(result?.plataforma){
							setPlataforma(result.plataforma);
						}
						setJocs(result.plataforma_videojocs);
						setIsLoading(true);
					} else {
						setTimeout(() => {
							setError("Ha hagut un error no s'ha pogut carregar les dades");
						}, 500);
					}
				}).catch((err) => {
					console.error(err);
				});
		} else {
			
						setIsLoading(false);
			conseguirJocsPlataformaGenere()
				.then((result) => {
					if (Array.isArray(result?.Resultat)) {
						// console.log(result?.Resultat);
						setIsLoading(true);
	
						setJocs(result?.Resultat);
					} else {
						setTimeout(() => {
							setError("Ha hagut un error no s'ha pogut carregar les dades");
						}, 500);
					}
				}).catch((err) => {
					console.error(err);
				});
		}
		console.log(genere);
	}, [genere]);

	const conseguirJocsPlataformaGenere= async()=>{
		const response = await fetch(
			`${process.env.REACT_APP_DOMAIN_API}videojoc/plataforma/${id}?genere=${genere}`
		);
		const resultat = await response.json();
		return resultat;
	}
	const conseguirJocsPlataforma = async () => {
		const response = await fetch(
			// `http://vos.es/api/v1/plataforma/${id}`
			`${process.env.REACT_APP_DOMAIN_API}plataforma/${id}`
		);
		const resultat = await response.json();
		return resultat;
	};

	const spinner = () => {
		return (
			<>
				<Spinner animation="border" role="status">
					<span className="visually-hidden">Carregant jocs...</span>
				</Spinner>
				<p>
					<span className="text-danger">

					</span>
				</p>
			</>
		)
	}
	const conseguirGeneresPlataforma = async (id) => {
		const response = await fetch(`${process.env.REACT_APP_DOMAIN_API}generes`);
		const resultat = await response.json();
		setGeneres(resultat);
	};

	return (
		<div className="container-fluid h-75-vh">
			<div className="row">
				<div className="d-none d-lg-block col-2"></div>
				<div className="col-12 col-lg-8">
					<div className="row mt-5 mb-5">
						<Breadcrumb>
							<Breadcrumb.Item href="/">Inici</Breadcrumb.Item>
							<Breadcrumb.Item active>
								Marca
							</Breadcrumb.Item>
							<Breadcrumb.Item active>Plataforma  {`${id} ${Plataforma}`}</Breadcrumb.Item>
						</Breadcrumb>
						<h1>Plataforma amb id {`${id} - ${Plataforma}`}</h1>
						{IsLoading===false
							? (spinner()) :  Jocs.length>0? Jocs.map((Joc) => {
								// console.log(Joc);
								return (
									<div key={Joc.id} className="col gap-5 my-3 px-4 col-lg-4">
										<Link to={`/videojoc/${Joc.titul}`}>
											<img
												src={`${Joc.portada}`}
												loading="lazy"
												className="w-100 h-auto"
												alt=""
											/>
										</Link>
										<h4>
											<Link to={`/videojoc/${Joc.titul}`}>
												{Joc.id} - {Joc.titul}
											</Link>
										</h4>
										<p>Generes: {Joc.generes.map((genere) => {
											return (<span className="badge rounded-pill text-bg-primary">{genere.genere}</span>);
										})}</p>
										<p><span className="badge rounded-pill text-bg-primary">{Joc.genere}</span></p>
										<p>{`${Joc.descripcio.split(".")[0]}.${Joc.descripcio.split(".")[1]}...`}</p>
									</div>
								);
							}):<>
								<h2>{genere!==0?`El gènere ${genere} no disposa de videojocs disponibles`: `La plataforma seleccionada no disposa de jocs`}</h2>
							</>
						}
					</div>
					<div className="mb-3"></div>
				</div>
				<div className="d-none d-lg-block col-2">
					<div className='my-4'>
						&nbsp;
					</div>
					<div>


						<h5>Generes</h5>
						{genere !== 0 ? <div className="ms-3 mb-3">
							<Link className="btn btn-primary w-25" title="Llevar filtros" to={{ pathname: "", search: `` }}>
							<i className="bi bi-x-circle"></i>
							</Link>

						</div> : null}
						<div className="mt-4"></div>
						.
						{Generes
							? Generes.map((gen) => {
								return (
									<div className="mb-4 ms-3" key={gen.id}>
										<Link className={`${gen.id===parseInt(Genere)?"text-black":""}`} to={{
											pathname: "",
											search: `genere=${gen.id}`,
										}}>{gen.genere}</Link>
									</div>
								);
							})
							: ""}
					</div>
					{Jocs && Jocs.length < 1 ?
						<div className='my-3'>
							&nbsp;
						</div> : ""}
				</div>
			</div>
		</div>
	);
};
export default Plataforma