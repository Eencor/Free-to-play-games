import Card from "antd/es/card/Card"
import { Button, Select } from "antd"
import { useDispatch, useSelector } from "react-redux"

import {changePlatform, changeCategory, changeSort, toggleAllFilters} from '../store/slice/filterSlice'
import {fetchFilterGames} from '../store/slice/gamesSlice'

export default function Fliters(){

    const dispatch = useDispatch();

    const filter = useSelector(state => state.filter.filter);
    const allFilters = useSelector(state => state.filter.allFilters);

    const platformOptions = [{label : 'Все платформы', value: 'all'},
                            {label : 'ПК', value: 'pc'},
                            {label : 'Браузер', value: 'browser'},]

    const sortOptions = [{label : 'Релевантности', value: 'relevance'},
                        {label : 'Дате выхода', value: 'release-date'},
                        {label : 'Популярности', value: 'popularity'},
                        {label : 'Алфавиту', value: 'alphabetical'},]
     
    const categoryOptions = [{label : 'MMO', value: 'mmo'},
                            {label : 'MMORPG', value: 'mmorpg'},
                            {label : 'Shooter', value: 'shooter'},
                            {label : 'Strategy', value: 'strategy'},
                            {label : 'Moba', value: 'moba'},
                            {label : 'Card Games', value: 'card'},
                            {label : 'Racing', value: 'racing'},
                            {label : 'Sports', value: 'sports'},
                            {label : 'Social', value: 'social'},
                            {label : 'Fighting', value: 'fighting'},] 
    
    const allCategoryOptions = [{label : 'Жанры', value: 'genre', disabled: true},
                            {label : 'MMO', value: 'mmo'},
                            {label : 'MMORPG', value: 'mmorpg'},
                            {label : 'Shooter', value: 'shooter'},
                            {label : 'Strategy', value: 'strategy'},
                            {label : 'Moba', value: 'moba'},
                            {label : 'Card Games', value: 'card'},
                            {label : 'Racing', value: 'racing'},
                            {label : 'Sports', value: 'sports'},
                            {label : 'Social', value: 'social'},
                            {label : 'Fighting', value: 'fighting'},
                            {label : 'Тэги', value: 'tags', disabled: true},
                            {label : 'MMOFPS', value: 'mmofps'},
                            {label : 'Action RPG', value: 'action-rpg'},
                            {label : 'Sandbox', value: 'sandbox'},
                            {label : 'Open World', value: 'open-world'},
                            {label : 'Survival', value: 'survival'},
                            {label : 'Battle Royle', value: 'battle-royale'},
                            {label : 'MMOTPS', value: 'mmotps'},
                            {label : 'Anime', value: 'anime'},
                            {label : 'PvP', value: 'pvp'},
                            {label : 'PvE', value: 'pve'},
                            {label : 'Pixel', value: 'pixel'},
                            {label : 'MMORTS', value: 'mmorts'},
                            {label : 'Fantasy', value: 'fantasy'},
                            {label : 'Sci-fi', value: 'sci-fi'},
                            {label : 'Action', value: 'action'},
                            {label : 'Voxel', value: 'voxel'},
                            {label : 'Zombie', value: 'zombie'},
                            {label : 'Turn-Based', value: 'turn-based'},
                            {label : 'First Person View', value: 'first-person'},
                            {label : 'Third Person View', value: 'third-Person'},
                            {label : 'Top-Down View', value: 'top-down'},
                            {label : '3D Graphics', value: '3d'},
                            {label : '2D Graphics', value: '2d'},
                            {label : 'Tank', value: 'tank'},
                            {label : 'Space', value: 'space'},
                            {label : 'Sailing', value: 'sailing'},
                            {label : 'Side Scroller', value: 'side-scroller'},
                            {label : 'Superhero', value: 'superhero'},
                            {label : 'Permadeath', value: 'permadeath'},
                            {label : 'Low spec', value: 'low-spec'},
                            {label : 'Tower defense', value: 'tower-defense'},
                            {label : 'Horror', value: 'horror'},
                            {label : 'Flight', value: 'flight'},
                            {label : 'Martial Arts', value: 'martial-arts'},
                            {label : 'Military', value: 'military'}]                         
                                                    
    return(
        allFilters ? 
            <Card className="card-filter"
            bodyStyle={{display: 'flex',
                        flexWrap: 'wrap',
                        gap: 20,
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: '100%',
                        }}
            >

                <Select
                    onChange={(genre) => {dispatch(changeCategory(genre))}}
                    key={'tags'}
                    options={allCategoryOptions}
                    mode="multiple"
                    allowClear = {true}
                    placeholder = 'Выберете жанры или тэги'
                    style={{width: 400}}
                    defaultValue={filter.category ? filter.category.split('.') : undefined}
                />
            
                <Select
                    onChange={(platform) => {dispatch(changePlatform(platform))}}
                    style={{width: 180}}
                    options={platformOptions}
                    placeholder = 'Выбор платформы'
                    defaultValue={filter.platform}
                />

                <Button type="primary" onClick={() => {dispatch(fetchFilterGames(filter))}}>Применить фильтры</Button>

                <Button onClick={() => {dispatch(toggleAllFilters())}}>Убрать расширенные фильтры</Button>
            </Card>

            :

            <Card className="card-filter"
            bodyStyle={{display: 'flex',
                        flexWrap: 'wrap',
                        gap: 20,
                        justifyContent: 'center',
                        width: '100%',
                        }}
            >
            
                <Select
                    onChange={(genre) => {dispatch(changeCategory(genre))}}
                    key={'genre'}
                    options={categoryOptions}
                    allowClear = {true}
                    placeholder = 'Выберете жанр'
                    style={{width: 200}}
                    defaultValue={filter.category ? filter.category : undefined}
                />

                <Select
                    onChange={(platform) => {dispatch(changePlatform(platform))}}
                    style={{width: 180}}
                    options={platformOptions}
                    placeholder = 'Выбор платформы'
                    defaultValue={filter.platform}
                />

                <Select
                    onChange={(sort) => {dispatch(changeSort(sort))}}
                    style={{width: 150}}
                    options={sortOptions}
                    placeholder = 'Сортировать по'
                    defaultValue={filter.sort}
                />

                <Button type="primary" onClick={() => {dispatch(fetchFilterGames(filter))}}>Применить фильтры</Button>
                <Button onClick={() => {dispatch(toggleAllFilters())}}>Расширенные фильтры</Button>
            </Card>
        
    )
}