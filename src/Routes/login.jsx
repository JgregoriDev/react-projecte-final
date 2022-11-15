import React from "react";
import jwt_decode from "jwt-decode";
import axios from "axios";

const Login = () => {
	const onSubmit = (e) => {
		e.preventDefault();
		console.log(e.target[0].value);
		console.log(e.target[1].value);
		const objecteDadesLogin = {
			email: e.target[0].value,
			password: e.target[1].value,
		};
		const result = login(objecteDadesLogin);
		result
			.then((result) => {
				console.log(result);
				localStorage.setItem("token",JSON.stringify({"id":result.id,"email":result.email,"token":result.token}));
				window.location.href = "/perfil";
			})
			.catch((err) => {});
	};
	const login = async (objecte) => {
		let headersList = {
			"Accept": "*/*",
			"User-Agent": "Thunder Client (https://www.thunderclient.com)",
			"Content-Type": "application/json",
		};


		
		let bodyContent = JSON.stringify({
			email: "admin",
			password: "admin",
		});

		let response = await fetch("http://vos.es/api/login", {
			method: "POST",
			body: bodyContent,
			headers: headersList,
		});

		let data = await response.json();
		return data;
	};
	return (
		<div className="row">
			<div className="col-2"></div>
			<div className="col-8">
				<form
					action=""
					onSubmit={(e) => {
						onSubmit(e);
					}}
					method="post"
				>
					<div className="mb-3">
						<label htmlFor="usuari">Usuari</label>
						<input id="usuari" className="form-control" type="text" />
					</div>
					<div className="mb-3">
						<label htmlFor="contrasenya">Contrasenya</label>
						<input id="contrasenya" className="form-control" type="password" />
					</div>
					<div className="d-flex justify-content-center">
						<input type="submit" className="btn btn-primary" value="Login" />
					</div>
				</form>
				<div className="mt-50vh"></div>
			</div>
			<div className="col-2"></div>
		</div>
	);
};

export default Login;
