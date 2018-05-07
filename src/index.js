import { QLearner } from "./q-learning";

const ql = new QLearner(0.8);
ql.add(0,4,0);
ql.add(1,3,0);
ql.add(1,5,100);
ql.add(2,3,0);
ql.add(3,1,0);
ql.add(3,2,0);
ql.add(3,4,0);
ql.add(4,0,0);
ql.add(4,5,100);
ql.add(5,1,0);
ql.add(5,4,0);
ql.add(5,5,100);

console.log(ql.rewards);
ql.learn(500);
console.log(ql.rewards);
const trip = ql.findGoodWay(0, 5);
console.log(trip);