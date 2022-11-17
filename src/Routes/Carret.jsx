import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Toast from "../components/toast";
const Carrito = ({Carrito}) => {
	const [ArrayCarret, setArrayCarret] = useState([]);
	const [TamanyCarret, setTamanyCarret] = useState(0);
	const [PreuTotal, setPreuTotal] = useState(0);
	const [Show, setShow] = useState(false);
	useEffect(() => {
		console.log(Carrito);
		setArrayCarret(Carrito);
		ArrayCarret.forEach(element => {
			const preuAux=element.preu+PreuTotal;
			setPreuTotal(preuAux);
		});
	}, []);

	const borrarVideojocCarret = (key) => {
		console.log(key);
		const carro = JSON.parse(localStorage.getItem("carrito"));
		console.log(carro);
		const index = carro.findIndex((producte) => {
			return key === producte.id;
		});
		let help = ArrayCarret.splice(carro[index], 1);
		// console.log(help);
		setArrayCarret(ArrayCarret);
	
		localStorage.setItem("carrito", JSON.stringify(ArrayCarret));
	};
	const onClick = () => {
		localStorage.removeItem("carrito");
		setArrayCarret([]);
	};
	const modificarVista = () => {
		setShow(true);
		setTimeout(() => {
			setShow(false);
		}, 1300);
	};

	return (
		<div className="container">
			<div className="row">
				<div className="col-2"></div>
				<div className="co -8">
					<div className="row">
						<div className="col-8">
							<button className="btn-primary btn" onClick={() => onClick}>
								Borrar
							</button>
							<table className="table">
								<thead>
									<tr>
										<th>Id</th>
										<th>Portada</th>
										<th>Titul</th>
										<th>Preu</th>
										<th>Cantitat</th>
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
															className="img-thumbnail w-25 h-auto"
															src={producte.portada}
															alt=""
														/>
													</td>
													<td>{producte.titul}</td>
													<td>{producte.cantitat}</td>
													<td>{producte.preu}</td>
													<td className="">
														<button
															className="btn btn-primary text-white"
															onClick={() => {
																modificarVista();
																borrarVideojocCarret(producte.id);
															}}
														>
															<svg
																xmlns="http://www.w3.org/2000/svg"
																width="16"
																height="16"
																fillRule="currentColor"
																className="bi bi-trash"
																viewBox="0 0 16 16"
															>
																<path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
																<path
																	fillRule="evenodd"
																	d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
																/>
															</svg>
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
								<Link to="/" className="btn btn-secondary mb-3">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="16"
										height="16"
										fillRule="currentColor"
										className="bi bi-arrow-left"
										viewBox="0 0 16 16"
									>
										<path
											fillRule="evenodd"
											d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
										/>
									</svg>
									Volver a la tienda
								</Link>
							</div>
						</div>
					</div>
				</div>
				<div className="col-2"></div>
			</div>
		</div>
	);
};

export default Carrito;
