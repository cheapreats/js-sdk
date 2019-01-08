/**
 * Controller for the graph.
 */
class GraphController {
    constructor(app){
        this.app = app;
        this.query = this.query.bind(this);
    }

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
