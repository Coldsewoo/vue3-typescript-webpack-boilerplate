# Dependencies

- vue@^3.0.3
- vue-router@^4.0.0-rc.6
- vuex@^4.0.0-rc.2
- @vue/compiler-sfc@^3.0.3
- webpack@^5.9.0
- vue-loader@^16.1.0
- babel-loader@^8.0.0-beta.6

- **NOTE**: This template uses personalized [babel-preset-typescript-vue](https://github.com/Coldsewoo/babel-preset-typescript-vue.git) forked from **[HERE](babel-preset-typescript-vue)**


## Installation

Install packages with YARN by running: 
```bash
yarn install
```
In case you want to use NPM, run:
```bash
npm install
```
## Usage

#### Set HOST and PORT for dev server

```javascript
/**    config/index.js   */
module.exports = {
  dev: {
    ...
    // Various Dev Server settings
    host: HOST_ADDRESS, // can be overwritten by process.env.HOST
    port: PORT_NUMBER, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
   ...
}

```

#### Start Dev server
```bash
yarn run start
#or
npm run start
```

#### Build
```bash
yarn run build
#or
npm run build
```

## Todo
- Add example pages and logics
- Add unit test
- Update dependencies

## License
[MIT](https://choosealicense.com/licenses/mit/)