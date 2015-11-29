window.deprecationWorkflow = window.deprecationWorkflow || {};
window.deprecationWorkflow.config = {
  workflow: [
    { handler: "silence", matchMessage: "The `initialize` method for Application initializer 'pagefront-beacon' should take only one argument - `App`, an instance of an `Application`." },
    { handler: "silence", matchMessage: "The `initialize` method for Application initializer 'ember-data' should take only one argument - `App`, an instance of an `Application`." },
    { handler: "silence", matchMessage: "Using `ApplicationInstance.container.lookup` is deprecated. Please use `ApplicationInstance.lookup` instead." },
    { handler: "silence", matchMessage: "You modified each(composableChildren) twice in a single render. This was unreliable in Ember 1.x and will be removed in Ember 2.0" }
  ]
};
