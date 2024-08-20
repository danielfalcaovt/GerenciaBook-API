import { MissingParamError } from "../../errors"
import { RequiredAtLeastOneIn } from './required-at-least-one-in'

const makeFakeRequest = () => ({
  paramOne: 'any_value',
  paramTwo: 'any_value'
})

const makeFakeValidationParameters = () => ([
  'paramOne',
  'paramTwo'
])

describe('RequiredAtLeastOneIn', () => {
  it('Should return an error if no parameter was found', async () => {
    const sut = new RequiredAtLeastOneIn(makeFakeValidationParameters())
    const error = sut.validate({})
    expect(error).toEqual(new MissingParamError('required at least a param'))
  })
  it('Should not return if ok', async () => {
    const sut = new RequiredAtLeastOneIn(makeFakeValidationParameters())
    const result = sut.validate(makeFakeRequest())
    expect(result).toBeFalsy()
  })
})