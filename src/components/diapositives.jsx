import React,{useState,useEffect} from 'react'
import Carousel from 'react-bootstrap/Carousel';
import { Link } from 'react-router-dom'

const Diapositives = () => {
  const [index, setIndex] = useState(0);
  const [Jocs, setJocs] = useState([]);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };
  useEffect(() => {
    
    getVideojocsFromServerForSlider()
   
  }, [])
  
  const getVideojocsFromServerForSlider = async () => {
	
		let page=`${parseInt(1)}`;
		let parametro=`&parametro=fechaEstreno`;
		let ordenar=`&sort=DESC`;
		let results=`&results=3`;
		const response = await fetch(`${process.env.REACT_APP_DOMAIN_API}videojocs?page=${page}${parametro}${ordenar}${results}`);
		// const response = await fetch(`https://vos.es/api/v1/videojocs?page=${page}${parametro}${ordenar}${results}`);
		const videojoscArray = await response.json();
		setJocs(videojoscArray.Resultat);
    
	};

  return (
    <div>
       <Carousel activeIndex={index}  className={`d-none d-lg-block ${Jocs.length>0?"":"d-none"}`} onSelect={handleSelect}>
      {Jocs && Jocs.map((joc)=>{
        return(
          <Carousel.Item key={joc.id} to={`/videojuegos/${joc.id}`}>
          <img
            loading='lazy'
            className="d-block w-100"
            src={joc.portada}
            style={{height: '60vh'}}
            alt={`${joc.titul}`}
          />
  
          <Carousel.Caption>
            <p>{joc.titul}</p>
            <p>
              {joc.descripcio}
            </p>
            <Link title={`Conseguir ara ${joc.titul}`} className="btn btn-primary" to={`/videojoc/${joc.id}`}>Conseguir ara</Link>
          </Carousel.Caption>
        </Carousel.Item>
        )})}
      
    </Carousel>
    </div>
  )
}

export default Diapositives