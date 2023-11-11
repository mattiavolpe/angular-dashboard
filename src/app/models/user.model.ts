export class User {
  constructor(public email: string, public localId: string, private idTtoken: string, private expirationDate: number) {}
}
