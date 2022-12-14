const About = React.lazy(() => import('../Routes/About'));
const Mapa = React.lazy(() => import('../Routes/MapaWeb'));
const Login = React.lazy(() => import('../Routes/Login'));
const Plataforma = React.lazy(() => import('../Routes/Plataforma'));
const Buscar = React.lazy(() => import('../Routes/Buscar'));
const Carret = React.lazy(() => import('../Routes/Carret'));
const Index = React.lazy(() => import('../Routes/Index'));
const Payment = React.lazy(() => import('../Routes/Payment'));
const PaymentMultiple = React.lazy(() => import('../Routes/PaymentMultiple'));
const Registrar = React.lazy(() => import('../Routes/Registrar'));
const PresentarJoc = React.lazy(() => import('../Routes/Presentar-joc'));
const Profile = React.lazy(() => import('../Routes/Profile'));
const Notfound = React.lazy(() => import('../Routes/404'));
const FiltratgePreu = React.lazy(() => import('../Routes/FiltratgePreu'));
const Galletes = React.lazy(() => import('../Routes/Galletes'));
const FAQ = React.lazy(() => import('../Routes/FAQ'));
//Pàgines backend
const Banejar = React.lazy(() => import('../Routes/admin/Banejar'));
const Usuaris = React.lazy(() => import('../Routes/admin/Usuaris'));
const Jocs = React.lazy(() => import('../Routes/admin/Jocs'));
const JocForm = React.lazy(() => import('../Routes/admin/JocForm'));
const EditarJocForm = React.lazy(() => import('../Routes/admin/EditarJocForm'));


<Suspense fallback={<div>	
  <Spinner animation="border" role="status">
  <span className="visually-hidden">Carregant component...</span>
</Spinner>
</div>}>
  <Routes>
    <Route path='/carret' element={<Carret title={vosTitle.carret} buidarCarret={() => buidarCarret()} />}></Route>
    <Route path='/FAQ' element={<FAQ />}></Route>
    <Route path='/mapa' element={<Mapa />}></Route>
    <Route path='/acceptat' element={<PagoRealitzat title={vosTitle.carret} buidarCarret={() => buidarCarret()} />}></Route>
    <Route path='/pagament' element={<Payment title={vosTitle.carret} getJoc={getJoc} buidarCarret={() => buidarCarret()} />}></Route>
    <Route path='/pago' element={<PaymentMultiple title={vosTitle.carret} getJoc={getJoc} buidarCarret={() => buidarCarret()} />}></Route>
    <Route path='/denegat' element={<PagoRechazat title={vosTitle.carret} />}></Route>
    <Route path='/admin' element={<Usuaris title={vosTitle.admin} />}></Route>
    <Route path='/admin/jocs' element={<Jocs title={vosTitle.admin} />}></Route>
    <Route path='/admin/joc/nou' element={<JocForm title={vosTitle.adminNou} />}></Route>
    <Route path='/admin/joc/:id/editar' element={<EditarJocForm title={vosTitle.adminEditar} />}></Route>
    <Route path='/usuari/:id/ban' element={<Banejar title={vosTitle.banjejar} />}></Route>
    <Route path='/galletes' element={<Galletes title={vosTitle.cookies} props={[Carrito, buidar]} />}></Route>
    {/* <Route path='/buscar' element={<Buscar title={vosTitle.buscar} />}></Route> */}
    <Route path='/buscar/:buscar' element={<Buscar title={vosTitle.buscar} />}></Route>
    <Route path='/filtrar/:min/:max' element={<FiltratgePreu title={vosTitle.filtratge} />}></Route>
    <Route path='/' element={<Index title={vosTitle.inici} editarJoc={editarJoc} afegirProducteAlCarret={afegirProducteAlCarret} />}></Route>
    <Route path='/videojoc/:id' element={<PresentarJoc afegirProducteAlCarret={afegirProducteAlCarret} title={vosTitle.joc} />}></Route>
    <Route path='/sobre-nosaltres' element={<About title={vosTitle.about}></About>}></Route>
    <Route path='/perfil' element={<Profile title={vosTitle.dashboard} Usuari></Profile>}></Route>
    <Route path='/plataforma/:id' element={<Plataforma title={vosTitle.plataforma}></Plataforma>}></Route>
    <Route path='/login' element={<Login title={vosTitle.login} Usuari></Login>}></Route>
    <Route path='/registrar' element={<Registrar title={vosTitle.registrar} Usuari></Registrar>}></Route>
    <Route path='*' element={<Notfound title={vosTitle.notfound} />}></Route>
  </Routes>
</Suspense>