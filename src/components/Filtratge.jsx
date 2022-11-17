import React from 'react'

const Filtratge = () => {


  // const filteredPrice=async(min,max)=>{
  //   const result=await fetch(`http://vos.es/api/v1/videojoc/filtrar/preu/${min}/${max}`);
  //   const resultJSON=await result.json();
  //   return JSON.parse(resultJSON);
  // };

  const onSubmit = (e)=> {
    e.preventDefault();
    console.log("submit");
    window.location.href="/filtrar/25/50";
    // window.location.href=`/filtrar/${e.target[0].value}/${e.target[1].value}`;
    // filteredPrice(e.target[0].value,e.target[1].value);

  }
  return (
    <>
    <div className='my-4'>
      &nbsp;
    </div>
    <div className='d-flex flex-row align-content-end justify-content-center'> 
      <form action="" onSubmit={(e)=>onSubmit} method="get">
        <input type="text" placeholder='min' className='form-control w-75 my-2 me-1' name="filtrarMin" id="filtrarMin" />
        <input type="text" placeholder='max' className='form-control w-75 my-2 me-1' name="filtrarMax" id="filtrarMax" />
        <button className='btn btn-primary text-center' type="submit">Enviar</button>
      </form>
    </div>
    </>
  )
}

export default Filtratge