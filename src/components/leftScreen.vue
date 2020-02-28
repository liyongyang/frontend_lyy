<template>
  <div class="main_Con">
    <div class="leftScreen">
      <div class="main_left">
        <div class="content">
          <div class="imgbox">
            <!-- <div class="slide-show" @mouseover="clearInv" @mouseout="runInv">
              <div class="slide-img">
                <a :href="slides[nowIndex].href">
                  <transition name="slide-trans">
                    <img v-if="isShow" :src="slides[nowIndex].src" />
                  </transition>
                  <transition name="slide-tra5ns-old">
                    <img v-if="!isShow" :src="slides[nowIndex].src" />
                  </transition>
                </a>
              </div>
            </div> -->
            <img :src="carImagUrl" alt srcset ref="imageTofile" />
          </div>
        </div>
        <div class="menu_left">
          <div @click="startBtn($event)">
            <div class="icon_l" :class="{ icon_l_active: isStart }">
              <img :src="startImgUrl" alt class="icon-movecar" />
            </div>
            <p class="start" v-if="isStart" v-text="stopVal"></p>
            <p class="start" v-else v-text="startVal"></p>
          </div>

          <div @click="catchBtn($event)" id="catchImg">
            <div class="icon_l" :class="{ icon_l_active: isCatch }">
              <img :src="catchImgUrl" alt class="icon-catch" />
            </div>
            <p class="catch" v-text="catchVal"></p>
          </div>
        </div>
      </div>
    </div>
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
            <div class="icon_r" v-on:click="chooseTarget">
              <img :src="chooseImgUrl" alt="" />
            </div>
            <p class="start">选取目标点</p>
          </div>
          <div class="menu_right">
            <div class="icon_r" v-on:click="addObstacleCanvas">
              <img :src="addImgUrl" />
            </div>
            <p class="start">添加障碍物</p>
          </div>
          <div class="menu_right">
            <div class="icon_r" v-on:click="deleteObstacleCanvas">
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
  </div>
</template>

