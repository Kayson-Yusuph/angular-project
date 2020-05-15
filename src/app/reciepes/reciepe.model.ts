export class Reciepe {
  public name: string;
  public description: string;
  public imagePath: string;

  Reciepe(name: string, desc: string, imagePath: string) {
    this.name = name;
    this.description = desc;
    this.imagePath = imagePath;
  }

}
