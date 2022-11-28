import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import useTitle from "../Hooks/useTitle";
import Toast from "../components/toast";
import ContainerRecomanacio from "../components/ContainerRecomanacio";
const Carrito = (props) => {
	// const { carrito, buidar, title } = props;
	useTitle(props.title);
	const [ArrayCarret, setArrayCarret] = useState([]);
	const [ArrayCarretTractat, setArrayCarretTractat] = useState('');
	const [PreuTotal, setPreuTotal] = useState(0);
	const [Show, setShow] = useState(false);
	let n=[];
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
		let n=[];
		for (const iterator of ArrayCarret) {
			n.push(`Preu joc:${iterator.preu} Nom: ${iterator.titul}`);
		}
		let string=n.join(',\n');
		setArrayCarretTractat(n);
		console.log(ArrayCarretTractat);
	
	
	}, [ArrayCarret])
	

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
				<div className="col col-lg-2"></div>
				<div className="co-8">
					<div className="row">
						<div className="col col-lg-8">
						<div className="my-2 d-block d-lg-none flex-column gap-3">
								<div className="d-block d-lg-none">
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
								<form className="w-100" action="http://vos.es/api/v1/pago" method="POST">
									<input type="hidden" name="productes" value={JSON.stringify(ArrayCarretTractat)} />
									<input type="hidden" name="preu" value={PreuTotal} />
									<button className="btn btn-primary w-100" type="submit">
										Pagar
									</button>
								</form>
								<Link to="/" title="Tornar a la tenda" className="w-100 my-2 btn btn-secondary mb-3">
									<i className="bi bi-arrow-left-short"></i>
									<span className="d-none d-md-inline">Tornar a la tenda</span>
								</Link>
								<div className="mb-9">&nbsp;</div>
							</div>
							<div className="my-3">
								<button className="btn-primary btn" onClick={() => { onClick() }}>
									Borrar
								</button>
							</div>
							<table className="table">
								<thead>
									<tr>
										<th>Id</th>
										<th className="d-none d-lg-table-cell">Portada</th>
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

													<td className="d-none d-lg-table-cell">
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
						<div className="col-4 d-none d-lg-flex flex-column justify-content-around">
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
							<div className="d-none d-lg-flex flex-column gap-3">
								{/* <Link to="" className="btn btn-primary">
									Comprar
								</Link> */}
								<form className="w-100" action="http://vos.es/api/v1/pago" method="POST">
									<input type="hidden" name="productes" value={JSON.stringify(ArrayCarretTractat)} />
									<input type="hidden" name="preu" value={PreuTotal} />
									<button className="btn btn-primary w-100" type="submit">
										Pagar
									</button>
								</form>
								<Link to="/" title="Tornar a la tenda" className="btn btn-secondary mb-3">
									<i className="bi bi-arrow-left-short"></i>
									<span className="d-none d-md-inline">Tornar a la tenda</span>
								</Link>
								<div className="mb-9">&nbsp;</div>
							</div>
						</div>
						<ContainerRecomanacio width={`w-100`} />
					</div>
				</div>
				<div className="col col-2"></div>
			</div>

		</div>
	);
};

export default Carrito;
