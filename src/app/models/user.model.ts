export class User {
  constructor(public email: string, public localId: string, private idToken: string, private expirationDate: number) {}

  getToken() {
    return this.idToken;
  }
}
