export abstract class SaqueError extends Error {
  readonly codigo: string;

  protected constructor(mensagem: string, codigo: string) {
    super(mensagem);
    this.name = new.target.name;
    this.codigo = codigo;
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