<script>
import html2canvas from "html2canvas";
import MsgBus from "./utils/msgbus";
export default {
  components: {
    html2canvas
  },
  data() {
    return {
      slideSpeed: 1000,
      // slides: [
      //   { src: require("../../static/car.jpg") },
      //   { src: require("../../static/car2.jpg") },
      //   { src: require("../../static/car3.jpg") },
      //   { src: require("../../static/car4.jpg") },
      //   { src: require("../../static/car5.jpg") }
      // ],
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
      CoordinateValue: [], // 协调值
      targetValue: [], // 选取目标点数组
      addObstacle: [], // 添加障碍物数组
      deleteObstacle: [], // 删除障碍物数组
      startX: "",
      startY: "",
      endX: "",
      endY: "",
      judgeStartCanvas: false,
      isMouseDownInCanvas: "",
      isMouseUpInCanvas: ""
    };
  },
  // 监听
  computed: {},
  // 监控
  watch: {},
  // 方法
  methods: {
    //
    startBtn: function(e) {
      this.isStart = !this.isStart;
    },
    catchBtn: function(e) {
      this.isCatch = !this.isCatch;
      let _this = this;
      setTimeout(function() {
        _this.isCatch = !_this.isCatch;
      }, 300);

      // 第一个参数是需要生成截图的元素,第二个是自己需要配置的参数,宽高等
      html2canvas(this.$refs.imageTofile, {
        backgroundColor: null,
        useCORS: true // 如果截图的内容里有图片,可能会有跨域的情况,加上这个参数,解决文件跨域问题
      }).then(canvas => {
        let url = canvas.toDataURL("image/png");
        this.htmlUrl = url;
        MsgBus.$emit("catchImgInfo", _this.htmlUrl);
        // 把生成的base64位图片上传到服务器,生成在线图片地址
        // this.sendUrl();
      });
    },
    // rightScreen
    // 获取目标点
    chooseTarget() {
      this.isMouseDownInCanvas = 2;
    },
    addObstacleCanvas() {
      this.judgeStartCanvas = true;
      this.isMouseUpInCanvas = 0;
    },
    deleteObstacleCanvas() {
      this.judgeStartCanvas = true;
      this.isMouseUpInCanvas = 1;
    },
    revokeCanvas() {
      this.judgeStartCanvas = false;
      let myCanvas = this.$refs.canvasTest;
      let canvasSet = myCanvas.getContext("2d");
      canvasSet.clearRect(0, 0, 576, 701);
    },
    mousemove() {
      if (this.isMouseDownInCanvas == 1) {
        let myCanvas = this.$refs.canvasTest;
        let canvasSet = myCanvas.getContext("2d");
        let endX = event.clientX - myCanvas.getBoundingClientRect().left;
        let endY = event.clientY - myCanvas.getBoundingClientRect().top;
        canvasSet.beginPath();
        canvasSet.rect(
          this.startX,
          this.startY,
          endX - this.startX,
          endY - this.startY
        );
        canvasSet.stroke();
        this.endX = endX;
        this.endY = endY;
      }
    },
    mousedown() {
      if (this.judgeStartCanvas == true) {
        this.isMouseDownInCanvas = 1;
        let myCanvas = this.$refs.canvasTest;
        this.startX = event.clientX - myCanvas.getBoundingClientRect().left;
        this.startY = event.clientY - myCanvas.getBoundingClientRect().top;
        this.mousemove();
      }
      if (this.isMouseDownInCanvas == 2) {
        let myCanvas = this.$refs.canvasTest;
        let canvasSet = myCanvas.getContext("2d");
        this.targetValue["X"] =
          event.clientX - myCanvas.getBoundingClientRect().left;
        this.targetValue["Y"] =
          event.clientY - myCanvas.getBoundingClientRect().top;
        canvasSet.beginPath();
        canvasSet.arc(
          this.targetValue["X"],
          this.targetValue["Y"],
          10,
          0,
          2 * Math.PI
        );
        canvasSet.fillStyle = "red";
        canvasSet.fill();
        canvasSet.stroke();
        console.log("target:", this.targetValue);
      }
    },
    mouseup() {
      this.isMouseDownInCanvas = 0;
      if (this.judgeStartCanvas == true) {
        let myCanvas = this.$refs.canvasTest;
        let canvasSet = myCanvas.getContext("2d");
        this.CoordinateValue["startX"] = this.startX;
        this.CoordinateValue["startY"] = this.startY;
        this.CoordinateValue["endX"] = this.endX;
        this.CoordinateValue["endY"] = this.endY;
        if (this.isMouseUpInCanvas == 0) {
          this.addObstacle.push(this.CoordinateValue);
        } else if (this.isMouseUpInCanvas == 1) {
          canvasSet.clearRect(
            this.startX,
            this.startY,
            this.endX - this.startX,
            this.endY - this.startY
          );
          this.deleteObstacle.push(this.CoordinateValue);
          console.log("deleteData:", this.deleteObstacle);
        }
        console.log("add:", this.addObstacle);
        this.CoordinateValue = [];
      }
    }
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    // this.getFriend()
  }
};
</script>
<style scoped>
.main_Con {
  display: flex;
  flex-direction: row;
}

.leftScreen {
  width: 448px;
  height: 100%;
}

.content {
  display: flex;
  width: 400px;
  height: 480px;
  margin: 32px 24px 133px 24px;
  background-color: #222436;
  border-radius: 8px;
}

.imgbox {
  width: 368px;
  height: 448px;
  margin: 16px 0 0 16px;
  /*padding: 0 0 16px 0;*/
  background-color: #292b40;
  border-radius: 8px;
}

.imgbox > img {
  width: 100%;
  height: 100%;
}

.menu_left {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  width: 400px;
  height: 120px;
  margin: 0 auto;
  background-color: #222436;
  border-radius: 8px;
}

.icon_l {
  width: 56px;
  height: 56px;
  margin: 0 auto;
  margin-top: 18px;
  background-color: #2c2f46;
  border-radius: 100%;
}

.icon_l_active {
  width: 56px;
  height: 56px;
  margin: 0 auto;
  margin-top: 18px;
  background-color: #4c61ee;
  border-radius: 100%;
}

.icon-movecar,
.icon-catch {
  width: 24px;
  height: 24px;
  margin: 16px;
}

.start,
.catch {
  text-align: center;
  margin: 0 auto;
  margin-top: 8px;
  padding: 0 0;
  font-size: 14px;
}

/* rightScreen */
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
  position: relative;
  width: 576px;
  height: 701px;
  border-radius: 8px;
  margin: 16px 0 0 16px;
  background-color: #292b40;
}
#canvasTest {
  position: absolute;
  top: 0;
  left: 0;
}
.con_left > img {
  width: 100%;
  height: 100%;
}

.con_right {
  width: 120px;
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
