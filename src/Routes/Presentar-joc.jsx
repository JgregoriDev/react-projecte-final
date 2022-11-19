import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import useTitle from "../Hooks/useTitle";
const PresentarJoc = ({title}) => {
	useTitle(title);
	const [Videojoc, setVideojoc] = useState({});
	const [Comentaris, setComentaris] = useState([]);
	const [NComentaris, setNComentaris] = useState(0);
	const [Usuari, setUsuari] = useState(null);
	const [Joc,setJoc]=useState(0);
	const [Missatge,setMissatge]=useState('');
	const idJoc = window.location.pathname.split("/")[2];
	useEffect(() => {
		getVideojoc();
		conseguirToken();
	}, []);

	const conseguirToken = () => {
	
		if (localStorage.getItem("token")) {
			const token = localStorage.getItem("token");
			setUsuari(token.email);
			console.log(Usuari);
		}
	};

	const getVideojoc = async () => {
		const link = `http://vos.es/api/v1/videojoc/${idJoc}`;
		const response = await fetch(link);
		const videojocObject = await response.json();
		setVideojoc(videojocObject.Videojoc);
		setNComentaris(videojocObject.NumeroVotacions);
	};

	const getComentaris = async () => {
		const link = `http://vos.es/api/v1/videojoc/${idJoc}/comentaris`;
		const response = await fetch(link);
		const comentarisObject = await response.json();
		console.log(comentarisObject);
		setComentaris(comentarisObject);
	};

	const onSubmit = (e) => {
		e.preventDefault();
		console.log(e.target[0].value);
		if (localStorage.getItem("token")) {
			const resultat=peticion(e);
			resultat.then((res)=>{
				console.log(res.title);
				setMissatge(res.title);
			})
			.catch(err=>console.error(err))
		}
	};

	const peticion = async (e) => {
		const { id, email, token } = JSON.parse(localStorage.getItem("token"));
		console.log(id);
		console.log(token.id);
		let headersList = {
			"Accept": "*/*",
			"User-Agent": "Thunder Client (https://www.thunderclient.com)",
			"Authorization": `"Bearer ${token}`,
			"Content-Type": "application/json",
		};

		let bodyContent = JSON.stringify({
			votacio: 5,
			missatge: e.target[0].value,
		});

		let response = await fetch(
			`http://127.0.0.9/api/v1/videojoc/${idJoc}/usuari/${id}/comentari/nou`,
			{
				method: "POST",
				body: bodyContent,
				headers: headersList,
			}
		);

		let data = await response.json();
		return data;
	};

	const formComentari = () => {
		return (
			<form onSubmit={(evt) => onSubmit(evt)} method="post">
				<label htmlFor="votacio">Votacio</label>
				<input
					type="number"
					className="form-control my-3"
					placeholder="Votacio"
					name="votacio"
					id="votacio"
				/>
				<textarea
					className="form-control"
					placeholder="Comenta el videojoc"
					id="floatingTextarea"
				></textarea>
				<button className="btn btn-primary my-2" type="submit">
					Enviar Comentari
				</button>
				<small className="text-danger">
					{Missatge}
				</small>
			</form>
		);
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
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="16"
								height="16"
								fill="currentColor"
								className="bi bi-cart"
								viewBox="0 0 16 16"
							>
								<path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
							</svg>
						</Button>{" "}
						<Button title="Comprar ya" className="mx-2" variant="primary">
							Comprar ya
						</Button>{" "}
					</div>

					<div className="my-3">{Usuari === null ? "" : formComentari()}</div>
					<div className="my-3">
						<h3>
							{/* <ChatLeft className="mx-3"></ChatLeft> */}
							{NComentaris > 0
								? `Comentaris (${NComentaris})`
								: `No hi han comentaris`}
						</h3>
						<button
							className={`btn btn-primary ${NComentaris === 0 ? "d-none" : ""}`}
							onClick={getComentaris}
						>
							Carregar
						</button>

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
