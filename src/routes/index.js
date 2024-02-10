import {createRouter, createWebHistory} from "vue-router";
import CreateTask from "@/pages/CreateTask.vue";
import TaskList from "@/pages/TaskList.vue";
import Login from "@/pages/Login.vue";
import Update from "@/pages/Update.vue";

export default createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            component: TaskList,
            name: 'main',
        },
        {
            path: '/create',
            component: CreateTask,
            name: 'create',
        },
        {
            path: '/login',
            component: Login,
            name: 'login',
        },
        {
            path: '/update/:id',
            component: Update,
            name: 'update',
        },
    ],
})