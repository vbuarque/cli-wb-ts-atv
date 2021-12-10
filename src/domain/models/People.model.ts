export class People {
  public name: string;
  private CPF: string;
  readonly birthDate: Date;
  public gender: string;

  constructor(name: string, CPF: string, birthDate: Date, gender: string) {
    this.name = name;
    this.CPF = CPF;
    this.birthDate = birthDate;
    this.gender = gender;
  }

  public getCpf() {
    return this.CPF;
  }
}
