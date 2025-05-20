const authorizeRoles = require('../../middlewares/roleMiddleware');

describe('authorizeRoles Middleware', () => {
  let req, res, next;

  beforeEach(() => {
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    next = jest.fn();
  });

  test('should return 403 if user role is not allowed', () => {
    req = { user: { role: 'user' } };
    const middleware = authorizeRoles('admin');

    middleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({ message: 'Forbidden: Access denied' });
  });

  test('should call next if user role is allowed', () => {
    req = { user: { role: 'admin' } };
    const middleware = authorizeRoles('admin', 'superadmin');

    middleware(req, res, next);

    expect(next).toHaveBeenCalled();
  });

  test('should return 403 if req.user is missing', () => {
    req = {};
    const middleware = authorizeRoles('admin');

    middleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({ message: 'Forbidden: Access denied' });
  });
});
