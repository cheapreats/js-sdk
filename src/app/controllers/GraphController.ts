/**
 * Controller for the graph.
 */
class GraphController {
  app: any;
  constructor(app: any) {
    this.app = app;
    // ADD BINDINGS BELOW
    this.query = this.query.bind(this);
  }

  // ADD MUTATION METHODS BELOW

  query(query: string, variables: any = {}) {
    return this.app.getAdaptor().query(query, variables);
  }
}

module.exports = GraphController;
