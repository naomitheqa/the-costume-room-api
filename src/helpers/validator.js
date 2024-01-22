/* eslint-disable max-depth */
/* eslint-disable max-lines-per-function */
const pwrd = /^[A-Za-z0-9_@./#$%&+-]*$/;
const title = /^(?!^\d*$)[a-zA-Z\d\s]*$/;
const gname = /^[a-z ,.'-]+$/i;
const emailR = /.{1,}@[^.]{1,}/;

// Helpers
/**
 * Function to determine is a date string follows the yyyy/mm/dd format
 * @author Goblinlord
 * @see https://stackoverflow.com/questions/18758772/how-do-i-validate-a-date-in-this-format-yyyy-mm-dd-using-jquery
 * @param {*} dateString
 * @returns {Boolean}
 */
function isValidDate(dateString) {
  const regEx = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateString.match(regEx)) return false; // Invalid format
  const d = new Date(dateString);
  const dNum = d.getTime();
  if (!dNum && dNum !== 0) return false; // NaN value, Invalid date
  return d.toISOString().slice(0, 10) === dateString;
}

/**
 * Function to return todaay's date in the required format
 * @author Naomi Benjamin
 * @returns {DateString}
 */
function getToday() {
  var temp = new Date().toLocaleDateString("zh-Hans-CN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  const today = temp.split("/").join("-");
  return today;
}

/**
 * Function that determines whether the given value is a BOOLEAN
 * @param {*} val
 * @returns {Booleam}
 */
function isBoolean(val) {
  return val === false || val === true;
}

/**
 * Function that determines whether the given value is aFloat
 * @param {*} n
 * @returns
 */
function isFloat(val) {
  return Number(val) === val && val % 1 !== 0;
}

/**
 * Function that determines whether the given value os only spaces (slightly different)
 * @author Borislav Hadzhiev
 * @see https://bobbyhadz.com/blog/javascript-typeerror-trim-is-not-a-function#:~:text=The%20%22trim%20is%20not%20a,the%20trim%20method%20on%20strings.
 * @param {*} str
 * @returns
 */
function onlySpaces(str) {
  str = str.toString();
  return str.trim().length === 0;
}

export class Validator {
  /**
 * Title server side validation
 * @version 1.0
 * @author Spark-Inc
 * @return {Boolean}
 */
  valAlphanumeric = function (val) {
    if (
      val === null ||
      val === "" ||
      val === undefined ||
      isBoolean(val) ||
      Number.isInteger(val) ||
      isFloat(val) ||
      onlySpaces(val) ||
      typeof val === "object"
    ) {
      return false;
    } else {
      if (!val.match(title)) {
        return false;
      } else {
        return true;
      }
    }
  };

  /**
   * Name server side validation
   * @version 1.0
   * @author Spark-Inc
   * @return {Boolean}
   */
  name = function (val) {
    if (
      val === null ||
      val === "" ||
      val === undefined ||
      isBoolean(val) ||
      Number.isInteger(val) ||
      isFloat(val) ||
      onlySpaces(val) ||
      typeof val === "object" ||
      val === "null"
    ) {
      return false;
    } else {
      if (!val.match(gname)) {
        return false;
      } else {
        return true;
      }
    }
  };

  /**
   * Password server side validation
   * @version 1.0
   * @author Spark-Inc
   * @return {Boolean}
   */
  password = function (val) {
    if (
      val === null ||
      val === "" ||
      val === undefined ||
      isBoolean(val) ||
      onlySpaces(val) ||
      Number.isInteger(val) ||
      isFloat(val) ||
      typeof val === "object"
    ) {
      return false;
    } else {
      if (!val.match(pwrd)) {
        return false;
      } else {
        return true;
      }
    }
  };

  /**
   * Email server side validation
   * @version 1.0
   * @author Spark-Inc
   * @return {Boolean}
   */
  email = function (val) {
    if (
      val === null ||
      val === "" ||
      val === undefined ||
      isBoolean(val) ||
      Number.isInteger(val) ||
      isFloat(val) ||
      onlySpaces(val) ||
      typeof val === "object"
    ) {
      return false;
    } else {
      if (!val.match(emailR)) {
        return false;
      } else {
        return true;
      }
    }
  };

  /**
   * @description Date erver side validation
   * @param {*} dateString
   * @returns {Boolean}
   */
  date = function (dateString) {
    if (
      dateString === undefined ||
      dateString === null ||
      dateString === "" ||
      isBoolean(dateString) ||
      Number.isInteger(dateString) ||
      isFloat(dateString) ||
      onlySpaces(dateString) ||
      typeof dateString === "object"
    ) {
      return false;
    } else {
      if (!isValidDate(dateString)) {
        return false;
      } else {
        return true;
      }
    }
  };

  /**
   * @description Determine if the start and end dates are vaoid in relation to each other
   * @param {*} sDate
   * @param {*} eDate
   * @returns {Boolean}
   */
  val2Dates = function (sDate, eDate) {
    if (
      sDate === undefined ||
      sDate === null ||
      sDate === "" ||
      isBoolean(sDate) ||
      Number.isInteger(sDate) ||
      isFloat(sDate) ||
      onlySpaces(sDate) ||
      typeof sDate === "object"
    ) {
      return false;
    } else {
      if (
        eDate === undefined ||
        eDate === null ||
        eDate === "" ||
        isBoolean(eDate) ||
        Number.isInteger(eDate) ||
        isFloat(eDate) ||
        onlySpaces(eDate) ||
        typeof eDate === "object"
      ) {
        return false;
      } else {
        const vD1 = isValidDate(sDate);
        const vD2 = isValidDate(eDate);
        if (!(vD1 && vD2)) {
          return false;
        } else {
          if (sDate > eDate) {
            return false;
          } else if (sDate <= eDate) {
            const today = getToday();
            console.log(today);
            if (new Date(sDate).toISOString().slice(0, 10) >= today) {
              if (new Date(eDate).toISOString().slice(0, 10) >= today) {
                return true;
              } else {
                return false;
              }
            } else {
              return false;
            }
          }
        }
      }
    }
  };
}