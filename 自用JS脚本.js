// Mihomo Party 覆写 / Clash Verge Rev 扩展脚本

function main (params) {
    if (!params.proxies) return params;
    overwriteRules (params);
    overwriteProxyGroups (params);
    overwriteDns (params);
    overwriteBasicOptions (params);
    overwriteFakeIpFilter (params);
    overwriteTunnel (params);
    overwriteNameserverPolicy (params);
    overwriteHosts (params);
    return params;
}

// 覆写规则
function overwriteRules (params) {
    const adNonipRules = [  
        //AD拦截无IP规则
        //自定义
        "RULE-SET,lanjie,AdBlock",
        "RULE-SET,ban_ad,AdBlock",
        "RULE-SET,ban_program_ad,应用净化",//修改
        "RULE-SET,easylist_adblock,AdBlock",//修改
        "RULE-SET,easylist_china,AdBlock",//修改
        "RULE-SET,easyprivacy,隐私防护",//修改

        //自带
        "RULE-SET,reject_non_ip,AdBlock",
        "RULE-SET,reject_domainset,AdBlock",
        "RULE-SET,reject_non_ip_no_drop,AdBlock",
        "RULE-SET,reject_non_ip_drop,隐私防护"

    ];

    const customRules = [
        // 在此添加自定义规则，优先级次于ad。例子：
        // "DOMAIN,baidu.com,DIRECT",
      ];

    const nonipRules = [
        //无IP规则填写
        //自定义

        "RULE-SET,pikpak_download,下载节点",
        "RULE-SET,pikpak,PIKPAK",
        "RULE-SET,jp,JP",
        "RULE-SET,jav,JAV",
        "RULE-SET,media,JAV",
        "RULE-SET,adobe,Adobe",
        "RULE-SET,zhi,全球直连",
        "RULE-SET,shouxuan,节点选择",
        "RULE-SET,blizzard,游戏平台",
        "RULE-SET,games,游戏平台",
        "RULE-SET,xbox,游戏平台",
        "RULE-SET,local_area_network,DIRECT",
        "RULE-SET,unban,DIRECT",
        "RULE-SET,google_cn,谷歌CN",
        "RULE-SET,google,谷歌",
        "RULE-SET,steam_cn,DIRECT",
        "RULE-SET,bing,微软服务",
        "RULE-SET,onedrive,微软服务",
        "RULE-SET,microsoft,微软服务",
        "RULE-SET,apple,苹果服务",
        "RULE-SET,telegram,电报消息",
        "RULE-SET,openai,OpenAi",
        "RULE-SET,netease_music,网易音乐",
        "RULE-SET,epic_games,游戏平台",
        "RULE-SET,origin,游戏平台",
        "RULE-SET,sony,游戏平台",
        "RULE-SET,steam,游戏平台",
        "RULE-SET,nintendo,游戏平台",
        "RULE-SET,youtube,油管视频",
        "RULE-SET,netflix,奈飞视频",
        "RULE-SET,bahamut,巴哈姆特",
        "RULE-SET,bilibili_hmt,哔哩哔哩",
        "RULE-SET,bilibili,哔哩哔哩",
        "RULE-SET,china_media,国内媒体",
        "RULE-SET,proxy_media,国外媒体",
        "RULE-SET,proxy_gfwlist,节点选择",
        "RULE-SET,china_domain,DIRECT",
        "RULE-SET,download,DIRECT",
        //自带
        "RULE-SET,apple_cdn,苹果服务",
        "RULE-SET,apple_cn_non_ip,苹果服务",
        "RULE-SET,apple_services,苹果服务",
        "RULE-SET,ai_non_ip,OpenAi",
        "RULE-SET,cdn_domainset,节点选择",
        "RULE-SET,cdn_non_ip,节点选择",
        "RULE-SET,download_non_ip,节点选择",
        "RULE-SET,download_domainset,节点选择",
        "RULE-SET,direct_non_ip,DIRECT",
        "RULE-SET,domestic_non_ip,DIRECT",
        "RULE-SET,global_non_ip,节点选择",
        "RULE-SET,lan_non_ip,DIRECT",
        "RULE-SET,microsoft_non_ip,微软服务",
        "RULE-SET,microsoft_cdn_non_ip,DIRECT",
        "RULE-SET,stream_non_ip,美国节点",
        "RULE-SET,telegram_non_ip,电报消息"

    ];

    const allNonipRules = [
        ...adNonipRules,
        ...customRules,
        ...nonipRules
    ];

    const ipRules = [
        //自定义非IP规则
        "RULE-SET,china_company_ip,DIRECT",
        //"RULE-SET,china_ip,节点选择",
        "RULE-SET,amazon,节点选择",
        "RULE-SET,google_cn_proxy_ip,节点选择",//修改
        //自带非IP规则
        "RULE-SET,reject_ip,REJECT",
        "RULE-SET,telegram_ip,电报消息",
        "RULE-SET,stream_ip,美国节点",
        "RULE-SET,lan_ip,DIRECT",
        "RULE-SET,domestic_ip,DIRECT",
        "RULE-SET,china_ip,DIRECT",
        "MATCH,漏网之鱼"
    ];

    const rules = [
        // 非ip类规则
        ...allNonipRules,
        // ip类规则
        ...ipRules
    ];

    const ruleProviders = {
        // 去广告
        lanjie:{
            type: "http",
            behavior: "classical",
            url: "https://raw.githubusercontent.com/Rooil/Surge-ACL/refs/heads/main/Surge/okk/lanjie.list",
            path: "./rules/lanjie.txt",
            interval: 86400,
            format: "text",
           proxy: "节点选择"
          },
        ban_ad:{
            type: "http",
            behavior: "domain",
            path: "./rules/ban_ad.txt",
            url: "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/BanAD.list",
            interval: 86400,
            format: "text",
           proxy: "节点选择"
        },
        ban_program_ad:{
            type: "http",
            behavior: "domain",
            path: "./rules/ban_program_ad.txt",
            url: "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/BanProgramAD.list",
            interval: 86400,
            format: "text",
           proxy: "节点选择"
        },
        // EasyList 广告屏蔽规则，国际化广告过滤规则
        easylist_adblock:{
            type: "http",
            behavior: "classical",
            path: "./rules/easylist_adblock.txt",
            url: "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/BanEasyList.list",
            interval: 86400,
            format: "text",
           proxy: "节点选择"
        },
        // 针对中国地区广告的 EasyList China 屏蔽规则
        easylist_china:{
            type: "http",
            behavior: "classical",
            path: "./rules/easylist_china.txt",
            url: "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/BanEasyListChina.list",
            interval: 86400,
            format: "text",
           proxy: "节点选择"
        },
        // 隐私保护规则，屏蔽收集用户隐私的域名
        easyprivacy:{
            type: "http",
            behavior: "classical",
            path: "./rules/easyprivacy.txt",
            url: "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/BanEasyPrivacy.list",
            interval: 86400,
            format: "text",
           proxy: "节点选择"
        },
        china_company_ip:{
            type: "http",
            behavior: "ipcidr",
            path: "./rules/china_company_ip.txt",
            url: "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/ChinaCompanyIp.list",
            interval: 86400,
            format: "text",
           proxy: "节点选择"
        },
        amazon:{
            type: "http",
            behavior: "ipcidr",
            path: "./rules/amazon.txt",
            url: "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/Ruleset/AmazonIp.list",
            interval: 86400,
            format: "text",
           proxy: "节点选择"
        },
        google_cn_proxy_ip:{
            type: "http",
            behavior: "ipcidr",
            path: "./rules/google_cn_proxy_ip.txt",
            url: "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/Ruleset/GoogleCNProxyIP.list",
            interval: 86400,
            format: "text",
           proxy: "节点选择"
        },
        // PikPak 文件下载优化规则，用于提高 PikPak 服务的访问效率
        pikpak_download:{
            type: "http",
            behavior: "domain",
            path: "./rules/pikpak_download.txt",
            url: "https://raw.githubusercontent.com/Rooil/Surge-ACL/refs/heads/main/Surge/okk/pikpakdownload.list",
            interval: 86400,
            format: "text",
            proxy: "节点选择"
        },
                // PikPak 服务域名规则，用于代理或加速 PikPak 服务
        pikpak:{
            type: "http",
            behavior: "domain",
            path: "./rules/pikpak.txt",
            url: "https://raw.githubusercontent.com/Rooil/Surge-ACL/refs/heads/main/Surge/okk/pikpak.list",
            interval: 86400,
            format: "text",
            proxy: "节点选择"
        },
      
        // 日本相关域名规则，用于优化或代理日本地区的服务
        jp:{
            type: "http",
            behavior: "domain",
            path: "./rules/jp.txt",
            url: "https://raw.githubusercontent.com/Rooil/Surge-ACL/refs/heads/main/Surge/okk/jp.list",
            interval: 86400,
            format: "text",
            proxy: "节点选择"
        },
      
        // 日本相关域名规则，用于优化或代理日本地区的服务
        jav:{
            type: "http",
            behavior: "domain",
            path: "./rules/jav.txt",
            url: "https://raw.githubusercontent.com/Rooil/Surge-ACL/refs/heads/main/Surge/okk/jav.list",
            interval: 86400,
            format: "text",
            proxy: "节点选择"
        },
      
        // 日本相关域名规则，用于优化或代理日本地区的服务
        media:{
            type: "http",
            behavior: "domain",
            path: "./rules/media.txt",
            url: "https://raw.githubusercontent.com/Rooil/Surge-ACL/refs/heads/main/Surge/okk/media.list",
            interval: 86400,
            format: "text",
            proxy: "节点选择"
        },
      
        // Adobe 服务规则，用于优化 Adobe 软件（如 Creative Cloud）的访问
        adobe:{
            type: "http",
            behavior: "domain",
            path: "./rules/adobe.txt",
            url: "https://raw.githubusercontent.com/Rooil/Surge-ACL/refs/heads/main/Surge/okk/adobe.list",
            interval: 86400,
            format: "text",
            proxy: "节点选择"
        },
      
        // 自定直连域名
        zhi:{
            type: "http",
            behavior: "domain",
            path: "./rules/zhi.txt",
            url: "https://raw.githubusercontent.com/Rooil/Surge-ACL/refs/heads/main/Surge/okk/zhi.list",
            interval: 86400,
            format: "text",
            proxy: "节点选择"
        },
      
        // 手动切换的规则组，提供自定义需求的规则配置
        shouxuan:{
            type: "http",
            behavior: "domain",
            path: "./rules/shouxuan.txt",
            url: "https://raw.githubusercontent.com/Rooil/Surge-ACL/refs/heads/main/Surge/okk/shouxuan.list",
            interval: 86400,
            format: "text",
            proxy: "节点选择"
        },
      
      
        // 暴雪游戏服务规则，例如 Battle.net 服务的优化
        blizzard:{
            type: "http",
            behavior: "domain",
            path: "./rules/blizzard.txt",
            url: "https://raw.githubusercontent.com/Rooil/ACL4SSR/refs/heads/master/Clash/Ruleset/Blizzard.list",
            interval: 86400,
            format: "text",
            proxy: "节点选择"
        },
      
      
        // 常见游戏服务规则，包括 Steam、Epic 等游戏平台
        games:{
            type: "http",
            behavior: "domain",
            path: "./rules/games.txt",
            url: "https://raw.githubusercontent.com/Rooil/Surge-ACL/refs/heads/main/Surge/Other/Games.list",
            interval: 86400,
            format: "text",
            proxy: "节点选择"
        },
      
      
        // 常见游戏服务规则，包括 Steam、Epic 等游戏平台
        xbox:{
            type: "http",
            behavior: "classical",
            path: "./rules/xbox.txt",
            url: "https://raw.githubusercontent.com/Rooil/Surge-ACL/refs/heads/main/Surge/okk/Xbox.list",
            interval: 86400,
            format: "text",
            proxy: "节点选择"
        },
      
        // 局域网规则，用于控制局域网内通信
        local_area_network:{
            type: "http",
            behavior: "classical",
            path: "./rules/local_area_network.txt",
            url: "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/LocalAreaNetwork.list",
            interval: 86400,
            format: "text",
            proxy: "节点选择"
        },
      
        // 解封规则组，代理被屏蔽的服务
        unban:{
            type: "http",
            behavior: "domain",
            path: "./rules/unban.txt",
            url: "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/UnBan.list",
            interval: 86400,
            format: "text",
            proxy: "节点选择"
        },
      
        // 广告屏蔽规则，用于拦截常见广告域名
        ban_ad:{
            type: "http",
            behavior: "domain",
            path: "./rules/ban_ad.txt",
            url: "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/BanAD.list",
            interval: 86400,
            format: "text",
            proxy: "节点选择"
        },
      
      
        // 应用内广告屏蔽规则，专门针对程序内广告
        ban_program_ad:{
            type: "http",
            behavior: "domain",
            path: "./rules/ban_program_ad.txt",
            url: "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/BanProgramAD.list",
            interval: 86400,
            format: "text",
            proxy: "节点选择"
        },
      
        // EasyList 广告屏蔽规则，国际化广告过滤规则
        easylist_adblock:{
            type: "http",
            behavior: "classical",
            path: "./rules/easylist_adblock.txt",
            url: "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/BanEasyList.list",
            interval: 86400,
            format: "text",
            proxy: "节点选择"
        },
      
        // 针对中国地区广告的 EasyList China 屏蔽规则
        easylist_china:{
            type: "http",
            behavior: "classical",
            path: "./rules/easylist_china.txt",
            url: "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/BanEasyListChina.list",
            interval: 86400,
            format: "text",
            proxy: "节点选择"
        },
      
        // 隐私保护规则，屏蔽收集用户隐私的域名
        easyprivacy:{
            type: "http",
            behavior: "classical",
            path: "./rules/easyprivacy.txt",
            url: "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/BanEasyPrivacy.list",
            interval: 86400,
            format: "text",
            proxy: "节点选择"
        },
      
        // Google 中国IP代理规则，用于优化 Google 在中国的访问
        google_cn_proxy_ip:{
            type: "http",
            behavior: "ipcidr",
            path: "./rules/google_cn_proxy_ip.txt",
            url: "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/Ruleset/GoogleCNProxyIP.list",
            interval: 86400,
            format: "text",
            proxy: "节点选择"
        },
      
        // Google 中国代理规则，用于优化 Google 在中国的访问
        google_cn:{
            type: "http",
            behavior: "domain",
            path: "./rules/google_cn.txt",
            url: "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/Ruleset/GoogleCN.list",
            interval: 86400,
            format: "text",
            proxy: "节点选择"
        },
      
        // Google 服务规则，涵盖 Google 的全球域名
        google:{
            type: "http",
            behavior: "classical",
            path: "./rules/google.txt",
            url: "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/Ruleset/Google.list",
            interval: 86400,
            format: "text",
            proxy: "节点选择"
        },
      
        // Steam 中国代理规则，用于优化 Steam 在中国的访问
        steam_cn:{
            type: "http",
            behavior: "domain",
            path: "./rules/steam_cn.txt",
            url: "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/Ruleset/SteamCN.list",
            interval: 86400,
            format: "text",
            proxy: "节点选择"
        },
      
        // 微软 Bing 代理规则，用于优化 Bing 在中国的访问
        bing:{
            type: "http",
            behavior: "domain",
            path: "./rules/bing.txt",
            url: "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/Bing.list",
            interval: 86400,
            format: "text",
            proxy: "节点选择"
        },
      
        // Onedrive 代理规则，用于优化 Onedrive 在中国的访问
        onedrive:{
            type: "http",
            behavior: "domain",
            path: "./rules/onedrive.txt",
            url: "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/OneDrive.list",
            interval: 86400,
            format: "text",
            proxy: "节点选择"
        },
          
        // 微软代理规则，用于优化微软在中国的访问
        microsoft:{
            type: "http",
            behavior: "domain",
            path: "./rules/microsoft.txt",
            url: "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/Microsoft.list",
            interval: 86400,
            format: "text",
            proxy: "节点选择"
        },
      
        // Apple 服务规则，用于优化 Apple 生态（如 iCloud）的访问
        apple:{
            type: "http",
            behavior: "classical",
            path: "./rules/apple.txt",
            url: "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/Apple.list",
            interval: 86400,
            format: "text",
            proxy: "节点选择"
        },
      
        // Telegram 消息服务规则
        telegram:{
            type: "http",
            behavior: "classical",
            path: "./rules/telegram.txt",
            url: "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/Telegram.list",
            interval: 86400,
            format: "text",
            proxy: "节点选择"
        },
      
        // OpenAI 服务规则（如 ChatGPT 的优化访问）
        openai:{
            type: "http",
            behavior: "domain",
            path: "./rules/openai.txt",
            url: "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/Ruleset/OpenAi.list",
            interval: 86400,
            format: "text",
            proxy: "节点选择"
        },
      
        // 网易云音乐规则
        netease_music:{
            type: "http",
            behavior: "classical",
            path: "./rules/netease_music.txt",
            url: "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/Ruleset/NetEaseMusic.list",
            interval: 86400,
            format: "text",
            proxy: "节点选择"
        },
      
        // Epic Games规则：用于匹配Epic Games相关的域名，确保其流量正确路由。
        epic_games:{
            type: "http",
            behavior: "domain",
            path: "./rules/epic_games.txt",
            url: "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/Ruleset/Epic.list",
            interval: 86400,
            format: "text",
            proxy: "节点选择"
        },
      
        // Origin平台规则：匹配EA Origin相关域名，保障游戏及服务的正常访问。
        origin:{
            type: "http",
            behavior: "domain",
            path: "./rules/origin.txt",
            url: "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/Ruleset/Origin.list",
            interval: 86400,
            format: "text",
            proxy: "节点选择"
        },
      
        // Sony规则：用于匹配Sony相关的域名，包括PlayStation等服务。
        sony:{
            type: "http",
            behavior: "domain",
            path: "./rules/sony.txt",
            url: "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/Ruleset/Sony.list",
            interval: 86400,
            format: "text",
            proxy: "节点选择"
        },
      
        // Steam规则：用于匹配Steam相关的域名，支持下载、登录及社区功能。
        steam:{
            type: "http",
            behavior: "domain",
            path: "./rules/steam.txt",
            url: "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/Ruleset/Steam.list",
            interval: 86400,
            format: "text",
            proxy: "节点选择"
        },
      
        // 任天堂规则：匹配Nintendo相关域名，确保其在线服务正常工作。
        nintendo:{
            type: "http",
            behavior: "domain",
            path: "./rules/nintendo.txt",
            url: "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/Ruleset/Nintendo.list",
            interval: 86400,
            format: "text",
            proxy: "节点选择"
        },
      
        // YouTube规则：匹配YouTube相关的域名，优化视频流播放及服务访问。
        youtube:{
            type: "http",
            behavior: "domain",
            path: "./rules/youtube.txt",
            url: "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/Ruleset/YouTube.list",
            interval: 86400,
            format: "text",
            proxy: "节点选择"
        },
      
        // Netflix规则：匹配Netflix相关域名，保障流媒体播放服务的顺畅。
        netflix:{
            type: "http",
            behavior: "classical",
            path: "./rules/netflix.txt",
            url: "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/Ruleset/Netflix.list",
            interval: 86400,
            format: "text",
            proxy: "节点选择"
        },
      
        // 亚马逊规则：匹配Amazon相关的IP地址，支持购物及AWS服务访问。
        amazon:{
            type: "http",
            behavior: "ipcidr",
            path: "./rules/amazon.txt",
            url: "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/Ruleset/AmazonIp.list",
            interval: 86400,
            format: "text",
            proxy: "节点选择"
        },
      
        // 亚马逊规则：匹配Amazon相关的IP地址，支持购物及AWS服务访问。
        bahamut:{
            type: "http",
            behavior: "domain",
            path: "./rules/bahamut.txt",
            url: "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/Ruleset/Bahamut.list",
            interval: 86400,
            format: "text",
            proxy: "节点选择"
        },
      
        // Bilibili港澳台规则：匹配Bilibili港澳台（HMT）相关域名，支持访问区域限制内容。
        bilibili_hmt:{
            type: "http",
            behavior: "classical",
            path: "./rules/bilibili_hmt.txt",
            url: "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/Ruleset/BilibiliHMT.list",
            interval: 86400,
            format: "text",
            proxy: "节点选择"
        },
      
        // Bilibili规则：匹配Bilibili国内相关域名，支持其正常播放与服务。
        bilibili:{
            type: "http",
            behavior: "domain",
            path: "./rules/bilibili.txt",
            url: "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/Ruleset/Bilibili.list",
            interval: 86400,
            format: "text",
            proxy: "节点选择"
        },
      
        // 中国媒体规则：匹配中国国内的主流媒体域名，确保流量路由至正确的服务器。
        china_media:{
            type: "http",
            behavior: "classical",
            path: "./rules/china_media.txt",
            url: "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/ChinaMedia.list",
            interval: 86400,
            format: "text",
            proxy: "节点选择"
        },
      
        // 代理媒体规则：用于匹配需要代理的媒体内容（如国外视频平台）的域名。
        proxy_media:{
            type: "http",
            behavior: "classical",
            path: "./rules/proxy_media.txt",
            url: "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/ProxyMedia.list",
            interval: 86400,
            format: "text",
            proxy: "节点选择"
        },
      
        // GFWList代理规则：匹配被防火墙（GFW）屏蔽的网站域名，自动通过代理访问。
        proxy_gfwlist:{
            type: "http",
            behavior: "classical",
            path: "./rules/proxy_gfwlist.txt",
            url: "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/ProxyGFWlist.list",
            interval: 86400,
            format: "text",
            proxy: "节点选择"
        },
      
        // 中国IP规则：匹配中国大陆的IP地址段，确保流量走直连。
        china_ip:{
            type: "http",
            behavior: "ipcidr",
            path: "./rules/china_ip.txt",
            url: "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/ChinaIp.list",
            interval: 86400,
            format: "text",
            proxy: "节点选择"
        },
      
        // 中国域名规则：匹配中国大陆的域名，保证访问国内服务时直连。
        china_domain:{
            type: "http",
            behavior: "classical",
            path: "./rules/china_domain.txt",
            url: "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/ChinaDomain.list",
            interval: 86400,
            format: "text",
            proxy: "节点选择"
        },
      
        // 中国公司IP规则：匹配中国公司相关的IP地址，用于正确路由国内公司服务的流量。
        china_company_ip:{
            type: "http",
            behavior: "ipcidr",
            path: "./rules/china_company_ip.txt",
            url: "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/ChinaCompanyIp.list",
            interval: 86400,
            format: "text",
            proxy: "节点选择"
        },
      
        // 下载规则：匹配常见的下载服务域名，优化下载流量路由。
        download:{
            type: "http",
            behavior: "domain",
            path: "./rules/download.txt",
            url: "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/Download.list",
            interval: 86400,
            format: "text",
            proxy: "节点选择"
        },



        //自带
        reject_non_ip_no_drop: {
            type: "http",
            behavior: "classical",
            url: "https://ruleset.skk.moe/Clash/non_ip/reject-no-drop.txt",
            path: "./rule_set/sukkaw_ruleset/reject_non_ip_no_drop.txt",
            interval: 43200,
            format: "text",
            proxy: "节点选择"
        },
        reject_non_ip_drop: {
            type: "http",
            behavior: "classical",
            url: "https://ruleset.skk.moe/Clash/non_ip/reject-drop.txt",
            path: "./rule_set/sukkaw_ruleset/reject_non_ip_drop.txt",
            interval: 43200,
            format: "text",
            proxy: "节点选择"
        },
        reject_non_ip: {
            type: "http",
            behavior: "classical",
            url: "https://ruleset.skk.moe/Clash/non_ip/reject.txt",
            path: "./rule_set/sukkaw_ruleset/reject_non_ip.txt",
            interval: 43200,
            format: "text",
            proxy: "节点选择"
        },
        reject_domainset: {
            type: "http",
            behavior: "domain",
            url: "https://ruleset.skk.moe/Clash/domainset/reject.txt",
            path: "./rule_set/sukkaw_ruleset/reject_domainset.txt",
            interval: 43200,
            format: "text",
            proxy: "节点选择"
        },
        reject_ip: {
            type: "http",
            behavior: "classical",
            url: "https://ruleset.skk.moe/Clash/ip/reject.txt",
            path: "./rule_set/sukkaw_ruleset/reject_ip.txt",
            interval: 43200,
            format: "text",
            proxy: "节点选择"
        },
        // 静态cdn
        cdn_domainset: {
            type: "http",
            behavior: "domain",
            url: "https://ruleset.skk.moe/Clash/domainset/cdn.txt",
            path: "./rule_set/sukkaw_ruleset/cdn_domainset.txt",
            interval: 43200,
            format: "text",
            proxy: "节点选择"
        },
        cdn_non_ip: {
            type: "http",
            behavior: "domain",
            url: "https://ruleset.skk.moe/Clash/non_ip/cdn.txt",
            path: "./rule_set/sukkaw_ruleset/cdn_non_ip.txt",
            interval: 43200,
            format: "text",
            proxy: "节点选择"
        },
        // 流媒体
        stream_non_ip: {
            type: "http",
            behavior: "classical",
            url: "https://ruleset.skk.moe/Clash/non_ip/stream.txt",
            path: "./rule_set/sukkaw_ruleset/stream_non_ip.txt",
            interval: 43200,
            format: "text",
            proxy: "节点选择"
        },
        stream_ip: {
            type: "http",
            behavior: "classical",
            url: "https://ruleset.skk.moe/Clash/ip/stream.txt",
            path: "./rule_set/sukkaw_ruleset/stream_ip.txt",
            interval: 43200,
            format: "text",
            proxy: "节点选择"
        },
        // AIGC
        ai_non_ip: {
            type: "http",
            behavior: "classical",
            url: "https://ruleset.skk.moe/Clash/non_ip/ai.txt",
            path: "./rule_set/sukkaw_ruleset/ai_non_ip.txt",
            interval: 43200,
            format: "text",
            proxy: "节点选择"
        },
        // telegram
        telegram_non_ip: {
            type: "http",
            behavior: "classical",
            url: "https://ruleset.skk.moe/Clash/non_ip/telegram.txt",
            path: "./rule_set/sukkaw_ruleset/telegram_non_ip.txt",
            interval: 43200,
            format: "text",
            proxy: "节点选择"
        },
        telegram_ip: {
            type: "http",
            behavior: "classical",
            url: "https://ruleset.skk.moe/Clash/ip/telegram.txt",
            path: "./rule_set/sukkaw_ruleset/telegram_ip.txt",
            interval: 43200,
            format: "text",
            proxy: "节点选择"
        },
        // apple
        apple_cdn: {
            type: "http",
            behavior: "domain",
            url: "https://ruleset.skk.moe/Clash/domainset/apple_cdn.txt",
            path: "./rule_set/sukkaw_ruleset/apple_cdn.txt",
            interval: 43200,
            format: "text",
            proxy: "节点选择"
        },
        apple_services: {
            type: "http",
            behavior: "classical",
            url: "https://ruleset.skk.moe/Clash/non_ip/apple_services.txt",
            path: "./rule_set/sukkaw_ruleset/apple_services.txt",
            interval: 43200,
            format: "text",
            proxy: "节点选择"
        },
        apple_cn_non_ip: {
            type: "http",
            behavior: "classical",
            url: "https://ruleset.skk.moe/Clash/non_ip/apple_cn.txt",
            path: "./rule_set/sukkaw_ruleset/apple_cn_non_ip.txt",
            interval: 43200,
            format: "text",
            proxy: "节点选择"
        },
        // microsoft
        microsoft_cdn_non_ip: {
            type: "http",
            behavior: "classical",
            url: "https://ruleset.skk.moe/Clash/non_ip/microsoft_cdn.txt",
            path: "./rule_set/sukkaw_ruleset/microsoft_cdn_non_ip.txt",
            interval: 43200,
            format: "text",
            proxy: "节点选择"
        },
        microsoft_non_ip: {
            type: "http",
            behavior: "classical",
            url: "https://ruleset.skk.moe/Clash/non_ip/microsoft.txt",
            path: "./rule_set/sukkaw_ruleset/microsoft_non_ip.txt",
            interval: 43200,
            format: "text",
            proxy: "节点选择"
        },
        // 软件更新、操作系统等大文件下载
        download_domainset: {
            type: "http",
            behavior: "domain",
            url: "https://ruleset.skk.moe/Clash/domainset/download.txt",
            path: "./rule_set/sukkaw_ruleset/download_domainset.txt",
            interval: 43200,
            format: "text",
            proxy: "节点选择"
        },
        download_non_ip: {
            type: "http",
            behavior: "domain",
            url: "https://ruleset.skk.moe/Clash/non_ip/download.txt",
            path: "./rule_set/sukkaw_ruleset/download_non_ip.txt",
            interval: 43200,
            format: "text",
            proxy: "节点选择"
        },
        // 内网域名和局域网 IP
        lan_non_ip: {
            type: "http",
            behavior: "classical",
            url: "https://ruleset.skk.moe/Clash/non_ip/lan.txt",
            path: "./rule_set/sukkaw_ruleset/lan_non_ip.txt",
            interval: 43200,
            format: "text",
            proxy: "节点选择"
        },
        lan_ip: {
            type: "http",
            behavior: "classical",
            url: "https://ruleset.skk.moe/Clash/ip/lan.txt",
            path: "./rule_set/sukkaw_ruleset/lan_ip.txt",
            interval: 43200,
            format: "text",
            proxy: "节点选择"
        },
        domestic_non_ip: {
            type: "http",
            behavior: "classical",
            url: "https://ruleset.skk.moe/Clash/non_ip/domestic.txt",
            path: "./rule_set/sukkaw_ruleset/domestic_non_ip.txt",
            interval: 43200,
            format: "text",
            proxy: "节点选择"
        },
        direct_non_ip: {
            type: "http",
            behavior: "classical",
            url: "https://ruleset.skk.moe/Clash/non_ip/direct.txt",
            path: "./rule_set/sukkaw_ruleset/direct_non_ip.txt",
            interval: 43200,
            format: "text",
            proxy: "节点选择"
        },
        global_non_ip: {
            type: "http",
            behavior: "classical",
            url: "https://ruleset.skk.moe/Clash/non_ip/global.txt",
            path: "./rule_set/sukkaw_ruleset/global_non_ip.txt",
            interval: 43200,
            format: "text",
            proxy: "节点选择"
        },
        domestic_ip: {
            type: "http",
            behavior: "classical",
            url: "https://ruleset.skk.moe/Clash/ip/domestic.txt",
            path: "./rule_set/sukkaw_ruleset/domestic_ip.txt",
            interval: 43200,
            format: "text",
            proxy: "节点选择"
        },
        china_ip: {
            type: "http",
            behavior: "ipcidr",
            url: "https://ruleset.skk.moe/Clash/ip/china_ip.txt",
            path: "./rule_set/sukkaw_ruleset/china_ip.txt",
            interval: 43200,
            format: "text",
            proxy: "节点选择"
        }
    };
    
    params ["rule-providers"] = ruleProviders;
    params ["rules"] = rules;
}

