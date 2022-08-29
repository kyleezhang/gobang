import { RoleEnum } from './gobang';

export interface BoardOptions {
  borderColor: string;
  padding: number;
  count: number;
  lineWidth: number;
}

export class Board {
  options: BoardOptions;

  positions: number[][];

  win: boolean;

  element: HTMLCanvasElement;

  history: Array<{
    x: number;
    y: number;
    role: RoleEnum;
  }>;

  constructor(options: BoardOptions, ele: HTMLCanvasElement) {
    this.options = options;
    this.positions = [[]];
    this.history = [];
    this.win = false;
    this.element = ele;
  }

  init(ctx: CanvasRenderingContext2D) {
    this.element.width = this.options.padding * this.options.count;
    this.element.height = this.options.padding * this.options.count;
    this.drawBoard(ctx);
    this.initPositions();
  }

  drawBoard(ctx: CanvasRenderingContext2D) {
    const { borderColor, lineWidth, count, padding } = this.options;
    ctx.closePath();
    ctx.strokeStyle = borderColor;
    ctx.lineWidth = lineWidth;
    const lines = count + 1;

    for (let i = 0; i < lines; i += 1) {
      ctx.moveTo(15 + i * padding, 15);
      ctx.lineTo(15 + i * padding, padding * lines - 15);
      ctx.stroke();
      ctx.moveTo(15, 15 + i * padding);
      ctx.lineTo(padding * lines - 15, 15 + i * padding);
      ctx.stroke();
    }
  }

  initPositions() {
    const positions: number[][] = [[]];
    for (let i = 0; i <= this.options.count; i += 1) {
      positions[i] = [];
      for (let j = 0; j <= this.options.count; j += 1) {
        positions[i][j] = 0;
      }
    }
    this.positions = positions;
  }

  // 绘制棋子
  drawChessman(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    role: RoleEnum,
  ) {
    // 空的位置才可以落子
    if (
      this.positions[x][y] !== undefined &&
      Object.is(this.positions[x][y], 0)
    ) {
      // 落子后更新棋盘矩阵
      this.positions[x][y] = role;

      // 绘制棋子
      const gradient = ctx.createRadialGradient(x, y, 10, x - 5, y - 5, 0);
      ctx.beginPath();
      ctx.arc(
        15 + x * this.options.padding,
        15 + y * this.options.padding,
        10,
        0,
        2 * Math.PI,
      );
      ctx.closePath();
      if (role === RoleEnum.BLACK) {
        gradient.addColorStop(0, '#0a0a0a');
        gradient.addColorStop(1, '#636766');
      } else {
        gradient.addColorStop(0, '#d1d1d1');
        gradient.addColorStop(1, '#f9f9f9');
      }
      ctx.fillStyle = gradient;
      ctx.fill();

      // 添加历史记录
      this.history.push({
        x,
        y,
        role,
      });

      // 每次落子完成后都要判断下输赢
      setTimeout(() => {
        this.checkReferee(x, y, role);
      }, 0);
    }
  }

  // 判断输赢
  checkReferee(x: number, y: number, role: RoleEnum) {
    let countContinuous = 0; // 连杀的分数
    const XContinuous = this.positions.map((x) => x[y]); // 横向
    const YContinuous = this.positions[x]; // 纵向
    const S1Continuous: number[] = []; // 左斜线
    const S2Continuous: number[] = []; // 右斜线
    this.positions.forEach((position, index) => {
      S1Continuous.push(position[index - x + y]);
      S2Continuous.push(position[x - index + y]);
    });

    [XContinuous, YContinuous, S1Continuous, S2Continuous].forEach((axis) => {
      if (
        axis.some((x, i) => {
          return (
            axis[i] !== undefined &&
            axis[i] !== 0 &&
            axis[i - 2] === axis[i - 1] &&
            axis[i - 1] === axis[i] &&
            axis[i] === axis[i + 1] &&
            axis[i + 1] === axis[i + 2]
          );
        })
      ) {
        countContinuous += 1;
      }
    });

    // 如果赢了就给出提示
    if (countContinuous) {
      this.win = true;
      const msg = `${role === RoleEnum.BLACK ? '黑' : '白'}子胜利`;
      window.alert(msg);
      this.element.onclick = null;
    }
  }
}
