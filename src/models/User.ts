class User {
  readonly device: string
  status: boolean

  constructor(device: string, status = false) {
    this.device = device
    this.status = status
  }
}
export default User
