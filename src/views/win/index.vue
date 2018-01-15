<template lang="html">
<div id="win">
      <div class="desktop">
          <div id="win10-shortcuts" class="shortcuts-hidden">
              <div class="shortcut"
                   onclick="Win10.openUrl('/#/equipment/index',
                   '<img class=\'icon\' src=\'static/win/img/icon/icon1.png\'/>设备管理')">
                  <img class="icon" src="static/win/img/icon/icon1.png"/>
                  <div class="title" >设备管理</div>
              </div>
              <div class="shortcut"
                   onclick="Win10.openUrl('/#/stationManage/index',
                   '<img class=\'icon\' src=\'static/win/img/icon/icon3.png\'/>频率台站管理')">
                  <img class="icon" src="static/win/img/icon/icon3.png"/>
                  <div class="title">频率台站管理</div>
              </div>
              <div class="shortcut"
                   onclick="Win10.openUrl('/#/dataReplay/index',
                   '<img class=\'icon\' src=\'static/win/img/icon/icon6.png\'/>数据回放')">
                  <img class="icon" src="static/win/img/icon/icon6.png"/>
                  <div class="title">数据回放</div>
              </div>
              <div class="shortcut"
                   onclick="Win10.openUrl('/#/stationShow/index',
                   '<img class=\'icon\' src=\'static/win/img/icon/icon8.png\'/>台站显示')">
                  <img class="icon" src="static/win/img/icon/icon8.png"/>
                  <div class="title">台站显示</div>
              </div>
              <div class="shortcut"
                   onclick="Win10.openUrl('/#/activities/index',
                   '<img class=\'icon\' src=\'static/win/img/icon/icon10.png\'/>重大活动保障')">
                  <img class="icon" src="static/win/img/icon/icon10.png"/>
                  <div class="title">重大活动保障</div>
              </div>
              <div class="shortcut"
                   onclick="Win10.openUrl('/#/multidimensional/index',
                   '<img class=\'icon\' src=\'static/win/img/icon/icon9.png\'/>信号多维分析')">
                  <img class="icon" src="static/win/img/icon/icon9.png"/>
                  <div class="title">信号多维分析</div>
              </div>
              <div class="shortcut"
                   onclick="Win10.openUrl('/#/stationAnalysis/index',
                   '<img class=\'icon\' src=\'static/win/img/icon/icon2.png\'/>频谱评估基站分析')">
                  <img class="icon" src="static/win/img/icon/icon2.png"/>
                  <div class="title">频谱评估基站分析</div>
              </div>

              <div class="shortcut"
                   onclick="Win10.openUrl('/#/analyse/index',
                   '<img class=\'icon\' src=\'static/win/img/icon/icon4.png\'/>频谱评估分析')">
                  <img class="icon" src="static/win/img/icon/icon4.png"/>
                  <div class="title">频谱评估分析</div>
              </div>
              <div class="shortcut"
                   onclick="Win10.openUrl('/#/skyAnalysis/index',
                   '<img class=\'icon\' src=\'static/win/img/icon/icon5.png\'/>频域空域分析')">
                  <img class="icon" src="static/win/img/icon/icon5.png"/>
                  <div class="title">频域空域分析</div>
              </div>

              <div class="shortcut"
                   onclick="Win10.openUrl('/#/stationAuxiliary/index',
                   '<img class=\'icon\' src=\'static/win/img/icon/icon7.png\'/>台站辅助选址')">
                  <img class="icon" src="static/win/img/icon/icon7.png"/>
                  <div class="title">台站辅助选址</div>
              </div>



          </div>
          <div id="win10-desktop-scene"></div>
      </div>
      <div id="win10-menu" class="hidden">
          <div class="list win10-menu-hidden animated animated-slideOutLeft">
              <div class="item"
                   onclick="Win10.exit()">
                  <i class="black icon fa fa-power-off fa-fw"></i><span class="title">关闭</span>
              </div>
          </div>
          <div class="blocks">
              <div class="menu_group">
                  <div class="title">Welcome</div>
                  <div class="block" loc="1,1" size="6,4">
                      <div class="content">
                          <div style="font-size:100px;line-height: 132px;margin: 0 auto ;display: block"
                               class="fa fa-fw fa-windows win10-block-content-text"></div>
                          <div class="win10-block-content-text" style="font-size: 22px">欢迎使用 Win10-UI</div>
                      </div>
                  </div>
              </div>
          </div>
          <div id="win10-menu-switcher"></div>
      </div>
      <div id="win10_command_center" class="hidden_right">
          <div class="title">
              <h4 style="float: left">消息中心 </h4>
              <span id="win10_btn_command_center_clean_all">全部清除</span>
          </div>
          <div class="msgs"></div>
      </div>
      <div id="win10_task_bar">
          <div id="win10_btn_group_left" class="btn_group">
              <div id="win10_btn_win" class="btn"><span class="fa fa-windows"></span></div>
              <div class="btn" id="win10-btn-browser"><span class="fa fa-internet-explorer"></span></div>
          </div>
          <div id="win10_btn_group_middle" class="btn_group"></div>
          <div id="win10_btn_group_right" class="btn_group">
              <div class="btn" id="win10_btn_time"></div>
              <div class="btn" id="win10_btn_command"><span id="win10-msg-nof" class="fa fa-comment-o"></span></div>
              <div class="btn" id="win10_btn_show_desktop"></div>
          </div>
      </div>
  </div>
</template>

<script>
export default {
  mounted() {
    Win10.onReady(function () {

        //设置壁纸
        Win10.setBgUrl({
            main: '/static/win/img/wallpapers/win-bg.png',
            mobile: '/static/win/img/wallpapers/mobile.jpg',
        });

        Win10.setAnimated([
            'animated flip',
            'animated bounceIn',
        ], 0.01);
    });
  },
}
</script>
<style scoped>
@import "../../../static/win/css/animate.css";
</style>
<style scoped>
#win *{
    -webkit-user-select:none;
    -moz-user-select:none;
    -ms-user-select:none;
    user-select:none;
}
</style>
<style>
@import "../../../static/win/css/default.css";
</style>
