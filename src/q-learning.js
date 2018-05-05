class State {
	constructor(name) {
		this.name = name;
		this.actions = {};
		this.actionsList = [];
	}
  addAction(nextAction, reward, actionName) {
    let action = {
    	name: actionName || nextAction,
			nextAction,
			reward
		};
		this.actions[action.name] = action;
		this.actionsList.push(action);
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
}
