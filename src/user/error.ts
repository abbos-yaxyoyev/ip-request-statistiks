import { ERROR_CODES } from '../common/constant/error-codes';
import { CommonException } from '../common/errors';
import i18next from "../common/errors/i18n";

export class UserException extends CommonException {

  public static NotFound(data) {
    return new UserException(ERROR_CODES.USERS, i18next.t('user.notFound'), data)
  }

  public static InvalidPassword(data) {
    return new UserException(ERROR_CODES.USERS + 1, i18next.t('user.invalidPassword'), data)
  }

  public static Unauthorized(data = null) {
    return new UserException(ERROR_CODES.USERS + 2, i18next.t('user.unauthorized'), data)
  }

  public static NotEnoughPermission(data = null) {
    return new UserException(ERROR_CODES.USERS + 3, i18next.t('user.notEnoughPermission'), data)
  }

  public static ExistingPhone(data) {
    return new UserException(ERROR_CODES.USERS + 4, i18next.t('user.existingPhone'), data)
  }

}