import React from 'react'

const Galletes = () => {
  return (
    <div>
      <div className="row">
        <div className="col-12 col-lg-2"></div>
        <div className="col-12 col-lg-8">
          <h1>Cookies</h1>
          <ol className='border-1 border-dark'>
            <li><a href="#1">Cookies que són?</a></li>
            <li><a href="#2">Tipus de cookies</a></li>
            <li><a href="#3">Cookies perquè les utilitzem?</a></li>
          </ol>
          <h2 id='1'>Cookies que són?</h2>
          Les cookies són arxius que contenen xicotets fragments de dades (com a nom d'usuari o contrasenya) que s'intercanvien entre un equip d'usuari i un servidor web per a identificar usuaris específics i millorar la seua experiència de navegació.

          Per exemple, gràcies a les cookies els llocs web reconeixen als usuaris i recorden la seua informació de connexió o les seues preferències com a notícies sobre esports en lloc de sobre política.

          Els llocs de compra utilitzen cookies per a fer un seguiment dels elements que els usuaris han vist anteriorment, usar-los per a suggerir uns altres que els podrien interessar i guardar els elements en el carret de la compra mentre continuen comprant.

          Les cookies es creen quan els usuaris visiten un lloc web nou i el servidor web envia un xicotet flux d'informació als seus navegadors web. Aqueixa *cookie s'envia només quan el servidor vol que el navegador web guarde la *cookie. En aqueix cas, recordarà la cadena nomene=valor i la reexpedirà al servidor amb cada sol·licitud de seguiment.
          <h2 id='2'>Tipus de cookies</h2>
          <p>          <span className='fw-bold'>Autenticació</span>: registren si un usuari ha iniciat sessió i amb quin nom. També optimitzen la informació d'inici de sessió perquè els usuaris no hagen de recordar les contrasenyes de llocs.
          </p>
          <span className="fw-bold">Seguiment</span>: registren diverses visites al llarg del temps. Algunes pàgines dedicades a la venda, per exemple, utilitzen cookies per a registrar visites d'usuaris concrets, que inclouen les pàgines i productes vistos. La informació que obtenen els permet suggerir altres objectes que podrien ser de l'interés dels visitants. A poc a poc, es crea un perfil basat en l'historial de navegació d'un usuari al lloc.
          <h2 id='3'>Cookies perquè les utilitzem?</h2>
          L'ús de les cookies en el nostre lloc és per millorar l'experiència de navegació en el nostre lloc web els usos que li donem a aquesta ferramenta és per exemple fer inici de sessió de manera automàtica, guardar els productes en el localStorage així quan li dones a comprar et redirigirà a la pàgina de compra, aquest son alguns dels exemple. Mai seran utilitzats amb fins de recaptar informació de l'usuari.
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore porro reprehenderit, quaerat molestiae maiores, voluptates, non doloribus aspernatur asperiores expedita facilis placeat exercitationem labore distinctio consequuntur eius aliquam iure fuga?
          Id, nam eveniet et accusamus accusantium quas repellendus unde quam omnis? Iusto quibusdam veritatis sequi quod aliquam consequuntur ut nesciunt sint ipsa, amet rem placeat aut blanditiis vel, unde eos.
          Sint, minus obcaecati dolorem quasi totam, voluptatibus quam praesentium cumque animi recusandae numquam accusamus, deserunt soluta tenetur ab dignissimos facilis veritatis eaque odit commodi iusto ducimus earum blanditiis. Minus, officiis.
        </div>
        <div className="col-12 col-lg-2"></div>
      </div>
    </div>
  )
}

export default Galletes