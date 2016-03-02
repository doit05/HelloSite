# Hello Site

是一一个学习网站。

## `components` 所需的工具

## `bee` 针对不同网站定制的小蜜蜂

## `test` 测试工具

## `Task` 任务

任务是指从蜂后获得的执行信息，在执行完毕后，将相应的结果放进 harvest 中并提交回给蜂后。

##
* 处理相同路由不同模板
* 支持直接调用运行，方便开发调试
* 采用 `mocha` 实现单元测试

## 选择 Osmosis
* API 漂亮，调用优雅
* 支持登录

```
{
    id: '',
    cluster: {
        url: ''
    },
    flower: {
        url: ''
    },
    harvest: {
        tag: '',
        honey: {},
        flower: []
    }
}
```


#### 启动

```bash

node startup.js
||
node startup.js -b bid -u http://xxx.xxx.xxx

```

第二道启动命令中，bid为业务ID，在此处与bee下的一级子目录名等价。例如对于俄罗斯视频的站点adme.ru，开发调试时可以使用下列命令抓取其内容

```bash

node startup.js -b 'v-ru' -u 'http://adme.ru' # 俄罗斯视频的bid即为v-ru

```

##### 断点调试

推荐使用[node-inspector](https://github.com/node-inspector/node-inspector)对爬虫规则进行断点调试。先安装node-inspector

```bash

npm install -g node-inspector

```

之后对于希望进行调试的爬虫规则，仍然是需要传递-b和-u选项及相应的参数，但要使用node-debug启动入口.js文件。以http://www.kapanlagi.com/为例，启动代码如下

```bash

node-debug startup.js -b 'i-id' -u 'http://www.kapanlagi.com/'

```

运行后会调起Chrome浏览器的开发者工具，接下来就可以像调试Web页面上的Javascript代码一般对爬虫规则进行调试了

#### 子模块协作

与各个业务相关的爬虫抓取规则将独立为多个代码仓库，并通过Git的子模块功能引入到bee-worker中，方法如下

```bash

git submodule init
git submodule update

```

执行上述两条命令，子模块代码就会被拉取到bee/i-ru/和bee/v-ru/这两个目录中。今后，对于俄罗斯视频的爬虫需求，所编写的爬虫规则脚本均位于bee/v-ru/的子目录下，而对于俄罗斯咨询的爬虫需求，编写的脚本均位于bee/i-ru/的子目录下

业务需求的抓取规则的开发流程如下：

1. 开发同学拉取bee-worker宿主项目代码，保持爬虫核心功能为最新
1. 开发同学拉取子模块的最新代码到本地
1. 开发同学在本地修改业务所对应的子模块中、与目标网站对应的爬虫规则.js文件
1. 开发、测试完成后，提交到子模块对应的代码仓库
1. 如果已经可以发布使用，那么在相应的子模块中打tag，并推送到GitLab上。之后的一系列打包和发布工作会由CI完成

当需要发布时，子模块的tag的规范为

    *sub-v*.*.*

即tag中需要含有sub-v这样的标记，用于CI的打包脚本进行识别。例如对于俄罗斯资讯而言，可以采用形如i-ru-sub-v0.0.1这样的tag。

#### ci 构建发布

```bash

git tag pk-xx.xx.xx
git push origin --tags

```
