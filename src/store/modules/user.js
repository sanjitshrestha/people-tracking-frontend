import { getToken, setToken, removeToken } from '../../utils/auth'
import axios from 'axios'

const authURL = 'http://localhost:8082'

const state = {
    token: getToken(),
    logout(state) {
        state.token = ''
    }
}

const mutations = {
    SET_TOKEN: (state, token) => {
        state.token = token
    },
    SET_USERNAME: (state, username) => {
        state.username = username
        localStorage.setItem('username', state.username)
        console.log(localStorage.getItem('username'))
    }
}

const actions = {
    // user login
    login({ commit }, userInfo) {
        const { username, password } = userInfo
        return new Promise((resolve, reject) => {
            var params = new URLSearchParams()
            params.append('grant_type', 'password')
            params.append('username', username)
            params.append('password', password)

            return axios({
                method: 'post',
                url: `${authURL}/oauth/token`,
                auth: { username: 'tackingID', password: 'people@TD1' },
                data: params

            }).then((response) => {
                console.log(response)

                if (response.status === 200) {
                    const expires = (response.data.expires_in) / (30 * 48 * 60)
                    // let expires = 1/(30*48)
                    // api.retrieveUserByName(username).then(response=>{
                    // commit('SET_ROLE', response.data.detail);
                    // })
                    commit('SET_TOKEN', response.data.access_token)
                    commit('SET_USERNAME', username)
                    setToken(response.data.access_token, expires)
                }
                resolve(response)
            }).catch((error) => {
                console.log(error)
                reject(error)
                this.$notify.error({
                    title: 'Error',
                    message: 'Username or Password is incorrect. Try Again!!!'
                })
                console.log(error)
            })
        })
    },
    // use register
    register({ commit }, user) {
        return new Promise((resolve, reject) => {
            return axios({
                method: 'post',
                url: `${authURL}/api/register`,
                data: user

            }).then((response) => {
                console.log(response)

                resolve(response)
            })
        })
    },

    //  user logout
    logout({ commit }) {
        return new Promise((resolve, reject) => {
            removeToken()
            localStorage.removeItem('username')
            resolve()
        })
    }

}

export default {
    namespaced: true,
    state,
    mutations,
    actions }
