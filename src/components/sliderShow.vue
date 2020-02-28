<template>
  <div class="slide-show" @mouseover="clearInv" @mouseout="runInv">
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
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    slides: {
      type: Array,
      dafault: []
    },
    inv: {
      type: Number,
      default: 1500
    }
  },
  data() {
    return {
      nowIndex: 0,
      isShow: true
    };
  },
  // 监听
  computed: {
    prevIndex() {
      if (this.nowIndex === 0) {
        return this.slides.length - 1;
      } else {
        return this.nowIndex - 1;
      }
    },
    nextIndex() {
      if (this.nowIndex === this.slides.length - 1) {
        return 0;
      } else {
        return this.nowIndex + 1;
      }
    }
  },
  // 监控
  watch: {},
  // 方法
  methods: {
    goto(index) {
      this.isShow = false;

      setTimeout(() => {
        this.isShow = true;
        this.nowIndex = index;
        this.$emit("onchange", index);
      }, 10);
    },
    runInv() {
      this.invId = setInterval(() => {
        this.goto(this.nextIndex);
      }, this.inv);
    },
    clearInv() {
      clearInterval(this.invId);
    }
  },
  // 生命周期 - 创建完成（可以访[问当前this实例）
  created() {},
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounteds() {
    console.log(this.slides);
    this.runInv();
  }
};
</script>

<style>
.slide-trans-enter-active {
  transition: all 1s;
}
.slide-trans-enter {
  transform: translateX(800px);
}
.slide-trans-old-leave-active {
  transition: all 1s;
}
.slide-trans-old-leave {
  transform: translateX(-800px);
}
.slide-show {
  position: relative;
  margin: 0;
  width: 368px;
  height: 448px;
  overflow: hidden;
}
.slide-img img {
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
}
.slide-info {
  position: absolute;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  bottom: 0;
  width: 100%;
  height: 40px;
  line-height: 40px;
  font-size: 16px;
  padding: 0 50px;
  background-color: rgba(0, 0, 0);
}
.slide-info p {
  font-size: 18px;
  color: rgb(185, 245, 208);
}
.slide-pages {
  display: flex;
  flex-direction: row;
}
.slide-pages li {
  cursor: pointer;
  font-size: 16px;
  margin: 0 10px;
}
.slide-pages li a {
  color: #fff;
}
</style>
