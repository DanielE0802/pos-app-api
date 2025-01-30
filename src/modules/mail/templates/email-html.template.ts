export const EmailsTemplates = {
  Welcome: `<html>
          <head>
            <title>¡Bienvenido!</title>
          </head>
          <body>
            <h1>¡Bienvenido a Ally360, {{username}}!</h1>
            <p>Estamos emocionados de tenerte a bordo. En Ally360, nos esforzamos por ofrecerte la mejor experiencia posible.</p>
            <p>Haz clic en el enlace proporcionado para comenzar a explorar todas las funcionalidades que hemos preparado para ti.</p>
            <br />
          </body>
        </html>`,

  ActivationAccount: `<html>
      <head>
        <link
          href='https://fonts.googleapis.com/css?family=Montserrat:300,400,500,600,700'
          rel='stylesheet'
        />
        <link
          href='https://fonts.googleapis.com/css?family=EB+Garamond:400,500,700'
          rel='stylesheet'
        />
        <style type='text/css'>
          body { display: flex; flex-flow: column wrap; justify-content: center;
          align-items: center; background: #1b1b1b; color: #fff; font-family:
          'Montserrat', 'Tahoma'; } h4 { font-size: 18px; font-weight: 400; }
        </style>
      </head>
      <body>
        <img
          src='https://techcommunity.microsoft.com/t5/image/serverpage/image-id/172206i70472167E79B9D0F/image-size/large?v=v2&px=999'
          width='120'
        />
        <p>Hola {{name}}</p>
        <p>Por favor, haga click en el siguiente boton para activar su cuenta</p>
        <br />
        <a
          style='background-color: turquoise; border: none; border-radius: 5px; color: #333; padding: 15px 32px'
          href='{{activationLink}}'
        >
          Activar Mi Cuenta
        </a>
        <br />
        <hr />
        <p>Si no ha solicitado este correo electrónico, puede ignorarlo.</p>
      </body>
    </html>`,

  ReqResetPassword: `<html>
    <head>
      <link
        href='https://fonts.googleapis.com/css?family=Montserrat:300,400,500,600,700'
        rel='stylesheet'
      />
      <link
        href='https://fonts.googleapis.com/css?family=EB+Garamond:400,500,700'
        rel='stylesheet'
      />
      <style type='text/css'>
        body { display: flex; flex-flow: column wrap; justify-content: center;
        align-items: center; background: #1b1b1b; color: #fff; font-family:
        'Montserrat', 'Tahoma'; } h4 { font-size: 18px; font-weight: 400; }
      </style>
    </head>
    <body>
      <img
        src='https://techcommunity.microsoft.com/t5/image/serverpage/image-id/172206i70472167E79B9D0F/image-size/large?v=v2&px=999'
        width='120'
      />
      <p>Hola {{username}}</p>
      <p>Por favor, haga click en el siguiente boton redireccionar a la página de
        cambio de contraseña</p>
      <br />
      <a
        style='background-color: turquoise; border: none; border-radius: 5px; color: #333; padding: 15px 32px'
        href='{{url_activation}}'
      >
        Reestablecer contraseña
      </a>
      <br />
      <hr />
      <p>Si no ha solicitado este correo electrónico, puede ignorarlo.</p>
    </body>
  </html>`,
};
