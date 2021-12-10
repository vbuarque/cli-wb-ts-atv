import promptSync from "prompt-sync";

export class Input {
  public number(value: string): number {
    let prompt = promptSync();
    let valueAux = prompt(value);
    let number = new Number(valueAux);
    return number.valueOf();
  }
  public text(value: string): string {
    let prompt = promptSync();
    let text = prompt(value);
    return text;
  }
}
