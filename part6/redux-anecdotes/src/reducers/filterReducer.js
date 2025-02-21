export const filter = (content) => {
    return({
      type: 'SET_FILTER',
      payload: content
    })
}

const filterReducer = (state = '', action) => {
    switch (action.type) {
        case 'SET_FILTER':
            return action.payload
        default:
            return state
    }
}

export default filterReducer
