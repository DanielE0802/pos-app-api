export class ReqResetPasswordEvent {
  constructor(public readonly email: string, public readonly name: string) {}
}
