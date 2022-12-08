import React from "react";
import Scrollspy from "react-scrollspy";

import "../assets/style/scrollspy.css";
import useTitle from "../Hooks/useTitle";
import ButtonBackToTop from "../components/ButtonScrollToTop";
const About = ({ title }) => {
	useTitle(title);

	return (
		<>
			<div className="container-fluid">
				<div className="row">
					<div className="col-2">
						<Scrollspy
							className="d-none d-lg-block scrollspy"
							items={["Información", "Uso", "Cookies", "Enlaces", "Control"]}
							currentClassName="isCurrent"
						>
							<li>
								<a className="nav-link" href="#Información">Información que es recogida</a>
							</li>
							<li>
								<a className="nav-link" href="#Uso">Uso de la información recogida</a>
							</li>
							<li>
								<a className="nav-link" href="#Cookies">Cookies</a>
							</li>
							<li>
								<a className="nav-link" href="#Enlaces">Enlaces a Terceros</a>
							</li>
							<li>
								<a className="nav-link" href="#Control">Control de su información personal</a>
							</li>
						</Scrollspy>
					</div>
					<div className="col-8">
						<section id="Información">
							<h2>
								Informació que és recollida
							</h2>
							<p>
								El present Política de Privacitat estableix els termes en què vós usa i protegeix la informació que és proporcionada pels seus usuaris al
								moment d'utilitzar el seu lloc web. Aquesta companyia està compromesa amb la seguretat de les dades dels seus usuaris. Quan li demanem omplir
								els camps d'informació personal amb la qual vosté puga ser identificat, ho fem assegurant que només s'emprarà d'acord amb els termes d'aquest
								document. No obstant això aquesta Política de Privacitat pot canviar amb el temps o ser actualitzada pel que li recomanem i
								emfatitzem revisar contínuament aquesta pàgina per a assegurar-se que està d'acord amb aquests canvis. El nostre lloc web podrà
								recollir informació personal per exemple: Nom, informació de contacte com la seua adreça de correu electrònica i informació demogràfica.
								Així mateix quan siga necessari podrà ser requerida informació específica per a processar alguna comanda o realitzar un lliurament o
								facturació.
							</p>
						</section>
						<section id="Uso">
							<h2>Ús de la informació recollida</h2>
							<p>
								El nostre lloc web podrà recollir informació personal per exemple: Nom, informació de contacte com la seva adreça de correu electrònica i informació demogràfica. Així mateix quan sigui necessari podrà ser requerida informació específica per a processar alguna comanda o realitzar un lliurament o facturació.
							</p>
						</section>
						<section id="Cookies">
							<h2>Cookies</h2>
							<p>
								Una cookie es refereix a un fitxer que és enviat amb la finalitat de sol·licitar permís per a emmagatzemar-se en el seu ordinador,
								 en acceptar aquest fitxer es crea i la cookie serveix llavors per a tenir informació respecte al trànsit web, i també facilita les futures
								  visites a una web recurrent. Una altra funció que tenen les cookies és que amb elles les web poden reconèixer-te individualment i per tant brindar-te el millor servei personalitzat del seu web. El nostre lloc web empra les cookies per a poder identificar les pàgines que són visitades i la seva freqüència. Aquesta informació és emprada únicament per a anàlisi estadística i després la informació s'elimina de manera permanent. Vostè pot eliminar les cookies en qualsevol moment des del seu ordinador. No obstant això les cookies ajuden a proporcionar un millor servei dels llocs web, estàs no donen accés a informació del seu ordinador ni de vostè, a menys que vostè així ho vulgui i la proporcioni directament notícies. Vostè pot acceptar o negar l'ús de cookies, no obstant això la majoria de navegadors accepten cookies automàticament perquè serveix per a tenir un millor servei web. També vostè pot canviar la configuració del seu ordinador per a declinar les cookies. Si es declinen és possible que no pugui utilitzar alguns dels nostres serveis.
							</p>
						</section>
						<section id="Enlaces">
							<h2>Enllaços a Tercers</h2>
							<p>
								Aquest lloc web pogués contenir en laces a altres llocs que poguessin ser del seu interès. Una vegada que vostè de clic en aquests enllaços i abandoni la nostra pàgina, ja no tenim control sobre al lloc al qual és redirigit i per tant no som responsables dels termes o privacitat ni de la protecció de les seves dades en aquests altres llocs tercers. Aquests llocs estan subjectes a les seves pròpies polítiques de privacitat per la qual cosa és recomanable que els consulti per a confirmar que vostè està d'acord amb aquestes.
								Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore recusandae qui dolorum porro rem. Numquam eligendi quam, quibusdam amet excepturi ducimus modi, harum placeat quas, laboriosam consequuntur reprehenderit eos molestiae.
								Voluptate esse magnam accusamus quasi? Neque commodi recusandae quisquam optio architecto corrupti rerum sunt, nobis provident illum vitae quidem. Nobis nostrum dignissimos sunt illum animi quidem sit perspiciatis, magni nesciunt?
								Aperiam praesentium illo earum reiciendis, ipsum culpa rem assumenda voluptas dolore inventore excepturi cum tempora minima fuga enim id voluptates perspiciatis delectus nulla neque, nostrum recusandae. Sapiente minus dolores soluta!

							</p>
						</section>
						<section id="Control">
							<h2>Control de la seva informació personal</h2>
							<p>
								Aquest lloc web pogués contenir en laces a altres llocs que poguessin ser del seu interès. Una vegada que vostè de clic en aquests enllaços i abandoni la nostra pàgina, ja no tenim control sobre al lloc al qual és redirigit i per tant no som responsables dels termes o privacitat ni de la protecció de les seves dades en aquests altres llocs tercers. Aquests llocs estan subjectes a les seves pròpies polítiques de privacitat per la qual cosa és recomanable que els consulti per a confirmar que vostè està d'acord amb aquestes. Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore recusandae qui dolorum porro rem. Numquam eligendi quam, quibusdam amet excepturi ducimus modi, harum placeat quas, laboriosam consequuntur reprehenderit eos molestiae. Voluptate esse magnam accusamus quasi? Neque commodi recusandae quisquam optio architecto corrupti rerum sunt, nobis provident illum vitae quidem. Nobis nostrum dignissimos sunt illum animi quidem sit perspiciatis, magni nesciunt? Aperiam praesentium illo earum reiciendis, ipsum culpa rem assumenda voluptas dolore inventore excepturi cum tempora minima fugida enim aneu voluptates perspiciatis delectus nulla neque, nostrum recusandae. Sapiente minus dolors soluta!		</p>
						</section>
					</div>
					<div className="col-2"></div>
				</div>
				<ButtonBackToTop ></ButtonBackToTop>
			</div>
		</>
	);
};

export default About;
