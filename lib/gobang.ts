import { Board, BoardOptions } from './board';

export enum RoleEnum {
  WHITE = 1,
  BLACK,
}

class Gobang {
  boardElement: HTMLCanvasElement;

  context: CanvasRenderingContext2D;

  board: Board;

  boardOptions: BoardOptions; // 棋盘的参数

  role: RoleEnum = RoleEnum.WHITE;

  constructor(ele: HTMLCanvasElement) {
    this.boardElement = ele;
    this.context = ele.getContext('2d')!;
    this.boardOptions = {
      borderColor: '#b6895a',
      padding: 30,
      count: 20,
      lineWidth: 2,
    };
    this.board = new Board(this.boardOptions, this.boardElement);
  }

  init() {
    this.board.init(this.context);
    this.boardElement.onclick = this.listenDownChessman.bind(this);
  }

  // 监听落子
  listenDownChessman(event: MouseEvent) {
    let { offsetX: x, offsetY: y } = event;
    x = Math.round((x - 15) / this.boardOptions.padding);
    y = Math.round((y - 15) / this.boardOptions.padding);
    this.board.drawChessman(this.context, x, y, this.role);

    this.role = this.role === RoleEnum.BLACK ? RoleEnum.WHITE : RoleEnum.BLACK;
  }
}

export default Gobang;
