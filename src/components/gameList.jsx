import { Content } from "antd/es/layout/layout";

import Game from "./game";

export default function GameList({currentGames}){

    const options = {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        timezone: 'UTC'
      };

    return(
        <Content className="content-gamelist">
            {currentGames.map(item => 
                <Game key = {item.id}
                    id = {item.id}
                    title = {item.title}
                    releaseDate = {new Date(item.release_date).toLocaleString('ru', options)}
                    publisher = {item.publisher}
                    genre = {item.genre}
                    image = {item.thumbnail}
            />)}
        </Content>
        )
}