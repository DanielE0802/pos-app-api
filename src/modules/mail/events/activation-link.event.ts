export class ActivationLinkEvent {
  constructor(
    public readonly email: string,
    public readonly name: string,
    public readonly activationLink: string,
  ) {}
}