// 覆写代理组
function overwriteProxyGroups (params) {
    // 所有代理
    const allProxies = params ["proxies"].map ((e) => e.name);
    // 公共的正则片段
    const excludeTerms = "剩余|到期|主页|官网|游戏|关注|网站|地址|有效|网址|禁止|邮箱|发布|客服|订阅|节点|问题|联系";
    // 包含条件：各个国家或地区的关键词
    const includeTerms = {
        HK: "(香港|HK|Hong|🇭🇰)",
        TW: "(台湾|TW|Taiwan|Wan|🇹🇼|🇨🇳)",
        SG: "(新加坡|狮城|SG|Singapore|🇸🇬)",
        JP: "(日本|JP|Japan|🇯🇵)",
        KR: "(韩国|韓|KR|Korea|🇰🇷)",
        US: "(美国|US|United States|America|🇺🇸)",
        DI:"(下载|0.1|0.2|0.5|低倍率)",
        OT:"(俄|印|德|英|土|阿|拿|菲|澳|朝|泰|越|柬|爱|荷|迪|马|法|缅||孟|匈|瑞|冰|秘|United Kingdom|Turkey|Argentina|India|Poland|Israel|North Korea|Antarctica|IceLand|Nigeria)",

    };
    // 合并所有国家关键词，供"其它"条件使用
    const allCountryTerms = Object.values(includeTerms).join("|");
    // 自动代理组正则表达式配置
    const autoProxyGroupRegexs = [
        { name: "香港节点", regex: new RegExp(`^(?=.*${includeTerms.HK})(?!.*${excludeTerms}).*$`, "i") },
        { name: "台湾节点", regex: new RegExp(`^(?=.*${includeTerms.TW})(?!.*${excludeTerms}).*$`, "i") },
        { name: "狮城节点", regex: new RegExp(`^(?=.*${includeTerms.SG})(?!.*${excludeTerms}).*$`, "i") },
        { name: "日本节点", regex: new RegExp(`^(?=.*${includeTerms.JP})(?!.*${excludeTerms}).*$`, "i") },
        { name: "韩国节点", regex: new RegExp(`^(?=.*${includeTerms.KR})(?!.*${excludeTerms}).*$`, "i") },
        { name: "美国节点", regex: new RegExp(`^(?=.*${includeTerms.US})(?!.*${excludeTerms}).*$`, "i") },
        { name: "其它节点", regex: new RegExp(`^(?!.*(?:${allCountryTerms}|${excludeTerms})).*$`, "i") }
    ];
        
    const autoProxyGroups = autoProxyGroupRegexs
        .map ((item) => ({
            name: item.name,
            type: "url-test",
            url: "https://cp.cloudflare.com",
            interval: 300,
            tolerance: 50,
            proxies: getProxiesByRegex (params, item.regex),
            hidden: true,
        }))
        .filter ((item) => item.proxies.length > 0);

    // 手动选择代理组
    const manualProxyGroups = [
        { 
            name: "香港手动", 
            regex: new RegExp(`^(?=.*${includeTerms.HK})(?!.*${excludeTerms}).*$`, "i"), 
            icon: "https://fastly.jsdelivr.net/gh/Semporia/Hand-Painted-icon@master/Rounded_Rectangle/Hong_Kong.png" 
        },
        { 
            name: "日本手动", 
            regex: new RegExp(`^(?=.*${includeTerms.JP})(?!.*${excludeTerms}).*$`, "i"), 
            icon: "https://fastly.jsdelivr.net/gh/Semporia/Hand-Painted-icon@master/Rounded_Rectangle/Japan.png" 
        },
        { 
            name: "韩国手动", 
            regex: new RegExp(`^(?=.*${includeTerms.KR})(?!.*${excludeTerms}).*$`, "i"), 
            icon: "https://fastly.jsdelivr.net/gh/Semporia/Hand-Painted-icon@master/Rounded_Rectangle/South_Korea.png" 
        },
        { 
            name: "狮城手动", 
            regex: new RegExp(`^(?=.*${includeTerms.SG})(?!.*${excludeTerms}).*$`, "i"), 
            icon: "https://fastly.jsdelivr.net/gh/Semporia/Hand-Painted-icon@master/Rounded_Rectangle/Singapore.png" 
        },
        { 
            name: "美国手动", 
            regex: new RegExp(`^(?=.*${includeTerms.US})(?!.*${excludeTerms}).*$`, "i"), 
            icon: "https://fastly.jsdelivr.net/gh/Semporia/Hand-Painted-icon@master/Rounded_Rectangle/United_States.png" 
        },
        { 
            name: "台湾手动", 
            regex: new RegExp(`^(?=.*${includeTerms.TW})(?!.*${excludeTerms}).*$`, "i"), 
            icon: "https://fastly.jsdelivr.net/gh/Semporia/Hand-Painted-icon@master/Rounded_Rectangle/China.png" 
        },
        { 
            name: "下载节点", 
            regex: new RegExp(`^(?=.*${includeTerms.DI})(?!.*${excludeTerms}).*$`, "i"), 
            icon: "https://fastly.jsdelivr.net/gh/Semporia/Hand-Painted-icon@master/Social_Media/Buzznet.png" 
        },
        { 
            name: "其它地区", 
            regex: new RegExp(`^(?=.*${includeTerms.OT})(?!.*${excludeTerms}).*$`, "i"), 
            icon: "https://raw.githubusercontent.com/Orz-3/mini/master/Color/Global.png" 
        },
        
    ];

    const manualProxyGroupsConfig = manualProxyGroups
        .map ((item) => ({
            name: item.name,
            type: "select",
            proxies: getManualProxiesByRegex (params, item.regex),
            icon: item.icon,
            hidden: false,
        }))
        .filter ((item) => item.proxies.length > 0);

    const groups = [
        {
            name: "节点选择",
            type: "select",
            url: "https://cp.cloudflare.com",
            icon: "https://fastly.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/Rocket.png",
            proxies: ["自动选择", "故障转移", "延迟最低", "负载均衡", "下载节点", "香港节点", "台湾节点", "狮城节点", "日本节点", "美国节点", "韩国节点", "其它地区", "手动切换", "DIRECT",],
        },
        {
            name: "手动切换",
            type: "select",
            icon: "https://fastly.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/Static.png",
            proxies: [...allProxies,],
        },
        {
            name: "自动选择",
            type: "url-test",
            icon: "https://fastly.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/Auto.png",
            url: "http://www.gstatic.com/generate_204",
            interval: 300,
            tolerance: 50,
            proxies: [...allProxies,],
        },
        {
            name: "延迟最低",
            type: "url-test",
            icon: "https://fastly.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/Speedtest.png",
            url: "http://www.gstatic.com/generate_204",
            interval: 300,
            tolerance: 100,
            proxies: [...allProxies,],
        },
        {
            name: "故障转移",
            type: "fallback",
            icon: "https://fastly.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/Round_Robin.png",
            url: "http://www.gstatic.com/generate_204",
            interval: 300,
            tolerance: 50,
            proxies: [...allProxies,],
        },
        {
            name: "负载均衡",
            type: "load-balance",
            icon: "https://fastly.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/Final.png",
            url: "http://www.gstatic.com/generate_204",
            interval: 300,
            tolerance: 50,
            proxies: [...allProxies,],
        },
        {
            name: "游戏平台",
            type: "select",
            url: "https://cp.cloudflare.com",
            icon: "https://fastly.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/Game.png",
            proxies: ["DIRECT", "手动切换", "节点选择",],
        },
        {
            name: "Adobe",
            type: "select",
            // "include-all": true,
            icon: "https://raw.githubusercontent.com/lobehub/lobe-icons/refs/heads/master/packages/static-png/dark/adobe-color.png",
            proxies: ["DIRECT", "手动切换", "节点选择",],
        },
        {
            name: "特殊",
            type: "select",
            // "include-all": true,
            icon: "https://fastly.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/Heart.png",
            proxies: ["节点选择", "手动切换", "日本手动",],
        },
        {
            name: "JP",
            type: "select",
            // "include-all": true,
            icon: "https://p-smith.com/service-icon/factory.svg",
            proxies: ["手动切换", "特殊", "节点选择", "下载节点", "香港节点", "台湾节点", "狮城节点", "日本节点", "美国节点", "韩国节点", "其它地区", "DIRECT",],
        },
        {
            name: "JAV",
            type: "select",
            // "include-all": true,
            icon: "https://c0.jdbstatic.com/images/logo_120x120.png",
            proxies: ["手动切换", "节点选择", "特殊", "下载节点", "香港节点", "台湾节点", "狮城节点", "日本节点", "美国节点", "韩国节点", "其它地区", "DIRECT",],
        },
        {
            name: "PIKPAK",
            type: "select",
            // "include-all": true,
            icon: "https://raw.githubusercontent.com/Rooil/Clash-Verge-JS/refs/heads/main/Pikpak.svg",
            proxies: ["DIRECT", "节点选择", "手动切换", "下载节点", "香港节点", "台湾节点", "狮城节点", "其它节点",],
        },
        {
            name: "电报消息",
            type: "select",
            proxies: ["节点选择", "手动切换", "香港节点", "日本节点", "韩国节点", "狮城节点", "美国节点", "台湾节点", "其它节点",],
            // "include-all": true,
            icon: "https://raw.githubusercontent.com/Orz-3/mini/master/Color/Telegram.png"
        },
        {
            name: "OpenAi",
            type: "select",
            proxies: ["节点选择", "手动切换", "香港节点", "日本节点", "韩国节点", "狮城节点", "美国节点", "台湾节点", "其它节点",],
            // "include-all": true,
            icon: "https://raw.githubusercontent.com/Orz-3/mini/master/Color/OpenAI.png"
        },
        {
            name: "苹果服务",
            type: "select",
            proxies: ["DIRECT", "节点选择", "手动切换", "香港节点", "日本节点", "韩国节点", "狮城节点", "美国节点", "台湾节点", "其它节点",],
            // "include-all": true,
            icon: "https://raw.githubusercontent.com/Orz-3/mini/master/Color/Apple.png"
        },
        {
            name: "微软服务",
            type: "select",
            proxies: ["DIRECT", "节点选择", "手动切换", "香港节点", "日本节点", "韩国节点", "狮城节点", "美国节点", "台湾节点", "其它节点",],
            // "include-all": true,
            icon: "https://fastly.jsdelivr.net/gh/Orz-3/mini@master/Color/Microsoft.png"
        },
        {
            name: "油管视频",
            type: "select",
            proxies: ["节点选择", "自动选择", "手动切换", "香港节点", "日本节点", "韩国节点", "狮城节点", "台湾节点", "其它节点",],
            // "include-all": true,
            icon: "https://fastly.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/YouTube.png"
        },
        {
            name: "奈飞视频",
            type: "select",
            proxies: ["节点选择", "自动选择", "手动切换", "香港节点", "日本节点", "韩国节点", "狮城节点", "台湾节点", "其它节点",],
            // "include-all": true,
            icon: "https://fastly.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/Netflix.png"
        },
        {
            name: "巴哈姆特",
            type: "select",
            proxies: ["节点选择","自动选择", "手动切换", "香港节点", "日本节点", "韩国节点", "狮城节点", "台湾节点", "其它节点",],
            // "include-all": true,
            icon: "https://fastly.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/Bahamut.png"
        },
        {
            name: "哔哩哔哩",
            type: "select",
            proxies: ["DIRECT", "自动选择", "节点选择", "手动切换", "香港节点", "日本节点", "韩国节点", "狮城节点", "台湾节点", "其它节点",],
            // "include-all": true,
            icon: "https://fastly.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/bilibili_2.png"
        },
        {
            name: "国外媒体",
            type: "select",
            proxies: ["自动选择", "节点选择", "手动切换", "香港节点", "日本节点", "韩国节点", "狮城节点", "台湾节点", "其它节点",],
            // "include-all": true,
            icon: "https://fastly.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/ForeignMedia.png"
        },
        {
            name: "国内媒体",
            type: "select",
            proxies: ["DIRECT", "自动选择", "节点选择", "手动切换", "香港节点", "日本节点", "韩国节点", "狮城节点", "台湾节点", "其它节点",],
            // "include-all": true,
            icon: "https://fastly.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/DomesticMedia.png"
        },
        {
            name: "谷歌CN",
            type: "select",
            proxies: ["DIRECT", "自动选择", "节点选择", "手动切换", "香港节点", "日本节点", "韩国节点", "狮城节点", "台湾节点", "其它节点",],
            // "include-all": true,
            icon: "https://fastly.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/Google.png"
        },
        {
            name: "谷歌",
            type: "select",
            proxies: ["节点选择", "自动选择", "节点选择", "手动切换", "香港节点", "日本节点", "韩国节点", "狮城节点", "台湾节点", "其它节点",],
            // "include-all": true,
            icon: "https://fastly.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/Google_Search.png"
        },
        {
            name: "网易音乐",
            type: "select",
            proxies: ["DIRECT", "节点选择", "手动切换", "香港节点", "日本节点", "韩国节点", "狮城节点", "美国节点", "台湾节点", "其它节点",],
            // "include-all": true,
            icon: "https://fastly.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/Netease_Music.png"
        },
        {
            name: "全球直连",
            type: "select",
            proxies: ["DIRECT", "节点选择", "手动切换",],
            // "include-all": true,
            icon: "https://www.clashverge.dev/assets/icons/link.svg"
        },
        {
            name: "漏网之鱼",
            type: "select",
            proxies: ["节点选择", "DIRECT", "手动切换", "香港节点", "日本节点", "韩国节点", "狮城节点", "美国节点", "台湾节点", "其它节点",],
            // "include-all": true,
            icon: "https://www.clashverge.dev/assets/icons/fish.svg"
        },
        {
            name: "AdBlock",
            type: "select",
            proxies: ["REJECT", "DIRECT",],
            // "include-all": true,
            icon: "https://fastly.jsdelivr.net/gh/Orz-3/mini@master/Color/Adblock.png"
        },
        {
            name: "应用净化",
            type: "select",
            proxies: ["REJECT", "DIRECT",],
            // "include-all": true,
            icon: "https://fastly.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/Hijacking.png"
        },
        {
            name: "隐私防护",
            type: "select",
            proxies: ["REJECT-DROP", "DIRECT",],
            // "include-all": true,
            icon: "https://www.clashverge.dev/assets/icons/guard.svg"
        },

    ];

    autoProxyGroups.length &&
        groups [2].proxies.unshift (...autoProxyGroups.map ((item) => item.name));
    groups.push (...autoProxyGroups);
    groups.push (...manualProxyGroupsConfig);
    params ["proxy-groups"] = groups;
}

