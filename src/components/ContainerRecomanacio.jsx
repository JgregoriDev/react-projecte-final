import React, {useState,useEffect} from 'react'
import { Link } from "react-router-dom";
import "../assets/style/ContainerRecomanacio.css"
const ContainerRecomanacio = ({width}) => {
	const [Jocs, setJocs] = useState([]);

  useEffect(() => {
		getVideojocs();


	}, []);

  const getVideojocs = async () => {

		let page = `${parseInt(1)}`;
		let parametro = `parametro=fechaEstreno`;
		let ordenar = `&sort=DESC`;
		let results = `&results=3`;
		const response = await fetch(`https://app.11josep.daw.iesevalorpego.es/api/v1/videojocs?${parametro}${ordenar}${results}`);
		// const response = await fetch(`https://vos.es/api/v1/videojocs?${parametro}${ordenar}${results}`);
		const videojoscArray = await response.json();
		setJocs(videojoscArray.Resultat);
		// console.log(Jocs);

	};

  return (
    <div>
      	<h4 className="my-3">Tal volta t'interesse algun d'aquests jocs</h4>
						<div className={`row`}>
							{Jocs.length > 1 ? Jocs.map((joc) => {
								return (<div key={joc.id} className="col-12 col-lg-3">
									<Link to={`/videojoc/${joc.titul}`}>
										<img className={`h-auto ${width}`} loading="lazy" src={`${joc.portada}`} alt={`${joc.titul}`} />
									</Link>
									<h5><Link to={`/videojoc/${joc.titul}`}>{joc.titul}</Link></h5>
									</div>)
							}) : null}
						</div>
    </div>
  )
}

export default ContainerRecomanacio