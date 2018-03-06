<template>
    <ul class="cooler">
            <div class="header1">
                <span>冷冻二次泵组</span>
            </div>
            <li v-for="(item,index) in LDECB.groupArray" :key="index">
                <div class="header2">
                    <div class="left">
                        <span class="changeBig" >{{item.name}}</span>
                         开启
                        <span class="select" v-text=" item.openCount">--</span> 台
                        <span class="controlColor" type="LDECB" >群控设置</span>
                        群控逻辑：
                        <span v-text="item.logicName"></span>
                         <!-- <span v-text="item.logicId"></span> -->
                        <span class="controlColor" onclick="LDECB_logic()">更改</span>
                        <span>待机状态：</span>
                        <a href="#" class="controlColor select">启用</a>
                        <a href="#" class="controlColor controlButton">禁用</a>
                    </div>
                    <div class="right">
                         当前：<span class="controlColor select" v-text="item.autoStatus==0?'手动':'自动'">手动</span>
                        <span class="controlColor controlButton" v-text="item.autoStatus==0?'自动':'手动'"
                        @click="mAndA">自动</span>
                    </div>
                </div>
                <div class="waterTmp">
                    <header class="backGray">
                        流量
                        <span class="select" v-text="item.flow">--</span>  <span v-text="item.unit">m³/h</span>
                        扬程
                        <span class="select" v-text="item.lift">--</span> <span v-text="item.liftUnit">MPa</span>
                    </header>
                    <header class="backGray">冷冻水供回水温差</header>
                    <div class="left">
                        <span>当前值 </span>
                        <span style="font-size: 36px;color: #04AAD2"
                        v-text="(item.currentValue==null?'--':item.currentValue.toFixed(1))">--</span>℃
                    </div>
                    <div class="right">
                        <span>预设值 </span>
                        <span style="font-size: 28px;margin-top: 10px;"
                        v-text="(item.settingValue==null?'--':item.settingValue.toFixed(1))">--</span>℃
                        <span class="bgEdit" data-bind="click:ColdConsoleBll.uptSettingValue"></span>
                    </div>
                </div>
                <div class="tmpIf">
                    <header class="backGray">
                        优化算法（
                        <span class="select" v-text="item.optimizationOpenCount">--</span> 台/
                        <span class="select" v-text="item.optimizationOpenPower">--</span> KW/
                        <span class="select" v-text="item.optimizationPowerScale">--</span> % )
                    </header>
                    <header class="backGray">温度判断</header>
                    <p v-for="(item1,index) in item.logicProcess"  :key="index" :class="item1.status==1?'select':''" >
                        ——————
                        <span v-text="item1.left">水温过高</span>-
                        <span v-text="item1.right">加机</span>
                        ——————
                    </p>
                </div>
                <div class="openNum">
                    <header class="backGray">开启台数</header>
                    <span class="select" v-text="item.openCount">--</span>
                    <span class="controlColor">→</span>
                    <span class="select" v-text="item.finallyOpenCount">--</span>
                </div>
                <div class="kw">
                    <div class="num" >
                       <header >设备编号</header>
                       <p v-for="item2 in item.equipmentArray" :key="item2.id"><span  v-text="item2.id" >--</span>#</p>
                    </div>
                    <div class="load">
                       <header>频率/Hz</header>
                       <p  v-for="item2 in item.equipmentArray" :key="item2.id"><span v-text="item2.frequency.toFixed(1)">--</span></p>
                    </div>
                    <div class="watts">
                       <header>功率kW</header>
                       <p v-for="item2 in item.equipmentArray" :key="item2.id"><span v-text="item2.power.toFixed(1)">--</span></p>
                    </div>
                    <div class="state">
                       <header>状态</header>
                       <p v-for="item2 in item.equipmentArray" :key="item2.id"><em :class="item2.status==1?'normal':item2.status==2?'wrong':''"></em></p>
                    </div>
                    <div class="switch_handle" >
                       <header>开关</header>
                       <p v-for="item2 in item.equipmentArray"
                       :key="item2.id" v-show="!item2.switchStatus">
                            <span class="controlColor controlButton"
                            v-text="item2.switchStatus==0?'开启':'关闭'">
                                关闭
                            </span>
                        </p>
                    </div>
                </div>
            </li>
        </ul>
</template>
<script>
import axios from "Axios";
axios.defaults.baseURL = "http://localhost:3000";
export default {
  data() {
    return {
      LDECB: [],
      autoBtn: 0,
    };
  },
  mounted() {
      this.getLDECB();
      var timer = setInterval(() => {
          this.getLDECB();
      }, 3000);
  },
  methods: {
    getLDECB() {
      axios.get("/api/ldecb").then(res => {
        if (res.data.result == "success") {
          this.LDECB = res.data.content;
        }
      });
    },
    mAndA(){
        console.log(1111111);
        this.autoBtn=!this.autoBtn;

    },
    autoHeight(){
        // 同列高度一致
        var waterTmp = document.getElementsByClassName("waterTmp");
        var tmpIf = document.getElementsByClassName("tmpIf");
        var openNum = document.getElementsByClassName("openNum");
        var kw = document.getElementsByClassName("kw");
        for (let i = 0; i < waterTmp.length; i++) {
            let aa = waterTmp[i].style.height = tmpIf[i].style.height = openNum[i].style.height = kw[i].clientHeight + "px";
            }
        }
    }
};
</script>
<style scoped>

</style>