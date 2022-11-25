const { config } = require('vuepress-theme-hope')

module.exports = config({
  // 导航栏标题
  title: "BeetlSQL 文档",
  locales: {
    "/": {
      // 设置需要的语言
      lang: "zh-CN",
    },
  },
  head: [
    ["script",{},`var _hmt = _hmt || [];
    (function() {
      var hm = document.createElement("script");
      hm.src = "https://hm.baidu.com/hm.js?42c403c5bf558fded9a7dbdd2b5a6c75";
      var s = document.getElementsByTagName("script")[0]; 
      s.parentNode.insertBefore(hm, s);
    })();`],
    ["link", { rel: "stylesheet", href: "https://fonts.font.im/css?family=Inter" }],
    ["script", {}, `
    var $buoop = {required:{e:-4,f:-3,o:0,s:0,c:-3},insecure:true,api:2021.09 }; 
    function $buo_f(){ 
     var e = document.createElement("script"); 
     e.src = "//browser-update.org/update.min.js"; 
     document.body.appendChild(e);
    };
    try {document.addEventListener("DOMContentLoaded", $buo_f,false)}
    catch(e){window.attachEvent("onload", $buo_f)}
    `],
  ],

  themeConfig: {
    // 非博客
    blog: false,
    hostname: 'https://beetlsql-doc.vercel.app',

    // 导航栏 logo
    logo: "/bee-logo.png",
    searchPlaceholder: '搜索',

    // 项目仓库地址
    repo: 'https://github.com/zoze0/beetlsql-doc',
    // 仓库标签文字
    repoLabel: 'GitHub',
    docsDir: 'docs',

    darkmode: 'auto-switch',
    themeColor: {
      yellow: "#ffc832",
      green: "#3eaf7c",
      pink: "#c74350"
    },
    pageInfo: [
      'reading-time',
      'word',
    ],
    git: {
      contributor: false,
    },
    footer: {
      content: "Made with <a target='_blank' href='https://github.com/vuepress-theme-hope/vuepress-theme-hope'>vuepress-theme-hope</a>",
      display: false,
      copyright: false,
    },
    nav: [
      { text: "简介", link: "/", icon: "home" },
      {
        text: "文档",
        icon: "note",
        link: "/start/about/",
      },
      {
        text: "Gitee",
        icon: "gitee2",
        link: "https://gitee.com/xiandafu/beetlsql",
      },
      {
        text: "更新日志",
        icon: "update",
        link: "/changelog",
      },
    ],
    sidebar: {
      '/': [
        {
          title: "起步",
          prefix: "start/",
          collapsable: false,
          children: [
            'about',
            'quick',
          ]
        },
        {
          title: "入门",
          collapsable: false,
          prefix: "usage/",
          children: ["", "basemapper", "lambdaQuery", "sqlAnnotation", "templateAnnotation", "springData", "markdownFile"],
        },
        {
          title: "进阶",
          collapsable: false,
          prefix: "advanced/",
          children: ["config", "annotation", "pageQuery", "ideaPlugin", "codeGen"],
        },
        {
          title: "使用示例",
          prefix: "examples/",
          children: [""],
        },
        "/online",
        "/FAQ",
        "/thanks"
      ],
    },
  }
});
