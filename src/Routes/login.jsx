import React from "react";
import jwt_decode from "jwt-decode";
const Login = () => {
	const onSubmit = (e) => {
		e.preventDefault();
		console.log(e.target[0].value);
		console.log(e.target[1].value);
		const objecteDadesLogin = {
			"email": e.target[0].value,
			"password": e.target[1].value,
		};
		const result = login(objecteDadesLogin);
		// result
		// 	.then((result) => {
		// 		if (result) {
		// 			console.log(result);
		// 			const token = JSON.parse(result);

		// 			const decoded = jwt_decode(token.token);
		// 			console.log(decoded.roles);
		// 			localStorage.setItem("token", token.token.token);
		// 			window.location.href = "/perfil";
		// 		}
		// 	})
		// 	.catch((err) => {});
	};
	const login = async (objecte) => {
		console.log(objecte);

		// let bodyContent = JSON.stringify(objecte);
		fetch('http://vos.es/api/login_check', {
      credentials: 'include',
      method: 'POST',
			
      headers: {
				'Content-Type': 'application/json',
				'Access-Control-Allow-Credentials':true,
			},
      body: JSON.stringify(objecte),

      }).then(result => console.log('success====:', result))
        .catch(error => console.log('error============:', error));


		// return data;
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
