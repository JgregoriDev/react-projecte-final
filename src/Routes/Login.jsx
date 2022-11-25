import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useTitle from "../Hooks/useTitle";
const Login = ({ title }) => {
	const [ErrorMessage, setErrorMessage] = useState('');
	const [isLogin, setIsLogin] = useState(false);
	useTitle(title)
	const navigate = useNavigate();
	const onSubmit = (e) => {
		e.preventDefault();
		const objecteDadesLogin = {
			email: e.target[0].value,
			password: e.target[1].value,
		};
		const result = login(objecteDadesLogin);
		result
			.then((result) => {
				console.log(result);
				if (result?.Title) {
					if (result.Title === "Login incocorrecte") {
						setErrorMessage("Error dades incorrectes");
					}else if(result?.token) {
						console.log(result);
						const token = {
							id: result.id,
							email: result.email,
							token: result.token,
						}
						localStorage.setItem(
							"token",
							JSON.stringify(token)
						);
						window.location.href = "/perfil";
						// navigate(0);
						// navigate("/");
					}

				}
			})
			.catch((err) => { });
	};
	const login = async (objecte) => {
		let headersList = {
			"Accept": "*/*",
			"Content-Type": "application/json",
		};
		// 'Access-Control-Allow-Origin':"*",
		
		console.log(objecte);
		let bodyContent = JSON.stringify({
			email: objecte.email,
			password: objecte.password,
		});

		let response = await fetch("http://vos.es/api/login", {
		// let response = await fetch("http://app.11josep.daw.iesevalorpego.es/api/login", {
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
					<small className="text-danger">{ErrorMessage}</small>
				</form>
				<div className="mt-50vh"></div>
			</div>
			<div className="col-2"></div>
		</div>
	);
};

export default Login;
