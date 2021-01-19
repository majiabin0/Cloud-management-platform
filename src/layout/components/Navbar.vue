<template>
  <div class="navbar">
    <hamburger id="hamburger-container" :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />
    <div>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane :label="route.menuName" :name="route.menuId"  v-for="(route, index) in routerFirst"></el-tab-pane>
<!--        <el-tab-pane label="项目" name="second"></el-tab-pane>-->
<!--        <el-tab-pane label="配置" name="third"></el-tab-pane>-->
<!--        <el-tab-pane label="系统" name="fourth"></el-tab-pane>-->
      </el-tabs>
    </div>
    <breadcrumb id="breadcrumb-container" class="breadcrumb-container" />

    <div class="right-menu">
      <template v-if="device!=='mobile'">
        <search id="header-search" class="right-menu-item" />

        <el-tooltip content="源码地址" effect="dark" placement="bottom">
          <ruo-yi-git id="ruoyi-git" class="right-menu-item hover-effect" />
        </el-tooltip>

        <el-tooltip content="文档地址" effect="dark" placement="bottom">
          <ruo-yi-doc id="ruoyi-doc" class="right-menu-item hover-effect" />
        </el-tooltip>

        <screenfull id="screenfull" class="right-menu-item hover-effect" />

        <el-tooltip content="布局大小" effect="dark" placement="bottom">
          <size-select id="size-select" class="right-menu-item hover-effect" />
        </el-tooltip>

      </template>

      <el-dropdown class="avatar-container right-menu-item hover-effect" trigger="click">
        <div class="avatar-wrapper">
          <img :src="avatar" class="user-avatar">
          <i class="el-icon-caret-bottom" />
        </div>
        <el-dropdown-menu slot="dropdown">
          <router-link to="/user/profile">
            <el-dropdown-item>个人中心</el-dropdown-item>
          </router-link>
          <el-dropdown-item @click.native="setting = true">
            <span>布局设置</span>
          </el-dropdown-item>
          <el-dropdown-item divided @click.native="logout">
            <span>退出登录</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import Screenfull from '@/components/Screenfull'
import SizeSelect from '@/components/SizeSelect'
import Search from '@/components/HeaderSearch'
import RuoYiGit from '@/components/RuoYi/Git'
import RuoYiDoc from '@/components/RuoYi/Doc'
// import sidebar from '@/layout/components/sidebar'
import { selectFirstMenuList } from '@/api/menu'


export default {
  components: {
    Breadcrumb,
    Hamburger,
    Screenfull,
    SizeSelect,
    Search,
    RuoYiGit,
    RuoYiDoc,

  },
    props: {
        // route object
        item: {
            // type: Object,
            // required: true
        },
        isNest: {
            type: Boolean,
            default: false
        },
        basePath: {
            type: String,
            default: ''
        }
    },
    data(){
      return{
          activeName:'1',
          routerFirst: {},
          childVal:''
      }
    },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar',
      'device',
        "permission_routes",
        "sidebar"
    ]),
    setting: {
      get() {
        return this.$store.state.settings.showSettings
      },
      set(val) {
        this.$store.dispatch('settings/changeSetting', {
          key: 'showSettings',
          value: val
        })
      }
    }
  },
    mounted() {
        this.getData()
         this.activeName=localStorage.getItem('routerId')
        console.log(this.activeName,'this.activeName')
    },
    watch:{
        childVal(newVal){
          this.$emit('childValInput',this.childVal)
          }
    },
  methods: {
      getData() {
          // this.loading = true;
          selectFirstMenuList({
          }).then(res => {
              console.log(res,'routerFirst')
              this.routerFirst=res.data
          });
      },
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
      handleClick(tab, event) {
          console.log(tab, event);
          this.childVal=tab.name;
          this.activeName=tab.name
          if(tab.label=='项目'){
              this.$router.push({ path:'project/projectView'  })
          }
          this.$store.commit('SET_ID', tab.name)
          localStorage.setItem('routerId', tab.name);
      },
    async logout() {
      this.$confirm('确定注销并退出系统吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$store.dispatch('LogOut').then(() => {
          location.href = '/index';
        })
      })
    }
  }
}
</script>
<style lang="scss" scoped>
  /deep/.el-popper{
    margin-top: -50px!important;
  }
  .navbar/deep/.el-tabs__item{
    margin-bottom: 10px;
  }
  .navbar/deep/.is-top{
    margin-top: 2px;
  }
  .navbar/deep/.right-menu{
    margin-top: -67px;
  }
  .navbar/deep/.breadcrumb-container{
    margin-top: -20px;
  }
  /deep/.el-tabs__header{
    margin-left: 50px;
  }
  .app-breadcrumb.el-breadcrumb {
    display: inline-block;
    font-size: 14px;
    line-height: 50px;
    margin-left: -34px;
  }
.navbar {
  height: 95px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0,21,41,.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background .3s;
    -webkit-tap-highlight-color:transparent;

    &:hover {
      background: rgba(0, 0, 0, .025)
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background .3s;

        &:hover {
          background: rgba(0, 0, 0, .025)
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
