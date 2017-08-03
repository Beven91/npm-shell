## npm-shell

### 一、简介篇

    通过nodejs执行npm相关命令的工具


### 二、安装篇

    npm install npm-shell
    
     
### 三、使用篇

```js

  const Npm = require('npm-shell').Npm;

  const npm = new Npm(projectRoot);

  //npm install
  npm.install();
  npm.install('react-native');

  //npm uninstall
  npm.unInstall('xxx')
    
  //npm start
  npm.start();

  //npm run command
  npm.run('build');
  npm.run('compile');

  //npm execute node_modules bin
  npm.exec('webpack',['--cofnig','./webpack.config.js'])
  //with env
  npm.exec('webpack',['--cofnig','./webpack.config.js'],{NODE_ENV:'production'})

  //node xxx.js
  npm.node('./test.js',['arg1','arg2'])
   //with env
  npm.node('./test.js',['arg1','arg2'],{NOdE_ENV:'production'});

  //npm xxx
  npm.command('install','react-native');
  npm.command('test');
  npm.command('link','xx')
  //with env
  npm.command('link','xx',{NODE_ENV:'xxx'})
  npm.command('link','xx','xx'....,{NODE_ENV:'xxx'})
  

```

### 四、开源许可
基于 [MIT License](http://zh.wikipedia.org/wiki/MIT_License) 开源，使用代码只需说明来源，或者引用 [license.txt](https://github.com/sofish/typo.css/blob/master/license.txt) 即可。