// 覆写DNS
function overwriteDns (params) {
    const dnsList = [
        "https://223.5.5.5/dns-query",
        "https://doh.pub/dns-query",
    ];

    const proxyDnsList = [
        "https://223.5.5.5/dns-query",
        "https://doh.pub/dns-query",
    ];

    const dnsOptions = {
        enable: true,
        ipv6: false,
        "prefer-h3": true, // 如果 DNS 服务器支持 DoH3 会优先使用 h3
        "respect-rules": true, // 仅对符合规则的请求使用 DNS
        "enhanced-mode": "fake-ip", // 伪装 IP
        "fake-ip-range": "28.0.0.1/8",
        nameserver: dnsList, // 其它网络请求都归他管
        "proxy-server-nameserver": proxyDnsList, // 代理服务器的 DNS
    };
    params.dns = { ...dnsOptions };
}

// 覆写Basic Options
function overwriteBasicOptions (params) {
    const otherOptions = {
        "mixed-port": 7890,
        "allow-lan": true,
        "unified-delay": true,
        "tcp-concurrent": true,
        "find-process-mode": "strict",
        "global-client-fingerprint": "chrome",
        profile: {
            "store-selected": true,
            "store-fake-ip": true,
        },
        ipv6: false,
        mode: "rule",
        "log-level": "warning",
        udp: true,
        sniffer: {
            enable: true,
            sniff: {
                HTTP: {
                    ports: [80, "8080-8880"],
                    "override-destination": true,
                },
                TLS: {
                    ports: [443, 8443],
                },
                QUIC: {
                    ports: [443, 8443],
                },
            },
            "skip-domain": ["Mijia Cloud", "+.push.apple.com"]
        },
    };
    Object.keys (otherOptions).forEach ((key) => {
        params [key] = otherOptions [key];
    });
}

