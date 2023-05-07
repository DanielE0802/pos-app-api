/* A MAIL constant that is exporting with the each email configuration. */
export const MAIL = {
  activation_account: {
    template: 'activation-account',
    config: {
      from: '"Equipo Metaverso" <lider.backend@talentum.edu.co>',
      subject: 'Active su cuenta.',
    },
  },
  req_reset_password: {
    template: 'req-reset-password',
    config: {
      from: '"Equipo Metaverso" <lider.backend@talentum.edu.co>',
      subject: 'Usted solicitó cambiar su contraseña.',
    },
  },
};
