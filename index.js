// Reactive programming
var a = 5;
// Reactive library
class ReactiveVariables {
  constructor() {
    this.aValue = 5;
    this.bValue = 5;
    this.aSubscribers = [];
    this.bSubscribers = [];
    this.cSubscribers = [];
  }
  // Observable pattern
  subscribeA(subscriber) {
    this.aSubscribers.push(subscriber);
    // return an unsubscribe function
    return () => {
      this.aSubscribers = this.aSubscribers.filter((sub) => sub !== subscriber);
    };
  }
  subscribeB(subscriber) {
    this.bSubscribers.push(subscriber);
    // return an unsubscribe function
    return () => {
      this.bSubscribers = this.bSubscribers.filter((sub) => sub !== subscriber);
    };
  }
  subscribeC(subscriber) {
    this.cSubscribers.push(subscriber);
    // return an unsubscribe function
    return () => {
      this.cSubscribers = this.cSubscribers.filter((sub) => sub !== subscriber);
    };
  }
  emitA(value) {
    this.aValue = value;
    this.aSubscribers.forEach((subscriber) => subscriber(value));
    this.updateC();
  }
  emitB(value) {
    this.bValue = value;
    this.bSubscribers.forEach((subscriber) => subscriber(value));
    this.updateC();
  }
  updateC() {
    const newC = this.aValue + this.bValue;
    this.cSubscribers.forEach((subscriber) => subscriber(newC));
  }
}

// Example usage
const reactiveVars = new ReactiveVariables();
// subscribe to change in a, b and c
const aUnsubscribe = reactiveVars.subscribeA((newA) => {
  console.log("Updated a :", newA);
});
const bUnsubscribe = reactiveVars.subscribeB((newB) => {
  console.log("Updated b :", newB);
});
const cUnsubscribe = reactiveVars.subscribeC((newC) => {
  console.log("Updated c :", newC);
});
// Initial values
console.log("Initial values:");
console.log("a", reactiveVars.aValue);
console.log("b", reactiveVars.bValue);
// updated values of a and b
reactiveVars.emitA(10);
reactiveVars.emitB(7);
reactiveVars.emitA(2);
// unsubscribe to avoid further updates
aUnsubscribe();
bUnsubscribe();
cUnsubscribe();
