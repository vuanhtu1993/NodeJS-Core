class State {
  constructor(name) {
    this.name = name;
    this.actions = {};
    this.actionsList = [];
  }

  addAction(nextState, reward, actionName) {
    let action = {
      name: actionName || nextState,
      nextState,
      reward
    };
    this.actions[action.name] = action;
    this.actionsList.push(action);
  }

  randomAction() {
    return this.actionsList[~~(this.actionsList.length * Math.random())]
  }
}

export class QLearner {
  constructor(alpha) {
    this.alpha = alpha || 0.5;
    this.trips;
    this.Q = {};
    this.states = {};
    this.statesList = [];
    this.currentState = null;
  }

  add(from, to, reward, actionName) {
    if (!this.states[from]) {
      this.addState(from);
    }
    if (!this.states[to]) {
      this.addState(to);
    }
    this.states[from].addAction(to, reward, actionName)
  }

  addState(name) {
    let state = new State(name);
    this.states[name] = state;
    this.statesList.push(state);
    return state;
  }

  initialQ() {
    this.statesList.map((state) => {
      this.Q[state.name] = {};
      state.actionsList.map((action) => {
        this.Q[state.name][action.name] = 100;
      });
    })
  };

  updateQ(nextState, alpha) {
    let currentR = this.currentState.actions[nextState.name].reward;
    let currentQ = this.Q[this.currentState.name][nextState.name];
    // console.log(currentR, currentQ);
    let new_q = parseInt(currentQ) + alpha * (parseInt(currentR) + this.minimumFutureValue(nextState).reward - currentQ);
    this.Q[this.currentState.name][nextState.name] = Math.round(new_q);
  }

  findGoodWay(start, end) {
    let otherTrip = [];
    start = this.getState(start)[0];
    otherTrip.push(String(start.name));
    while (start.name != end) {
      let bestAction = this.minimumFutureValue(start);
      otherTrip.push(bestAction.name);
      start = this.getNextState(bestAction)[0];
    }
    return otherTrip;
  }

  Q_routing(start, end, n_loop) {
    let nextState = null;
    for (let i = 0; i < n_loop; i++) {
      this.currentState = this.getState(start)[0];
      let flag = false;
      while (!flag) {
        let bestAction = this.minimumFutureValue(this.currentState);
        nextState = this.getNextState(bestAction)[0];
        this.updateQ(nextState, this.alpha);
        if (nextState.name == end) {
          flag = true;
        }
        this.currentState = nextState;
      }
    }
    let arrTrips = [];
    for (let i = 0; i < 10; i++) {
      arrTrips.push(this.findGoodWay(start, end));
    }
    // finding multiple best ways using reduce ()
    this.trips = arrTrips.reduce((accumulator, currentValue) => {
      if (accumulator.length <= 0) {
        return [currentValue];
      } else {
        let count = 0;
        for (let i = 0; i < accumulator.length; i++) {
          if (JSON.stringify(currentValue) !== JSON.stringify(accumulator[i])) {
            count ++;
          }
        }
        if (count == accumulator.length) {
          return [...accumulator, currentValue];
        }
        return accumulator;
      }
    },[]);
  };

  minimumFutureValue(state) {
    let _q = this.Q[state.name];
    let min = 9999;
    for (let a in _q) {
      if (min > _q[a]) {
        min = _q[a];
      }
    }

    let tempObj = {};
    let tempArr = [];
    for (let a in _q) {
      if (_q[a] == min) {
        tempArr.push(a);
        tempObj[a] = min;
      }
    }

    let bestAction = {name: "", reward: 0};
    let action = tempArr[~~(Math.random() * tempArr.length)];
    for (let a in _q) {
      if (a == action) {
        bestAction.name = action;
        bestAction.reward = _q[a];
      }
    }
    // console.log(bestAction);
    return bestAction;
  }

  optimalFutureValue(state) {
    let stateRewards = this.Q[state.name];
    let min = 9999;
    let action;
    for (action in stateRewards) {
      if (stateRewards.hasOwnProperty(action)) {
        min = Math.min(stateRewards[action] || 0, 9999);
      }
    }
    return {name: action, reward: min};
  }

  // randomState() {
  // 	return this.statesList[~~(this.statesList.length * Math.random())];
  // }

  getState(stateName) {
    return this.statesList.filter(function (state) {
      return state.name == stateName;
    });
  };

  getNextState(bestAction) {
    return this.statesList.filter(function (state) {
      return state.name == bestAction.name;
    })
  };

}
