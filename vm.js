const path = require("path");

class Publisher {
  subscribers = [];
  output(value) {
    for (const subscriber of this.subscribers) {
      subscriber.input(value);
    }
  }
}

module.exports = function(application) {
  for (const effect of application.effects) {
    const symbol = application.symbols[effect.symbol];
    if (symbol.class === "consumer" && symbol.virtual) {
      const Consumer = require(path.resolve(__dirname, "virtual", effect.symbol));
      const executableEffect = new Consumer();
      for (const event of effect.events) {
        if ("value" in event) {
          const executableEvent = new Publisher();
          executableEvent.subscribers.push(executableEffect);
          executableEvent.output(event.value);
        }
      }
    }
  }
}
