const authenticateToken = require('../../middlewares/authMiddleware');
const jwt = require('jsonwebtoken');

jest.mock('jsonwebtoken');

describe('authenticateToken Middleware', () => {
  let req, res, next;

  beforeEach(() => {
    req = { headers: {} };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    next = jest.fn();
  });

  test('should return 401 if token is missing', () => {
    authenticateToken(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: 'Access token missing' });
  });

  test('should return 403 if token is invalid', () => {
    req.headers['authorization'] = 'Bearer invalidtoken';
    jwt.verify.mockImplementation(() => { throw new Error(); });

    authenticateToken(req, res, next);

    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({ message: 'Invalid or expired token' });
  });

  test('should call next if token is valid', () => {
    req.headers['authorization'] = 'Bearer validtoken';
    jwt.verify.mockReturnValue({ userId: 1, role: 'user' });

    authenticateToken(req, res, next);

    expect(req.user).toEqual({ id: 1, role: 'user' });
    expect(next).toHaveBeenCalled();
  });
});
