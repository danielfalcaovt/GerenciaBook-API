import { MissingParamError } from '../../errors/missing-param-error'
import { RequiredFieldValidation } from '../validations/required-field-validation'

describe('RequiredFieldValidation', () => {
  it('Should return an error if required parameter not found', () => {
    const sut = new RequiredFieldValidation('field')
    const response = sut.validate({ name: 'any_name' })
    expect(response).toEqual(new MissingParamError('field'))
  })
  it('Should not return if required parameters was found', () => {
    const sut = new RequiredFieldValidation('field')
    const response = sut.validate({ field: 'any_value' })
    expect(response).toBeFalsy()
  })
})