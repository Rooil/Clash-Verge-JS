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

// 规则覆写
function overwriteRules (params) {
// 广告拦截规则
    const adNonipRules = [  
        "RULE-SET,lanjie,AdBlock",                      // 自定拦截广告
        "RULE-SET,ban_ad,AdBlock",                      // 广告屏蔽规则，用于拦截常见广告域名
        "RULE-SET,ban_program_ad,应用净化",               // 针对程序广告的屏蔽规则
        "RULE-SET,easylist_adblock,AdBlock",            // EasyList 广告屏蔽规则，国际化广告过滤规则
        "RULE-SET,easylist_china,AdBlock",              // 针对中国地区广告的 EasyList China 屏蔽规则
        "RULE-SET,easyprivacy,隐私防护",                  // 隐私保护规则，屏蔽收集用户隐私的域名
    ];

// 在此添加自定义规则，优先级次于ad。
    const customRules = [
        // 例子：
        // "DOMAIN,baidu.com,DIRECT",
        //"GEOIP,CN,DIRECT",
      ];
// 无IP规则填写
    const nonipRules = [
        //无IP规则填写
        "RULE-SET,pikpak,PIKPAK",                      // PikPak 服务域名规则，用于代理或加速 PikPak 服务
        "RULE-SET,jp,JP",                              // 日本相关域名规则，用于优化或代理日本地区的服务
        "RULE-SET,jav,JAV",                            // JAV相关域名规则，用于优化或代理JAV域名和播放服务
        "RULE-SET,media,JAV",                          // JAV媒体播放相关域名规则，用于优化或代理媒体播放服务
        "RULE-SET,zhi,全球直连",                        // 自定直连域名
        "RULE-SET,shouxuan,节点选择",                   // 手动切换的规则组，提供自定义需求的规则配置
        "RULE-SET,local_area_network,DIRECT",          // 局域网规则，用于控制局域网内通信
        "RULE-SET,unban,DIRECT",                       // 解封规则组，代理被屏蔽的服务
        "RULE-SET,steam_cn,DIRECT",                    // Steam 中国代理规则，用于优化 Steam 在中国的访问
        "RULE-SET,game_download,DIRECT",               // 游戏下载的规则
        "RULE-SET,steam_region_check,DIRECT",          // Steam 区域检查的规则
        "RULE-SET,games,游戏平台",                      // 常见游戏服务规则，包括 Steam、Epic 等游戏平台
        "RULE-SET,epic_games,游戏平台",                 // Epic Games规则：用于匹配Epic Games相关的域名，确保其流量正确路由。
        "RULE-SET,blizzard,游戏平台",                   // Blizzard规则：用于匹配Blizzard相关的网站域名
        "RULE-SET,sony,游戏平台",                       // Sony规则：用于匹配Sony相关的域名，包括PlayStation等服务。
        "RULE-SET,xbox,游戏平台",                       // Xbox规则：用于匹配Xbox相关的网站域名
        "RULE-SET,origin,游戏平台",                     // Origin平台规则：匹配EA Origin相关域名，保障游戏及服务的正常访问。
        "RULE-SET,steam,游戏平台",                      // Steam规则：用于匹配Steam相关的域名，支持下载、登录及社区功能。
        "RULE-SET,nintendo,游戏平台",                   // 任天堂规则：匹配Nintendo相关域名，确保其在线服务正常工作。
        "RULE-SET,google_cn,谷歌CN",                   // Google 中国代理规则，用于优化 Google 在中国的访问
        "RULE-SET,google_fcm,谷歌",                    // Google FCM规则：用于匹配Google Firebase Cloud Messaging的网站域名
        "RULE-SET,google,谷歌",                        // Google 服务规则，涵盖 Google 的全球域名
        "RULE-SET,bing,微软服务",                       // 微软 Bing 代理规则，用于优化 Bing 在中国的访问
        "RULE-SET,onedrive,微软服务",                   // Onedrive 代理规则，用于优化 Onedrive 在中国的访问
        "RULE-SET,microsoft,微软服务",                  // 微软代理规则，用于优化微软在中国的访问
        "RULE-SET,apple_tv,国外媒体",                   // Apple TV规则：用于匹配Apple TV相关的网站域名
        "RULE-SET,amazon,亚马逊",                       // Amazon规则：用于匹配Amazon相关的地址段。
        "RULE-SET,apple,苹果服务",                      // Apple 服务规则，用于优化 Apple 生态（如 iCloud）的访问
        "RULE-SET,telegram,电报消息",                   // Telegram 消息服务规则
        "RULE-SET,openai,OpenAi",                      // OpenAI 服务规则（如 ChatGPT 的优化访问）
        //"RULE-SET,netease_music,网易音乐",              // 网易云音乐规则
        "RULE-SET,youtube,油管视频",                    // YouTube规则：匹配YouTube相关的域名，优化视频流播放及服务访问。
        "RULE-SET,youtube_music,油管视频",              // YouTube Music规则：用于匹配YouTube Music相关的网站域名
        "RULE-SET,netflix,奈飞视频",                    // Netflix规则：匹配Netflix相关域名，保障流媒体播放服务的顺畅。
        //"RULE-SET,bahamut,巴哈姆特",                    // Bahamut规则：用于匹配Bahamut相关的网站域名
        //"RULE-SET,bilibili,哔哩哔哩",                   // Bilibili规则：匹配Bilibili国内相关域名，支持其正常播放与服务。
        //"RULE-SET,bilibili_hmt,哔哩哔哩",               // Bilibili港澳台规则：匹配Bilibili港澳台（HMT）相关域名，支持访问区域限制内容。
        //"RULE-SET,china_media,国内媒体",                // 中国媒体规则：匹配中国国内的主流媒体域名，确保流量路由至正确的服务器。
        "RULE-SET,disney_plus,国外媒体",                // Disney Plus规则：用于匹配Disney Plus相关的网站域名
        "RULE-SET,tiktok,国外媒体",                     // TikTok规则：用于匹配TikTok相关的网站域名
        "RULE-SET,spotify,国外媒体",                    // Spotify规则：用于匹配Spotify相关的网站域名
        "RULE-SET,twitch,国外媒体",                     // Twitch规则：用于匹配Twitch相关的网站域名
        "RULE-SET,twitter,国外媒体",                    // Twitter规则：用于匹配Twitter相关的网站域名
        "RULE-SET,facebook,国外媒体",                   // Facebook规则：用于匹配Facebook相关的网站域名
        "RULE-SET,proxy_media,国外媒体",                // 代理媒体规则：用于匹配需要代理的媒体内容（如国外视频平台）的域名。
        "RULE-SET,china_domain,DIRECT",                 // 中国域名规则：匹配中国大陆的域名，保证访问国内服务时直连。
        "RULE-SET,download,DIRECT",                    // 下载规则：匹配常见的下载服务域名，优化下载流量路由。
        "RULE-SET,proxy_gfwlist,节点选择",               // GFWList代理规则：匹配被防火墙（GFW）屏蔽的网站域名，自动通过代理访问。
    ];

    const allNonipRules = [
        ...adNonipRules,
        ...customRules,
        ...nonipRules
    ];
// IP规则填写
    const ipRules = [
        // 自定义非IP规则
        "RULE-SET,google_cn_proxy_ip,谷歌CN",           // Google CN Proxy IP规则：匹配用于代理的Google CN IP地址段。
        "RULE-SET,amazon_ip,亚马逊",                    // Amazon IP规则：用于匹配Amazon的IP地址段。
        "RULE-SET,netflix_ip,奈飞视频",                 // Netflix IP规则：用于匹配Netflix相关的IP地址段。
        "RULE-SET,china_company_ip,DIRECT",            // 中国公司IP规则：匹配中国公司相关的IP地址，用于正确路由国内公司服务的流量。
        "RULE-SET,china_ip,DIRECT",                    // 中国IP规则：匹配中国大陆的IP地址段，确保流量走直连。
        "RULE-SET,china_ip_v6,DIRECT",                 // 中国IPV6规则：匹配中国大陆的IPV6地址段，确保流量走直连。
        "GEOIP,CN,DIRECT",                             // 中国域名CN相关的规则.
        "MATCH,漏网之鱼",                               // 一些涵盖不到的国外域名,走这个.
    ];

    const rules = [
        // 非ip类规则
        ...allNonipRules,
        // ip类规则
        ...ipRules
    ];

    // 自定开始
    const ruleProviders = {
        lanjie:{
            type: "http",
            behavior: "classical",
            url: "https://raw.githubusercontent.com/Rooil/Surge-ACL/refs/heads/main/Surge/okk/lanjie.list",
            path: "./rules/lanjie.txt",
            interval: 86400,
            format: "text",
            proxy: "节点选择"
         },
         // PikPak 服务域名规则，用于代理或加速 PikPak 服务
         pikpak:{
             type: "http",
             behavior: "classical",
             path: "./rules/pikpak.txt",
             url: "https://raw.githubusercontent.com/Rooil/Surge-ACL/refs/heads/main/Surge/okk/pikpak.list",
             interval: 86400,
             format: "text",
             proxy: "节点选择"
         },
         // 日本相关域名规则，用于优化或代理日本地区的服务
         jp:{
             type: "http",
             behavior: "classical",
             path: "./rules/jp.txt",
             url: "https://raw.githubusercontent.com/Rooil/Surge-ACL/refs/heads/main/Surge/okk/jp.list",
             interval: 86400,
             format: "text",
             proxy: "节点选择"
         },
         // JAV相关域名规则，用于优化或代理JAV域名和播放服务
         jav:{
             type: "http",
             behavior: "classical",
             path: "./rules/jav.txt",
             url: "https://raw.githubusercontent.com/Rooil/Surge-ACL/refs/heads/main/Surge/okk/jav.list",
             interval: 86400,
             format: "text",
             proxy: "节点选择"
         },
         // JAV媒体播放相关域名规则，用于优化或代理媒体播放服务
         media:{
             type: "http",
             behavior: "classical",
             path: "./rules/media.txt",
             url: "https://raw.githubusercontent.com/Rooil/Surge-ACL/refs/heads/main/Surge/okk/media.list",
             interval: 86400,
             format: "text",
             proxy: "节点选择"
         },
         // 自定直连域名
         zhi:{
             type: "http",
             behavior: "classical",
             path: "./rules/zhi.txt",
             url: "https://raw.githubusercontent.com/Rooil/Surge-ACL/refs/heads/main/Surge/okk/zhi.list",
             interval: 86400,
             format: "text",
             proxy: "节点选择"
         },
         // 手动切换的规则组，提供自定义需求的规则配置
         shouxuan:{
             type: "http",
             behavior: "classical",
             path: "./rules/shouxuan.txt",
             url: "https://raw.githubusercontent.com/Rooil/Surge-ACL/refs/heads/main/Surge/okk/shouxuan.list",
             interval: 86400,
             format: "text",
             proxy: "节点选择"
         },
         // 常见游戏服务规则，包括 Steam、Epic 等游戏平台
         games:{
             type: "http",
             behavior: "classical",
             path: "./rules/games.txt",
             url: "https://raw.githubusercontent.com/Rooil/Surge-ACL/refs/heads/main/Surge/Other/Games.list",
             interval: 86400,
             format: "text",
             proxy: "节点选择"
         },
     //  自定结束
 
     // 广告规则开始
         // 广告屏蔽规则，用于拦截常见广告域名
         ban_ad:{
             type: "http",
             behavior: "classical",
             path: "./rules/ban_ad.txt",
             url: "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/refs/heads/master/Clash/BanAD.list",
             interval: 86400,
             format: "text",
             proxy: "节点选择"
         },
         // EasyList 广告屏蔽规则，国际化广告过滤规则
         easylist_adblock:{
             type: "http",
             behavior: "classical",
             path: "./rules/easylist_adblock.txt",
             url: "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/refs/heads/master/Clash/BanEasyList.list",
             interval: 86400,
             format: "text",
             proxy: "节点选择"
         },
         // 针对中国地区广告的 EasyList China 屏蔽规则
         easylist_china:{
             type: "http",
             behavior: "classical",
             path: "./rules/easylist_china.txt",
             url: "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/refs/heads/master/Clash/BanEasyListChina.list",
             interval: 86400,
             format: "text",
             proxy: "节点选择"
         },
         // 针对程序广告的屏蔽规则
         ban_program_ad:{
             type: "http",
             behavior: "classical",
             path: "./rules/ban_program_ad.txt",
             url: "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/refs/heads/master/Clash/BanProgramAD.list",
             interval: 86400,
             format: "text",
            proxy: "节点选择"
         },
         // 隐私保护规则，屏蔽收集用户隐私的域名
         easyprivacy:{
             type: "http",
             behavior: "classical",
             path: "./rules/easyprivacy.txt",
             url: "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/refs/heads/master/Clash/BanEasyPrivacy.list",
             interval: 86400,
             format: "text",
            proxy: "节点选择"
         },
     // 广告规则结束
 
         // 局域网规则，用于控制局域网内通信
         local_area_network:{
             type: "http",
             behavior: "classical",
             path: "./rules/local_area_network.txt",
             url: "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/refs/heads/master/Clash/LocalAreaNetwork.list",
             interval: 86400,
             format: "text",
             proxy: "节点选择"
         },
         // 解封规则组，代理被屏蔽的服务
         unban:{
             type: "http",
             behavior: "classical",
             path: "./rules/unban.txt",
             url: "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/refs/heads/master/Clash/UnBan.list",
             interval: 86400,
             format: "text",
             proxy: "节点选择"
         },
         // Steam 中国代理规则，用于优化 Steam 在中国的访问
         steam_cn:{
             type: "http",
             behavior: "classical",
             path: "./rules/steam_cn.txt",
             url: "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/refs/heads/master/Clash/Ruleset/SteamCN.list",
             interval: 86400,
             format: "text",
             proxy: "节点选择"
         },
         // 游戏下载的规则
         game_download:{
             type: "http",  
             behavior: "classical",  
             path: "./rules/game_download.txt",  
             url: "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/refs/heads/master/Clash/Ruleset/GameDownload.list",  
             interval: 86400,  
             format: "text",  
             proxy: "节点选择"  
         },
         // Steam 区域检查的规则
         steam_region_check:{
             type: "http",  
             behavior: "classical",  
             path: "./rules/steam_region_check.txt",  
             url: "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/refs/heads/master/Clash/Ruleset/SteamRegionCheck.list",  
             interval: 86400,  
             format: "text",  
             proxy: "节点选择"  
         },
         // 中国公司IP规则：匹配中国公司相关的IP地址，用于正确路由国内公司服务的流量。
         china_company_ip:{
             type: "http",
             behavior: "classical",
             path: "./rules/china_company_ip.txt",
             url: "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/refs/heads/master/Clash/ChinaCompanyIp.list",
             interval: 86400,
             format: "text",
             proxy: "节点选择"
         },
         // 中国域名规则：匹配中国大陆的域名，保证访问国内服务时直连。
         china_domain:{
             type: "http",
             behavior: "classical",
             path: "./rules/china_domain.txt",
             url: "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/refs/heads/master/Clash/ChinaDomain.list",
             interval: 86400,
             format: "text",
             proxy: "节点选择"
         },
         // 中国IP规则：匹配中国大陆的IP地址段，确保流量走直连。
         china_ip:{
             type: "http",
             behavior: "classical",
             path: "./rules/china_ip.txt",
             url: "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/refs/heads/master/Clash/ChinaIp.list",
             interval: 86400,
             format: "text",
             proxy: "节点选择"
         },
         // 中国IPV6规则：匹配中国大陆的IPV6地址段，确保流量走直连。
         china_ip_v6:{
             type: "http",
             behavior: "classical",
             path: "./rules/china_ip_v6.txt",
             url: "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/refs/heads/master/Clash/ChinaIpV6.list",
             interval: 86400,
             format: "text",
             proxy: "节点选择"
         },
         // 下载规则：匹配常见的下载服务域名，优化下载流量路由。
         download:{
             type: "http",
             behavior: "classical",
             path: "./rules/download.txt",
             url: "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/refs/heads/master/Clash/Download.list",
             interval: 86400,
             format: "text",
             proxy: "节点选择"
         },
         // Google CN Proxy IP规则：匹配用于代理的Google CN IP地址段。
         google_cn_proxy_ip:{
             type: "http",
             behavior: "classical",
             path: "./rules/google_cn_proxy_ip.txt",
             url: "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/refs/heads/master/Clash/Ruleset/GoogleCNProxyIP.list",
             interval: 86400,
             format: "text",
             proxy: "节点选择"
         },
         // Google 中国代理规则，用于优化 Google 在中国的访问
         google_cn:{
             type: "http",
             behavior: "classical",
             path: "./rules/google_cn.txt",
             url: "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/refs/heads/master/Clash/Ruleset/GoogleCN.list",
             interval: 86400,
             format: "text",
             proxy: "节点选择"
         },
         // Google 服务规则，涵盖 Google 的全球域名
         google:{
             type: "http",
             behavior: "classical",
             path: "./rules/google.txt",
             url: "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/refs/heads/master/Clash/Ruleset/Google.list",
             interval: 86400,
             format: "text",
             proxy: "节点选择"
         },
         // Google FCM规则：用于匹配Google Firebase Cloud Messaging的IP地址段。
         google_fcm:{
             type: "http",
             behavior: "classical",
             path: "./rules/google_fcm.txt",
             url: "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/refs/heads/master/Clash/Ruleset/GoogleFCM.list",
             interval: 86400,
             format: "text",
             proxy: "节点选择"
         },
         // Adobe规则：用于匹配Adobe相关的IP地址段。
         adobe:{
             type: "http",
             behavior: "classical",
             path: "./rules/adobe.txt",
             url: "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/refs/heads/master/Clash/Ruleset/Adobe.list",
             interval: 86400,
             format: "text",
             proxy: "节点选择"
         },
         // 微软 Bing 代理规则，用于优化 Bing 在中国的访问
         bing:{
             type: "http",
             behavior: "classical",
             path: "./rules/bing.txt",
             url: "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/refs/heads/master/Clash/Bing.list",
             interval: 86400,
             format: "text",
             proxy: "节点选择"
         },
         // Onedrive 代理规则，用于优化 Onedrive 在中国的访问
         onedrive:{
             type: "http",
             behavior: "classical",
             path: "./rules/onedrive.txt",
             url: "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/refs/heads/master/Clash/OneDrive.list",
             interval: 86400,
             format: "text",
             proxy: "节点选择"
         },
         // 微软代理规则，用于优化微软在中国的访问
         microsoft:{
             type: "http",
             behavior: "classical",
             path: "./rules/microsoft.txt",
             url: "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/refs/heads/master/Clash/Microsoft.list",
             interval: 86400,
             format: "text",
             proxy: "节点选择"
         },
         // Apple 服务规则，用于优化 Apple 生态（如 iCloud）的访问
         apple:{
             type: "http",
             behavior: "classical",
             path: "./rules/apple.txt",
             url: "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/refs/heads/master/Clash/Apple.list",
             interval: 86400,
             format: "text",
             proxy: "节点选择"
         },
     // 游戏开始
         // Epic Games规则：用于匹配Epic Games相关的域名，确保其流量正确路由。
         epic_games:{
             type: "http",
             behavior: "classical",
             path: "./rules/epic_games.txt",
             url: "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/refs/heads/master/Clash/Ruleset/Epic.list",
             interval: 86400,
             format: "text",
             proxy: "节点选择"
         },
         // Blizzard规则：用于匹配Blizzard相关的IP地址段。
         blizzard:{
             type: "http",
             behavior: "classical",
             path: "./rules/blizzard.txt",
             url: "https://raw.githubusercontent.com/Rooil/ACL4SSR/refs/heads/master/Clash/Ruleset/Blizzard.list",
             interval: 86400,
             format: "text",
             proxy: "节点选择"
         },
         // Sony规则：用于匹配Sony相关的域名，包括PlayStation等服务。
         sony:{
             type: "http",
             behavior: "classical",
             path: "./rules/sony.txt",
             url: "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/refs/heads/master/Clash/Ruleset/Sony.list",
             interval: 86400,
             format: "text",
             proxy: "节点选择"
         },
         // Xbox规则：用于匹配Xbox相关的IP地址段。
         xbox:{
             type: "http",
             behavior: "classical",
             path: "./rules/xbox.txt",
             url: "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/refs/heads/master/Clash/Xbox.list",
             interval: 86400,
             format: "text",
             proxy: "节点选择"
         },
         // Origin平台规则：匹配EA Origin相关域名，保障游戏及服务的正常访问。
         origin:{
             type: "http",
             behavior: "classical",
             path: "./rules/origin.txt",
             url: "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/refs/heads/master/Clash/Ruleset/Origin.list",
             interval: 86400,
             format: "text",
             proxy: "节点选择"
         },
         // Steam规则：用于匹配Steam相关的域名，支持下载、登录及社区功能。
         steam:{
             type: "http",
             behavior: "classical",
             path: "./rules/steam.txt",
             url: "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/refs/heads/master/Clash/Ruleset/Steam.list",
             interval: 86400,
             format: "text",
             proxy: "节点选择"
         },
         // 任天堂规则：匹配Nintendo相关域名，确保其在线服务正常工作。
         nintendo:{
             type: "http",
             behavior: "classical",
             path: "./rules/nintendo.txt",
             url: "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/refs/heads/master/Clash/Ruleset/Nintendo.list",
             interval: 86400,
             format: "text",
             proxy: "节点选择"
         },
     // 游戏结束
         // Amazon规则：用于匹配Amazon相关的地址段。
         amazon:{
             type: "http",
             behavior: "classical",
             path: "./rules/amazon.txt",
             url: "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/refs/heads/master/Clash/Ruleset/Amazon.list",
             interval: 86400,
             format: "text",
             proxy: "节点选择"
         },
         // Amazon IP规则：用于匹配Amazon的IP地址段。
         amazon_ip:{
             type: "http",
             behavior: "classical",
             path: "./rules/amazon_ip.txt",
             url: "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/refs/heads/master/Clash/Ruleset/AmazonIp.list",
             interval: 86400,
             format: "text",
             proxy: "节点选择"
         },
         // Telegram 消息服务规则
         telegram:{
             type: "http",
             behavior: "classical",
             path: "./rules/telegram.txt",
             url: "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/refs/heads/master/Clash/Telegram.list",
             interval: 86400,
             format: "text",
             proxy: "节点选择"
         },
         // OpenAI 服务规则（如 ChatGPT 的优化访问）
         openai:{
             type: "http",
             behavior: "classical",
             path: "./rules/openai.txt",
             url: "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/refs/heads/master/Clash/Ruleset/OpenAi.list",
             interval: 86400,
             format: "text",
             proxy: "节点选择"
         },
         // 网易云音乐规则
         netease_music:{
             type: "http",
             behavior: "classical",
             path: "./rules/netease_music.txt",
             url: "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/refs/heads/master/Clash/Ruleset/NetEaseMusic.list",
             interval: 86400,
             format: "text",
             proxy: "节点选择"
         },
         // YouTube规则：匹配YouTube相关的域名，优化视频流播放及服务访问。
         youtube:{
             type: "http",
             behavior: "classical",
             path: "./rules/youtube.txt",
             url: "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/refs/heads/master/Clash/Ruleset/YouTube.list",
             interval: 86400,
             format: "text",
             proxy: "节点选择"
         },
         // YouTube Music规则：用于匹配YouTube Music相关的IP地址段。
         youtube_music:{
             type: "http",
             behavior: "classical",
             path: "./rules/youtube_music.txt",
             url: "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/refs/heads/master/Clash/Ruleset/YouTubeMusic.list",
             interval: 86400,
             format: "text",
             proxy: "节点选择"
         },
         // Netflix规则：匹配Netflix相关域名，保障流媒体播放服务的顺畅。
         netflix:{
             type: "http",
             behavior: "classical",
             path: "./rules/netflix.txt",
             url: "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/refs/heads/master/Clash/Ruleset/Netflix.list",
             interval: 86400,
             format: "text",
             proxy: "节点选择"
         },
         // Netflix IP规则：用于匹配Netflix相关的IP地址段。
         netflix_ip:{
             type: "http",
             behavior: "classical",
             path: "./rules/netflix_ip.txt",
             url: "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/refs/heads/master/Clash/Ruleset/NetflixIP.list",
             interval: 86400,
             format: "text",
             proxy: "节点选择"
         },
         // Apple TV规则：用于匹配Apple TV相关的IP地址段。
         apple_tv:{
             type: "http",
             behavior: "classical",
             path: "./rules/apple_tv.txt",
             url: "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/refs/heads/master/Clash/Ruleset/AppleTV.list",
             interval: 86400,
             format: "text",
             proxy: "节点选择"
         },
         // Disney Plus规则：用于匹配Disney Plus相关的IP地址段。
         disney_plus:{
             type: "http",
             behavior: "classical",
             path: "./rules/disney_plus.txt",
             url: "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/refs/heads/master/Clash/Ruleset/DisneyPlus.list",
             interval: 86400,
             format: "text",
             proxy: "节点选择"
         },
         // Bahamut规则：用于匹配Bahamut相关的IP地址段。
         bahamut:{
             type: "http",
             behavior: "classical",
             path: "./rules/bahamut.txt",
             url: "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/Ruleset/Bahamut.list",
             interval: 86400,
             format: "text",
             proxy: "节点选择"
         },
         // Bilibili规则：匹配Bilibili国内相关域名，支持其正常播放与服务。
         bilibili:{
             type: "http",
             behavior: "classical",
             path: "./rules/bilibili.txt",
             url: "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/refs/heads/master/Clash/Ruleset/Bilibili.list",
             interval: 86400,
             format: "text",
             proxy: "节点选择"
         },
         // Bilibili港澳台规则：匹配Bilibili港澳台（HMT）相关域名，支持访问区域限制内容。
         bilibili_hmt:{
             type: "http",
             behavior: "classical",
             path: "./rules/bilibili_hmt.txt",
             url: "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/refs/heads/master/Clash/Ruleset/BilibiliHMT.list",
             interval: 86400,
             format: "text",
             proxy: "节点选择"
         },
         // 中国媒体规则：匹配中国国内的主流媒体域名，确保流量路由至正确的服务器。
         china_media:{
             type: "http",
             behavior: "classical",
             path: "./rules/china_media.txt",
             url: "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/refs/heads/master/Clash/ChinaMedia.list",
             interval: 86400,
             format: "text",
             proxy: "节点选择"
         },
         // 代理媒体规则：用于匹配需要代理的媒体内容（如国外视频平台）的域名。
         proxy_media:{
             type: "http",
             behavior: "classical",
             path: "./rules/proxy_media.txt",
             url: "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/refs/heads/master/Clash/ProxyMedia.list",
             interval: 86400,
             format: "text",
             proxy: "节点选择"
         },
         // TikTok规则：用于匹配TikTok相关的IP地址段。
         tiktok:{
             type: "http",
             behavior: "classical",
             path: "./rules/tiktok.txt",
             url: "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/refs/heads/master/Clash/Ruleset/TikTok.list",
             interval: 86400,
             format: "text",
             proxy: "节点选择"
         },
         // Spotify规则：用于匹配Spotify相关的IP地址段。
         spotify:{
             type: "http",
             behavior: "classical",
             path: "./rules/spotify.txt",
             url: "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/refs/heads/master/Clash/Ruleset/Spotify.list",
             interval: 86400,
             format: "text",
             proxy: "节点选择"
         },
         // Twitch规则：用于匹配Twitch相关的IP地址段。
         twitch:{
             type: "http",
             behavior: "classical",
             path: "./rules/twitch.txt",
             url: "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/refs/heads/master/Clash/Ruleset/Twitch.list",
             interval: 86400,
             format: "text",
             proxy: "节点选择"
         },
         // Twitter规则：用于匹配Twitter相关的IP地址段。
         twitter:{
             type: "http",
             behavior: "classical",
             path: "./rules/twitter.txt",
             url: "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/refs/heads/master/Clash/Ruleset/Twitter.list",
             interval: 86400,
             format: "text",
             proxy: "节点选择"
         },
         // Facebook规则：用于匹配Facebook相关的IP地址段。
         facebook:{
             type: "http",
             behavior: "classical",
             path: "./rules/facebook.txt",
             url: "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/refs/heads/master/Clash/Ruleset/Facebook.list",
             interval: 86400,
             format: "text",
             proxy: "节点选择"
         },
         // GFWList代理规则：匹配被防火墙（GFW）屏蔽的网站域名，自动通过代理访问。
         proxy_gfwlist:{
             type: "http",
             behavior: "classical",
             path: "./rules/proxy_gfwlist.txt",
             url: "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/refs/heads/master/Clash/ProxyGFWlist.list",
             interval: 86400,
             format: "text",
             proxy: "节点选择"
         },
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
        HK: "(港|HK|hk|Hong Kong|HongKong|hongkong|🇭🇰)",
        TW: "(台|新北|彰化|TW|Taiwan|🇹🇼|🇨🇳)",
        SG: "(新加坡|坡|狮城|SG|Singapore|🇸🇬)",
        JP: "(日本|川日|东京|大阪|泉日|埼玉|沪日|深日|JP|Japan|🇯🇵)",
        KR: "(KR|Korea|KOR|首尔|韩|韓|🇰🇷)",
        US: "(美|波特兰|达拉斯|俄勒冈|凤凰城|费利蒙|硅谷|拉斯维加斯|洛杉矶|圣何塞|圣克拉拉|西雅图|芝加哥|US|United States|🇺🇸)",
        DI: "(下载|0.1|0.2|0.5|低倍率)",
        OT: "(俄|印|德|英|土|阿|拿|菲|澳|朝|泰|越|柬|爱|荷|迪|马|法|缅|孟|匈|瑞|冰|秘|United Kingdom|Turkey|Argentina|India|Poland|Israel|North Korea|Antarctica|IceLand|Nigeria)",
        NF: "(NF|奈飞|解锁|Netflix|NETFLIX|Media)",
        

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
        { name: "其它节点", regex: new RegExp(`^(?=.*${includeTerms.OT})(?!.*${excludeTerms}).*$`, "i") },
        //{ name: "其它节点", regex: new RegExp(`^(?!.*(?:${allCountryTerms}|${excludeTerms})).*$`, "i") }
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
            name: "其它地区", 
            regex: new RegExp(`^(?=.*${includeTerms.OT})(?!.*${excludeTerms}).*$`, "i"), 
            icon: "https://raw.githubusercontent.com/Orz-3/mini/master/Color/Global.png" 
        },
        { 
            name: "奈飞节点", 
            regex: new RegExp(`^(?=.*${includeTerms.NF})(?!.*${excludeTerms}).*$`, "i"), 
            icon: "https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/Color/Media.png" 
        },
        { 
            name: "下载节点", 
            regex: new RegExp(`^(?=.*${includeTerms.DI})(?!.*${excludeTerms}).*$`, "i"), 
            icon: "https://fastly.jsdelivr.net/gh/Semporia/Hand-Painted-icon@master/Social_Media/Buzznet.png" 
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
            proxies: ["手动切换", "自动选择", "DIRECT", "故障转移", "延迟最低", "负载均衡", "下载节点", "香港节点", "台湾节点", "狮城节点", "日本节点", "美国节点", "韩国节点", "其它地区",],
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
            url: "https://cp.cloudflare.com",
            interval: 300,
            tolerance: 50,
            proxies: ["下载节点",],
        },
        {
            name: "延迟最低",
            type: "url-test",
            icon: "https://fastly.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/Speedtest.png",
            url: "https://cp.cloudflare.com",
            interval: 300,
            tolerance: 100,
            proxies: [...allProxies,],
        },
        {
            name: "故障转移",
            type: "fallback",
            icon: "https://fastly.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/Round_Robin.png",
            url: "https://cp.cloudflare.com",
            interval: 300,
            tolerance: 50,
            proxies: [...allProxies,],
        },
        {
            name: "负载均衡",
            type: "load-balance",
            icon: "https://fastly.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/Final.png",
            url: "https://cp.cloudflare.com",
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
            name: "JP",
            type: "select",
            // "include-all": true,
            icon: "https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/Color/JP.png",
            proxies: ["日本手动", "手动切换", "节点选择", "日本节点",],
        
        },
        {
            name: "JAV",
            type: "select",
            // "include-all": true,
            icon: "https://siriling.github.io/my-icons/dist/icon/JavTube.png",
            proxies: ["手动切换", "节点选择", "下载节点", "香港节点", "狮城节点", "台湾节点", "日本节点", "韩国节点", "美国节点", "其它节点", "DIRECT",],
        },
        {
            name: "PIKPAK",
            type: "select",
            // "include-all": true,
            icon: "https://siriling.github.io/my-icons/dist/icon/Pikpak.png",
            proxies: ["DIRECT", "节点选择", "手动切换", "下载节点", "香港节点", "狮城节点", "台湾节点", "日本节点", "韩国节点", "美国节点", "其它节点",],
        },
        {
            name: "电报消息",
            type: "select",
            proxies: ["节点选择", "手动切换", "香港节点", "狮城节点", "台湾节点", "日本节点", "韩国节点", "美国节点", "其它节点",],
            // "include-all": true,
            icon: "https://raw.githubusercontent.com/Orz-3/mini/master/Color/Telegram.png"
        },
        {
            name: "OpenAi",
            type: "select",
            proxies: ["节点选择", "手动切换", "香港节点", "狮城节点", "台湾节点", "日本节点", "韩国节点", "美国节点", "其它节点",],
            // "include-all": true,
            icon: "https://raw.githubusercontent.com/Orz-3/mini/master/Color/OpenAI.png"
        },
        {
            name: "苹果服务",
            type: "select",
            proxies: ["DIRECT", "节点选择", "手动切换", "香港节点", "狮城节点", "台湾节点", "日本节点", "韩国节点", "美国节点", "其它节点",],
            // "include-all": true,
            icon: "https://raw.githubusercontent.com/Orz-3/mini/master/Color/Apple.png"
        },
        {
            name: "微软服务",
            type: "select",
            proxies: ["DIRECT", "节点选择", "手动切换", "香港节点", "狮城节点", "台湾节点", "日本节点", "韩国节点", "美国节点", "其它节点",],
            // "include-all": true,
            icon: "https://fastly.jsdelivr.net/gh/Orz-3/mini@master/Color/Microsoft.png"
        },
        {
            name: "油管视频",
            type: "select",
            proxies: ["节点选择", "手动切换", "香港节点", "狮城节点", "台湾节点", "日本节点", "韩国节点", "美国节点", "其它节点",],
            // "include-all": true,
            icon: "https://fastly.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/YouTube.png"
        },
        {
            name: "奈飞视频",
            type: "select",
            proxies: ["节点选择", "手动切换", "香港节点", "狮城节点", "台湾节点", "日本节点", "韩国节点", "美国节点", "其它节点",],
            // "include-all": true,
            icon: "https://fastly.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/Netflix.png"
        },
        //{
        //    name: "巴哈姆特",
        //    type: "select",
        //    proxies: ["节点选择","自动选择", "手动切换", "香港节点", "狮城节点", "台湾节点", "日本节点", "韩国节点", "美国节点", "其它节点",],
        //    // "include-all": true,
        //    icon: "https://fastly.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/Bahamut.png"
        //},
        //{
        //    name: "哔哩哔哩",
        //    type: "select",
        //    proxies: ["DIRECT", "节点选择", "手动切换", "香港节点", "狮城节点", "台湾节点", "日本节点", "韩国节点", "美国节点", "其它节点",],
        //    // "include-all": true,
        //    icon: "https://fastly.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/bilibili_2.png"
        //},
        {
            name: "国外媒体",
            type: "select",
            proxies: ["节点选择", "手动切换", "香港节点", "狮城节点", "台湾节点", "日本节点", "韩国节点", "美国节点", "其它节点",],
            // "include-all": true,
            icon: "https://fastly.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/ForeignMedia.png"
        },
        //{
        //    name: "国内媒体",
        //    type: "select",
        //    proxies: ["DIRECT", "自动选择", "节点选择", "手动切换", "香港节点", "狮城节点", "台湾节点", "日本节点", "韩国节点", "美国节点", "其它节点",],
        //    // "include-all": true,
        //    icon: "https://fastly.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/DomesticMedia.png"
        //},
        {
            name: "谷歌CN",
            type: "select",
            proxies: ["DIRECT", "自动选择", "节点选择", "手动切换", "香港节点", "狮城节点", "台湾节点", "日本节点", "韩国节点", "美国节点", "其它节点",],
            // "include-all": true,
            icon: "https://fastly.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/Google.png"
        },
        {
            name: "谷歌",
            type: "select",
            proxies: ["节点选择", "自动选择", "手动切换", "香港节点", "狮城节点", "台湾节点", "日本节点", "韩国节点", "美国节点", "其它节点",],
            // "include-all": true,
            icon: "https://fastly.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/Google_Search.png"
        },
        {
            name: "亚马逊",
            type: "select",
            proxies: ["节点选择", "自动选择", "手动切换", "香港节点", "狮城节点", "台湾节点", "日本节点", "韩国节点", "美国节点", "其它节点",],
            // "include-all": true,
            icon: "https://fastly.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/Amazon.png"
        },
        //{
        //    name: "网易音乐",
        //    type: "select",
        //    proxies: ["DIRECT", "节点选择", "手动切换", "香港节点", "狮城节点", "台湾节点", "日本节点", "韩国节点", "美国节点", "其它节点",],
        //    // "include-all": true,
        //    icon: "https://fastly.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/Netease_Music.png"
        //},
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
            proxies: ["节点选择", "DIRECT", "手动切换", "香港节点", "狮城节点", "台湾节点", "日本节点", "韩国节点", "美国节点", "其它节点",],
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
        "log-level": "error",
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