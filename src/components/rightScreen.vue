<template>
  <div class="rightScreen">
    <div class="main_right">
      <div
        class="con_left"
        @mousedown="mousedown"
        @mousemove="mousemove"
        @mouseup="mouseup"
      >
        <img :src="htmlUrl" alt="" />
        <canvas
          width="576"
          height="701"
          ref="canvasTest"
          id="canvasTest"
        ></canvas>
      </div>
      <div class="con_right">
        <div class="menu_right">
          <div class="icon_r">
            <img :src="chooseImgUrl" alt="" />
          </div>
          <p class="start">选取目标点</p>
        </div>
        <div class="menu_right">
          <div class="icon_r">
            <img :src="addImgUrl" v-on:click="clickStartCanvas" />
          </div>
          <p class="start">添加障碍物</p>
        </div>
        <div class="menu_right">
          <div class="icon_r">
            <img :src="deleteImgUrl" />
          </div>
          <p class="start">删除障碍物</p>
        </div>
        <div class="menu_right">
          <div class="icon_r" v-on:click="revokeCanvas">
            <img :src="revokeImgUrl" alt="" />
          </div>
          <p class="start">撤销</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
// import { testJs } from "../../static/test";
export default {
  components: {},
  data() {
    return {
      isActive: false,
      isStart: false,
      isCatch: false,
      startVal: "开始远程挪车",
      stopVal: "退出远程挪车",
      catchVal: "捕捉",
      img: "../assets/icon_start.png",
      startImgUrl: require("../../static/icon_start_move.png"),
      catchImgUrl: require("../../static/icon_catch.png"),
      carImagUrl: require("../../static/car.jpg"),
      htmlUrl: "",
      chooseImgUrl: require("../../static/icon_choose.png"),
      addImgUrl: require("../../static/icon_add.png"),
      deleteImgUrl: require("../../static/icon_delete.png"),
      revokeImgUrl: require("../../static/icon_revoke.png"),
      currentValue: [],
      addPoints: [],
      judgeStartCanvas: false
    };
  },
  // 监听
  computed: {},
  // 监控
  watch: {},
  // 方法
  methods: {
    // rightScreen
    clickStartCanvas() {
      this.judgeStartCanvas = true;
    },
    revokeCanvas() {
      this.judgeStartCanvas = false;
      this.currentValue[0] = "";
      this.currentValue[1] = "";
      let myCanvas = this.$refs.canvasTest;
      let canvas3Set = myCanvas.getContext("2d");
      myCanvas.width = 576;
      myCanvas.height = 701;
      // myCanvas.img = htmlUrl
      canvas3Set.clearRect(0, 0, myCanvas.width, myCanvas.height);
    },
    mousedown() {
      if (this.judgeStartCanvas == true) {
        let myCanvas = this.$refs.canvasTest;
        let x = event.clientX - myCanvas.getBoundingClientRect().left;
        let y = event.clientY - myCanvas.getBoundingClientRect().top;
        this.currentValue["sX"] = x;
        this.currentValue["sY"] = y;
        this.mousemove();
      }
    },
    mousemove() {
      if (this.judgeStartCanvas == true) {
        let startX = this.currentValue["sX"];
        let startY = this.currentValue["sY"];
        let myCanvas = this.$refs.canvasTest;
        let endX = event.clientX - myCanvas.getBoundingClientRect().left;
        let endY = event.clientY - myCanvas.getBoundingClientRect().top;
        // console.log(endX,endY);
        myCanvas.width = 576;
        myCanvas.height = 701;
        let canvas3Set = myCanvas.getContext("2d");
        // canvas3Set.clearRect(0, 0, myCanvas.width, myCanvas.height);
        canvas3Set.beginPath();
        canvas3Set.rect(startX, startY, endX - startX, endY - startY);
        canvas3Set.stroke();
        this.currentValue["eX"] = endX;
        this.currentValue["eY"] = endY;
      } else {
      }
    },
    mouseup() {
      this.judgeStartCanvas = false;
      this.addPoints.push(this.currentValue);
      // this.currentValue;
      console.log(this.addPoints);
    }
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created() {
    // this.getdata = this.getImgInfo;
    // console.log(this.getdata);
  },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {}
};
</script>
<style scoped>
.rightScreen {
  width: 736px;
  height: 100%;
}
.main_right {
  width: 712px;
  height: 733px;
  display: flex;
  margin: 32px 0 0 0;
  background-color: #222436;
}
.con_left {
  width: 576px;
  height: 701px;
  border-radius: 8px;
  margin: 16px 0 0 16px;
  background-color: #292b40;
}
.con_right {
  width: 200px;
  text-align: center;
  margin: 16px 0 0 0;
}
.menu_right {
  margin: 0 0 24px 0;
}
.icon_r {
  width: 50px;
  height: 50px;
  margin: 0 auto;
  border-radius: 5px;
  background-color: #292b40;
}
.icon_r_active {
  width: 48px;
  height: 48px;
  margin: 0 auto;
  border-radius: 5px;
  border: 1px solid #4c61ee;
  background-color: #292b40;
}
.icon_r img {
  width: 24px;
  height: 24px;
  margin: 12px;
}
.start {
  margin: 8px 0 0 0;
  color: #6b719b;
}
</style>
