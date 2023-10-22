/*
 * @Description:
 * @Author: hm
 * @Date: 2023-03-15 10:25:45
 * @LastEditors: hm
 * @LastEditTime: 2023-03-15 10:47:16
 */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { notEmpty } = require("../utils.js");

module.exports = {
  description: "create a view",
  prompts: [
    {
      type: "list",
      name: "type",
      message: "Please select view type:",
      choices: [
        {
          name: "index",
          value: "index",
        },
      ],
    },
    {
      type: "input",
      name: "fileSrc",
      message: "请输入文件放置路径:(view/)",
      default:null,
      // validate: notEmpty("name"),
    },
    {
      type: "input",
      name: "name",
      message: "Please input view name:",
      validate: notEmpty("name"),
    },
    {
      type: "checkbox",
      name: "blocks",
      message: "Please select blocks:",
      choices: [
        {
          name: "<template>",
          value: "template",
          checked: true,
        },
        {
          name: "<script>",
          value: "script",
          checked: true,
        },
        {
          name: "<style>",
          value: "style",
          checked: true,
        },
      ],
      validate(value) {
        if (value.indexOf("script") === -1 && value.indexOf("template") === -1) {
          return "View require at least a <script> or <template> tag.";
        }
        return true;
      },
    },
    {
      type: "list",
      name: "lang",
      message: "Please select style sheet lang:",
      choices: [
        {
          name: "css",
          value: "css",
        },
        {
          name: "less",
          value: "less",
        },
        {
          name: "scss",
          value: "scss",
        },
      ],
    },
  ],
  actions: (data) => {
    console.log(data)
    const actions = [
      {
        type: "add",
        path: `src/views/{{ fileSrc }}/index.vue`,
        templateFile: `plop-templates/view/{{ type }}.hbs`,
        data: {
          name: "{{ name }}",
          template: data.blocks.includes("template"),
          script: data.blocks.includes("script"),
          style: data.blocks.includes("style"),
          lang: "{{ lang }}",
        },
      },
    ];

    return actions;
  },
};
