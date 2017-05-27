/*global fis*/
/*
安装：
npm i fis3 -g
npm i fis3-hook-commonjs -g
npm i fis3-postpackager-loader -g
npm i fis3-packager-deps-pack -g
 */


// 将 isMod:true 的 js作为模块化处理
fis.hook('commonjs');

// 匹配规则： http://fis.baidu.com/fis3/docs/api/config-glob.html
// 所有 js 都是模块化的
fis.match('*.js',{
    isMod:true
});
// 打包规则
fis.match('::package', {
    // 异步加载方案1
    // css打进js，现在的配置就可以满足
    
    // 异步加载方案2
    // 需要参考loader源码 输出css map
    // 修改mod.js：load xxx.js时 同时load xxx.css
    packager: fis.plugin('deps-pack', {
        'pkg/a.css': [
            'widget/a.js:deps',
            'widget/a.js'
        ],
        'pkg/a.js': [
            'widget/a.js:deps',
            'widget/a.js'
        ],
    }),
    // 分析 __RESOURCE_MAP__ 结构，来解决资源加载问题
    postpackager: fis.plugin('loader', {
        allInOne:true,// 每个页面打一个包
        resourceType: 'mod',
        useInlineMap: true // 资源映射表内嵌
    })
});

// 像jquery这样的库不是模块化的
fis.match('/static/**.js',{
    isMod:false
});

fis.match('*',{
    domain:'/demos/fis3-sap/output'
});

/*
fis.match('*.{js,css}',{
    // 文件名会加md5戳
    useHash:true
});

// 所有js压缩，fis-optimizer-uglify-js 插件进行压缩，已内置
fis.match('*.js', {
  optimizer: fis.plugin('uglify-js')
});

// 所有css 压缩，fis-optimizer-clean-css 插件进行压缩，已内置
fis.match('*.css', {
  optimizer: fis.plugin('clean-css')
});
*/





// fis.match(/(header|footer)\.js/, {
//     packTo:'pkg/common.js'
// })
// fis.match('footer.js', {
//     packTo:'pkg/common.js'
// })


// fis.match('/comp/**/*.js', {
//     isMod: true, // 设置 comp 下都是一些组件，组件建议都是匿名方式 define
//     release: '/static/$0'
// });


// // fis3 release prod 产品发布，进行合并
// fis.media('prod')
//     .match('*.js', {
//         packTo: '/static/aio.js'
//     });