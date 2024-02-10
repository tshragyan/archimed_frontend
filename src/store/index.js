import {createStore} from "vuex";
import axios from "axios";
import constants from "@/constants";

export default createStore({
    state: {
        loading: true,
        tasks: [],
        message: '',
        page: 1,
        totalPages: 0,
        sort: '',
        direction: '',
        token: null,
    },
    mutations: {
        addTask(state, task) {
            state.tasks.push(task)
        },
        addMessage(state, message) {
            state.message = message
        },
        setTasks(state, tasks) {
            state.tasks = tasks
        },
        setPage(state, page) {
            state.page = page
        },
        setTotalPages(state, totalPages) {
            state.totalPages = totalPages
        },
        setLoading(state, loading) {
            state.loading = loading
        },
        setSort(state, sort) {
            state.sort = sort
            state.direction = 'asc'
        },
        changeDirection(state) {
            state.direction = state.direction === 'asc' ? 'desc' : 'asc'
        },
        setToken(state, token) {
            state.token = token
        },
    },
    actions: {
        async fetchTasks(context) {
            let query= `?page=${this.state.page}`

            if (this.state.sort) {
                query += `&sort=${this.state.sort}`
            }

            if (this.state.direction) {
                query += `&order=${this.state.direction}`
            }

            await axios.get(`${constants.api_url}/get-tasks${query}`)
                .then(response => {
                    if (response.data.success) {
                        context.commit('setTasks', response.data.tasks)
                        context.commit('setTotalPages', response.data.total_pages)
                        context.commit('setLoading', false)
                    }
                })
                .catch(() => {
                    context.commit('addMessage', 'something went wrong')
                })
        },
        async createTask(context, task) {
            const formData = new FormData()
            formData.set('name', task.name)
            formData.set('email', task.email)
            formData.set('text', task.text)
            await axios.post(`${constants.api_url}/create-task`, formData)
                .then(response => {
                    if (response.data.success) {
                        context.commit('addTask', response.data.task)
                        context.commit("addMessage", 'Task Added')
                    }
                })
                .catch(() => {
                    context.commit('addMessage', 'Something went wrong')
                })
        },
        async loginUser(context, data) {
            let logged = false
            const formData = new FormData()
            formData.set('email', data.login)
            formData.set('password', data.password)
           await axios.post(`${constants.api_url}/login`, formData)
                .then(response => {
                    context.commit('setToken', response.data.token)
                    logged = true
                })
                .catch(() => {
                    context.commit('addMessage', 'something went wrong')

                })
            return logged
        },

        async updateTask(context, data) {
            const formData = new FormData()
            formData.set('text', data.text)
            formData.set('status', Number(data.status))
            await axios.put(`${constants.api_url}/update-task/${data.id}`, formData, {
                headers: {
                    'Authorization': `Bearer ${context.getters.getToken}`,
                    'Content-Type': `application/json`,
                },
            })
                .then(response => {
                    if (response.data.success) {
                        context.commit('addMessage', 'task Updated')
                    }
                })
                .catch(() => {
                    context.commit('addMessage', 'something went wrong')
                })
        }
    },
    getters: {
        getMessage: (state) => state.message,
        getTasks: (state) => state.tasks,
        getTotalPages: (state) => state.totalPages,
        getPage: (state) => state.page,
        getLoading: (state) => state.loading,
        getSort: (state) => state.sort,
        getToken: (state) => state.token,
        findTask: (state) => (id) => state.tasks.find(i => i.id == id),
    }

})