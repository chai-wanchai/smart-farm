import * as express from 'express';
import * as controller from '../controller/AuthController'
import { ErrorHandle } from '../common/errorHandle';
import { AuthValidation } from '../validation/AuthValidation';
import Middelware from '../manager/Middleware';
export const router = express.Router();
router.post('/oauth/authorize', Middelware.handleClientFromeRequet, controller.loginWithRefreshToken);
router.post('/oauth/verify', Middelware.handleClientFromeRequet, controller.verifyToken);
router.post('/oauth/token', Middelware.handleClientFromeRequet, AuthValidation, AuthToken);
router.post('/oauth/token/revoke', Middelware.handleToken, controller.logout)
async function AuthToken(req: express.Request, res: express.Response, next: express.NextFunction) {
  try {
    const { grant_type } = req.body
    switch (grant_type) {
      case 'password': controller.loginWithUsernamePassword(req, res, next)
        break;
      case 'refresh_token': controller.loginWithRefreshToken(req, res, next)
        break;
      case 'google': controller.loginWithGoogle(req, res, next)
        break;
      case 'line': controller.loginWithLine(req, res, next)
        break;
      default: throw Error('Invalid Grant Type')
    }
  } catch (error) {
    const err = new ErrorHandle(error)
    err.sendErrorResponse(res)
  }

}
export default router;