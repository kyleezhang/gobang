import '../style/index.scss';
import Gobang from './gobang';

const ele = document.getElementById('gobang')! as HTMLCanvasElement;
const gobang = new Gobang(ele!);
gobang.init();
