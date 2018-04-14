class GraphController {
    constructor(adaptor){
        this._adaptor = adaptor;
        this.query = this.query.bind(this);
    }

    /**
     * Query the graph
     * @param query
     * @param variables
     */
    query(query, variables = {}){
        return this._adaptor.query(query, variables);
    }
}

module.exports = GraphController;
