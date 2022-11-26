import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useTitle from "../Hooks/useTitle";
import Toast from "../components/toast";
const Carrito = (props) => {
	const { carrito, buidar, title } = props;
	useTitle(props.title);
	const [ArrayCarret, setArrayCarret] = useState([]);
	const [TamanyCarret, setTamanyCarret] = useState(0);
	const [Jocs, setJocs] = useState([]);
	const [PreuTotal, setPreuTotal] = useState(0);
	const [Show, setShow] = useState(false);
	useEffect(() => {
		const items = JSON.parse(localStorage.getItem('carrito'));
		if (items !== Carrito) {
			setArrayCarret(items);
			let preu = 0;
			for (let i = 0; i < items.length; i++) {
				const item = items[i];
				preu += item.preu;
			}
			setPreuTotal(preu);
		}
	}, []);

	useEffect(() => {
		getVideojocs();


	}, [])

	const getVideojocs = async () => {

		let page = `${parseInt(1)}`;
		let parametro = `parametro=fechaEstreno`;
		let ordenar = `&sort=DESC`;
		let results = `&results=3`;
		const response = await fetch(`https://app.11josep.daw.iesevalorpego.es/api/v1/videojocs?${parametro}${ordenar}${results}`);
		// const response = await fetch(`https://vos.es/api/v1/videojocs?${parametro}${ordenar}${results}`);
		const videojoscArray = await response.json();
		setJocs(videojoscArray.Resultat);
		console.log(Jocs);

	};

	const borrarVideojocCarret = (key) => {
		console.log(key);
		const carro = JSON.parse(localStorage.getItem("carrito"));
		const index = carro.findIndex((producte) => {
			return key === producte.id;
		});
		let help = ArrayCarret.splice(carro[index], 1);
		// console.log(help);
		setArrayCarret(ArrayCarret);

		localStorage.setItem("carrito", JSON.stringify(ArrayCarret));
	};
	const onClick = () => {
		props.buidarCarret();
		localStorage.removeItem("carrito");
		setArrayCarret([]);
	};
	const modificarVista = () => {
		setShow(true);
		setTimeout(() => {
			setShow(false);
		}, 1300);
	};

	const espai = () => {
		return (
			<div>
				<div className="mb-9">&nbsp;</div>
				<div className="mb-9">&nbsp;</div>
				<div className="mb-9">&nbsp;</div>
				<div className="mb-9">&nbsp;</div>
				<div className="mb-9">&nbsp;</div>
				<div className="mb-9">&nbsp;</div>
				<div className="mb-9">&nbsp;</div>
				<div className="mb-9">&nbsp;</div>
			</div>
		);
	}

	return (
		<div className="container">
			<div className="row">
				<div className="col-2"></div>
				<div className="co -8">
					<div className="row">
						<div className="col-8">
							<div className="my-3">
								<button className="btn-primary btn" onClick={() => { onClick() }}>
									Borrar
								</button>
							</div>
							<table className="table">
								<thead>
									<tr>
										<th>Id</th>
										<th>Portada</th>
										<th>Titul</th>
										<th>Preu</th>
										{/* <th>Cantitat</th> */}
										<th>Borrar</th>
									</tr>
								</thead>
								<tbody className="table-group-divider">
									{ArrayCarret && ArrayCarret.map &&
										ArrayCarret.map((producte, index) => {
											return (
												<tr
													key={index}
													className={index % 2 === 0 ? "bg-secondary" : ""}
												>

													<th scope="row">{producte.id}</th>

													<td>
														<img
														loading="lazy"
															className="img-thumbnail w-25 h-auto"
															src={producte.portada}
															alt={producte.titul}
														/>
													</td>
													<td>{producte.titul}</td>
													{/* <td>{producte.cantitat}</td> */}
													<td>{producte.preu} $</td>
													<td className="">
														<button
															className="btn btn-primary text-white"
															onClick={() => {
																modificarVista();
																borrarVideojocCarret(producte.id);
															}}
														>
															<i className="bi bi-trash"></i>
														</button>
													</td>
												</tr>
											);
										})}
								</tbody>
							</table>

						</div>
						<div className="col-4 d-flex flex-column justify-content-around">
							<div>
								<p>
									<b>Detalls</b>
								</p>
								<p>
									<b>
										Total productes:{" "}
										{ArrayCarret !== undefined ? `${ArrayCarret.length}` : ""}
									</b>
								</p>
								<p>
									<b>Preu:</b> {PreuTotal}
								</p>
							</div>
							{Show ? (
								<Toast
									message={`Has borrat un producte\n de la pàgina `}
								></Toast>
							) : (
								""
							)}
							<div className="d-flex flex-column gap-3">
								<Link to="" className="btn btn-primary">
									Comprar
								</Link>
								<Link to="/" title="Tornar a la tenda" className="btn btn-secondary mb-3">
									<i className="bi bi-arrow-left-short"></i>
									<span className="d-none d-md-inline">Tornar a la tenda</span>
								</Link>
								<div className="mb-9">&nbsp;</div>
							</div>
						</div>
						<h4 className="my-3">Tal volta t'interesse algun d'aquests jocs</h4>
						<div className="d-flex flex-column flex-md-row justify-content-center justify-content-md-between mb-5">
							{console.log(Jocs.length)}
							{Jocs.length > 1 ? Jocs.map((joc) => {
								return (<div key={joc.id} className="w-25">
									<Link to={`/videojoc/${joc.titul}`}>
										<img className="w-100 h-auto" loading="lazy" src={`${joc.portada}`} alt={`${joc.titul}`} />
									</Link>
									<h5><Link to={`/videojoc/${joc.titul}`}>{joc.titul}</Link></h5>
									</div>)
							}) : null}
						</div>
					</div>
				</div>
				<div className="col-2"></div>
			</div>

		</div>
	);
};

export default Carrito;
