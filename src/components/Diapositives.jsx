import React,{useState,useEffect} from 'react'
import Carousel from 'react-bootstrap/Carousel';
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
		const response = await fetch(`http://vos.es/api/v1/videojocs?page=${page}${parametro}${ordenar}${results}`);
		const videojoscArray = await response.json();
		setJocs(videojoscArray.Resultat);
	};

  return (
    <div>
       <Carousel activeIndex={index} className={`d-none d-lg-block`} onSelect={handleSelect}>
      {Jocs && Jocs.map((joc)=>{
        return(
          <Carousel.Item key={joc.id} href={`/videojuegos/${joc.id}`}>
          <img
            className="w-100 h-50"
            src={joc.portada}
            alt="Third slide"
          />
  
          <Carousel.Caption>
            <h3><a href={`/videojoc/${joc.id}`}>{joc.title}</a></h3>
            <p>
              {joc.descripcio}
            </p>
            <a className="btn btn-primary" href={`/videojoc/${joc.id}`}>Conseguir ara</a>
          </Carousel.Caption>
        </Carousel.Item>
        )})}
      
    </Carousel>
    </div>
  )
}

export default Diapositives