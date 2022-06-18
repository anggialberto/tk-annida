// let exiting = false
import axios from 'axios';

function handleError(error) {
    console.log('[handleError]', error);
    if (axios.isCancel(error)) {
        console.log('handleError is Cancel', error)
    } else {
        const response = error.response
        let message = response?.data?.message;
        console.log('error.response', response)

        if (response && message) {
            if (message === 'jwtverification.exception.001') {
                store.dispatch(logoutSuccess());
                store.dispatch(hideAlert());
                window.location.pathName = '/';
            }
        } else {
            message = "lang.general.error";
        }
        store.dispatch(showGlobalModalResponse('Error', i18n.t(message)));
    }
}

const httpInstance = axios.create({
    timeout: 60000,
    baseURL: `${CONFIG.BASE_URL}${CONFIG.BASE_PATH}`
});

Object.setPrototypeOf(httpInstance, axios);

httpInstance.interceptors.request.use((config) => {
    const method = config.method
    const userState = store.getState().auth;
    console.log('userState', userState);

    // REQUEST WITHIN AUTHORIZATION JWT
    if (ENDPOINT_LIST_WITHOUT_JWT.findIndex((endpoint) =>
        endpoint.METHOD.includes(config.method) && endpoint.URL === config.url
    ) < 0) {
        config.headers.Authorization = `Bearer ${userState.token}`;
    }
    console.log('[REQUEST LOG INTERCEPTOR]', config)
    const data = {};
    return config
}, function (error) {
    handleError(error)
    return Promise.reject(error)
})

httpInstance.interceptors.response.use(function (res) {
    const headers = res.headers
    const config = res.config;
    const data = res?.data

    // Check access token availability
    if (headers?.access_token) {
        store.dispatch(setToken(headers.access_token))
    }

    return data;
}, function (error) {
    handleError(error)
    return Promise.reject(error)
})

export default httpInstance