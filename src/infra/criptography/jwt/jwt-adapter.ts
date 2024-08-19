 
 
import { ITokenGenerator } from '../../../data/protocols/cryptography/itoken-generator'
import { ITokenVerifier } from '../../../data/protocols/cryptography/itoken-verifier'
import jwt from 'jsonwebtoken'

export class JwtAdapter implements ITokenGenerator, ITokenVerifier {
  constructor(private readonly JWT_SECRET: string) {}
  async generate(id: string): Promise<string> {
    const token = jwt.sign({ id }, this.JWT_SECRET)
    return token
  }

  async verify(token: string): Promise<string | null> {
    const result = jwt.verify(token, this.JWT_SECRET)
    if (result instanceof Error || typeof result === 'string') {
      return new Promise(resolve => resolve(null))
    } else {
      return new Promise(resolve => resolve(result.id))
    }
  }
}
