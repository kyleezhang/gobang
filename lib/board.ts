export interface BoardInterface {
  imgSrc: string;
  draw: (ctx: CanvasRenderingContext2D) => void;
}

export class Board implements BoardInterface {
  imgSrc: string;

  constructor(src: string) {
    this.imgSrc = src;
  }

  draw(ctx: CanvasRenderingContext2D) {
    const image = new Image();
    image.src = this.imgSrc;
    image.onload = () => {
      ctx.drawImage(image, 0, 0, 620, 570);
    };
  }
}
