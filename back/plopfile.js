/*
 * @Description:
 * @Author: hm
 * @Date: 2023-03-15 10:39:52
 * @LastEditors: hm
 * @LastEditTime: 2023-03-15 10:40:16
 */
/* eslint-disable @typescript-eslint/no-var-requires */
// https://plopjs.com/documentation/#getting-started
const viewGenerator = require("./plop-templates/view/plopfiles");

module.exports = function (plop) {
  plop.setGenerator("view", viewGenerator);
};
