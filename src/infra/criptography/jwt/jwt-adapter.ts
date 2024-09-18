/* eslint-disable @typescript-eslint/no-unused-vars */
 
 
import { Encrypter } from '../../../data/protocols/cryptography/encrypter'
import { Decrypter } from '../../../data/protocols/cryptography/decrypter'
import jwt from 'jsonwebtoken'

export class JwtAdapter implements Encrypter, Decrypter {
  constructor(private readonly JWT_SECRET: string) {}
  async encrypt(id: string): Promise<string> {
    const token = jwt.sign({ id }, this.JWT_SECRET, { expiresIn: '8h' })
    return token
  }

  async decrypt(token: string): Promise<string | null> {
    try {
      const result = jwt.verify(token, this.JWT_SECRET)
      if (typeof result !== 'string') {
        return new Promise(resolve => resolve(result.id))
      } else {
        return new Promise(resolve => resolve(null))
      }
    } catch (err) {
      return new Promise(resolve => resolve(null))
    }
  }
}
