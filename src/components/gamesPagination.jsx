import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Alert, Pagination } from 'antd'

import GameList from "./gameList"
import Fliters from "./filters";
import {currentPageGames, setGamesPerPage} from '../store/slice/gamesSlice'
import LoadingPage from "../pages/loadingPage";

export default function GamesPagination(){

    const dispatch = useDispatch();
    const games = useSelector(state => state.games.games);
    const currentGames = useSelector(state => state.games.currentGames);
    const status = useSelector(state => state.games.status);
    const currentPage = useSelector(state => state.games.currentPage);

    useEffect(() => {
        if(status === 'resolved'){
            dispatch(currentPageGames(1))
        }
    },[status, dispatch]);

    function onChangePage(page, pageSize) {
        dispatch(setGamesPerPage(pageSize));
        dispatch(currentPageGames(page));
    }

    const noResult = status === 'no_result' ? <Alert style={{width: '80%' , marginBottom: 30, alignSelf: 'center'}} type="warning" showIcon = {true} message = 'По вашему фильтру не найдено результатов, поробуйте изменить фильтр'/> : null;

    return(
        status === 'loading' ?
        <LoadingPage/>
        :
        <>
            <Fliters/>
            {noResult}
            <GameList currentGames = {currentGames}/>
            <Pagination className="pagination-games"
            onChange={onChangePage} 
            total={games.length}
            defaultPageSize={20}
            current={currentPage}
            />
        </>
    )
}