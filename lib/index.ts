import '../style/index.scss';
import Gobang from './gobang';

export enum DepthEnum {
  PRIMARY,
  INTERMEDIATE,
  ADVANCED,
}

export enum OffensEnum {
  FIRST,
  SECOND,
}

export interface ConfigInterface {
  depth: DepthEnum;
  offens: OffensEnum;
}

const config: ConfigInterface = {
  depth: DepthEnum.INTERMEDIATE,
  offens: OffensEnum.FIRST,
};

function getRadioValue(id: keyof ConfigInterface) {
  const target = document.getElementById(id);
  for (let i = 0; i < (target?.children?.length || 0); i += 1) {
    const child = target?.children[i];
    if (child?.tagName === 'LABEL') {
      child.addEventListener('click', (e: any) => {
        if (e.target.value) {
          // @ts-ignore
          config[id] = +e.target.value;
        }
      });
    }
  }
}

function init() {
  getRadioValue('depth');
  getRadioValue('offens');
  const boardElement = document.getElementById('gobang')! as HTMLCanvasElement;
  const gobang = new Gobang(boardElement!, config);
  gobang.init();
}

init();
