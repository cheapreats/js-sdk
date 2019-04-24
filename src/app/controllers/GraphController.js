/**
 * Controller for the graph.
 */
class GraphController {
    constructor(app){
        this.app = app;
        // ADD BINDINGS BELOW
        this.query = this.query.bind(this);
    }

    // ADD MUTATION METHODS BELOW

    /**
     * Query the graph
     * @param  {} query
     * @param  {} variables={}
     */
    query(query, variables = {}){
        return this.app.getAdaptor().query(query, variables);
    }
}

module.exports = GraphController;
