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
	constructor(gamma) {
		this.gamma = gamma || 0.5;
		this.rewards = {};
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
	learn(steps) {
    steps = Math.max(1, steps || 0);
    while (steps--) {
			this.currentState = this.randomState();
			this.step();
		}
	}
	step() {
		this.currentState || this.currentState.randomState();
		let action = this.currentState.randomAction();
		if (!action) return null;
		this.rewards[this.currentState.name] || (this.rewards[this.currentState.name] = {});
		this.rewards[this.currentState.name][action.name] = (action.reward || 0) + this.gamma * this.optimalFutureValue(action.nextState).max;
	}
	optimalFutureValue(state) {
		let stateRewards = this.rewards[state];
		let max = 0;
		let action;
		for (action in stateRewards) {
			if (stateRewards.hasOwnProperty(action)) {
				max = Math.max(0, stateRewards[action] || 0);
			}
		}
		return { max, action };
	}
	randomState() {
		return this.statesList[~~(this.statesList.length * Math.random())];
	}
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
