import { createRouter, createWebHistory } from 'vue-router'

import Dashboard from '@/views/Dashboard'
import Login from '@/views/Login'
import PageNotFound from '@/views/PageNotFound'

const router = createRouter({
	history: createWebHistory(),
	routes: [
		{ 
			path: '/dashboard', 
			alias: '/', 
			component: Dashboard, 
			name: 'homePageUrl',
			meta: { auth: true }
		},
		{
			path: '/:notFound(.*)',
			name: 'page404',
			component: PageNotFound,
			meta: { title: 'Страница не найдена' }
		},
		{ 
			path: '/login', 
			alias: '/sign-in', 
			component: Login, 
			name: 'loginUrl',
			meta: { title: 'Авторизация' }
		},
	],
	linkActiveClass: 'active',
	linkExactActiveClass: 'active'
})

router.beforeEach((to, _, next) => {

	const authToken = localStorage.getItem('token')

	if (to.meta.auth && !authToken) {
		next({ name: 'loginUrl' })
	} else if (Object.is(to.name, 'loginUrl') && authToken) {
		next({ name: 'homePageUrl' })
	} else {
		next()
	}
})

router.afterEach((to, _, next) => {
	document.title = to.meta.title || 'Tasker app'
})

export default router