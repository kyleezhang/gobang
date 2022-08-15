import { Board, BoardInterface } from './board';

const BoardBgSrc = 'images/board.png';

class Gobang {
  context: CanvasRenderingContext2D;

  board: BoardInterface;

  constructor(ele: HTMLCanvasElement) {
    this.context = ele.getContext('2d')!;
    this.board = new Board(BoardBgSrc);
  }

  init() {
    this.board.draw(this.context);
  }
}

export default Gobang;
