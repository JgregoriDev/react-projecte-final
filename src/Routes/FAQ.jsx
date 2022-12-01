import React, { useState, useEffect } from 'react'
import { Button, Collapse } from 'react-bootstrap'
import "../assets/style/targets.css"
const FAQ = () => {

  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);
  const [open4, setOpen4] = useState(false);


  const espais = () => {
    return (
      <>
        <div className='mb-5'>&nbsp;</div>
      </>
    );
  }
  return (
    <div className='container'>
      <div className="row">
        <div className="d-none d-lg-block col-2"></div>
        <div className="col-12 col-lg-8">
          <h1>Secció de preguntes i respostes VOS</h1>
          <div className='mb-3'>
            <Button
              onClick={() => setOpen(!open)}
              className='w-100'
              aria-controls="example-collapse-text"
              aria-expanded={open}
            >
              Tornar productes
            </Button>
            <Collapse className='my-4' in={open}>
              <div id="example-collapse-text">
                Per a realitzar la devolució en botiga d'un producte comprat en web només has d'acudir al departament corresponent de la botiga i presentar el teu document de venda. Recorda que aquest document són els propis emails de “comanda en procés d'enviament” i “comanda lliurada”, on s'inclou la següent indicació:

                “Aquest mail és el teu document de venda. Si desitges retornar qualsevol producte de la teva comanda de manera gratuïta
                , només hauràs de presentar-ho imprès o en el teu mòbil en una botiga”
                Cada
                No fa falta que el portis imprès, pots mostrar-ho directament des del teu mòbil.
              </div>
            </Collapse>
          </div>
          <div className='mb-3'>
            <Button
              onClick={() => setOpen2(!open2)}
              className='w-100'
              aria-controls="example-collapse-text"
              aria-expanded={open2}
            >
              Cost devolucio
            </Button>
            <Collapse className='my-4' in={open2}>
              <div id="example-collapse-text">
                Depenent de com es realitzi la devolució. Si es realitza en la botiga o a través de Correus, aquesta és totalment gratuïta. Si es realitza en Celeritas el cost total pot rondar entres 2 a 20 euros segons el volum del paquet.
                En cas de devolució d'articles la recollida dels quals s'efectuï en el domicili, el cost directe de la devolució del bé o servei serà assumit pel client segons es recull en la LGCU.
              </div>
            </Collapse>
          </div>
          <div className='mb-3'>
            <Button
              onClick={() => setOpen3(!open3)}
              className='w-100'
              aria-controls="example-collapse-text"
              aria-expanded={open3}
            >
              Contacte amb l'equip de vos
            </Button>
            <Collapse className='my-4' in={open3}>
              <div id="example-collapse-text">
                Per a contactar amb el nostre equip tot el que cal es enviarnos un correu <a href="mailto:vos_soporte@vos.es">al nostre equip de soport</a>
              </div>
            </Collapse>

          </div>
          <div className='mb-3'>
            <Button
              onClick={() => setOpen4(!open4)}
              className='w-100'
              aria-controls="example-collapse-text"
              aria-expanded={open4}
            >
              Cost devolucio
            </Button>
            <Collapse className='my-4' in={open4}>
              <div id="example-collapse-text">

              En primer lloc, comprova que el producte es troba llistat en la factura. Si és així, posa't en contacte amb el nostre servei d'Atenció 
              al Client per a solucionar la incidència.
              Una vegada el nostre equip haja fet les comprovacions oportunes, procedirem a l'enviament de la mercaderia que manca sempre que sigui possible.
               És important que tinguis en compte que el termini per a comunicar una comanda incompleta és de 48 hores des de la seva recepció.
              </div>
            </Collapse>
          </div>
          <div className="d-flex flex-column flex-lg-row justify-content-between">
            <div className=' d-flex target flex-column justify-content-center'>
              <div>
                E-mail:<a href="mailto:vos@vos.es">vos@vos.es</a>
              </div>
              <img loading="lazy" className=' img-thumbnail' src="data:image/gif;base64,R0lGODlhdAB0AJEAAAAAAP///wAAAAAAACH5BAEAAAIALAAAAAB0AHQAAAL/jI+py+0Po5y02ouz3rz7D4biSJbmiabqyrZuCcTyTNc2MkM2gN/HDgzyJsIirRfT+Qw7pLFIeT6dypoz95NCiVoh9dHMWsXdsARrQSfUX6asHWBzk/Nh+r2Qu+l7exzfh6HXMFjlBwenpghYUZjHGAVJxrDI92fp6JC5xrgVCLbEOaZQCYQIiuk1iXr0OCrq53l5yHoVumkGO1iau5mo+qkZamv5G3QqnHq8Gkwo2VdK3NpsKB3N7FxMdg19+5wdCzyLDEvprWyKXb19Hq5N+t3bKe6LLcsNbj2PLv+ez/4Knzl+7fShi0Qw4D5a8BJOGwfwYb1m9xau66bQocBa/xc2YmQYYWK5OoIsunqIEOTFkN9W7hpGsmPLkyUPnhRJbqWhMhnd+TTmkydKVkLxGTX5UWjKokghUmzK9NXOqECr2ouKc8RLmy+6qrvqz+uKrT/FeiWb02zap2UGlk0qbu3IZEGluAWq5W5MugbTNXw7Ky/Nvf/gLvuL1+5gDbLkuu0HEu2Hxl/P0IuHOazMw3MbXfYn2QNlanUg60W8OXK7ippJ89WaWaJi1511To7N67PKyoVDkM3NGddM1CoEG1bNNfDwzln/svbLfKFIj56nRAztVHnr6NunBo8Ltm738CyU3pQOk+1uE+ado5dK/kV7Xe+Hqu86X1rf09lT6v/naBlo6dEH3x0O2faae9uNVp146/UHIIEPMuhfRAj29h9duZAAnH0SUmihfPUJ1xZRy3E44nL5nTeeCB2S2IV3D6Lw22wQBigbZyDUaB1tMu4Hm4Al+miiRiem9piNzWnn4HRYDZikkU96GOWTS6U4pZNZHvlRX1teOSWYTW7JJQxlmhahY2OdWVCavOHHZk8XLolii0zKhZ2Y81HnUlM7ZmmVgYDRWWRRgTZ46J9hxidoorfZqSZx2cEIJI41zbjYpCpiiSmRCSLKaG8gSlpho6HyNyp30HWYmJSr+hnhcxlq2pNxtHZ6K5pdhveibpHm2uau6vX6XXJ9FjshrAqNvtojS67iqeyHq4H3qayxbtqsrccym6yxLHKbaqs54mqrrhgSZi2Oz/H55rXI6jmtt6Si62tpurHr6bmWfovvjeAsCTBuwer7b5m/kpMuwVVeyjC/0f66ob1MHWqulzbKuCdUA1vcLMY8UbzxdR9LbGioFYs8pFoqr8xyyy6/DHPMMs9Mc80234yzVwUAADs=" alt="qr telefon de soport" />
            </div>
            <div className='d-flex target flex-column justify-content-center'>
              <div>
                Teléfon: <a href="tel:+34 6### ### ###">6### ### ###</a>
              </div>
              <img loading="lazy" className=' img-thumbnail' src="data:image/gif;base64,R0lGODlhZABkAJEAAAAAAP///wAAAAAAACH5BAEAAAIALAAAAABkAGQAAAL/jI+py+0Po5y02ouz3rz7D4biSJbmiabqCgLuC8fyjMDYjOf2pPf0sbP4hi8KkVgrXo5DI7OXdN2eOqd0qTTgojHu9CoJVsRb4E+bHachYiuASz4H2rz1gx5Ol9EyLxYcEVdlBggn58eXgxioB0X4tuDDIKj46GbYZxnpqEC5N2fn4CmHBzrY2XhqCpkHKKmZOBm6itkFy+jKSXu7uPgaW5erSilbePu728q6+km8aQyc2DxbvIxc6owqXBmNa62LnbrsC079/D08m50wmtnNJj4NnUxPnj5f/TX+eG0u6s8OYL5z/fDdEcgr2D5p5Qz+cxgQ4kBtTRIqc0PFHb11/xm5eevIUVytjhhBbrOHziRChiZRolS5kAWzIzJXkKyZ4ibOEzp3biSlq9q6lyt/akQmVOS5Wpf4xTtEUClFpgqpsrT1EGu9Y1A1hDzpdB7MFlKNpgzX8sPXlFYjgiQLtlu7mGMVzi3osVdYtnafItmLli5QiXtHNsxrcWbcj34rXg2cdDE8jXop4q3stlRkwRCZuDxIGbRWzIaPlt1cUixAz1w7d22AdCngsp8mqlFl+3Jh0fpqy35M+zVp0b6nzl5c3K3P34o5nz293Czk3e+iz809OObO68zlaSeusrTHu8LBpwV+7znuvueb60Y/mv3b4+MbJ5/8PetwIfaLasDmnZg+4jXFn2QbkEdYdRcF+Id68elHH2bTKfPfgvBJqI5/5VnoHnQKbpVVhd4MmNiEjCUIW3/IeQjiiA2SKBeLItpGYIcrGvghfgJG2BpfxhWYX4rbePcZfCbueGGPRK2XY1U8xnijY8odqKKPZol35Ita/jilkRmiOCNzGA4ZFINc1jimg8mF2SSEZ/YYW5uZhWfmnFFyANNQ5lnJppB57mcnn0Vt1lOfRNYZXaKKLspoo44+Cmmkkk5KaaWQFgAAOw==" alt="qr e-mail de soport" />
            </div>
          </div>
        </div>
        {open === false ? (espais()) : null}
        {open2 === false ? (espais()) : null}
        {open3 === false ? (espais()) : null}
        {open4 === false ? (espais()) : null}
        <div className="d-none d-lg-block col-2"></div>
      </div>
    </div>
  )
}

export default FAQ