import { createSlice } from '@reduxjs/toolkit'

export const searchParams = createSlice({
    name: 'params',
    initialState: {
        all: false,
        no: false,
        one: false,
        two: false,
        three: false,
        cheap: true,
        fast: false,
        maxResults: 5
    },
    reducers: {
        setNewState: (state, action) => {
            const { param } = action.payload
            state[param] = !state[param]
            if (state.no && state.one && state.two && state.three) {
                state.all = true
            } else {
                state.all = false
            }
        },
        toggleAllStatus: state => {
            const newStatus = !state.all
            state.all = newStatus
            state.no = newStatus
            state.one = newStatus
            state.two = newStatus
            state.three = newStatus
        },
        showFiveMore: state => {
            state.maxResults = state.maxResults + 5
        }
    }
})

export const { setNewState, toggleAllStatus, showFiveMore } = searchParams.actions
export default searchParams.reducer