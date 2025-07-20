export const MailTemplates = {
  /** Correo enviado tras el registro exitoso del usuario. */
  REGISTER_SUCCESS: {
    key: 'auth.register.success',
    subject: '🎉 ¡Bienvenido a Ally360!',
    template: 'auth/register-success',
    description: 'Correo enviado tras el registro exitoso del usuario.',
  },

  /** Correo enviado al usuario para verificar su cuenta. Después de registrarse, el usuario recibe un enlace de activación. */
  ACTIVATION_LINK: {
    key: 'auth.activation.link',
    subject: 'Activa tu cuenta.',
    template: 'auth/activationAccount',
    description: 'Correo enviado al usuario para verificar su cuenta.',
  },

  /** Correo enviado al usuario para solicitar el restablecimiento de su contraseña. */
  REQ_RESET_PASSWORD: {
    key: 'auth.req.reset.password',
    subject: 'Reestablece tu contraseña.',
    template: 'auth/reqResetPassword',
    description:
      'Correo enviado al usuario para solicitar el restablecimiento de su contraseña.',
  },
};
