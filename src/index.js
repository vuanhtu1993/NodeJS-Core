import { QLearner } from "./q-learning";

const ql = new QLearner(0.8);
ql.add(0,1,15);
ql.add(0,2,13);
ql.add(0,3,5);
ql.add(1,0,15);
ql.add(1,5,8);
ql.add(1,7,11);
ql.add(2,0,13);
ql.add(2,3,18);
ql.add(2,4,3);
ql.add(2,5,6);
ql.add(3,0,5);
ql.add(3,2,18);
ql.add(3,4,4);
ql.add(3,8,18);
ql.add(4,2,3);
ql.add(4,3,4);
ql.add(4,5,1);
ql.add(4,6,9);
ql.add(4,8,14);
ql.add(5,1,8);
ql.add(5,2,6);
ql.add(5,4,1);
ql.add(5,6,16);
ql.add(5,7,17);
ql.add(6,4,9);
ql.add(6,5,16);
ql.add(6,7,7);
ql.add(6,8,10);
ql.add(7,1,11);
ql.add(7,5,17);
ql.add(7,6,7);
ql.add(7,8,12);
ql.add(8,3,18);
ql.add(8,4,14);
ql.add(8,6,10);
ql.add(8,7,12);


ql.initialQ();
ql.Q_routing(0, 8, 1000);
const object = JSON.parse(JSON.stringify(ql.Q));
console.dir(object, {depth: null, colors: true});

