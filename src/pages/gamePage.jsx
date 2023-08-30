import { Alert, Card, Carousel, Descriptions, Image } from "antd";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux"

import BackButton from "../components/backButton";
import LoadingPage from "./loadingPage";
import {setGameFromLocalStorage, fetchGame} from '../store/slice/pageGameSlice'

export default function GamePage() {

    const dispatch = useDispatch();

    const status = useSelector(state => state.pageGame.status);
    const game = useSelector(state => state.pageGame.game);

    useEffect(() => {
        let urlArr = document.URL.split('/');
        let id = urlArr[urlArr.length -1];
        if(Boolean(localStorage.getItem(id))){
            dispatch(setGameFromLocalStorage(JSON.parse(localStorage.getItem(id)).game))
        }else {
            dispatch(fetchGame(id));
        }
    }, [dispatch])

    useEffect(() => {
        if(game){
            if(!(localStorage.getItem(game.id))){
                localStorage.setItem(game.id, JSON.stringify({'date': Date.now(), 'game': game}))
            }
        }
    }, [game]);

    useEffect(() => {

        function checkExpire() {
            
            let now = Date.now();
            let keys = Object.keys(localStorage);

            for(let key of keys) {
                if( now - JSON.parse(localStorage.getItem(key)).date >= 300000){
                    localStorage.removeItem(key);
                }
            }

        }

        setInterval(checkExpire, 60000);
    },[])

    const options = {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        timezone: 'UTC'
      };

    if (status === 'loading'){
        return(
            <LoadingPage/>
        )
    }

    return(
        game ?
        <Card className="game-page">
            <BackButton/>
            <div className="game-page-main">
                <img src= {game.thumbnail} alt={game.title} style={{width: 365, height: 205}}/>
                <Descriptions title = {game.title} column={1} size="middle" style={{width: '300px'}} >
                    <Descriptions.Item label = 'Жанр'>{game.genre}</Descriptions.Item>
                    <Descriptions.Item label = 'Платформа'>{game.platform}</Descriptions.Item>
                    <Descriptions.Item label = 'Дата выхода'>{new Date(game.release_date).toLocaleString('ru', options)}</Descriptions.Item>
                    <Descriptions.Item label = 'Издатель'>{game.publisher}</Descriptions.Item>
                    <Descriptions.Item label = 'Разработчик'>{game.developer}</Descriptions.Item>
                </Descriptions>
            </div>
            <div className="game-page-carousel">
                <Carousel
                    autoplay = {true}
                    >
                    {game.screenshots.map((item) => {
                        return <Image src={item.image} alt={game.title} style={{width: "100%", height: "100%"}}  key={item.id} />
                    })}
                </Carousel>
            </div>
            {game.platform === 'Web Browser' ? null :
            <Descriptions title = 'Минимальные системные требования' column={1} size="middle" style={{width: 'max(50%, 300px)', margin: 'auto'}} >
                <Descriptions.Item label = 'ОС'>{game.minimum_system_requirements.os}</Descriptions.Item>
                <Descriptions.Item label = 'Процессор'>{game.minimum_system_requirements.processor}</Descriptions.Item>
                <Descriptions.Item label = 'Оперативная память'>{game.minimum_system_requirements.memory}</Descriptions.Item>
                <Descriptions.Item label = 'Видеокарта'>{game.minimum_system_requirements.graphics}</Descriptions.Item>
                <Descriptions.Item label = 'Место на диске'>{game.minimum_system_requirements.storage}</Descriptions.Item>
            </Descriptions>}
        </Card>

        :

        <Alert style={{width: '80%' , marginBottom: 30, alignSelf: 'center'}} type="warning" showIcon = {true} message = 'Что-то пошло не так, попробуйте позже'/>
    )
}