<template>
  <div class="detail4">
    <div class="sell-info">
      <div class="info-center">
        <span class="info-moniter">监控</span>
        <img :src="moniterImgUrl" alt="" class="moniter-icon" />
        <span style="color: #FFFFFF">远程挪车</span>
        <div class="info-urgent">
          <img :src="urgentImgUrl" alt="" class="urgent-icon" />
          <span>紧急求助</span>
        </div>
      </div>
    </div>
    <div class="main">
      <leftScreen></leftScreen>
      <!-- <rightScreen></rightScreen> -->
    </div>
  </div>
</template>

<script>
import leftScreen from "./leftScreen";
export default {
  name: "detail4",
  components: { leftScreen },
  data() {
    return {
      moniterImgUrl: require("../../static/icon_right.png"),
      urgentImgUrl: require("../../static/icon_urgent.png")
    };
  },
  // 监听
  computed: {},
  // 监控
  watch: {},
  // 方法
  methods: {},
  // 生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {}
};
</script>
<style scoped>
p {
  margin: 0;
  padding: 0;
}
.sell-info {
  width: 100%;
}
.info-center {
  display: flex;
  width: 1136px;
  height: 24px;
  margin: 48px 24px 0 24px;
  padding: 0 0 24px 0;
  border-bottom: #25283b 1px solid;
}
.info-moniter {
  margin: 0 12px 0 0;
  color: #6b719b;
}
.moniter-icon {
  width: 10px;
  height: 10px;
  margin: 7px 12px 7px 0;
}
.info-urgent {
  margin-left: auto;
  color: #f19744;
  font-size: 14px;
}
.urgent-icon {
  margin: 0 8px -4px 0;
}
.detail4 {
  width: 1184px;
  height: 100%;
}
.main {
  width: 100%;
  height: 863px;
  display: flex;
}
</style>
