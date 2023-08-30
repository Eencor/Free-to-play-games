import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'

export const fetchGame = createAsyncThunk(
    'pageGame/fetchGame',
    async function(id) {
        const response = await fetch(`https://free-to-play-games-database.p.rapidapi.com/api/game?id=${id}`,{
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': 'c6bbd931f2msh4090f63acfcbb31p18188ejsnd1dd990a9c59',
                'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
            }
        });

        const data = await response.json();

        return data;
    }
);


const pageGameSlice  = createSlice({
    name: 'pageGame',
    initialState: {
        game: null,
        status: null,
        error: null,  
    },
    reducers:{
        setGameFromLocalStorage: (state, action) => {

            state.game = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchGame.pending, (state, action) => {

            state.status = 'loading'

        }).addCase(fetchGame.fulfilled, (state, action) => {

            state.status = 'resolved';
            state.game = action.payload;
            
        }).addCase(fetchGame.rejected, (state, action) => {

            state.status = 'error';
            state.error = action.error.message

        })
    }
})

export const  {setGameFromLocalStorage} = pageGameSlice.actions;
export default pageGameSlice.reducer;