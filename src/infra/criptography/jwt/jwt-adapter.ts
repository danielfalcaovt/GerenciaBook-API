import { ITokenGenerator } from "../../../data/protocols/cryptography/itoken-generator";
import jwt from 'jsonwebtoken'

export class JwtAdapter implements ITokenGenerator {
  constructor(private readonly JWT_SECRET: string) {}
  async generate(id: string): Promise<string> {
    const token = jwt.sign({ id }, this.JWT_SECRET)
    return token
  }
}