// 覆写DNS.Fake IP Filter
function overwriteFakeIpFilter (params) {
    const fakeIpFilter = [
        "+.+m2m",
        "+.$injections.adguard.org",
        "+.$local.adguard.org",
        "+.+_tcp",
        "+.+bogon",
        "+.+_msdcs",
        "+.+lan",
        "+.+localdomain",
        "+.home.arpa",
        "+.10.in-addr.arpa",
        "+.16.172.in-addr.arpa",
        "+.17.172.in-addr.arpa",
        "+.18.172.in-addr.arpa",
        "+.19.172.in-addr.arpa",
        "+.20.172.in-addr.arpa",
        "+.21.172.in-addr.arpa",
        "+.22.172.in-addr.arpa",
        "+.23.172.in-addr.arpa",
        "+.24.172.in-addr.arpa",
        "+.25.172.in-addr.arpa",
        "+.26.172.in-addr.arpa",
        "+.27.172.in-addr.arpa",
        "+.28.172.in-addr.arpa",
        "+.29.172.in-addr.arpa",
        "+.30.172.in-addr.arpa",
        "+.31.172.in-addr.arpa",
        "+.168.192.in-addr.arpa",
        "+.254.169.in-addr.arpa",
        "dns.msftncsi.com",
        "*.srv.nintendo.net",
        "*.stun.playstation.net",
        "xbox.*.microsoft.com",
        "*.xboxlive.com",
        "*.turn.twilio.com",
        "*.stun.twilio.com",
        "stun.syncthing.net",
        "stun.*"
    ];
    params.dns["fake-ip-filter"] = fakeIpFilter;
}

