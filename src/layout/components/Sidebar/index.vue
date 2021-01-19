<template>
    <div :class="{'has-logo':showLogo}">
        <logo v-if="showLogo" :collapse="isCollapse" />
        <el-scrollbar wrap-class="scrollbar-wrapper">
            <el-menu
                :default-active="activeMenu"
                :collapse="isCollapse"
                :background-color="variables.menuBg"
                :text-color="variables.menuText"
                :unique-opened="true"
                :active-text-color="settings.theme"
                :collapse-transition="false"
                mode="vertical"
            >
                <sidebar-item
                    v-for="(route, index) in routerItem"
                    :key="route.path  + index"
                    :item="route"
                    :base-path="route.path"
                />
            </el-menu>
        </el-scrollbar>
    </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import Logo from "./Logo";
import SidebarItem from "./SidebarItem";
import variables from "@/assets/styles/variables.scss";
import { selectMenuList } from '@/api/menu'

export default {
    components: { SidebarItem, Logo },
    computed: {
        ...mapState(["settings"]),
        ...mapGetters(["permission_routes", "sidebar"]),
        activeMenu() {
            const route = this.$route;
            const { meta, path } = route;
            // if set path, the sidebar will highlight the path you set
            if (meta.activeMenu) {
                return meta.activeMenu;
            }
            return path;
        },
        showLogo() {
            return this.$store.state.settings.sidebarLogo;
        },
        variables() {
            return variables;
        },
        isCollapse() {
            return !this.sidebar.opened;
        }
    },
    props: {
          inputData: {
                 }
        },
    data(){
        return{
            routerItem: {},
            id:'',
        }
    },
    watch: {
        inputData(newVal){
                     this.id = newVal;
                     this.getData()
                }
         },
    mounted() {
        console.log(this.permission_routes,'permission_routes')
        this.getData()
    },
    methods:{
        getData() {
            console.log(this.$store.state.user.routerId,'user.routerId')
            // this.loading = true;
            this.id=localStorage.getItem('routerId')
            selectMenuList({
                parentMenuId:this.id
            }).then(res => {
           console.log(res,'res')
                this.routerItem=res.data


            });
        },
    }
};
</script>
