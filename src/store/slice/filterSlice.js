import {createSlice} from '@reduxjs/toolkit'


const filterSlice = createSlice({
    name: 'filter',
    initialState: {
        filter: {
            platform : 'all',
            category: '',
            sort: 'relevance'
        },
        allFilters: false
    },
    reducers: {
        changePlatform: (state, action) => {
            state.filter.platform = action.payload
        },
        changeCategory: (state, action) => {

            if(typeof action.payload === 'string'){
                state.filter.category = action.payload
            }else if(typeof action.payload === 'undefined'){
                state.filter.category = ''
            }else{
                state.filter.category = action.payload.join('.')
            }

        },
        changeSort: (state, action) => {
            state.filter.sort = action.payload
        },
        toggleAllFilters: (state) => {
            state.allFilters = !state.allFilters
        }
    },
    extraReducers: () => {  

    }
})

export const  {changePlatform, changeCategory, changeSort, toggleAllFilters} = filterSlice.actions;
export default filterSlice.reducer;