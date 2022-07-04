import { defineStore } from 'pinia'
import { onAuthStateChanged } from 'firebase/auth'

export const useUsers = defineStore('users', {
	state: () => ({
		isAuth: false,
		isAdmin: false,
		username: null,
		userAvatar: null
	}),
	getters: {
		getIsAuth(state) {
			return state.isAuth
		},
		getUsername(state) {
			return state.username
		},
		getUserAvatar(state) {
			return state.userAvatar
		}
	},
	actions: {	
		authWatcher(auth) {			
			onAuthStateChanged(auth, (user) => {
				if (user) {					
					this.isAuth = true
					
					this.username = user.displayName
					this.userAvatar = user.photoURL
					
					localStorage.setItem('token', user.uid)					
				} else {	
					this.isAuth = false
					localStorage.removeItem('token')
				}
			})
		}
	},
})