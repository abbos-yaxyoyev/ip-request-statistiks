import { ValidationError } from "class-validator";
import { ERROR_CODES } from "../constant/error-codes";
import moment from "moment";
import i18next from "../errors/i18n";

export class CommonException {
  constructor(
    public code: number,
    public message: string,
    public data: any,
    public success: boolean = false,
    public time = moment().utcOffset('+05:00').format('YYYY-MM-DD HH:mm:ss'),
    public count?: number /* paging uchun */
  ) { }

  public static Success(data, count?) {
    return new CommonException(0, i18next.t('common.ok'), data, true, moment().utcOffset('+05:00').format('YYYY-MM-DD HH:mm:ss'), count);
  }
  
  public static UnknownError(data?: any, meta: any = {}) {
    return new CommonException(ERROR_CODES.BASE, i18next.t("common.unknownError"), data);
  }

  public static ValidationError(data?: ValidationError | string) {
    return new CommonException(ERROR_CODES.BASE + 1, i18next.t('common.validationError'), data);
  }

  static AlreadyExist(data, message) {
    return new CommonException(ERROR_CODES.BASE + 2, i18next.t(`common.alreadyExist: ${message}`, { message }), data);
  }

  public static Unauthorized(data = null) {
    return new CommonException(ERROR_CODES.USERS + 3, i18next.t('user.unauthorized'), data)
  }

}


