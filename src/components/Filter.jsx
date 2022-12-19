import React,{useState,useEffect} from 'react'
import { Link, useLocation } from 'react-router-dom'

const Filter = ({props}) => {
	const {path,orden,filtrat} = props;
	const [Active, setActive] = useState(`${filtrat}${orden}`);
	// useEffect(() => {
	// 	setActive(`${orden}${orden}`);	
	// }, [props])
	// console.log(props.at(-1));
	// const location = useLocation();
	// let ordenar = new URLSearchParams(location.search()).get("filtrar");
	// let orden = new URLSearchParams(location.search()).get("orden");
	
  return (
    <div className='row my-2'>
			<h5 id='Orden'>Ordenar</h5>
      	
				<div className="d-flex gap-4">
		
				<Link
					className={`btn btn-secondary  ${props.at(-1)==="preu"  && props.at(-2)==="ASC"?"d-none":""}`  }
					title="Ordenar per preu de manera ascendent"
					to={{
						pathname: path,
						search: `orden=ASC&filtrar=preu`,
						hash: "#Orden",
					}}
				>
					<i className="bi bi-sort-numeric-up"></i>Preu Ascendent
				</Link>
				<Link
					className={`btn btn-secondary  ${props.at(-1)==="preu"  && props.at(-2)==="DESC"?"d-none":""}` }
					title="Ordenar per preu de manera ascendent"
					to={{
						pathname: path,
						search: `orden=DESC&filtrar=preu`,
						hash: "#Orden",
					}}
				>
					<i className="bi bi-sort-numeric-down d-inline"></i>Preu Descendent
				</Link>
				<Link
					className={`btn btn-secondary  ${props.at(-1)==="fechaEstreno" && props.at(-2)==="ASC"?"d-none":""}`}
					title="Ordenar per data de manera ascendent"
					to={{
						pathname: path,
						search: `orden=ASC&filtrar=fechaEstreno`,
						hash: "#Orden",
					}}
				>
					<i className="bi bi-sort-numeric-down d-inline"></i>
					Data Ascendent
				</Link>
				<Link
					className={`btn btn-secondary  ${props.at(-1)==="fechaEstreno" && props.at(-2)==="DESC"?"d-none":""}`}
					title="Ordenar per data de manera descendent"
					to={{
						pathname: path,
						search: `orden=DESC&filtrar=fechaEstreno`,
						hash: "#Orden",
					}}
				>
					<i className="bi bi-sort-numeric-down d-inline"></i>
					Data Descendent
				</Link>
				{/* <Link
					className={`btn btn-secondary  ${filtrat==="fechaEstreno"  && props.at(-2)==="DESC"?"d-none":""}`}
					title="Ordenar per data de manera descendent"
					to={{
						pathname: path,
						search: `orden=DESC&filtrar=fechaEstreno`,
						hash: "#Orden",
					}}
				>
						<i className="bi bi-sort-numeric-up"></i>
						Data
				</Link> */}
				</div>
    </div>
  )

}

export default Filter
