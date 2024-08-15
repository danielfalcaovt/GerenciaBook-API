import bcrypt from "bcrypt";
import { IHasher } from "../../../data/protocols/cryptography/ihasher";
import { IComparer } from "../../../data/protocols/cryptography/icomparer";

export class BcryptAdapter implements IHasher, IComparer {
  constructor(private readonly salt: number) {}
  async hash(value: string): Promise<string> {
    const hashedValue = await bcrypt.hash(value, this.salt)
    return hashedValue
  }

  async compare(value: string, hash: string): Promise<boolean> {
    const result = await bcrypt.compare(value, hash)
    return result
  }
}