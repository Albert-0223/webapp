import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import Index from '../views/front/Index'
import Category from "../views/front/main/Category";
import Archive from "../views/front/main/Archive";
import Detail from "../views/front/main/Detail";
import Search from "../views/front/main/Search";
import Message from "../views/front/main/Message";
import About from "../views/front/other/About";
import Error from '../views/front/other/404'
import User from "../views/front/user/User";
import UserInfo from "../views/front/user/UserInfo";
import UserArticle from "../views/front/user/UserArticle";
import UserWrite from "../views/front/user/UserWrite";
import BreadCrumb from "../views/admin/other/BreadCrumb";
import Login from "../views/admin/login/Login";
import Welcome from "../views/admin/home/Welcome";
import Home from "../views/admin/Home";
import ArticleMg from "../views/admin/articeMg/ArticleList";
import Push from "../views/admin/articeMg/Write";
import Edit from "../views/admin/articeMg/Edit";
import TagMg from "../views/admin/tagMg/TagMg";
import Setting from "../views/admin/setting/Setting";
import UserCollect from "../views/front/user/UserCollect";
import UserList from "../views/admin/userMg/UserList";
import Sex from '../views/admin/statistic/Sex'
import CommentList from "../views/admin/commentMg/CommentList";
import UserPage from "../views/front/main/UserPage";
import MessageList from "../views/admin/msgMg/MessageList";
import NoticeList from "../views/admin/msgMg/NoticeList";
import TagPage from "../views/front/main/TagPage";
import CategoryStatistic from "../views/admin/statistic/CategoryStatistic";
import PvStatistic from "../views/admin/statistic/PvStatistic";
import InfoCenter from "../views/admin/other/InfoCenter";
import UserData from "../views/front/user/UserData";
import UpdateInfoDialog from "../views/admin/userMg/UpdateInfoDialog";

const routes = [
    {
        path: '/',
        component: Index
    },

    {
        path: '/article/:id',
        component: Detail,
    },
    {
        path: '/category',
        component: Category,
    },
    {
        path: '/archive',
        component: Archive,
    }, {
        path: '/search/:keyword',
        component: Search,
    },
    {
        path: '/tags/:tag',
        component: TagPage
    },
    {
        path: '/uid/:uid',
        component: UserPage
    },

    {
        path: '/user',
        component: User,
        redirect: '/user/article',
        children: [
            {path: 'info', component: UserInfo},
            {path: 'article', component: UserArticle},
            {path: 'collect', component: UserCollect},
            {path: 'write', component: UserWrite},
            {path: 'data', component: UserData},
        ]
    },
    {
        path: '/message',
        component: Message,
    }, {
        path: '/about',
        component: About,
    },
    {
        path: '/404',
        component: Error,
    },

    // admin
    {
        path: '/admin',
        component: Login,

    },

    // ????????????
    {
        path: '/mg',
        component: Home,
        redirect: '/mg/welcome',
        meta: {title: '??????'},
        children: [
            {path: 'info', component: InfoCenter, meta: {title: '????????????'}},
            {path: 'welcome', component: Welcome, meta: {title: '?????????'}},
            {
                path: 'userManager',
                component: BreadCrumb,
                meta: {title: '????????????'},
                children: [
                    {path: 'users', component: UserList, meta: {title: '????????????'}},
                    {path: 'userInfo/:uid', component: UpdateInfoDialog, meta: {title: '????????????'}}
                ]
            },
            {
                path: 'articleManager',
                component: BreadCrumb,
                meta: {title: '????????????'},
                children: [
                    {path: 'article', component: ArticleMg, meta: {title: '????????????'}},
                    {path: 'write', component: Push, meta: {title: '????????????'}},
                    {path: 'edit/:id', component: Edit, meta: {title: '????????????'}},
                ]
            },
            {
                path: 'tagManager',
                component: BreadCrumb,
                meta: {title: '????????????'},
                children: [
                    {path: 'tag', component: TagMg, meta: {title: '????????????'}}
                ]
            },
            {
                path: 'commentManager',
                component: BreadCrumb,
                meta: {title: '????????????'},
                children: [
                    {path: 'comment', component: CommentList, meta: {title: '????????????'}}
                ]
            },
            {
                path: 'msgManager',
                component: BreadCrumb,
                meta: {title: '????????????'},
                children: [
                    {path: 'message', component: MessageList, meta: {title: '????????????'}},
                    {path: 'notice', component: NoticeList, meta: {title: '????????????'}}
                ]
            },
            {
                path: 'dataManager',
                component: BreadCrumb,
                meta: {title: '????????????'},
                children: [
                    {path: 'sex', component: Sex, meta: {title: '????????????'}},
                    {path: 'category', component: CategoryStatistic, meta: {title: '????????????'}},
                    {path: 'pv', component: PvStatistic, meta: {title: '???????????????'}},
                ]
            },
            {
                path: 'settings',
                component: BreadCrumb,
                meta: {title: '????????????'},
                children: [
                    {path: 'setting', component: Setting, meta: {title: '??????'}},
                ]
            }
        ]
    },

    // ?????????404
    {
        path: '*',
        redirect: '/404'
    },


]

const router = new VueRouter({
    mode: "history",
    routes
})


// ????????????????????????
// router.beforeEach((to, from, next) => {
//     //    to ?????????????????????
//     //    from ?????????????????????????????????
//     //    next ??????????????????????????????
//     //    next() ??????  next('/login') ????????????
//     if (
//         // ???????????????????????????????????????
//         to.path == '/login' ||
//         to.path == '/blog' ||
//         to.path == '/archives' ||
//         to.path == '/tag' ||
//         to.path == '/about') {
//         return next();
//     }
//     //  ??????token??????token???????????????????????????????????????
//     const tokenStr = window.sessionStorage.getItem('token')
//     if (!tokenStr) return next('/login')
//     next()
// })

export default router
