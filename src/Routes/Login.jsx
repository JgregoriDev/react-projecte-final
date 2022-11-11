import React from "react";
import jwt_decode from "jwt-decode";
const Login = () => {
	const onSubmit = (e) => {
		e.preventDefault();
		console.log(e.target[0].value);
		console.log(e.target[1].value);
		const objecteDadesLogin = {
			username: e.target[0].value,
			password: e.target[1].value,
		};
		const result = login(objecteDadesLogin);
		result
			.then((result) => {
				if (result) {
					console.log(result);
					const token=JSON.parse(result);
				
					const decoded = jwt_decode(token.token);
					console.log(decoded.roles);
					localStorage.setItem("token", token.token.token);
					window.location.href="/perfil";
				}
			})
			.catch((err) => {});
	};
	const login = async (objecte) => {
		let headersList = {
			"Accept": "*/*",
			"Content-Type": "application/json",
		};

		let bodyContent = JSON.stringify(objecte);

		let response = await fetch("http://vos.es/api/login_check", {
			method: "POST",
			body: bodyContent,
		});

		let data = await response.text();

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
					<input type="submit" className="btn btn-primary" value="Login" />
				</form>
			</div>
			<div className="col-2"></div>
		</div>
	);
};

export default Login;
