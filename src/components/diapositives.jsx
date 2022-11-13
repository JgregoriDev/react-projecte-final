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
		const response = await fetch(`https://app.11josep.daw.iesevalorpego.es/api/v1/videojocs?page=${page}${parametro}${ordenar}${results}`);
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
            className="w-100 h-50"
            src={joc.portada}
            alt="Third slide"
          />
  
          <Carousel.Caption>
            <p>{joc.title}</p>
            <p>
              {joc.descripcio}
            </p>
            <Link className="btn btn-primary" to={`/videojoc/${joc.id}`}>Conseguir ara</Link>
          </Carousel.Caption>
        </Carousel.Item>
        )})}
      
    </Carousel>
    </div>
  )
}

export default Diapositives