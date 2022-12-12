import React, { useEffect, useState } from 'react'
import { useNavigate,NavLink } from 'react-router-dom'
import jwt_decode from "jwt-decode";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link } from 'react-router-dom'
import "../../assets/style/Space.css";
import useTitle from "../../Hooks/useTitle";
import Breadcrumb from 'react-bootstrap/Breadcrumb';

const SignupSchema = yup.object().shape({
  titul: yup
    .string()
    // .required("El camp títul es un camp requerit")
    .min(3, "Ha de contindre mínim 3 caractes")
    .max(200, "El camp titol ha de tindre mínim 200 caracters"),
  descripcio: yup
    .string()
    // .required("El camp descripció es un camp requerit")
    .max(200, "El camp descripció ha de tindre mínim 200 caracters"),
  cantitat: yup
    .number()
    .max(1000, "El valor màxim del camp cantitat  es 1000")
    // .required()
    .positive("El camp cantitat ha de ser un valor positiu")
    .integer(),
  preu: yup
    .number()
    .max(1000, "El valor màxim del camp preu  es 300")
    // .required()
    .positive("El camp preu ha de ser un valor positiu").integer(),
  portada: yup
    .mixed()
    .required("Es necesari proporcionar un archiu")
    .test("type", "Sols son acceptats els formats d'arxius: .jpeg, .jpg, png", (value) => {
      return value && (
        value[0].type === "image/jpeg" ||
        value[0].type === "image/png"
      );
    }),
});


