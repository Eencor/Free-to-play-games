import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'  

export const fetchAllGames = createAsyncThunk(
    'games/fetchAllGames',
    async function() {
        const response = await fetch('https://free-to-play-games-database.p.rapidapi.com/api/games',{
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

export const fetchFilterGames = createAsyncThunk(
    'games/fetchFilterGames',
    async function(filter) {
        let url
        
        if(filter.category === ''){
            url = `https://free-to-play-games-database.p.rapidapi.com/api/games?platform=${filter.platform}&sort-by=${filter.sort}`;
        } else if(!filter.category.includes('.')){
            url = `https://free-to-play-games-database.p.rapidapi.com/api/games?platform=${filter.platform}&category=${filter.category}&sort-by=${filter.sort}`;
        } else if(filter.category.includes('.')){
            url = `https://free-to-play-games-database.p.rapidapi.com/api/filter?tag=${filter.category}&platform=${filter.platform}`;
        }

        const response = await fetch(url, {
            method: 'GET',
	        headers: {
		        'X-RapidAPI-Key': 'c6bbd931f2msh4090f63acfcbb31p18188ejsnd1dd990a9c59',
		        'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
            }
        })
        
        const data = await response.json();

        return data;
    }
)

const initialState = {
    games:[],
    currentGames: [],
    status: 'idle',
    error: null,
    gamesPerPage: 20,
    currentPage: 1,
    platform: '',
}

const gamesSlice  = createSlice({
    name: 'games',
    initialState,
    reducers:{
        currentPageGames: (state, action) => {

            let startItem = (action.payload - 1) * state.gamesPerPage;
            let lastItem = action.payload * state.gamesPerPage;

            state.currentPage = action.payload;
            state.currentGames = state.games.slice(startItem, lastItem);
            state.status = 'idle';
        },
        setGamesPerPage: (state, action) => {

            state.gamesPerPage = action.payload;
                        
        },
        setPlatform: (state, action) => {
            state.platform  = action.payload
        }
        
    },
    extraReducers: (builder) => {
        builder.addCase(fetchAllGames.pending, (state, action) => {

            state.status = 'loading'

        }).addCase(fetchAllGames.fulfilled, (state, action) => {
        
            state.status = 'resolved';
            state.games = action.payload;
                 
        }).addCase(fetchAllGames.rejected, (state, action) => {

            state.status = 'error';
            state.error = action.error.message

        }).addCase(fetchFilterGames.pending, (state, action) => {

            state.status = 'loading'

        }).addCase(fetchFilterGames.fulfilled, (state, action) => {

            if(action.payload.status === 0){
                state.status = 'no_result';
            }else{
                state.status = 'resolved';
                state.games = action.payload;
            }
            
        }).addCase(fetchFilterGames.rejected, (state, action) => {

            state.status = 'error';
            state.error = action.error.message
        })
    }
})

export const  {currentPageGames, setGamesPerPage, setPlatform} = gamesSlice.actions;
export default gamesSlice.reducer;