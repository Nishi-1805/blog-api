const { validationResult } = require('express-validator');
const handleValidationErrors = require('../../middlewares/validation/handleValidation');

jest.mock('express-validator');

describe('handleValidationErrors Middleware', () => {
  let req, res, next;

  beforeEach(() => {
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    next = jest.fn();
  });

  test('should return 422 with validation errors', () => {
    const fakeErrors = [
      { param: 'email', msg: 'Invalid email' },
      { param: 'password', msg: 'Password is required' }
    ];
    validationResult.mockReturnValue({
      isEmpty: () => false,
      array: () => fakeErrors
    });

    handleValidationErrors({}, res, next);

    expect(res.status).toHaveBeenCalledWith(422);
    expect(res.json).toHaveBeenCalledWith({
      errors: [
        { field: 'email', message: 'Invalid email' },
        { field: 'password', message: 'Password is required' }
      ]
    });
  });

  test('should call next if no validation errors', () => {
    validationResult.mockReturnValue({
      isEmpty: () => true
    });

    handleValidationErrors({}, res, next);

    expect(next).toHaveBeenCalled();
  });
});
