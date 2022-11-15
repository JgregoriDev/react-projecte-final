import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export const Plataforma = () => {
	const [Jocs, setJocs] = useState("");
	const [Generes, setGeneres] = useState([]);
	useEffect(() => {
		conseguirJocsPlataforma();
		conseguirGeneresPlataforma();
	}, []);
	const conseguirJocsPlataforma = async (id) => {
		const response = await fetch(
			`http://vos.es/api/v1/plataforma/${
				window.location.pathname.split("/")[2]
			}`
		);
		const resultat = await response.json();
		setJocs(resultat.plataforma_videojocs);
		console.log(resultat);
	};
	const conseguirGeneresPlataforma = async (id) => {
		const response = await fetch(`http://vos.es/api/v1/generes`);
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
						{Jocs.length > 0
							? Jocs.map((Joc) => {
									return (
										<div key={Joc.id} className="col gap-5 col-lg-4">
											<Link to={`/videojoc/${Joc.id}`}>
												<img
													src={`${Joc.portada}`}
													loading="lazy"
                          className="w-100 h-auto"
													alt=""
												/>
											</Link>
											<h4>
												<Link to={`/videojoc/${Joc.id}`}>
													{Joc.id} - {Joc.titul}
												</Link>
											</h4>
											<p>{Joc.descripcio}</p>
										</div>
									);
							  })
							: ""}
					</div>
					<div className="mb-3"></div>
				</div>
				<div className="col-2">
					{Generes
						? Generes.map((Genere) => {
								return (
									<div className="mb-3" key={Genere.id}>
										<Link to={``}>{Genere.genere}</Link>
									</div>
								);
						  })
						: ""}
				</div>
			</div>
		</div>
	);
};
