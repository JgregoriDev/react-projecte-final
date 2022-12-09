import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import jwt_decode from "jwt-decode";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link } from 'react-router-dom'
import useTitle from "../../Hooks/useTitle";
const SignupSchema = yup.object().shape({
  titul: yup
    .string()
    .required("El camp títul es un camp requerit")
    .min(3, "Ha de contindre mínim 3 caractes")
    .max(200, "El camp titol ha de tindre mínim 200 caracters"),
  descripcio: yup
    .string()
    .required("El camp descripció es un camp requerit")
    .max(200, "El camp descripció ha de tindre mínim 200 caracters"),
  cantitat: yup
    .number()
    .max(1000, "El valor màxim del camp cantitat  es 1000")
    .required()
    .positive("El camp cantitat ha de ser un valor positiu")
    .integer(),
  preu: yup
    .number()
    .max(300, "El valor màxim del camp preu  es 1000")
    .required()
    .positive("El camp preu ha de ser un valor positiu").integer(),
});


const JocForm = ( props ) => {
  const {title} = props;
  let token;
  useTitle(title);
  const navigate = useNavigate();
  const [plataformes, setplataformes] = useState([]);
  const [valorId,setValorId]=useState(0);
  const [Log, setLog] = useState("");
  const [Show, setShow] = useState(false);
  const [generes, setgeneres] = useState([]);
  const [ErrorMessageGeneres,setErrorMessageGeneres] = useState('');
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(SignupSchema)
  });
  const [GeneresJoc, setGeneresJoc] = useState(new Set());
  const [PlataformesJoc, setPlataformesJoc] = useState(new Set());



  useEffect(() => {
    token = JSON.parse(localStorage.getItem("token"));
    // console.log();
    if (token) {
      var decoded = jwt_decode(token.token);
      console.log();
      if (!decoded.roles.includes("ROLE_ADMIN")) {
        navigate(`/`);
      }

    }else{
      navigate(`/`);

    }
  }, [])

  useEffect(() => {
    const generes = conseguirGeneres();
    generes
      .then((result) => {
        // console.log(result);
        setgeneres(result);
      }).catch((err) => {

      });
    const plataformes = conseguirPlataformes();
    plataformes
      .then((result) => {
        // console.log(result);
        setplataformes(result);

      }).catch((err) => {

      });

  }, [])


  const conseguirPlataformes = async () => {
    let headersList = {
      "Accept": "*/*",
    }

    // let response = await fetch("http://vos.es/api/v1/plataformes", {
    let response = await fetch(`${process.env.REACT_APP_DOMAIN_API}plataformes`, {
      method: "GET",
      headers: headersList
    });

    let data = await response.json();
    return data;
  }

  const conseguirGeneres = async () => {
    let headersList = {
      "Accept": "*/*",
    }

    // let response = await fetch("https://vos.es/api/v1/generes", {
      let response = await fetch(`${process.env.REACT_APP_DOMAIN_API}generes`, {
      method: "GET",
      headers: headersList
    });

    let data = await response.json();
    return data;

  }

  const onSubmit = (data) => {
    // const auxGeneres = [...GeneresJoc];
    // const auxPlataformes = [...PlataformesJoc];

    // console.log(auxGeneres);
    // data.generes = auxGeneres;
    // data.videojoc_plataforma = auxPlataformes;
    token = JSON.parse(localStorage.getItem("token"));
    let error=false;
    console.log(data);
    data.generes.forEach(g => {
      const n=generes.findIndex(genere=>genere.id===g);
      console.log(n);
      if(n===-1)
        error=true;

    });
    const gen=generes.findIndex(genere=>data.generes[0].id);
    if(error){
      setErrorMessageGeneres("genere no trobat");
    }else{
      
      // data.plataforma.foreach(p=>{
      //   const finded=plataformes.findIndex(plataforma=>plataforma.plataforma===p.plataforma);
      //   if(finded===-1){

      //   }
      // });
    
    // const resultat = insertarJoc(token.token, data);
    // resultat
    //   .then((result) => {
    //     if(result?.Title === "Videojoc pujat de manera satisfactoria"){
    //       setLog(result?.Title);
    //       setValorId(result?.Videjoc?.titul);
    //       setShow(true);
    //     }else{

    //       setLog("No s'ha pogut pujar de manera satistactoria.");
    //     }

    //   }).catch((err) => {

    //   });
    }
  };


  const insertarJoc = async (token, valor) => {
    console.log(valor.portada[0].name);
    let headersList = {
      "Accept": "*/*",
      "Authorization": `Bearer ${token}`
    }

    let bodyContent = new FormData();
    bodyContent.append("titul", valor.titul);
    bodyContent.append("descripcio", valor.descripcio);
    bodyContent.append("cantitat", valor.cantitat);
    bodyContent.append("portada", valor.portada[0]??'');
    bodyContent.append("fechaEstreno", valor.fechaEstreno);
    bodyContent.append("portada", null);
    bodyContent.append("preu", valor.preu);
    // bodyContent.append(".append("portada", valor.portada);
     bodyContent.append("generes", JSON.stringify(valor.generes));
     bodyContent.append("videojoc_plataforma", JSON.stringify(valor.videojoc_plataforma));
    let response = await fetch(`${process.env.REACT_APP_DOMAIN_API}videojoc/nou`, {
    // let response = await fetch("http://vos.es/api/v1/videojoc/nou", {
      method: "POST",
      body: bodyContent,
      headers: headersList
    });

    let data = await response.json();
    return data;

  }

  const onClick = (e, item) => {
    if (item?.genere) {
      if (GeneresJoc.has(item)) {
        GeneresJoc.delete(item);
      } else {
        GeneresJoc.add(item);

      }
      // setGeneresJoc(new Set(GeneresJoc));

      console.log(GeneresJoc);
    }

    if (item?.plataforma) {
      if (PlataformesJoc.has(item)) {
        PlataformesJoc.delete(item);
      } else {
        PlataformesJoc.add(item);

      }
      setPlataformesJoc(new Set(PlataformesJoc));

      console.log(PlataformesJoc);
    }
  }

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12 col-lg-2"></div>
        <div className="col-12 col-lg-8">
          <h1>Insertar Joc</h1>
          <form action="" onSubmit={handleSubmit(onSubmit)} method="post">
            <div className="mb-3">
              <label className="form-label" htmlFor="titul"
              >Titol</label>
              <input className='form-control' id='titul' type="text"
                {...register("titul")}
              />
              {errors.titul && <small className='text-danger'>{errors.titul.message}</small>}

            </div>
            <div className="mb-3">
              <label className="form-label" htmlFor="preu">preu</label>
              <input className='form-control' id='preu' type="number"
                {...register("preu")}
              />
              {errors.preu && <small className='text-danger'>{errors.preu.message}</small>}
            </div>
            <div className="mb-3">
              <label className="form-label" htmlFor="cantitat">cantitat</label>
              <input className='form-control' id='cantitat' type="number"
                {...register("cantitat")}
              />
              {errors.preu && <small className='text-danger'>{errors.preu.message}</small>}
            </div>

            <div className="mb-3">
              <label className="form-label" htmlFor="data">Data:</label>
              <input className='form-control' type="date" id="fechaEstreno"
                {...register("fechaEstreno")}
              />
              {errors.fechaEstreno && <small className='text-danger'>{errors.fechaEstreno.message}</small>}
            </div>


            <div className="mb-3 form-floating">
              <textarea className="form-control" placeholder="Deixa una descripcio" id="descripcio"  {...register("descripcio")} ></textarea>
              <label htmlFor="descripcio">Descripcio</label>
              {errors.descripcio && <small className='text-danger'>{errors.descripcio.message}</small>}
            </div>

            <div className="mb-3">
              <label className="form-label" htmlFor="portada">Archiu</label>
              <input className='form-control' ref={register} id="portada" type="file"
                {...register("portada")}
              />
              {errors.portada && <small className='text-danger'>{errors.portada.message}</small>}
            </div>
            <div className="mb-3">
              <label className="form-label" htmlFor="plataformes">Plataformes:</label>
              <select  {...register("plataforma")}  className='form-control'  multiple type="text" >
                {plataformes && plataformes.length > 0 && plataformes.map((plataforma) => {
                  return <option key={plataforma.id} onClick={(e) => onClick(e, plataforma)} value={plataforma.id}>{plataforma.plataforma}</option>
                })}
              </select>
              <span className="text-danger">{ErrorMessageGeneres}</span>
            </div>
            <div className="mb-3">
              <label className="form-label" htmlFor="generes">Generes:</label>
              <select  {...register("generes")}  className='form-control' id="generes" multiple type="text" >

                {generes && generes.length > 0 && generes.map((genere) => {

                  return <option key={genere.id} onClick={(e) => onClick(e, genere)} value={genere.id}>{genere.genere}</option>
                })}
              </select>

            </div>

            <div className="d-flex justify-content-center my-3 gap-1 g">
              {Log !== "" ? (
                <>
              <Link title='Inici' className='btn btn-primary' to={`/`}>
                Inici
              </Link>
              <Link title='Visualitzar videojoc' className={`btn btn-primary ${!Show?"d-none":""}`} to={`/videojoc/${valorId}`}>
                <i className="bi bi-eye-fill"></i>
                Visualitzar videojoc
              </Link>
              </>
              ) : ""}
              <Link to={`/admin/jocs`} title="llistar jocs" className={`btn btn-secondary`}><i className="bi bi-list"></i></Link>
              <input type="submit" className='btn-primary btn' value="Enviar" />
            </div>
            <div className="text-center my-3 gap-1 g">
              {Log !== "" ? <small className='text-success'>{Log}</small> : ""}


            </div>
          </form>
        </div>
        <div className="col-12 col-lg-2"></div>
      </div>
    </div >
  )
}

export default JocForm