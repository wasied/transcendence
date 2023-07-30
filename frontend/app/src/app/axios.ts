import axios from 'axios';

const instance = axios.create({
	baseURL: `http://localhost:8080`,
	headers: {
		"Content-Type": "application/json"
	},
	withCredentials: true
});

export function setAuthToken(authToken: string) {
	instance.defaults.headers.common["Authorization"] = `Bearer ${authToken}`;
}

export default instance;
