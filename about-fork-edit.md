## 关于
当前项目是基于 [Historical-ranking-data-visualization-based-on-d3.js](https://github.com/Jannchie/Historical-ranking-data-visualization-based-on-d3.js) 创建的一个分支, 对于原项目进行了部分改动

## 改动说明
1. 对csv文件进行了扩展, 扩展后的文件后缀为csvx(非标准的、自定义的文件格式)  
    csvx文件, 可以看作是: 支持写入配置、添加注释的csv文件  
    写入配置的方式:  
    ``` yaml
    ---
    max_number: 20
    ---
    ```
    添加注释方式:
    ``` yaml
    # 注释
    ```
    > 以上都是参照了yaml文件的写法, 所以可以在编辑器里将csvx格式的文件关联为yaml
2. 增加快捷键
    选定csvx文件后, 需要使用快捷键 Ctrl + F10 才能开始绘制(方便录屏)
## 查看项目
1. 本地查看当前项目步骤:  
``` js
    // 1. 克隆项目到本地
    git clone https://github.com/kscript/Historical-ranking-data-visualization-based-on-d3.js.git

    // 2. 打开项目目录
    cd Historical-ranking-data-visualization-based-on-d3.js
    
    // 3. 全局安装 http-server (已安装过, 忽略)
    // 使用npm安装
    npm i -g http-server
    // 使用yarn安装
    yarn add -g http-server

    // 4. 运行服务
    npm run serve

    // 服务器运行后, 根据生成的地址, 打开页面 (生成的地址需手动加/src/index.html)
    // http://127.0.0.1:8080/src/index.html
```

2. 在github上查看: 
点击进入 [Historical-ranking-data-visualization-based-on-d3.js](https://kscript.github.io/Historical-ranking-data-visualization-based-on-d3.js/src/index.html)  
  
打开页面后, 可以在弹出文件选择窗口时, 使用项目里的提供csvx文件查看效果: https://raw.githubusercontent.com/kscript/Historical-ranking-data-visualization-based-on-d3.js/master/src/csv/%E6%B2%BB%E6%84%88%E6%80%BB%E4%BA%BA%E6%95%B0.csvx (直接打开保存并选择保存的文件 或者 复制文件地址, 将其粘贴进左下方的 **文件名** 输入框, 然后选择右下方 **打开**)