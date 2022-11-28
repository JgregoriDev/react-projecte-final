import React, { useState, useEffect } from "react";
import { Link,useParams } from "react-router-dom";
import Breadcrumb from 'react-bootstrap/Breadcrumb';

import useTitle from "../Hooks/useTitle";

const Plataforma = ({title}) => {
	const {id}=useParams();
	const [Jocs, setJocs] = useState([]);
	const [Marca, setMarca] = useState([]);
	const [Generes, setGeneres] = useState([]);
	useTitle(title);
	useEffect(() => {
		console.log(id);
		conseguirJocsPlataforma();
		conseguirGeneresPlataforma();
	}, [id]);
	const conseguirJocsPlataforma = async () => {
		const response = await fetch(
			// `http://vos.es/api/v1/plataforma/${id}`
			`https://app.11josep.daw.iesevalorpego.es/api/v1/plataforma/${id}`
		);
		const resultat = await response.json();

		setJocs(resultat.plataforma_videojocs);
		
	};
	const conseguirGeneresPlataforma = async (id) => {
		// const response = await fetch(`http://vos.es/api/v1/generes`);
		const response = await fetch(`https://app.11josep.daw.iesevalorpego.es/api/v1/generes`);
		const resultat = await response.json();
		setGeneres(resultat);
		console.log(resultat);
	};

	return (
		<div className="container-fluis">
			<div className="row">
				<div className="col-2"></div>
				<div className="col-8">
					<div className="row mt-5 mb-5">
						<Breadcrumb>
							<Breadcrumb.Item href="/">Inici</Breadcrumb.Item>
							<Breadcrumb.Item active>
								Marca
							</Breadcrumb.Item>
							<Breadcrumb.Item active>Plataforma  {`${id}`}</Breadcrumb.Item>
						</Breadcrumb>
						<h1>Plataforma amb id {`${id}`}</h1>
						{Jocs && Jocs.length > 0
							? Jocs.map((Joc) => {
								return (
									<div key={Joc.id} className="col gap-5 col-lg-4">
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

										<p>{`${Joc.descripcio.split(".")[0]}.${Joc.descripcio.split(".")[1]}...`}</p>
									</div>
								);
							})
							: <p>No hi han jocs amb aquesta plataforma</p>}
					</div>
					<div className="mb-3"></div>
				</div>
				<div className="col-2">
					<div className='my-4'>
						&nbsp;
					</div>
					<h5>Generes</h5>
					{Generes
						? Generes.map((Genere) => {
							return (
								<div className="mb-3 ms-3" key={Genere.id}>
									<Link to={``}>{Genere.genere}</Link>
								</div>
							);
						})
						: ""}
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