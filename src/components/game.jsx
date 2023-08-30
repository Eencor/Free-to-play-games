import { Descriptions } from "antd"
import Card from "antd/es/card/Card"
import { useDispatch } from "react-redux"
import { Link } from "react-router-dom"

import {fetchGame, setGameFromLocalStorage} from '../store/slice/pageGameSlice'

export default function Game({title, releaseDate, publisher, genre, image, id}) {

    const dispatch = useDispatch();

    function getGame() {
        if(Boolean(localStorage.getItem(id))){
            dispatch(setGameFromLocalStorage(JSON.parse(localStorage.getItem(id)).game))
        } else {
            dispatch(fetchGame(id));
        }
    }

    return(     
        <Card  
                hoverable = {true}
                cover = {
                    <Link to = {`${id}`} 
                        className="card-game-link" 
                        onClick={getGame}
                    >
                        <img src={image} alt={title} className="card-game-link-image"/>
                    </Link>
                }
                className="card-game"
                
            >
                <Descriptions title = {title} column={1} size="small">
                    <Descriptions.Item label = 'Жанр'>{genre}</Descriptions.Item>
                    <Descriptions.Item label = 'Издатель'>{publisher}</Descriptions.Item>
                    <Descriptions.Item label = 'Дата выхода'>{releaseDate}</Descriptions.Item>
                </Descriptions>
            </Card>
    )
}