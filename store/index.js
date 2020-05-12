export const state = () => ({
	user: {},
	messages: [],
	users: []
})

export const mutations = {
	setUser (state, payload) {
		state.user = payload
	},
	clearData (state) {
		state.user = {}
		state.messages = []
		state.users = []
	},
	SOCKET_newMessage (state, payload) {
		state.messages.push(payload)
	},
	SOCKET_updateUsers (state, users) {
		state.users = users
	}
}