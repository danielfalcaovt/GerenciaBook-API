import { InvalidParamError} from '../../errors/invalid-param-error'
import { CompareFieldValidation } from './compare-field-validation'

describe('CompareFieldValidation', () => {
  it('Should return an error if compare validation fails', () => {
    const sut = new CompareFieldValidation('firstField', 'secondField')
    const response = sut.validate({
      firstField: 'any_value',
      secondField: 'distinct_value'
    })
    expect(response).toEqual(new InvalidParamError('confirmPassword'))
  })
  it('Should not return if validation succeed', () => {
    const sut = new CompareFieldValidation('firstField', 'secondField')
    const response = sut.validate({
      firstField: 'any_value',
      secondField: 'any_value'
    })
    expect(response).toBeFalsy()
  })
})