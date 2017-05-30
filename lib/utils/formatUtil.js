import numeral from 'numeral';
import stringFormat from 'string-format';

const formatUtil = {};

/**
 * Format number
 *
 * @param  {[type]} value        [description]
 * @param  {[type]} formatString [description]
 * @return {[type]}              [description]
 */
formatUtil.formatNumber = (value, formatString) => {
  return numeral(value).format(formatString);
}

/**
 * Format string
 *
 * @param  {[type]} str  [description]
 * @param  {[type]} args [description]
 * @return {[type]}      [description]
 */
formatUtil.formatString = (str, ...args) => {
  return stringFormat(str, args);
}

export default formatUtil;
