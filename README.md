# Trao-React小程序开发初始化文档

[仓库地址](https://github.com/smalllhui/taro-react-ts-project-init.git)

## 一、初始化
### 1、使用yarn安装脚手架

```bash
yarn global add @tarojs/cli // CLI 工具安装
```

### 2、创建模版

```
taro init chat-app //根据提示选择相应框架即可，会自动安装依赖 选:【CLI 内置默认模板】
```

### 3. 编译启动

```
cd chat-app // 进入项目根目录
yarn dev:weapp // 即可运行微信小程序
//生成的编译文件在根目录/dist文件下，用相应开发工具打开即可
```

## 二、基本配置

### 1.h5端修改服务路径

```js
// /config/index.js
h5:{
  devServer:{port:4563,host:"localhost"},
    ....
}
```

### 2.多端调试

```js
// /config/index.ts文件
// outputRoot: 'dist',
outputRoot: `dist/${process.env.TARO_ENV}`,
//编译生成的文件位于dist下，以各端环境命名h5/weapp/...
```

对于微信小程序，还需要将project.config.json文件的miniprogramRoot 的值改为 dist/weapp/，这样就可以正常在开发者工具中看到小程序了。

### 3.alias别名设置

```bash
yarn add @types/node -D
```

```js
// config/index.js
const path = require('path')

alias: {
    '@': path.resolve(__dirname, '../src'),
},
// projectName: 'chatApp',

// 根目录的tsconfig.json compilerOptions中添加
"compilerOptions":{
    // xxxxxx
    "baseUrl": ".", // 解析非相对模块名的基准目录
    // 模块名到基于 baseUrl的路径映射的列表。
    "paths": {
      "@/*": [
        "src/*"
      ]
    }
    // xxxxxx
}
```

### 4.重命名环境文件名

```js
.env.dev  改为: .env.development
.env.prod  改为: .env.production
// 若不想命名：dev:weapp": "npm run build:weapp -- --watch --mode development
// [--mode 模式] 指定环境 加载该配置文件  .env.[模式]
```

### 5.配置小程序APP_ID

.env.development、.env.production

```.evn
# TARO_APP_ID="开发环境下的小程序appid"
TARO_APP_ID="wxf42d4f11d29cc1d0"
```

```js
console.log(process.env.TARO_APP_API) // 打印配置的TARO_APP_API
console.log(process.env.NODE_ENV)// 打印当前模式
```

## 三、开发规范配置

### 1.配置.editorconfig

.editorconfig文件是一种用于定义和维护跨多个编辑器和IDE的代码风格的文件格式。它可以帮助团队成员在不同的编辑器和IDE中保持一致的代码格式，从而减少代码风格带来的问题。例如，它可以定义缩进、换行符、字符集等细节。编辑器和IDE可以通过插件或内置功能来支持.editorconfig文件。

在项目根目录创建.editorconfig文件

```tex
# http://editorconfig.org
root = true

[*]
charset = utf-8
indent_style = space
indent_size = 2
end_of_line = lf
trim_trailing_whitespace = true
insert_final_newline = true
quote_type = single

[*.md]
trim_trailing_whitespace = false
```

### 2.Eslint+prettier

#### 1、Eslint

```bash
// yarn add eslint -D 脚手架已经安装了
npx eslint --init
```

选择如下:

>Q:How would you like to use ESLint? ...
>	🔥A:To check syntax, find problems, and enforce code style
>
>Q:What type of modules does your project use? ...
>	A:JavaScript modules (import/export)
>
>Q:Which framework does your project use? ...
>	A:React
>
>Q:Does your project use TypeScript? » No / Yes
>	A:Yes
>
>Q:Where does your code run? ...
>	A:Browser
>
>Q:How would you like to define a style for your project? ...
>	 🔥A:Answer questions about your style
>
>Q:What format do you want your config file to be in? ...
>	JavaScript
>
>后面按照提示选就行了 。最后将.eslintrc.js重新命名为.eslintrc.cjs  			[.js]=>[.cjs]

添加一个eslint忽略校验的文件,`.eslintignore`

```tex
# 忽略文件或文件夹
dist/
build/
.husky/
config/
```

#### 2、prettier

1、安装

```
yarn add prettier -D
```

2、项目根目录添加 .prettierrc 文件

```json
{
  "printWidth": 80,
  "tabWidth": 2,
  "useTabs": false,
  "semi": false,
  "singleQuote": true,
  "trailingComma": "all",
  "bracketSpacing": true,
  "arrowParens": "avoid"
}

```

配置描述

```
printWidth: 80, // 每行代码长度（默认80）
tabWidth: 2, // 每个tab相当于多少个空格（默认2）
useTabs: false, // 是否使用tab进行缩进（默认false）
semi: false, // 声明结尾使用分号(默认true)
singleQuote: true, // 使用单引号（默认false）
trailingComma: 'all', // 多行使用拖尾逗号（默认none）
bracketSpacing: true, // 对象字面量的大括号间使用空格（默认true）
arrowParens: 'avoid', // 只有一个参数的箭头函数的参数是否带圆括号（默认avoid）
jsxBracketSameLine: false, // 多行JSX中的>放置在最后一行的结尾，而不是另起一行（默认false）
```

添加一个eslint忽略校验的文件,`.prettierignore`

```tex
# .prettierrc忽略校验
/public/**
/.husky/**
/node_modules/**
/dist/**
```

#### 3、eslint prettier 冲突解决

```
// 安装依赖
yarn add eslint-config-prettier eslint-plugin-prettier -D
```

修改 `.eslintrc.cjs`

```js
module.exports = {
  // .....
  extends: [
 	// .....
    'plugin:prettier/recommended', // 加上这一行，解决eslint prettier 冲突问题
  ],
  // .....
}
```

#### 4、.eslintrc.cjs文件配置如下

```js
module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:prettier/recommended', // 加上这一行，解决eslint prettier 冲突问题
  ],
  overrides: [
    {
      files: ['.eslintrc.{js,cjs}'],
      parserOptions: {
        sourceType: 'script',
      },
    },
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'react'],

  globals: {
    defineAppConfig: true, //解决报错 no-undef
    definePageConfig: true, //解决报错 no-undef
  },
  /*
   * "off" 或 0    ==>  关闭规则
   * "warn" 或 1   ==>  打开的规则作为警告（不影响代码执行）
   * "error" 或 2  ==>  规则作为一个错误（代码不能执行，界面报错）
   */
  rules: {
    /** @js */
    quotes: [2, 'single'], // 强制使用一致的单引号
    semi: [2, 'never'], // 强制是否使用分号
    'no-undef': 'error', // 不能有未定义的变量
    'no-var': 'error', // 要求使用 let 或 const 而不是 var
    'no-debugger': 'off', // 是否允许使用debugger
    'no-console': 'off', //  是否允许使用console
    'import/no-commonjs': 'off', // 关闭

    // ts 详细规则：https://typescript-eslint.io/rules/
    /** @typescript */
    '@typescript-eslint/no-explicit-any': 'off', //可以使用any
    '@typescript-eslint/no-var-requires': 'off', //可以使用require
  },
}
```

#### 6、package.json中添加修复命令

修改package.json、在scripts中添加如下

```
"lint": "eslint . --ext .js,.ts,.jsx,.tsx",
"lint:fix": "eslint --fix . --ext .js,.ts,.jsx,.tsx",
// "lint": "eslint --fix --ext .js,.ts,.jsx,.tsx src"  // src 代表修复src下面 .从根目录开始
"format": "prettier --write ."
// "format": "prettier --write \"./**/*.{html,vue,ts,tsx,js,jsx,json}\"",
```

执行`yarn lint` 可以检测错误，是否符合配置规范
执行`yarn lint:fix` 可以检测错误并修复
执行`yarn format` 会进行代码检查及代码修复

### 3.lint-staged+husky配置

#### 1、lint-staged

`lint-staged` 是一个前端文件过滤工具，它仅过滤 `Git` 代码暂存区文件。当 `git commit` 时，`pre-commit` 钩子会启动，执行 `lint-staged` 命令。

```bash
yarn add lint-staged -D
```

#### 2、husky

每次手动去运行命令检查太麻烦了，而且也很考验小伙伴的自觉性。

husky 是一个 Git 钩子（Git hooks）工具，它可以让你在 Git 事件发生时执行脚本，进行代码格式化、测试等操作。

常见的钩子

- `pre-commit`：在执行 Git `commit` 命令之前触发，用于在提交代码前进行代码检查、格式化、测试等操作。
- `commit-msg`：在提交消息（commit message）被创建后，但提交操作尚未完成之前触发，用于校验提交消息的格式和内容。
- `pre-push`：在执行 Git `push` 命令之前触发，用于在推送代码前进行额外检查、测试等操作。

具体的使用步骤如下：

1. 安装 husky

```bash
yarn add husky -D
```

2. 初始化 **husky**, 会在根目录创建 **.husky** 文件夹

```bash
npm set-script prepare "husky install"
yarn prepare 			# 初始化husky,将 git hooks 钩子交由,husky执行
```

3. **pre-commit** 执行 **yarn lint-staged --allow-empty** 指令

```bash
npx husky add .husky/pre-commit "yarn lint-staged --allow-empty"
```

4. 在**package.json**中添加

```bash
"lint-staged": {
    "*.{js,jsx,ts,tsx}": [
      "prettier --write",
      "eslint --fix"
    ],
    "*.{css,scss}": [
      "prettier --write"
    ]
},
```

某一次提交想要禁用 `husky`，可以添加参数`--no-verify`

```bash
git commit --no-verify -m "xxx"
```

### 4.配置git代码提交规范

#### 1、Commitizen  

Commitizen 是一个用于规范化提交信息的工具，它能够帮助项目团队创建一致、易读的 Git 提交消息。通过使用 Commitizen，你可以确保提交信息按照预定义的规范格式化，方便后续查看和管理项目历史记录。

使用步骤：

1. 运行以下命令，安装 Commitizen 和 Commitizen 适配器，比如 `cz-conventional-changelog`：

```bash
yarn add commitizen cz-conventional-changelog -D
```

2. 安装完成后，在 package.json 中添加一个 config.commitizen 的字段，并设置它的值为 cz-conventional-changelog。

```json
"config": {
    "commitizen": {
    "path": "cz-conventional-changelog"
    }
}
```

3. 在 `package.json` 中的 `scripts` 字段中添加一个 `commit` 的命令。 示例如下：

```json
npm set-script commit "git-cz"
```

`git add .`后在执行 `yarn commit` 就可以进行交互式提交了。

#### 2、commitlint

Commitizen是用来创建规范化提交的，如果项目成员没有使用 `npm run commit` 来提交，而是直接使用 git commit 的话还是有可能生成不规范提交的，所以还需要对最终的提交格式做一下校验，接下来添加提交格式校验，

1. 安装：

```bash
yarn add commitlint @commitlint/config-conventional -D
```

2. 添加 commit-msg 钩子

```bash
npx husky add .husky/commit-msg 'npx --no-install commitlint --edit "$1"'
```

3. 项目根目录添加`commitlint.config.cjs`文件

```javascript
/*
 * @Description: commit-msg提交信息格式规范
 *
 * commit-msg格式: <type>(scope?): <subject>
 *   - type: 用于表明我们这次提交的改动类型，是新增了功能？还是修改了测试代码？又或者是更新了文档？
 *       - feat, // 新增功能、页面
 *       - fix, // 修补bug
 *       - docs, // 修改文档、注释
 *       - style, // 格式：不影响代码运行的变动、空格、格式化等等
 *       - ui, // ui修改：布局、css样式等等
 *       - hotfix, // 修复线上紧急bug
 *       - build, // 改变构建流程，新增依赖库、工具等（例如:修改webpack）
 *       - refactor, // 代码重构，未新增任何功能和修复任何bug
 *       - revert, // 回滚到上一个版本
 *       - perf, // 优化：提升性能、用户体验等
 *       - ci, // 对CI/CD配置文件和脚本的更改
 *       - chore, // 其他不修改src或测试文件的更改
 *       - test, // 测试用例：包括单元测试、集成测试
 *       - update // 更新：普通更新
 *   - scope：一个可选的修改范围。用于标识此次提交主要涉及到代码中哪个模块。
 *   - Subject：一句话描述此次提交的主要内容，做到言简意赅
 */
module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'body-leading-blank': [2, 'always'], // body上面有换行
    'footer-leading-blank': [1, 'always'], // footer上面有换行
    'header-max-length': [2, 'always', 108], // header上最大108字符
    'type-case': [0],
    'type-empty': [0],
    'scope-empty': [0],
    'scope-case': [0],
    'subject-full-stop': [0, 'never'],
    'subject-case': [0, 'never'],
    'type-enum': [
      2,
      'always',
      [
        'feat', // 新增功能、页面
        'fix', // 修补bug
        'docs', // 修改文档、注释
        'style', // 格式：不影响代码运行的变动、空格、格式化等等
        'ui', // ui修改：布局、css样式等等
        'hotfix', // 修复线上紧急bug
        'build', // 改变构建流程，新增依赖库、工具等（例如:修改webpack）
        'refactor', // 代码重构，未新增任何功能和修复任何bug
        'revert', // 回滚到上一个版本
        'perf', // 优化：提升性能、用户体验等
        'ci', // 对CI/CD配置文件和脚本的更改
        'chore', // 其他不修改src或测试文件的更改
        'test', // 测试用例：包括单元测试、集成测试
        'update', // 更新：普通更新
      ],
    ],
  },
}
```

#### 3、commitlint自定义提交规范

1. 安装依赖

```bash
yarn add commitlint-config-cz  cz-customizable -D
```

2. 变更 **commitlint.config.cjs** 这里采用自己定义的规范,将会覆盖上面那个

```js
/*
 * @Description: commit-msg提交信息格式规范
 *
 * commit-msg格式: <type>(scope?): <subject>
 *   - type: 用于表明我们这次提交的改动类型，是新增了功能？还是修改了测试代码？又或者是更新了文档？
 *       - feat, // 新增功能、页面
 *       - fix, // 修补bug
 *       - docs, // 修改文档、注释
 *       - style, // 格式：不影响代码运行的变动、空格、格式化等等
 *       - ui, // ui修改：布局、css样式等等
 *       - hotfix, // 修复线上紧急bug
 *       - build, // 改变构建流程，新增依赖库、工具等（例如:修改webpack）
 *       - refactor, // 代码重构，未新增任何功能和修复任何bug
 *       - revert, // 回滚到上一个版本
 *       - perf, // 优化：提升性能、用户体验等
 *       - ci, // 对CI/CD配置文件和脚本的更改
 *       - chore, // 其他不修改src或测试文件的更改
 *       - test, // 测试用例：包括单元测试、集成测试
 *       - update // 更新：普通更新
 *   - scope：一个可选的修改范围。用于标识此次提交主要涉及到代码中哪个模块。
 *   - Subject：一句话描述此次提交的主要内容，做到言简意赅
 */
module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'body-leading-blank': [2, 'always'], // body上面有换行
    'footer-leading-blank': [1, 'always'], // footer上面有换行
    'header-max-length': [2, 'always', 108], // header上最大108字符
    'type-case': [0],
    'type-empty': [0],
    'scope-empty': [0],
    'scope-case': [0],
    'subject-full-stop': [0, 'never'],
    'subject-case': [0, 'never'],
    'type-enum': [
      2,
      'always',
      [
        'feat', // 新增功能、页面
        'fix', // 修补bug
        'docs', // 修改文档、注释
        'style', // 格式：不影响代码运行的变动、空格、格式化等等
        'ui', // ui修改：布局、css样式等等
        'hotfix', // 修复线上紧急bug
        'build', // 改变构建流程，新增依赖库、工具等（例如:修改webpack）
        'refactor', // 代码重构，未新增任何功能和修复任何bug
        'revert', // 回滚到上一个版本
        'perf', // 优化：提升性能、用户体验等
        'ci', // 对CI/CD配置文件和脚本的更改
        'chore', // 其他不修改src或测试文件的更改
        'test', // 测试用例：包括单元测试、集成测试
        'update', // 更新：普通更新
      ],
    ],
  },
}
```

3. 根目录增加 .cz-config.cjs
   关于`commitlint-config-cz`更高级的用法可以查看 👉[commitlint-config-cz](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fwhizark%2Fcommitlint-config-cz)

```js
module.exports = {
  types: [
    { value: 'feat', name: '新增:新增功能、页面' },
    { value: 'fix', name: 'bug:修复某个bug' },
    { value: 'docs', name: '文档:修改增加文档、注释' },
    { value: 'style', name: '格式:不影响代码运行的变动、空格、格式化等等' },
    { value: 'ui', name: 'ui修改:布局、css样式等等' },
    { value: 'hotfix', name: 'bug:修复线上紧急bug' },
    { value: 'build', name: 'build: 变更项目构建或外部依赖' },
    { value: 'refactor', name: '重构:代码重构,未新增任何功能和修复任何bug' },
    { value: 'revert', name: '回滚:代码回退到某个版本节点' },
    { value: 'perf', name: '优化:提升性能、用户体验等' },
    { value: 'ci', name: '自动化构建:对CI/CD配置文件和脚本的更改' },
    { value: 'chore', name: 'chore: 变更构建流程或辅助工具' },
    { value: 'test', name: '测试:包括单元测试、集成测试' },
    { value: 'update', name: '更新:普通更新' },
  ],
  scopes: [],
  allowTicketNumber: false,
  isTicketNumberRequired: false,
  ticketNumberPrefix: "TICKET-",
  ticketNumberRegExp: "\\d{1,5}",
  // it needs to match the value for field type. Eg.: 'fix'
  /*
  scopeOverrides: {
    fix: [
      {name: 'merge'},
      {name: 'style'},
      {name: 'e2eTest'},
      {name: 'unitTest'}
    ]
  },
  */
  // override the messages, defaults are as follows
  messages: {
    type: "选择一种你的提交类型:",
    scope: "选择一个scope (可选):",
    // used if allowCustomScopes is true
    customScope: "表示此更改的范围:",
    subject: "简短说明(最多40个字):\n",
    body: '长说明,使用"|"换行(可选):\n',
    breaking: "非兼容性说明 (可选):\n",
    footer: "关联关闭的issue,例如:#12, #34(可选):\n",
    confirmCommit: "确定提交?",
  },
  allowCustomScopes: true,
  // 设置选择了那些type,才询问 breaking message
  allowBreakingChanges: ['feat', 'fix', 'ui', 'hotfix', 'update', 'perf'],
  // 想跳过的问题
  skipQuestions: ["scope", "body", "breaking"],
  // limit subject length
  subjectLimit: 100,
};
```

4. package.json 中,将原来commit配置,变更为自定义配置

```json
  "config": {
    "commitizen": {
      "path": "cz-customizable"
    },
    "cz-customizable": {
      "config": ".cz-config.cjs"
    }
  },
```

### 5、配置Stylelint

#### 1、安装依赖(只配置scss)

```
yarn add sass sass-loader stylelint postcss postcss-scss postcss-html stylelint-config-prettier stylelint-config-recess-order stylelint-config-recommended-scss stylelint-config-standard stylelint-config-standard-vue stylelint-scss stylelint-order stylelint-config-standard-scss -D
```

#### 2、新建.stylelintrc.cjs文件

```js
module.exports = {
  extends: [
    'stylelint-config-standard', // 配置stylelint拓展插件
    'stylelint-config-html/vue', // 配置 vue 中 template 样式格式化
    'stylelint-config-standard-scss', // 配置stylelint scss插件
    'stylelint-config-recommended-vue/scss', // 配置 vue 中 scss 样式格式化
    'stylelint-config-recess-order', // 配置stylelint css属性书写顺序插件,
    'stylelint-config-prettier', // 配置stylelint和prettier兼容
  ],
  overrides: [
    {
      files: ['**/*.(scss|css|vue|html)'],
      customSyntax: 'postcss-scss',
    },
    // 扫描.vue/html文件中的<style>标签内的样式
    {
      files: ['**/*.(html|vue)'],
      customSyntax: 'postcss-html',
    },
  ],
  // 覆盖配置（优先级大于config-standard）
  rules: {
    'no-empty-source': null, // 关闭禁止空源码
    'block-no-empty': null,// 禁止空块
    'selector-class-pattern': null,// 关闭强制选择器类名的格式
    'selector-id-pattern': null,
    'at-rule-no-unknown': null,// 不验证@未知的名字，为了兼容scss的函数
    'value-keyword-case': null, // 在 css 中使用 v-bind，不报错
    'no-descending-specificity': null, // 禁止在具有较高优先级的选择器后出现被其覆盖的较低优先级的选择器
    'function-url-quotes': 'always', // 要求或禁止 URL 的引号 "always(必须加上引号)"|"never(没有引号)"
    'value-no-vendor-prefix': null, // 关闭 属性值前缀 --webkit-box
    'property-no-vendor-prefix': null, // 关闭 属性前缀 -webkit-mask
    'selector-pseudo-class-no-unknown': [
      // 不允许未知的选择器
      true,
      {
        ignorePseudoClasses: ['global', 'v-deep', 'deep'], // 忽略属性，修改element默认样式的时候能使用到
      },
    ],
  },
}
```

**注：** 如果想自定义规则可以在`rules`里编写，具体规则见：**[规则列表](https://stylelint.io/user-guide/rules/list)**

#### 3、新建.stylelintignore文件

```tex
# .stylelintrc忽略校验
/node_modules/*
/dist/*
/public/*
/__tests__/*
/.husky/*
/.swc/*
```

#### 4、检测

```css
.app {
  position: relative;
  width: 100%;
  background-color: rgba(0,0,0,.1);
}
```

格式化后
`npx stylelint "**/*.{css,scss}"`

```css
.app {
  position: relative;
  width: 100%;
  background-color: rgb(0 0 0 / 10%);
}
```

#### 5、package.json中添加修复命令

修改package.json、在scripts中添加如下

```
"lint:style": "stylelint src/**/*.{css,scss,vue} --fix"
```

执行`yarn lint:style` 会进行代码检查及代码修复

**修改 lint-staged**

```js
"lint-staged": {
  "*.{js,jsx,ts,tsx}": [
    "yarn format",
    "yarn lint:fix"
  ],
  "*.{css,scss}": [
    "yarn format",
    "yarn lint:style"
  ]
},
```

package.json中scripts

```tsx
"format": "prettier --write \"./**/*.{ts,tsx,js,jsx,json}\"",
"lint:fix": "eslint --fix . --ext .js,.ts,.jsx,.tsx",
"lint:style": "stylelint src/**/*.{css,scss} --fix"
```

### 四、reduxjs/toolkit使用

#### 安装依赖

```bash
yarn add @reduxjs/toolkit react-redux @types/react-redux // redux及工具包
yarn add @types/redux-logger redux-logger //日志包
yarn add redux-persist //数据缓存
```

**目录结构**

```
|-- store
|   |-- index.ts
|   `-- reducers
|       |-- index.ts
|       `-- testSlice.ts
```

#### 1、创建testSlice

```tsx
// /store/reducers/testSlice.ts
import {
  createAsyncThunk,
  createSlice,
  Draft,
  PayloadAction,
} from '@reduxjs/toolkit'

// 数据接口列席
interface ICountState {
  count: number
  movieList: any[]
  total: number
}

//电影API
const MovieAPI = {
  /**
   * 请求电影列表
   */
  getMovieListApi: () => {
    // https://pcw-api.iqiyi.com/search/recommend/list?channel_id=1&data_type=1&mode=24&page_id=1&ret_num=48
    return new Promise(resolve => {
      const data = {
        code: 'A00000',
        data: {
          list: [
            {
              playUrl: 'http://www.iqiyi.com/v_1s73dt9ar18.html',
              payMarkUrl:
                'http://pic0.iqiyipic.com/common/20171106/ac/1b/vip_100000_v_601.png',
              imageUrl:
                'http://pic5.iqiyipic.com/image/20230920/b3/d6/v_170545194_m_601_m12.jpg',
              title: '绝地追击',
            },
          ],
        },
      }
      setTimeout(() => {
        resolve(data)
      }, 1000)
    })
  },
}

// thunk函数允许执行异步逻辑, 通常用于发出异步请求。
// createAsyncThunk 创建一个异步action，方法触发的时候会有三种状态：pending（进行中）、fulfilled（成功）、rejected（失败）
// 导出异步action方法
export const getMovieData = createAsyncThunk(
  'movie/getMovie',
  async (params: { pageSize: number }) => {
    console.log('传递参数')
    console.log(params)
    const res = await MovieAPI.getMovieListApi()
    return res
  },
)

// 初始值
const initialState: ICountState = {
  count: 0,
  movieList: [],
  total: 0,
}

/**
 * 1.创建一个slice reducer
 */
const CountSlice = createSlice({
  name: 'count-slice',
  initialState,
  reducers: {
    /**
     *加1操作
     */
    increment: (state: Draft<ICountState>) => {
      state.count = state.count + 1
    },
    /**
     *数字加 根据参数
     */
    incrementByAmount: (
      state: Draft<ICountState>,
      action: PayloadAction<{
        num: number
      }>,
    ) => {
      state.count = state.count + action.payload.num
    },
  },

  // extraReducers 字段让 slice 处理在别处定义的 actions,包括由 createAsyncThunk或其它slice生成的action。
  extraReducers(builder) {
    // 处理createAsyncThunk 生成的 actions
    builder
      .addCase(getMovieData.pending, (state, action) => {
        console.log('🚀 ~ 进行中！')
        console.log(state, action)
      })
      .addCase(getMovieData.fulfilled, (state, { payload }: any) => {
        console.log('🚀 ~ fulfilled', payload)
        state.movieList = payload.data.list
        state.total = payload.data.list.length
      })
      .addCase(getMovieData.rejected, (state, action) => {
        console.log('🚀 ~ rejected')
        console.log(state, action)
      })
  },
})

// 导出同步action方法
export const { incrementByAmount, increment } = CountSlice.actions
// 默认导出
export default CountSlice.reducer
```

#### 2、合并所有slice

```tsx
// store/reducers/index.ts

/**
 * 该文件用于合并所有slice
 */

// 多个Slice的引入；
import testSlice from './testSlice'

// test：表示testSlice的模块名称  store.test.xxx 就可以取到testSlice管理的数据
export default {
  test: testSlice,
}
```

#### 3、配置store文件整合slice

```tsx
import { configureStore, combineReducers } from '@reduxjs/toolkit'
import logger from 'redux-logger'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

// 多个Slice的引入；
import modules from './reducers'

// 合并多个Slice
const reducer = combineReducers(modules)
// configureStore创建一个redux数据
const store = configureStore({
  reducer: reducer,
  // 配置中间键
  middleware: getDefaultMiddleware => {
    if (process.env.NODE_ENV === 'production') {
      //不打印logger
      return getDefaultMiddleware({ serializableCheck: false }).concat()
    }
    return getDefaultMiddleware({ serializableCheck: false }).concat(logger)
  },
  devTools: process.env.NODE_ENV !== 'production',
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

// 二次封装：对useDispatch，useSelector进行封装，解决每次使用都要导入RootState,AppDispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export default store
```

#### 4、将store注入到项目中

`src/app.tsx`

```tsx
import { PropsWithChildren } from 'react'
import { useLaunch } from '@tarojs/taro'
//1、引入store
import store from '@/store'
//2、引入注入者
import { Provider } from 'react-redux'
// 引入taro-ui样式
import 'taro-ui/dist/style/index.scss' 
// 全局less
import './app.less'

function App({ children }: PropsWithChildren<any>) {
  useLaunch(() => {
    console.log('App launched.')
    console.log(process.env.TARO_APP_API)
    console.log(process.env.NODE_ENV)
  })

  //3、拿到提供者(Provider) 让他来把所有的数据注入到每个组件中,children 是将要会渲染的页面
  return <Provider store={store}>{children}</Provider>
}

export default App
```

#### 5、测试

`src/pages/index/index.tsx`

```tsx
import { View, Text } from '@tarojs/components'
import { useLoad } from '@tarojs/taro'
import { AtButton } from 'taro-ui'
import { useAppSelector, useAppDispatch } from '@/store'
import { increment, incrementByAmount, getMovieData } from '@/store/reducers/testSlice'
import './index.scss'

export default function Index() {
  const testStore = useAppSelector(store => store.test)
  const dispatch = useAppDispatch()

  // 加  同步测试
  const onIncrementByAmount = (num: number) => {
    dispatch(incrementByAmount({ num }))
  }
  // 加1 同步
  const onIncrement = () => {
    dispatch(increment())
  }

  // 查询电影列表 异步action测试
  const onQueryMovieList = () => {
    dispatch(getMovieData({ pageSize: 9 }))
  }

  useLoad(() => {
    console.log('Page loaded.')
  })

  return (
    <View className="index">
      <Text>Store测试-----当前count:{testStore.count}</Text>
      <AtButton type="primary" onClick={onIncrement}>
        +1
      </AtButton>
      <AtButton onClick={() => onIncrementByAmount(2)}>count+5</AtButton>
      <AtButton onClick={() => onIncrementByAmount(-1)}>count-1</AtButton>
      <Text>电影列表----共有{testStore.total}个</Text>
      <AtButton onClick={onQueryMovieList}>获取电影列表</AtButton>
      <View>
        {testStore.movieList.map((movie, index) => {
          return <Text key={index}>{movie.title}</Text>
        })}
      </View>
    </View>
  )
}
```

### 五、封装request

`http_status.ts`

```tsx
export const HTTP_STATUS = {
  SUCCESS: 200,
  AUTHENTICATE: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  SERVER_ERROR: 500,
  BAD_GATEWAY: 502,
}
```

`request.ts`

```tsx
import Taro from '@tarojs/taro'
import { HTTP_STATUS } from './http_status'

type MethodType = 'GET' | 'POST' | 'PUT' | 'DELETE'
type ContentType =
  | 'application/json;charset=utf-8'
  | 'application/x-www-form-urlencoded;charset=UTF-8'
  | 'multipart/form-data'

interface IParams {
  /**
   * 请求接口
   */
  url: string
  /**
   * 传递数据
   */
  data?: object
  /**
   * 数据类型
   */
  contentType?: ContentType
  /**
   * 是否显示loading
   */
  showLoading?: boolean
}

const baseUrlPrefix = process.env.TARO_APP_API
const DEFAULT_CONTENT_TYPE = 'application/json;charset=utf-8'

const request = <T = any>(params: IParams, method: MethodType) => {
  const { url, data, contentType, showLoading } = params
  return new Promise<T>((resolve, reject) => {
    // 请求参数
    const options = { url, data: { ...data }, method, header: {} }

    // 1. 非 http 开头需拼接地址
    if (!options.url.startsWith('http')) {
      options.url = `${baseUrlPrefix}${params.url}`
    }
    // 2. 请求超时, 默认 60s
    options['timeout'] = 5000
    // 3. 添加小程序端请求头标识
    options.header = { 'content-type': contentType || DEFAULT_CONTENT_TYPE }
    // 4. 添加 token 请求头标识
    const token = Taro.getStorageSync('Authorization')
    if (token) {
      options.header['Authorization'] = token
    }

    showLoading &&
      Taro.showLoading({
        title: '正在加载',
      })

    Taro.request({
      url: options.url,
      data: options.data,
      method: options.method,
      header: options.header,
      success: res => {
        // 只要请求成功，不管返回什么状态码，都走这个回调

        console.log('从接口获取到的数据', res)
        showLoading && Taro.hideLoading()

        if (res.statusCode === HTTP_STATUS.SUCCESS) {
          return resolve(res.data)
        } else if (res.statusCode === HTTP_STATUS.NOT_FOUND) {
          return reject({ desc: '请求资源不存在' })
        } else if (res.statusCode === HTTP_STATUS.BAD_GATEWAY) {
          return reject({ desc: '服务端出现了问题' })
        } else if (res.statusCode === HTTP_STATUS.FORBIDDEN) {
          // 403禁止访问错误是由于网站内容资源的不可用而导致的
          Taro.setStorageSync('Authorization', '')
          // todo 根据自身业务修改
          Taro.navigateTo({ url: '/pages/login/index' })
          return reject({ desc: '没有权限访问' })
        } else if (res.statusCode === HTTP_STATUS.AUTHENTICATE) {
          Taro.setStorageSync('Authorization', '')
          Taro.navigateTo({ url: '/pages/login/index' })
          return reject({ desc: '需要鉴权' })
        } else if (res.statusCode === HTTP_STATUS.SERVER_ERROR) {
          return reject({ desc: '服务器错误' })
        } else {
          // 其他错误 -> 根据后端错误信息轻提示
          reject('数据请求错误,请检查')
        }
      },
      // 响应失败
      fail(err) {
        Taro.showToast({
          icon: 'none',
          title: '网络错误，换个网络试试',
        })
        reject(err)
      },
    })
  })
}

export default request
```

**测试**

```tsx
import request from '@/request'

const urlObj = {
  movieUrl: 'https://pcw-api.iqiyi.com/search/recommend/list?channel_id=1&data_type=1&mode=24&page_id=1&ret_num=4',
}
/**
 * 查询电影列表
 */
export const getMovieList = () => request({ url: urlObj.movieUrl }, 'GET')

// 导入到页面即可ok
```

