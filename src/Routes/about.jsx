import React from "react";
import Scrollspy from "react-scrollspy";
import "../assets/style/scrollspy.css";
const About = () => {
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
								<a href="#Información">Información que es recogida</a>
							</li>
							<li>
								<a href="#Uso">Uso de la información recogida</a>
							</li>
							<li>
								<a href="#Cookies">Cookies</a>
							</li>
							<li>
								<a href="#Enlaces">Enlaces a Terceros</a>
							</li>
							<li>
								<a href="#Control">Control de su información personal</a>
							</li>
						</Scrollspy>
					</div>
					<div className="col-8">
						<section id="Información">
							<h2>Información que es recogida</h2>
							<p>
								El presente Política de Privacidad establece los términos en que
								vos usa y protege la información que es proporcionada por sus
								usuarios al momento de utilizar su sitio web. Esta compañía está
								comprometida con la seguridad de los datos de sus usuarios.
								Cuando le pedimos llenar los campos de información personal con
								la cual usted pueda ser identificado, lo hacemos asegurando que
								sólo se empleará de acuerdo con los términos de este documento.
								Sin embargo esta Política de Privacidad puede cambiar con el
								tiempo o ser actualizada por lo que le recomendamos y
								enfatizamos revisar continuamente esta página para asegurarse
								que está de acuerdo con dichos cambios. Nuestro sitio web podrá
								recoger información personal por ejemplo: Nombre, información de
								contacto como su dirección de correo electrónica e información
								demográfica. Así mismo cuando sea necesario podrá ser requerida
								información específica para procesar algún pedido o realizar una
								entrega o facturación.
							</p>
						</section>
						<section id="Uso">
							<h2>Uso de la información recogida</h2>
							<p>
								Nuestro sitio web podrá recoger información personal por
								ejemplo: Nombre, información de contacto como su dirección de
								correo electrónica e información demográfica. Así mismo cuando
								sea necesario podrá ser requerida información específica para
								procesar algún pedido o realizar una entrega o facturación.
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Alias, vitae! Voluptates sit neque aperiam officia ipsum, esse, optio in fuga aliquam quisquam facilis tempora tempore nobis exercitationem distinctio numquam nulla.
                Recusandae suscipit laborum libero error enim eveniet vel nostrum, porro obcaecati nam voluptatum autem. Impedit temporibus, alias, distinctio earum iste modi, similique voluptates inventore repellendus commodi in asperiores necessitatibus atque?
							</p>
						</section>
						<section id="Cookies">
							<h2>Cookies</h2>
							<p>
								Una cookie se refiere a un fichero que es enviado con la
								finalidad de solicitar permiso para almacenarse en su ordenador,
								al aceptar dicho fichero se crea y la cookie sirve entonces para
								tener información respecto al tráfico web, y también facilita
								las futuras visitas a una web recurrente. Otra función que
								tienen las cookies es que con ellas las web pueden reconocerte
								individualmente y por tanto brindarte el mejor servicio
								personalizado de su web. Nuestro sitio web emplea las cookies
								para poder identificar las páginas que son visitadas y su
								frecuencia. Esta información es empleada únicamente para
								análisis estadístico y después la información se elimina de
								forma permanente. Usted puede eliminar las cookies en cualquier
								momento desde su ordenador. Sin embargo las cookies ayudan a
								proporcionar un mejor servicio de los sitios web, estás no dan
								acceso a información de su ordenador ni de usted, a menos de que
								usted así lo quiera y la proporcione directamente noticias.
								Usted puede aceptar o negar el uso de cookies, sin embargo la
								mayoría de navegadores aceptan cookies automáticamente pues
								sirve para tener un mejor servicio web. También usted puede
								cambiar la configuración de su ordenador para declinar las
								cookies. Si se declinan es posible que no pueda utilizar algunos
								de nuestros servicios.
               	</p>
						</section>
						<section id="Enlaces">
							<h2>Enlaces a Terceros</h2>
							<p>
								Este sitio web pudiera contener en laces a otros sitios que
								pudieran ser de su interés. Una vez que usted de clic en estos
								enlaces y abandone nuestra página, ya no tenemos control sobre
								al sitio al que es redirigido y por lo tanto no somos
								responsables de los términos o privacidad ni de la protección de
								sus datos en esos otros sitios terceros. Dichos sitios están
								sujetos a sus propias políticas de privacidad por lo cual es
								recomendable que los consulte para confirmar que usted está de
								acuerdo con estas.
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore recusandae qui dolorum porro rem. Numquam eligendi quam, quibusdam amet excepturi ducimus modi, harum placeat quas, laboriosam consequuntur reprehenderit eos molestiae.
                Voluptate esse magnam accusamus quasi? Neque commodi recusandae quisquam optio architecto corrupti rerum sunt, nobis provident illum vitae quidem. Nobis nostrum dignissimos sunt illum animi quidem sit perspiciatis, magni nesciunt?
                Aperiam praesentium illo earum reiciendis, ipsum culpa rem assumenda voluptas dolore inventore excepturi cum tempora minima fuga enim id voluptates perspiciatis delectus nulla neque, nostrum recusandae. Sapiente minus dolores soluta!
						
							</p>
						</section>
						<section id="Control">
							<h2>Control de su información personal</h2>
							<p>
								Este sitio web pudiera contener en laces a otros sitios que
								pudieran ser de su interés. Una vez que usted de clic en estos
								enlaces y abandone nuestra página, ya no tenemos control sobre
								al sitio al que es redirigido y por lo tanto no somos
								responsables de los términos o privacidad ni de la protección de
								sus datos en esos otros sitios terceros. Dichos sitios están
								sujetos a sus propias políticas de privacidad por lo cual es
								recomendable que los consulte para confirmar que usted está de
								acuerdo con estas.
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste, distinctio. Harum quam assumenda autem blanditiis amet aliquam itaque vel omnis at pariatur eligendi, illum voluptas modi, et ab porro atque.
                Rem quia ullam porro repellendus totam quibusdam rerum iusto quo possimus ipsam, magnam consectetur officia laboriosam, itaque nam maxime, dolor harum in dolorem alias explicabo quae cum at unde? Architecto.
                Esse distinctio vitae dolore libero rem aut, eos officia ducimus est, molestiae quaerat. Dolorem vero fuga, nesciunt, quo esse, obcaecati ipsum maiores ab explicabo architecto accusantium sed! Nobis, reiciendis labore?
							</p>
						</section>
					</div>
					<div className="col-2"></div>
				</div>
			</div>
		</>
	);
};

export default About;