const JocForm = (props) => {

  const { title } = props;
  const id = window.location.pathname.split("/")[3];
  let token;
  useTitle(title);
  const navigate = useNavigate();
  const [plataformes, setplataformes] = useState([]);
  const [Log, setLog] = useState("");
  const [generes, setgeneres] = useState([]);
  const [Titul, setTitul] = useState([]);
  const [Preu, setPreu] = useState(0);
  const [Descripcio, setDescripcio] = useState('');
  const [GenereNotFound, setGenereNotFound] = useState({
    "genereNotFound": false,
    "missatge": ""
  });
  const [PlataformaNotFound, setPlataformaNotFound] = useState({
    "plataformaNotFound": false,
    "missatge": ""
  });
  const [Cantitat, setCantitat] = useState(0);
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(SignupSchema)
  });
  const [GeneresJoc, setGeneresJoc] = useState(new Set());
  const [PlataformesJoc, setPlataformesJoc] = useState(new Set());

  const [Joc, setJoc] = useState({
    "titul": "",
    "fechaEstreno": new Date(),
    "generes": [{ "id": 0, "generes": "" }],
    "plataforma": [{ "id": 0, "plataforma": "" }],
    "preu": 0,
    "cantitat": 0,

  });

  const conseguirJoc = async () => {
    let headersList = {
      "Accept": "*/*",
    }

    // let response = await fetch(`https://vos.es/api/v1/videojoc/${id}`, {
    let response = await fetch(`${process.env.REACT_APP_DOMAIN_API}videojoc/${id}`, {
      method: "GET",
      headers: headersList
    });

    let data = await response.json();
    return data;
  }
  useEffect(() => {
    token = JSON.parse(localStorage.getItem("token"));
    // console.log();
    if (token) {
      var decoded = jwt_decode(token.token);
      if (!decoded.roles.includes("ROLE_ADMIN")) {
        navigate(`/`);
      }

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
    const joc = conseguirJoc();
    joc
      .then((result) => {
        // console.log(result);
        if (typeof result.Videojoc === 'object') {
          // setJoc(result.Videojoc);
          setTitul(result.Videojoc.titul);
          setPreu(result.Videojoc.preu);
          setDescripcio(result.Videojoc.descripcio);
          setCantitat(result.Videojoc.cantitat);
        }
      }).catch((err) => {
        console.error(err);
      });
  }, [])


  const conseguirPlataformes = async () => {
    let headersList = {
      "Accept": "*/*",
    }
    let response = await fetch(`${process.env.REACT_APP_DOMAIN_API}plataformes`, {
      // let response = await fetch("http://vos.es/api/v1/plataformes", {
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
    // console.log(data);
    // const auxGeneres = [...GeneresJoc];
    // const auxPlataformes = [...PlataformesJoc];
    setGenereNotFound({ "missatge": "", "genereNotFound": false });
    setPlataformaNotFound({ "missatge": "", "plataformaNotFound": false });

    let genereNoTrobat = false;
    let plataformaNoTrobada = false;

    for (const gen in data.generes) {
      const iterador = data.generes[gen];

      const genereTrobat = generes.find(gene => gene.genere === iterador);
      if (genereTrobat === undefined) {
        genereNoTrobat = true;
      }
    }
    if (genereNoTrobat) {
      setGenereNotFound({ "missatge": "Genere no trobat", "genereNotFound": true });
      return;
    } else {

    }
    for (const plataforma in data.videojoc_plataforma) {
      const iterador = data.videojoc_plataforma[plataforma];

      const plataformaTrobada = plataformes.find(plat => plat.plataforma === iterador);
      if (plataformaTrobada === undefined) {
        plataformaNoTrobada = true;
      }
    }
    if (plataformaNoTrobada) {
      setPlataformaNotFound({ "missatge": "Plataforma no trobada", "plataformaNotFound": true });
      return;
    }

    if (!plataformaNoTrobada && !genereNoTrobat) {
      token = JSON.parse(localStorage.getItem("token"));
      if (token) {
        var decoded = jwt_decode(token.token);
        console.log();
        if (!decoded.roles.includes("ROLE_ADMIN")) {
          navigate(`/`);
        }

      } else {
        navigate(`/`);

      }
      const resultat = editarJoc(token.token, data);
      resultat
        .then((result) => {
          result.Title === "Videojoc pujat de manera satisfactoria" ?
            setLog(result.Title) :
            setLog("No s'ha pogut pujar de manera satistactoria.");

        }).catch((err) => {

        });
    }

    // console.log(auxGeneres);
    // data.generes = auxGeneres;
    // data.videojoc_plataforma = auxPlataformes;
    // token = JSON.parse(localStorage.getItem("token"));
    // console.log();


    // console.log(data.generes);


    // const resultat = editarJoc(token.token, data);
    // resultat
    //   .then((result) => {
    //     result.Title === "Videojoc pujat de manera satisfactoria" ?
    //       setLog(result.Title) :
    //       setLog("No s'ha pogut pujar de manera satistactoria.");

    //   }).catch((err) => {

    // });
  };


  const editarJoc = async (token, valor) => {
    // console.log(valor.portada[0].name);
    let headersList = {
      "Accept": "*/*",
      "Access-Control-Allow-Origin": "*",
      "Authorization": `Bearer ${token}`
    }

    let bodyContent = new FormData();
    bodyContent.append("titul", valor.titul);
    bodyContent.append("descripcio", valor.descripcio);
    bodyContent.append("cantitat", valor.cantitat);
    bodyContent.append("portada", valor.portada[0] ?? '');
    bodyContent.append("fechaEstreno", valor.fechaEstreno);
    bodyContent.append("generes", JSON.stringify(valor.generes));
    bodyContent.append("videojoc_plataforma", JSON.stringify(valor.videojoc_plataforma));
    bodyContent.append("portada", null);
    bodyContent.append("preu", valor.preu);
    console.log(bodyContent);
    let response = await fetch(`${process.env.REACT_APP_DOMAIN_API}videojoc/${id}/editar`, {
      // let response = await fetch(`http://vos.es/api/v1/videojoc/${id}/editar`, {
      method: "PUT",
      body: bodyContent,
      headers: headersList
    });

    let data = await response.json();
    return data;

  }


  const handleChange = (e) => { setJoc({ "titol": e.target.value }); }
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12 col-lg-2"></div>
        <div className="col-12 col-lg-8">
          <Breadcrumb className='mt-3'>
        	<Breadcrumb.Item ><Link to={"/"}>Inici</Link></Breadcrumb.Item>
							<Breadcrumb.Item >
								<Link to="/admin/jocs">Llistar jocs</Link>
							</Breadcrumb.Item>
            <Breadcrumb.Item as={Link} active>Editar joc</Breadcrumb.Item>
          </Breadcrumb>
          <h1>Editar joc</h1>
          <form action="" onSubmit={handleSubmit(onSubmit)} method="post">
            <div className="mb-3">
              <label className="form-label" htmlFor="titul"
              >Titol</label>
              <input className='form-control' value={Titul} id='titul' type="text"
                // onChange={(e) =>setTitul(e.target.value)}
                {...register("titul", {
                  onChange: (e) => {
                    // console.log(e.target.value);
                    setTitul(e.target.value);
                  },
                })}
              />
              {errors.titul && <small className='text-danger'>{errors.titul.message}</small>}
            </div>
            <div className="mb-3">
              <label className="form-label" htmlFor="preu">preu</label>
              <input className='form-control' id='preu' type="number"
                value={Preu}
                // onChange={(e) => { setJoc({ "preu": e.target.value }); }}
                {...register("preu", {
                  onChange: (e) => {
                    setPreu(e.target.value);
                  },
                  onBlur: (e) => {
                    // console.log(e.target.value);
                    setPreu(e.target.value);
                  },
                })}
              />
              {errors.preu && <small className='text-danger'>{errors.preu.message}</small>}
            </div>
            <div className="mb-3">
              <label className="form-label" htmlFor="cantitat">cantitat</label>
              <input className='form-control' id='cantitat' type="number"
                value={Cantitat}
                {...register("cantitat", {
                  onChange: (e) => {
                    setCantitat(e.target.value);
                  },
                  onBlur: (e) => {
                    setCantitat(e.target.value);
                  },
                })}
              />
              {errors.preu && <small className='text-danger'>{errors.preu.message}</small>}
            </div>

            <div className="mb-3">
              <label className="form-label" htmlFor="data">Data:</label>
              <input className='form-control' type="date" id="fechaEstrenno"
                value={new Date(Joc.fechaEstreno).toISOString().substring(0, 10)}
                onChange={(e) => {
                  console.log(e.target.value);
                  setJoc({ "fechaEstreno": new Date(Joc.fechaEstreno).toISOString().substring(0, 10) });
                }}
                // value={new Date("today").toISOString().substring(0,10)} 
                {...register("fechaEstreno")}
              />
              {errors.fechaEstreno && <small className='text-danger'>{errors.fechaEstreno.message}</small>}
            </div>


            <div className="mb-3 form-floating">
              <textarea className="form-control" value={Descripcio} placeholder="Deixa una descripcio" id="descripcio"
                {...register("descripcio", {
                  onChange: (e) => {
                    // console.log(e.target.value);
                    setDescripcio(e.target.value);
                  },
                  onBlur: (e) => {
                    // console.log(e.target.value);
                    setDescripcio(e.target.value);
                  },
                })}
              ></textarea>
              <label htmlFor="descripcio">Descripcio</label>
              {errors.descripcio && <small className='text-danger'>{errors.descripcio.message}</small>}
            </div>

            <div className="mb-3">
              <label className="form-label" htmlFor="portada">Archiu</label>
              <input className='form-control' id="portada" type="file"
                {...register("portada")}
              />
              {errors.portada && <small className='text-danger'>{errors.portada.message}</small>}
            </div>
            <div className="mb-3">
              <label className="form-label" htmlFor="plataformes">Plataformes:</label>
              <select className={`form-control ${GenereNotFound.genereNotFound ? 'border-danger' : ''}`} {...register("videojoc_plataforma")} multiple type="text" >
                {/* return <option key={plataforma.id} value={plataforma.id}>{plataforma.plataforma}</option> */}
                {plataformes && plataformes.length > 0 && plataformes.map((plataforma) => {
                  return <option key={plataforma.id} value={plataforma.plataforma}>{plataforma.plataforma}</option>
                })}
              </select>
            </div>
            <div className="mb-3">
              <label className="form-label" htmlFor="generes">Generes:</label>
              <select {...register("generes")} className={`form-control ${PlataformaNotFound.plataformaNotFound ? "border-danger" : ""}`} id="generes" multiple type="text" >

                {generes && generes.length > 0 && generes.map((genere) => {

                  return <option key={genere.id} value={genere.genere}>{genere.genere}</option>
                })}
              </select>
              {GenereNotFound.missatge}
            </div>

            <div className="d-flex justify-content-center my-3 gap-1 g">
              {Log !== "" ? <Link className='btn btn-primary' to={`/`}>
                Inici
              </Link> : ""}
              <Link to={`/admin/jocs`} title="llistar jocs" className={`btn btn-secondary`}><i className="bi bi-list"></i></Link>
              <input type="submit" className='btn-primary btn' value="Enviar" />
            </div>
            <div className="text-center my-3 gap-1 g">
              {Log !== "" ? <small className={` text-success ${Log.includes(`No`) ? "text-danger" : ""}`}>{Log}</small> : ""}


            </div>
          </form>
        </div>
        <div className="col-12 col-lg-2"></div>
      </div>
    </div >
  )
}

export default JocForm