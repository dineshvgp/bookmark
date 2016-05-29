/**
 * Evaluate the error and display validation messages
 */
import ErrorMessages from "../utils/ValidationMessages";

const HandleError = {
  /**
   * Evaluate the err and display using toast
   * @return {string} _error - error message
   */
  evaluateError(err) {
    const errorString = err.toString();
    const timeToShow = 2000;
    let _error = "";
    const errorIndex = errorString.indexOf("Network Error");
    if(errorIndex > 1) {
      _error = ErrorMessages.networkError;
    } else if(err.data.error) {
      if(err.data.error.message) {
        _error = err.data.error.message;
      } else {
        _error = ErrorMessages.miscellaneousError;
      }
    } else {
      _error = ErrorMessages.miscellaneousError;
    }
    Materialize.toast(_error, timeToShow);
  },
};

export default HandleError;
