export const RegexType = {
  NAME: /^[A-Za-z ]*$/,
  SURNAME: /^[A-Za-z ]*$/,
  PASSWORD:
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
  POSTAL_CODE: /\d{2}-\d{3}/,
  PHONE_NUMBER: /^[0-9\- ]{8,14}$/,
  EMAIL: /^[^@]+@[^@]+\.[^@]+$/,
  HEIGHT: /^([1-9][0-9]{0,2})$/,
}
