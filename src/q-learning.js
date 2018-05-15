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
		this.rewards = {};
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

	followQ(currentState) {
		return this.minimumFutureValue(currentState)
	};

	updateQ(nextState, alpha) {
		let currentR = this.currentState.actions[nextState.name].reward;
		let currentQ = this.Q[this.currentState.name][nextState.name];
		// console.log(currentR, currentQ);
		let new_q = parseInt(currentQ) + alpha*(parseInt(currentR) + this.minimumFutureValue(nextState).reward - currentQ);
		this.Q[this.currentState.name][nextState.name] = Math.round(new_q);
	}

	Q_routing(start, end, n_loop) {
		let nextState = null;
		for (let i = 0; i < n_loop; i++) {
			this.currentState = this.getInitialState(start)[0];
			let flag = false;
			while (!flag) {
				let bestAction = this.followQ(this.currentState);
				console.log(this.currentState);
				nextState = this.getNextState(bestAction)[0];
				this.updateQ(nextState, this.alpha);
				if (nextState.name == end) {
					flag = true;
				}
				this.currentState = nextState;
			}
		}
	};

	// learn(steps) {
	// 	steps = Math.max(1, steps || 0);
	// 	while (steps--) {
	// 		this.currentState = this.randomState();
	// 		this.step();
	// 	}
	// }

	// step() {
	// 	this.currentState || this.currentState.randomState();
	// 	let action = this.currentState.randomAction(); // chon Q min
	// 	if (!action) return null;
	// 	this.rewards[this.currentState.name] || (this.rewards[this.currentState.name] = {});
	// 	let currentQ = this.rewards[this.currentState.name][action.name]; // Q(current)
	// 	let currentR = action.reward; // R(current)
	// 	let newQ = (currentQ || 0) + this.gamma * ((currentR || 0) + this.optimalFutureValue(action.nextState).max - (currentQ || 0));
	// 	this.rewards[this.currentState.name][action.name] = Math.round(newQ)
	// }

	minimumFutureValue(state) {
		let _q = this.Q[state.name];
		let min = 9999;
		for (let a in _q) {
			// min = _q[a];
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

		let bestAction = { name: "", reward: 0 };
		let action	= tempArr[~~(Math.random()*tempArr.length)];
		for (let a in _q) {
			if (a == action) {
				bestAction.name = action;
				bestAction.reward = _q[a];
			}
		}
		// console.log(bestAction);
		return bestAction;
	}

	// optimalFutureValue(state) {
	// 	let stateRewards = this.rewards[state];
	// 	let max = 0;
	// 	let action;
	// 	for (action in stateRewards) {
	// 		if (stateRewards.hasOwnProperty(action)) {
	// 			max = Math.max(0, stateRewards[action] || 0);
	// 		}
	// 	}
	// 	return {max, action};
	// }

	// randomState() {
	// 	return this.statesList[~~(this.statesList.length * Math.random())];
	// }

	getInitialState(start) {
		return this.statesList.filter(function (state) {
			return state.name == start;
		});
	};

	getNextState(bestAction) {
		return this.statesList.filter(function (state) {
			return state.name == bestAction.name;
		})
	};

	findGoodWay(from, to) {
		let trip = [];
		while (from != to) {
			let nextState = this.optimalFutureValue(from).action;
			trip.push(from);
			from = nextState;
		}
		trip.push(to);
		return trip;
	}
}
