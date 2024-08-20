import { MissingParamError } from "../../errors"
import { RequiredAtLeastOneIn } from './required-at-least-one-in'

const makeFakeRequest = () => ({

})

const makeFakeValidationParameters = () => ([
  'paramOne',
  'paramTwo'
])

describe('RequiredAtLeastOneIn', () => {
  it('Should return an error if no parameter was found', async () => {
    const sut = new RequiredAtLeastOneIn(makeFakeValidationParameters())
    const error = sut.validate(makeFakeRequest())
    expect(error).toEqual(new MissingParamError('required at least a param'))
  })
})