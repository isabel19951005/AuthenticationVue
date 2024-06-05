const state = {
    user: JSON.parse(localStorage.getItem('user')) || { username: '', token: '' }
};

const mutations = {
    setUser(state, user) {
        state.user.username = user.username;
        localStorage.setItem('user', JSON.stringify(state.user));

    },
    clearUser(state) {
        state.user.username = '';
        localStorage.removeItem('user');
    }
};

const actions = {
    login({ commit }, user) {
        return new Promise((resolve, reject) => {
            // 模拟登录操作
            if (user.username ) {
                // 假设验证成功
                commit('setUser', user);
                resolve();
            } else {
                // 假设验证失败
                reject(new Error('Invalid login credentials'));
            }
        });
    },
    logout({ commit }) {
        commit('clearUser');
    }
};

const getters = {
    getUser(state) {
        return state.user;
    }
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
};