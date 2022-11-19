import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useTitle from "../Hooks/useTitle";
import Toast from "../components/toast";
const Carrito = (props) => {
	const {carrito,buidar,title}=props;
	useTitle(props.title);
	const [ArrayCarret, setArrayCarret] = useState([]);
	const [TamanyCarret, setTamanyCarret] = useState(0);
	const [PreuTotal, setPreuTotal] = useState(0);
	const [Show, setShow] = useState(false);
	useEffect(() => {
		console.trace(carrito);
		setArrayCarret(carrito);
		// ArrayCarret.forEach(element => {
		// 	const preuAux=element.preu+PreuTotal;
		// 	setPreuTotal(preuAux);
		// });
	}, [ArrayCarret]);

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

	const espai=()=>{
		return(
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
									<div className="mb-9">&nbsp;</div>
							</div>
							{espai()}
								
						</div>
					</div>
				</div>
				<div className="col-2"></div>
			</div>
		
		</div>
	);
};

export default Carrito;