// 覆写DNS.Nameserver Policy
function overwriteNameserverPolicy (params) {
    const nameserverPolicy = {
        "dns.alidns.com": "quic://223.5.5.5:853",
        "doh.pub": "https://1.12.12.12/dns-query",
        "doh.360.cn": "101.198.198.198",
        "+.uc.cn": "quic://dns.alidns.com:853",
        "+.alibaba.com": "quic://dns.alidns.com:853",
        "*.alicdn.com": "quic://dns.alidns.com:853",
        "*.ialicdn.com": "quic://dns.alidns.com:853",
        "*.myalicdn.com": "quic://dns.alidns.com:853",
        "*.alidns.com": "quic://dns.alidns.com:853",
        "*.aliimg.com": "quic://dns.alidns.com:853",
        "+.aliyun.com": "quic://dns.alidns.com:853",
        "*.aliyuncs.com": "quic://dns.alidns.com:853",
        "*.alikunlun.com": "quic://dns.alidns.com:853",
        "*.alikunlun.net": "quic://dns.alidns.com:853",
        "*.cdngslb.com": "quic://dns.alidns.com:853",
        "+.alipay.com": "quic://dns.alidns.com:853",
        "+.alipay.cn": "quic://dns.alidns.com:853",
        "+.alipay.com.cn": "quic://dns.alidns.com:853",
        "*.alipayobjects.com": "quic://dns.alidns.com:853",
        "+.alibaba-inc.com": "quic://dns.alidns.com:853",
        "*.alibabausercontent.com": "quic://dns.alidns.com:853",
        "*.alibabadns.com": "quic://dns.alidns.com:853",
        "+.alibabachengdun.com": "quic://dns.alidns.com:853",
        "+.alicloudccp.com": "quic://dns.alidns.com:853",
        "+.alipan.com": "quic://dns.alidns.com:853",
        "+.aliyundrive.com": "quic://dns.alidns.com:853",
        "+.aliyundrive.net": "quic://dns.alidns.com:853",
        "+.cainiao.com": "quic://dns.alidns.com:853",
        "+.cainiao.com.cn": "quic://dns.alidns.com:853",
        "+.cainiaoyizhan.com": "quic://dns.alidns.com:853",
        "+.guoguo-app.com": "quic://dns.alidns.com:853",
        "+.etao.com": "quic://dns.alidns.com:853",
        "+.yitao.com": "quic://dns.alidns.com:853",
        "+.1688.com": "quic://dns.alidns.com:853",
        "+.amap.com": "quic://dns.alidns.com:853",
        "+.gaode.com": "quic://dns.alidns.com:853",
        "+.autonavi.com": "quic://dns.alidns.com:853",
        "+.dingtalk.com": "quic://dns.alidns.com:853",
        "+.mxhichina.com": "quic://dns.alidns.com:853",
        "+.soku.com": "quic://dns.alidns.com:853",
        "+.tb.cn": "quic://dns.alidns.com:853",
        "+.taobao.com": "quic://dns.alidns.com:853",
        "*.taobaocdn.com": "quic://dns.alidns.com:853",
        "*.tbcache.com": "quic://dns.alidns.com:853",
        "+.tmall.com": "quic://dns.alidns.com:853",
        "+.goofish.com": "quic://dns.alidns.com:853",
        "+.xiami.com": "quic://dns.alidns.com:853",
        "+.xiami.net": "quic://dns.alidns.com:853",
        "*.ykimg.com": "quic://dns.alidns.com:853",
        "+.youku.com": "quic://dns.alidns.com:853",
        "+.tudou.com": "quic://dns.alidns.com:853",
        "*.cibntv.net": "quic://dns.alidns.com:853",
        "+.ele.me": "quic://dns.alidns.com:853",
        "*.elemecdn.com": "quic://dns.alidns.com:853",
        "+.feizhu.com": "quic://dns.alidns.com:853",
        "+.taopiaopiao.com": "quic://dns.alidns.com:853",
        "+.fliggy.com": "quic://dns.alidns.com:853",
        "+.koubei.com": "quic://dns.alidns.com:853",
        "+.mybank.cn": "quic://dns.alidns.com:853",
        "+.mmstat.com": "quic://dns.alidns.com:853",
        "+.uczzd.cn": "quic://dns.alidns.com:853",
        "+.iconfont.cn": "quic://dns.alidns.com:853",
        "+.freshhema.com": "quic://dns.alidns.com:853",
        "+.hemamax.com": "quic://dns.alidns.com:853",
        "+.hemaos.com": "quic://dns.alidns.com:853",
        "+.hemashare.cn": "quic://dns.alidns.com:853",
        "+.shyhhema.com": "quic://dns.alidns.com:853",
        "+.sm.cn": "quic://dns.alidns.com:853",
        "+.npmmirror.com": "quic://dns.alidns.com:853",
        "+.alios.cn": "quic://dns.alidns.com:853",
        "+.wandoujia.com": "quic://dns.alidns.com:853",
        "+.aligames.com": "quic://dns.alidns.com:853",
        "+.25pp.com": "quic://dns.alidns.com:853",
        "*.aliapp.org": "quic://dns.alidns.com:853",
        "+.tanx.com": "quic://dns.alidns.com:853",
        "+.hellobike.com": "quic://dns.alidns.com:853",
        "*.hichina.com": "quic://dns.alidns.com:853",
        "*.yunos.com": "quic://dns.alidns.com:853",
        "*.qcloud.com": "https://doh.pub/dns-query",
        "*.gtimg.cn": "https://doh.pub/dns-query",
        "*.gtimg.com": "https://doh.pub/dns-query",
        "*.gtimg.com.cn": "https://doh.pub/dns-query",
        "*.gdtimg.com": "https://doh.pub/dns-query",
        "*.idqqimg.com": "https://doh.pub/dns-query",
        "*.udqqimg.com": "https://doh.pub/dns-query",
        "*.igamecj.com": "https://doh.pub/dns-query",
        "+.myapp.com": "https://doh.pub/dns-query",
        "*.myqcloud.com": "https://doh.pub/dns-query",
        "+.dnspod.com": "https://doh.pub/dns-query",
        "*.qpic.cn": "https://doh.pub/dns-query",
        "*.qlogo.cn": "https://doh.pub/dns-query",
        "+.qq.com": "https://doh.pub/dns-query",
        "+.qq.com.cn": "https://doh.pub/dns-query",
        "*.qqmail.com": "https://doh.pub/dns-query",
        "+.qzone.com": "https://doh.pub/dns-query",
        "*.tencent-cloud.net": "https://doh.pub/dns-query",
        "*.tencent-cloud.com": "https://doh.pub/dns-query",
        "+.tencent.com": "https://doh.pub/dns-query",
        "+.tencent.com.cn": "https://doh.pub/dns-query",
        "+.tencentmusic.com": "https://doh.pub/dns-query",
        "+.weixinbridge.com": "https://doh.pub/dns-query",
        "+.weixin.com": "https://doh.pub/dns-query",
        "+.weiyun.com": "https://doh.pub/dns-query",
        "+.soso.com": "https://doh.pub/dns-query",
        "+.sogo.com": "https://doh.pub/dns-query",
        "+.sogou.com": "https://doh.pub/dns-query",
        "*.sogoucdn.com": "https://doh.pub/dns-query",
        "*.roblox.cn": "https://doh.pub/dns-query",
        "+.robloxdev.cn": "https://doh.pub/dns-query",
        "+.wegame.com": "https://doh.pub/dns-query",
        "+.wegame.com.cn": "https://doh.pub/dns-query",
        "+.wegameplus.com": "https://doh.pub/dns-query",
        "+.cdn-go.cn": "https://doh.pub/dns-query",
        "*.tencentcs.cn": "https://doh.pub/dns-query",
        "*.qcloudimg.com": "https://doh.pub/dns-query",
        "+.dnspod.cn": "https://doh.pub/dns-query",
        "+.anticheatexpert.com": "https://doh.pub/dns-query",
        "url.cn": "https://doh.pub/dns-query",
        "*.qlivecdn.com": "https://doh.pub/dns-query",
        "*.tcdnlive.com": "https://doh.pub/dns-query",
        "*.dnsv1.com": "https://doh.pub/dns-query",
        "upos-sz-mirrorali.bilivideo.com": "quic://dns.alidns.com:853",
        "upos-sz-estgoss.bilivideo.com": "quic://dns.alidns.com:853",
        "upos-sz-mirrorbd.bilivideo.com": "180.76.76.76",
        "upos-sz-mirrorbos.bilivideo.com": "180.76.76.76",
        "acg.tv": "https://doh.pub/dns-query",
        "b23.tv": "https://doh.pub/dns-query",
        "+.bilibili.cn": "https://doh.pub/dns-query",
        "+.bilibili.com": "https://doh.pub/dns-query",
        "*.acgvideo.com": "https://doh.pub/dns-query",
        "*.bilivideo.com": "https://doh.pub/dns-query",
        "*.bilivideo.cn": "https://doh.pub/dns-query",
        "*.bilivideo.net": "https://doh.pub/dns-query",
        "*.hdslb.com": "https://doh.pub/dns-query",
        "*.biliimg.com": "https://doh.pub/dns-query",
        "*.biliapi.com": "https://doh.pub/dns-query",
        "*.biliapi.net": "https://doh.pub/dns-query",
        "+.biligame.com": "https://doh.pub/dns-query",
        "*.biligame.net": "https://doh.pub/dns-query",
        "+.bilicomic.com": "https://doh.pub/dns-query",
        "+.bilicomics.com": "https://doh.pub/dns-query",
        "*.bilicdn1.com": "https://doh.pub/dns-query",
        "+.mi.com": "https://doh.pub/dns-query",
        "+.duokan.com": "https://doh.pub/dns-query",
        "*.mi-img.com": "https://doh.pub/dns-query",
        "*.mi-idc.com": "https://doh.pub/dns-query",
        "*.xiaoaisound.com": "https://doh.pub/dns-query",
        "*.xiaomixiaoai.com": "https://doh.pub/dns-query",
        "*.mi-fds.com": "https://doh.pub/dns-query",
        "*.mifile.cn": "https://doh.pub/dns-query",
        "*.mijia.tech": "https://doh.pub/dns-query",
        "+.miui.com": "https://doh.pub/dns-query",
        "+.xiaomi.com": "https://doh.pub/dns-query",
        "+.xiaomi.cn": "https://doh.pub/dns-query",
        "+.xiaomi.net": "https://doh.pub/dns-query",
        "+.xiaomiev.com": "https://doh.pub/dns-query",
        "+.xiaomiyoupin.com": "https://doh.pub/dns-query",
        "+.bytedance.com": "180.184.2.2",
        "*.bytecdn.cn": "180.184.2.2",
        "*.volccdn.com": "180.184.2.2",
        "*.toutiaoimg.com": "180.184.2.2",
        "*.toutiaoimg.cn": "180.184.2.2",
        "*.toutiaostatic.com": "180.184.2.2",
        "*.toutiaovod.com": "180.184.2.2",
        "*.toutiaocloud.com": "180.184.2.2",
        "+.toutiaopage.com": "180.184.2.2",
        "+.feiliao.com": "180.184.2.2",
        "+.iesdouyin.com": "180.184.2.2",
        "*.pstatp.com": "180.184.2.2",
        "+.snssdk.com": "180.184.2.2",
        "*.bytegoofy.com": "180.184.2.2",
        "+.toutiao.com": "180.184.2.2",
        "+.feishu.cn": "180.184.2.2",
        "+.feishu.net": "180.184.2.2",
        "*.feishucdn.com": "180.184.2.2",
        "*.feishupkg.com": "180.184.2.2",
        "+.douyin.com": "180.184.2.2",
        "*.douyinpic.com": "180.184.2.2",
        "*.douyinstatic.com": "180.184.2.2",
        "*.douyincdn.com": "180.184.2.2",
        "*.douyinliving.com": "180.184.2.2",
        "*.douyinvod.com": "180.184.2.2",
        "+.huoshan.com": "180.184.2.2",
        "*.huoshanstatic.com": "180.184.2.2",
        "+.huoshanzhibo.com": "180.184.2.2",
        "+.ixigua.com": "180.184.2.2",
        "*.ixiguavideo.com": "180.184.2.2",
        "*.ixgvideo.com": "180.184.2.2",
        "*.byted-static.com": "180.184.2.2",
        "+.volces.com": "180.184.2.2",
        "+.baike.com": "180.184.2.2",
        "*.zjcdn.com": "180.184.2.2",
        "*.zijieapi.com": "180.184.2.2",
        "+.feelgood.cn": "180.184.2.2",
        "*.bytetcc.com": "180.184.2.2",
        "*.bytednsdoc.com": "180.184.2.2",
        "*.byteimg.com": "180.184.2.2",
        "*.byteacctimg.com": "180.184.2.2",
        "*.ibytedapm.com": "180.184.2.2",
        "+.oceanengine.com": "180.184.2.2",
        "+.91.com": "180.76.76.76",
        "+.hao123.com": "180.76.76.76",
        "+.baidu.cn": "180.76.76.76",
        "+.baidu.com": "180.76.76.76",
        "+.iqiyi.com": "180.76.76.76",
        "*.iqiyipic.com": "180.76.76.76",
        "*.baidubce.com": "180.76.76.76",
        "*.bcelive.com": "180.76.76.76",
        "*.baiducontent.com": "180.76.76.76",
        "*.baidustatic.com": "180.76.76.76",
        "*.bdstatic.com": "180.76.76.76",
        "*.bdimg.com": "180.76.76.76",
        "*.bcebos.com": "180.76.76.76",
        "*.baidupcs.com": "180.76.76.76",
        "*.baidubcr.com": "180.76.76.76",
        "*.yunjiasu-cdn.net": "180.76.76.76",
        "+.tieba.com": "180.76.76.76",
        "+.xiaodutv.com": "180.76.76.76",
        "*.shifen.com": "180.76.76.76",
        "*.jomodns.com": "180.76.76.76",
        "*.bdydns.com": "180.76.76.76",
        "*.jomoxc.com": "180.76.76.76",
        "*.duapp.com": "180.76.76.76",
        "*.antpcdn.com": "180.76.76.76",
        "*.qhimg.com": "https://doh.360.cn/dns-query",
        "*.qhimgs.com": "https://doh.360.cn/dns-query",
        "*.qhimgs?.com": "https://doh.360.cn/dns-query",
        "*.qhres.com": "https://doh.360.cn/dns-query",
        "*.qhres2.com": "https://doh.360.cn/dns-query",
        "*.qhmsg.com": "https://doh.360.cn/dns-query",
        "*.qhstatic.com": "https://doh.360.cn/dns-query",
        "*.qhupdate.com": "https://doh.360.cn/dns-query",
        "*.qihucdn.com": "https://doh.360.cn/dns-query",
        "+.360.com": "https://doh.360.cn/dns-query",
        "+.360.cn": "https://doh.360.cn/dns-query",
        "+.360.net": "https://doh.360.cn/dns-query",
        "+.360safe.com": "https://doh.360.cn/dns-query",
        "*.360tpcdn.com": "https://doh.360.cn/dns-query",
        "+.360os.com": "https://doh.360.cn/dns-query",
        "*.360webcache.com": "https://doh.360.cn/dns-query",
        "+.360kuai.com": "https://doh.360.cn/dns-query",
        "+.so.com": "https://doh.360.cn/dns-query",
        "+.haosou.com": "https://doh.360.cn/dns-query",
        "+.yunpan.cn": "https://doh.360.cn/dns-query",
        "+.yunpan.com": "https://doh.360.cn/dns-query",
        "+.yunpan.com.cn": "https://doh.360.cn/dns-query",
        "*.qh-cdn.com": "https://doh.360.cn/dns-query",
        "+.baomitu.com": "https://doh.360.cn/dns-query",
        "+.qiku.com": "https://doh.360.cn/dns-query",
        "+.securelogin.com.cn": ['system://', 'system', 'dhcp://system'],
        "captive.apple.com": ['system://', 'system', 'dhcp://system'],
        "hotspot.cslwifi.com": ['system://', 'system', 'dhcp://system'],
        "*.m2m": ['system://', 'system', 'dhcp://system'],
        "injections.adguard.org": ['system://', 'system', 'dhcp://system'],
        "local.adguard.org": ['system://', 'system', 'dhcp://system'],
        "*._tcp": ['system://', 'system', 'dhcp://system'],
        "*.bogon": ['system://', 'system', 'dhcp://system'],
        "*._msdcs": ['system://', 'system', 'dhcp://system']
    };
    params.dns["nameserver-policy"] = nameserverPolicy;
}

// 覆写hosts
function overwriteHosts (params) {
    const hosts = {
        "dns.alidns.com": ['223.5.5.5', '223.6.6.6', '2400:3200:baba::1', '2400:3200::1'],
        "doh.pub": ['120.53.53.53', '1.12.12.12']
    };
    params.hosts = hosts;
}

// 覆写Tunnel
function overwriteTunnel (params) {
    const tunnelOptions = {
        enable: true,
        stack: "system",
        device: "tun0",
        "dns-hijack": ["any:53", "tcp://any:53"],
        "auto-route": true,
        "auto-detect-interface": true,
        "strict-route": true,
        // 根据自己环境来看要排除哪些网段
        "route-exclude-address": [],
    };
    params.tun = { ...tunnelOptions };
}

function getProxiesByRegex (params, regex) {
    const matchedProxies = params.proxies.filter ((e) => regex.test (e.name)).map ((e) => e.name);
    return matchedProxies.length > 0 ? matchedProxies : ["COMPATIBLE"];
}

function getManualProxiesByRegex (params, regex) {
    const matchedProxies = params.proxies.filter ((e) => regex.test (e.name)).map ((e) => e.name);
    return matchedProxies.length > 0 ? matchedProxies : ["COMPATIBLE"];
}
