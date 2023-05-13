/* A MAIL constant that is exporting with the each email configuration. */
export const MAIL = {
  activation_account: {
    template: 'activation-account',
    config: {
      from: '"No Reply" <noreply@example.com>',
      subject: 'Active su cuenta.',
    },
  },
  req_reset_password: {
    template: 'req-reset-password',
    config: {
      from: '"No Reply" <noreply@example.com>',
      subject: 'Usted solicitó cambiar su contraseña.',
    },
  },
};
