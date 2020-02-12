class AuthorizationController {
  app: any;
  constructor(app: any) {
    this.app = app;
    this.getTokenScope = this.getTokenScope.bind(this);
  }

  getTokenScope(token: string) {
    let queryString = `
            query {
                auth_token_scope(token: "${token}")
            }
        `;
    return new Promise<any>((resolve, reject) => {
      return this.app
        .getAdaptor()
        .query(queryString)
        .then((data: { auth_token_scope: unknown }) => {
          resolve(data.auth_token_scope);
        })
        .catch((e: any) => {
          reject(e);
        });
    });
  }
}

module.exports = AuthorizationController;
