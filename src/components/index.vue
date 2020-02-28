<template>
  <div class="index">
    <div class="header">
      <div class="header-logo">
        <img :src="logoImgUrl" />
      </div>
      <div class="header-user">
        <div class="loginOut"></div>
        <p>用户名</p>
        <p>|</p>
        <a href="">退出</a>
      </div>
    </div>
    <div class="detail-warp" id="pages">
      <div class="de-left" id="side-menu">
        <div v-for="menu in menus">
          <div
            class="menu-unit"
            id="menu-url"
            v-bind:class="{ 'menu-active': menu.active && !menu.secondMenus }"
            v-on:click="showToggle(menu)"
          >
            <div>
              <img class="menu_icon" :src="menu.icon" alt="" srcset="" />
              <span class="">{{ menu.text }}</span>
            </div>
            <img
              :class="menu.active ? 'menu_upIcon' : 'menu_downIcon'"
              :src="menu.downIcon"
              alt=""
              srcset=""
            />
          </div>

          <ul id="side-second-menu" v-if="menu.secondMenus && menu.active">
            <div
              class="menu_item"
              v-for="secMenu in menu.secondMenus"
              v-on:click="showToggle(menu, secMenu)"
              v-bind:class="{ 'menu-active': secMenu.active }"
            >
              <router-link :to="{ path: secMenu.path }" tag="li">{{
                secMenu.text
              }}</router-link>
            </div>
          </ul>
        </div>
      </div>
      <div class="de-right">
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      menus: [
        {
          text: "运营",
          icon: require("../../static/icon_moniter.png"),
          downIcon: require("../../static/icon_dropdown.png"),
          active: false,
          secondMenus: [
            { text: "车队", path: "detail1", active: false },
            { text: "场地", path: "detail2", active: false }
          ]
        },
        {
          text: "监控",
          icon: require("../../static/icon_moniter.png"),
          downIcon: require("../../static/icon_dropdown.png"),
          active: false,
          secondMenus: [
            { text: "车辆状态", path: "detail3", active: false },
            { text: "远程挪车", path: "detail4", active: false }
          ]
        }
      ],
      logoImgUrl: require("../../static/new-logo-blue-big.png")
    };
  },
  methods: {
    showToggle: function(menu, secMenu) {
      // 如果传入了二级菜单
      if (secMenu) {
        secMenu.active = true;
        // 更新menus数据
        this.refreshMenuTree(this.menus, menu, secMenu);
      } else {
        if (menu.secondMenus) {
          menu.active = !menu.active;
        } else {
          menu.active = true;
          // 更新menus数据
          this.refreshMenuTree(this.menus, menu, secMenu);
        }
      }
    },
    refreshMenuTree(menus, menu, secMenu) {
      // 开始遍历
      menus.forEach(
        function(item) {
          // 如果菜单项不等于传入的一级菜单项或二级菜单项，则active置为false
          if (
            !(
              item === menu ||
              item === secMenu ||
              (item.secondMenus && item.active)
            )
          ) {
            item.active = false;
          }

          // 如果菜单项包含二级菜单列表，则遍历此列表
          if (item.secondMenus) {
            this.refreshMenuTree(item.secondMenus, menu, secMenu);
          }
          // 使用.bind(this)给函数的this绑定为外层的作用域，要不然this.refreshMenuTree方法取不到
        }.bind(this)
      );
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.index {
  margin: 0 auto;
  width: 1440px;
  height: 1024px;
}
.header {
  display: flex;
  width: 100%;
  height: 64px;
  background-color: #25283d;
}
.header-logo {
  width: 256px;
  height: 100%;
  background-color: rgba(37, 77, 150, 1);
}
.header-logo img {
  width: 73px;
  height: 44px;
  margin: 10px 0 0 0;
}
.header-user {
  display: flex;
  width: 159px;
  height: 24px;
  font-size: 14px;
  margin-left: auto;
}
.loginOut {
  width: 24px;
  height: 24px;
  border-radius: 100%;
  margin: 20px 8px 20px 0;
  background-color: #a9b8cf;
}
.header-user p,
.header-user a {
  margin: 22px 16px 0 0;
}
.header-user a {
  margin: 21px 0 21px 0;
  color: #4c61ee;
  text-decoration: none;
}
.detail-warp {
  width: 100%;
  height: 960px;
  display: flex;
  flex-direction: row;
  background-color: #1c1e2e;
}
.de-left {
  width: 256px;
  height: 100%;
  background-color: #25283b;
}
.de-right {
  width: 1184px;
  height: 100%;
}
.menu-unit {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 40px 24px 10px 35px;
}
.menu_icon {
  width: 16px;
  height: 16px;
  margin-right: 10px;
}
.menu_downIcon {
  width: 12px;
  height: 12px;
}
.menu_upIcon {
  width: 12px;
  height: 12px;
  transform: rotate(180deg);
}
#side-second-menu {
  padding: 0;
}
.menu_item {
  list-style: none;
  cursor: pointer;
  font-size: 14px;
  color: #6b719b;
  height: 56px;
  line-height: 50px;
  text-align: left;
  padding-left: 70px;
}
.menu-active {
  border-left: 4px solid #4c61ee;
  background-color: #2b2d41;
}
li {
  list-style: none;
}
</style>
