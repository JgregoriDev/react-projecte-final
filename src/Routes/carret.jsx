import React, { useState, useEffect } from "react";
import { Trash, ArrowLeft } from "react-bootstrap-icons";
import { Link } from "react-router-dom";

const Carrito = () => {
	const [ArrayCarret, setArrayCarret] = useState([]);
	const [TamanyCarret, setTamanyCarret] = useState(0);
	const [PreuTotal, setPreuTotal] = useState(0);
	useEffect(() => {
		setArrayCarret(JSON.parse(localStorage.getItem("carrito")));
		ArrayCarret.forEach((joc) => {
			console.log(joc.preu);
			setPreuTotal(PreuTotal + joc.preu);
		});
	}, []);

	const borrarVideojocCarret = (key) => {
		const k = key + 1;
		if (localStorage.getItem("carrito")!==undefined) {
			const carro = JSON.parse(localStorage.getItem("carrito"));
			// console.log(carro[key]);
			let help=ArrayCarret.splice(carro[k], 1);
      console.log(ArrayCarret,help);
			setArrayCarret(ArrayCarret);
			localStorage.setItem("carrito", JSON.stringify(ArrayCarret));
		} else {
		}
	};
	// const carregarArray = () => {
	// 	return (
	// 		<>
	// 			{ArrayCarret &&
	// 				ArrayCarret.map((producte, index) => {
	// 					return (
	// 						<tr key={index} className={index % 2 === 0 ? "bg-light" : ""}>
	// 							<th scope="row">{producte.id}</th>
	// 							<td>
	// 								<img
	// 									className="img-thumbnail w-25 h-auto"
	// 									src={producte.portada}
	// 									alt=""
	// 								/>
	// 							</td>
	// 							<td>{producte.titul}</td>
	// 							<td>{producte.cantitat}</td>
	// 							<td>{producte.preu}</td>
	// 							<td className="">
	// 								<button
	// 									className="btn btn-primary text-white"
	// 									onClick={() => borrarVideojocCarret(index)}
	// 								>
	// 									<Trash />
	// 								</button>
	// 							</td>
	// 						</tr>
	// 					);
	// 				})}
	// 		</>
	// 	);
	// };

	return (
		<div className="container">
			<div className="row">
				<div className="col-2"></div>
				<div className="co -8">
					<div className="row">
						<div className="col-8">
							<table className="table">
								<thead>
									<tr>
										<th>Id</th>
										<th>Borrar</th>
										<th>Portada</th>
										<th>Titul</th>
										<th>Cantitat</th>
										<th>Preu</th>
									</tr>
								</thead>
								<tbody className="table-group-divider">
                {ArrayCarret &&
					ArrayCarret.map((producte, index) => {
						return (
							<tr key={index} className={index % 2 === 0 ? "bg-light" : ""}>
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
										onClick={() => borrarVideojocCarret(index)}
									>
										<Trash />
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
							<div className="d-flex flex-column gap-3">
								<Link to="" className="btn btn-primary">
									Comprar
								</Link>
								<Link to="/" className="btn btn-secondary mb-3">
									<ArrowLeft className="mx-2"></ArrowLeft>Volver a la tienda
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
