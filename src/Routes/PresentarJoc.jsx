import React, { useState, useEffect } from "react";
import { Cart } from "react-bootstrap-icons";
import { ChatLeft } from "react-bootstrap-icons";
import Button from "react-bootstrap/Button";

const PresentarJoc = () => {
	const [Videojoc, setVideojoc] = useState({});
	const [Comentaris, setComentaris] = useState([]);
	const [NComentaris, setNComentaris] = useState(0);
	const id = window.location.pathname.split("/")[2];
	useEffect(() => {
		getVideojoc();
	}, []);
	const getVideojoc = async () => {
		const link = `http://vos.es/api/v1/videojoc/${id}`;
		const response = await fetch(link);
		const videojocObject = await response.json();
		setVideojoc(videojocObject.Videojoc);
		setNComentaris(videojocObject.NumeroVotacions);
	};
	const getComentaris = async () => {
		const link = `http://vos.es/api/v1/videojoc/${id}/comentaris`;
		const response = await fetch(link);
		const comentarisObject = await response.json();
		console.log(comentarisObject);
		setComentaris(comentarisObject);
	};

	return (
		<div className="container-fluid">
			<div className="row">
				<div className="col-2"></div>
				<div className="col-8">
					<h1 className="text-center">
						{Videojoc.id} - {Videojoc.titul}
					</h1>
					<img className="w-100 h-auto" src={`${Videojoc.portada}`} alt="" />

					<p>
						<b>Fecha llançament</b>:{" "}
						{new Date(Videojoc.fechaEstreno).toLocaleDateString()}
					</p>
					<p>
						<b>Preu</b>: {Videojoc.preu} €
					</p>
					<p>
						<b>Descripcio</b>: {Videojoc.descripcio}
					</p>
					<div className="d-flex justify-content-center">
						<Button title="Poner en " variant="secondary">
							<Cart></Cart>
						</Button>{" "}
						<Button title="Comprar ya" className="mx-2" variant="primary">
							Comprar ya
						</Button>{" "}
					</div>
					<h3><ChatLeft className="mx-3"></ChatLeft>{NComentaris>0?`Comentaris (${NComentaris})`:`No hi han comentaris`}</h3>
					<button
						className={`btn btn-primary ${
							NComentaris === 0 ? "d-none" : ""
						}`}
						onClick={getComentaris}
					>
						Carregar
					</button>
					<div className="my-3">
       
						{Comentaris &&
							Comentaris.map((comentari) => {
								return (
									<div key={comentari.id}>
										<a href="">{comentari.usuari_votacio.email}</a>
										<p>
											<b>Votacio:</b> {comentari.votacio}{" "}
										</p>
										<p>{comentari.missatge}</p>
									</div>
								);
							})}
					</div>
				</div>
				<div className="col-2"></div>
			</div>
		</div>
	);
};

export default PresentarJoc;
