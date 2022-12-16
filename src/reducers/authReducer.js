const authReducer = (state, actions) => {
    const {
        type,
        payload: {
            user, notification, loggedIn
        }
    } = actions;
    switch (type) {
        case 'user':
            return {
                ...state,
                user
            }
        case 'notification':
            return {
                ...state,
                notification
            }
        case 'log':
            return {
                ...state,
                loggedIn
            }
        default:
            return state;
    }
}

export default authReducer;