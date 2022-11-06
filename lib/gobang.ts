import { ConfigInterface, DepthEnum, OffensEnum } from 'lib';
import { Board, BoardOptions } from './board';

export enum RoleEnum {
  WHITE = 1,
  BLACK,
}

class Gobang {
  boardElement: HTMLCanvasElement;

  boxElement: HTMLDivElement;

  audioElement: HTMLAudioElement;

  context: CanvasRenderingContext2D;

  board: Board;

  boardOptions: BoardOptions; // 棋盘的参数

  role: RoleEnum = RoleEnum.WHITE;

  depth: DepthEnum;

  offens: OffensEnum;

  constructor(ele: HTMLCanvasElement, config: ConfigInterface) {
    this.boardElement = ele;
    this.boxElement = document.getElementById('gobangBox') as HTMLDivElement;
    this.audioElement = document.getElementById(
      'clickAudio',
    ) as HTMLAudioElement;
    this.context = ele.getContext('2d')!;
    this.boardOptions = {
      borderColor: '#b6895a',
      padding: 30,
      count: 20,
      lineWidth: 2,
    };
    this.board = new Board(this.boardOptions, this.boardElement);
    this.depth = config.depth;
    this.offens = config.offens;
  }

  initRestart() {
    const target = document.getElementById('restartBtn');
    target!.onclick = () => {
      this.restart();
    };
  }

  init() {
    this.board.init(this.context);
    this.boardElement.onclick = this.listenDownChessman.bind(this);
    this.initRestart();
  }

  restart() {
    this.context.clearRect(0, 0, 630, 630);
    this.board.init(this.context);
  }

  // 监听落子
  listenDownChessman(event: MouseEvent) {
    this.audioElement.play();
    let { offsetX: x, offsetY: y } = event;
    x = Math.round((x - 15) / this.boardOptions.padding);
    y = Math.round((y - 15) / this.boardOptions.padding);
    this.board.drawChessman(this.context, x, y, this.role);

    this.role = this.role === RoleEnum.BLACK ? RoleEnum.WHITE : RoleEnum.BLACK;
  }
}

export default Gobang;
