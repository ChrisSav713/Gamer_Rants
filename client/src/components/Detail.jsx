import React, { useEffect, useContext, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useSessionStorage } from './useStorage'
import { GameContext } from '../App'

import {
  AgeRating,
  AgeRatingCategory,
  Platform_Category,
  Game_Category,
  Game_Status,
  Image_Sizes
} from '../constants/Enums'

import AwesomeSlider from 'react-awesome-slider'
import withAutoplay from 'react-awesome-slider/dist/autoplay'
import 'react-awesome-slider/dist/styles.css'

function Detail() {
  const cont = useContext(GameContext)
  const { proxyInfo, setProxyInfo, removeProxyInfo } = cont
  const [game, setGame] = useState({})
  const { id } = useParams()

  const sendCustomRequest = async () => {
    const searchOptions = {
      clientId: proxyInfo.client_id,
      token: proxyInfo.access_token,
      endpoint: '/games',
      body: [
        `fields name, 
        age_ratings.category, age_ratings.content_descriptions.description, age_ratings.rating, age_ratings.rating_cover_url,
        cover.image_id, cover.width, cover.height,
        videos.video_id, videos.name, artworks.width, artworks.height, artworks.image_id,
        platforms.category, platforms.abbreviation, platforms.name, platforms.platform_family.name, platforms.platform_logo.image_id, platforms.platform_logo.width, platforms.platform_logo.height,
        themes.name,
        involved_companies.company.name, involved_companies.company.description, involved_companies.company.logo.image_id, involved_companies.company.logo.width, involved_companies.company.logo.height, involved_companies.developer, involved_companies.publisher, involved_companies.porting, involved_companies.supporting,
        category, websites.url, summary, storyline, status, release_dates.human, release_dates.platform.name, release_dates.status,
        keywords.name,
        genres.name,
        total_rating,
        tags,
        similar_games.name, similar_games.cover.image_id, similar_games.cover.width, similar_games.cover.height, similar_games.total_rating;
        where id = ${id}; 
        limit 1;`
      ]
    }

    console.log(searchOptions)
    await axios
      .post('http://localhost:8000/games/fetch', {
        searchOptions: searchOptions
      })
      .then((res) => {
        console.log('api finished')
        console.log(res.data[0])
        setGame(res.data[0])
      })
      .catch((err) => console.log(err))
      .finally()
  }

  const AutoplaySlider = withAutoplay(AwesomeSlider)
  let allmedia = []

  const images = [
    'https://images.igdb.com/igdb/image/upload/t_cover_small/co66up.png',
    'https://images.igdb.com/igdb/image/upload/t_cover_med/gjc9m7jasmxs6ofv6i3h.jpg',
    'https://images.igdb.com/igdb/image/upload/t_cover_med/co69ev.jpg'
  ]

  let slider = ''

  useEffect(() => {
    console.log('id in ' + id)
    sendCustomRequest()
  }, [])

  return (
    <div>
      {/* Title */}
      <div className='grid grid-flow-row grid-rows-1 gap-4 p-5'>
        <div className='rounded-lg bg-green-100 p-10 text-center text-lg font-bold text-green-500 shadow-lg'>
          {game?.name != undefined && game?.name}
        </div>
      </div>

      {/* Age Ratings */}
      {/* age_ratings.category, age_ratings.content_descriptions.description, age_ratings.rating */}
      <div className='grid grid-flow-row grid-rows-1 gap-4 p-5'>
        <div className='rounded-lg bg-purple-100 p-10 text-center text-lg font-bold text-purple-500 shadow-lg'>
          <h2>Age Ratings</h2>
          <div className='rounded-lg bg-red-100 p-1 text-center text-lg font-bold text-red-500 shadow-lg'>
            <table>
              <thead>
                <tr>
                  <th>Rating Organization</th>
                  <th>Logo</th>
                  <th>Rating</th>
                  <th>Content Warnings</th>
                </tr>
              </thead>
              <tbody>
                {game?.age_ratings != undefined &&
                  game?.age_ratings.map((item, index) => {
                    return (
                      <tr key={item.id}>
                        <td>
                          <p>
                            {Object.keys(AgeRatingCategory)[item?.category]}
                          </p>
                        </td>
                        <td>
                          <p>{item?.rating_cover_url}</p>
                          {/* <div
                            style={{
                              backgroundImage: `url(https:"${item?.rating_cover_url}")`,
                              backgroundPosition: 'center',
                              backgroundSize: 'cover',
                              backgroundRepeat: 'no-repeat',
                              width: '264px',
                              height: '374px'
                            }}
                          ></div> */}
                        </td>
                        <td>
                          <p>{Object.keys(AgeRating)[item?.rating]}</p>
                        </td>
                        <td>
                          {item?.content_descriptions != undefined &&
                            item?.content_descriptions.map((subitem) => {
                              return <p>{subitem?.description}</p>
                            })}
                        </td>
                      </tr>
                    )
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Cover */}
      {/* cover.image_id, cover.width, cover.height */}
      <div className='grid grid-flow-row grid-rows-1 gap-4 p-5'>
        <div className='rounded-lg bg-purple-100 p-10 text-center text-lg font-bold text-purple-500 shadow-lg'>
          <h2>Cover</h2>
          <div className='rounded-lg bg-red-100 p-1 text-center text-lg font-bold text-red-500 shadow-lg'>
            {game?.cover != undefined && (
              <>
                <div
                  style={{
                    backgroundImage: `url("https://images.igdb.com/igdb/image/upload/t_cover_big/${game?.cover?.image_id}.jpg")`,
                    backgroundPosition: 'center',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    width: '264px',
                    height: '374px'
                  }}
                ></div>
                <p>{game?.cover?.url}</p>
                <p>
                  {game?.cover?.width}x{game?.cover?.height}
                </p>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Media */}
      {/* videos.video_id, videos.name, artworks.width, artworks.height, artworks.image_id */}
      <div className='grid grid-flow-row grid-rows-1 gap-4 p-5'>
        <div className='rounded-lg bg-purple-100 p-10 text-center text-lg font-bold text-purple-500 shadow-lg'>
          <h2>Media</h2>
          <div className='rounded-lg bg-red-100 p-1 text-center text-lg font-bold text-red-500 shadow-lg'>
            {game?.videos != undefined &&
              game?.videos?.map((item) => {
                // {
                //   allmedia.push(
                //     `https://www.youtube.com/embed/${item?.video_id}?controls=0`
                //   )
                // }
                return (
                  <iframe
                    width='420'
                    height='315'
                    src={`https://www.youtube.com/embed/${item?.video_id}?controls=0`}
                  ></iframe>
                )
              })}
            {game?.artworks != undefined &&
              game?.artworks?.map((item) => {
                {
                  allmedia.push(
                    `https://images.igdb.com/igdb/image/upload/t_screenshot_big/${item?.image_id}.jpg`
                  )
                }
                return (
                  <>
                    <img src={item?.url} alt={item?.image_id}></img>
                    <div
                      style={{
                        backgroundImage: `url("https://images.igdb.com/igdb/image/upload/t_screenshot_big/${item?.image_id}.jpg")`,
                        backgroundPosition: 'center',
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat',
                        width: '889px',
                        height: '500px'
                      }}
                    ></div>
                    <p>
                      {item?.width}x{item?.height}
                    </p>
                  </>
                )
              })}
            <div>
              {
                (slider = (
                  <AutoplaySlider
                    className='h-96'
                    play={true}
                    cancelOnInteraction={false} // should stop playing on user interaction
                    interval={6000}
                  >
                    {allmedia.map((item) => {
                      return <div data-src={item} />
                    })}
                  </AutoplaySlider>
                ))
              }
              {/* <AwesomeSlider>
                {allmedia.map((item) => {
                  return <div data-src={item} />
                })}
              </AwesomeSlider> */}
              {console.log(allmedia)}
              {slider}
            </div>
          </div>
        </div>
      </div>

      {/* Platforms */}
      {/* platforms.category, platforms.abbreviation, platforms.name, platforms.platform_family.name, platforms.platform_logo.image_id, platforms.platform_logo.width, platforms.platform_logo.height */}
      <div className='grid grid-flow-row grid-rows-1 gap-4 p-5'>
        <div className='rounded-lg bg-purple-100 p-10 text-center text-lg font-bold text-purple-500 shadow-lg'>
          <h2>Platforms</h2>
          <div className='rounded-lg bg-red-100 p-1 text-center text-lg font-bold text-red-500 shadow-lg'>
            {game?.platforms != undefined &&
              game?.platforms?.map((item) => {
                return (
                  <>
                    <p>{Object.keys(Platform_Category)[item?.category]}</p>
                    <p>{item?.abbreviation}</p>
                    <p>{item?.name}</p>
                    <p>{item?.platform_family?.name}</p>
                    <div
                      style={{
                        backgroundImage: `url("https://images.igdb.com/igdb/image/upload/t_micro/${item?.platform_logo?.image_id}.jpg")`,
                        backgroundPosition: 'center',
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat',
                        width: '35px',
                        height: '35px'
                      }}
                    ></div>
                    <p>{item?.summary}</p>
                  </>
                )
              })}
          </div>
        </div>
      </div>

      {/* Themes */}
      {/* themes.name */}
      <div className='grid grid-flow-row grid-rows-1 gap-4 p-5'>
        <div className='rounded-lg bg-purple-100 p-10 text-center text-lg font-bold text-purple-500 shadow-lg'>
          <h2>Themes</h2>
          <div className='rounded-lg bg-red-100 p-1 text-center text-lg font-bold text-red-500 shadow-lg'>
            {game?.themes != undefined &&
              game?.themes?.map((item) => {
                return (
                  <>
                    <p>{item?.name}</p>
                  </>
                )
              })}
          </div>
        </div>
      </div>

      {/* Companies */}
      {/* involved_companies.company.name, involved_companies.company.description, involved_companies.company.logo.image_id, involved_companies.company.logo.width, involved_companies_companies.logo.height, involved_companies.developer, involved_companies.publisher, involved_companies.porting, involved_companies.supporting */}
      <div className='grid grid-flow-row grid-rows-1 gap-4 p-5'>
        <div className='rounded-lg bg-purple-100 p-10 text-center text-lg font-bold text-purple-500 shadow-lg'>
          <h2>Companies</h2>
          <div className='rounded-lg bg-red-100 p-1 text-center text-lg font-bold text-red-500 shadow-lg'>
            {game?.involved_companies != undefined &&
              game?.involved_companies?.map((item) => {
                return (
                  <>
                    <p>{item?.company?.name}</p>
                    <p>{item?.company?.description}</p>
                    <img
                      src={`https://images.igdb.com/igdb/image/upload/t_thumb/${item?.company?.logo.image_id}.jpg`}
                      alt={item?.company?.name}
                      width='90'
                      height='90'
                    ></img>
                    <p>{item?.developer}</p>
                    <p>{item?.publisher}</p>
                    <p>{item?.porting}</p>
                    <p>{item?.supporting}</p>
                  </>
                )
              })}
          </div>
        </div>
      </div>

      {/* General Info  */}
      {/* url, category, websites.url, summary, storyline, status, release_dates.human, release_dates.platform.name, release_dates.status */}
      <div className='grid grid-flow-row grid-rows-1 gap-4 p-5'>
        <div className='rounded-lg bg-purple-100 p-10 text-center text-lg font-bold text-purple-500 shadow-lg'>
          <h2>General Info</h2>
          <div className='rounded-lg bg-red-100 p-1 text-center text-lg font-bold text-red-500 shadow-lg'>
            <label>
              Summary:<p className='pl-4'>{game?.summary}</p>
            </label>
            <label>
              Storyline:<p className='pl-4'>{game?.storyline}</p>
            </label>
            <label>
              Category:
              <p className='pl-4'>
                {Object.keys(Game_Category)[game?.category]}
              </p>
            </label>
            <label>Websites:</label>
            {game?.websites != undefined &&
              game?.websites?.map((item) => {
                return <p>{item?.url}</p>
              })}
            {game?.release_dates != undefined &&
              game?.release_dates?.map((item) => {
                return (
                  <>
                    <label>
                      Release Date:<p className='pl-4'>{item?.human}</p>
                    </label>
                    <label>
                      Platform:
                      <p className='pl-4'>{item?.platform?.name}</p>
                    </label>
                    <label>
                      Status:
                      <p className='pl-4'>
                        {Object.keys(Game_Status)[item?.status]}
                      </p>
                    </label>
                  </>
                )
              })}
          </div>
        </div>
      </div>

      {/* Keywords */}
      {/* keywords.name */}
      <div className='grid grid-flow-row grid-rows-1 gap-4 p-5'>
        <div className='rounded-lg bg-purple-100 p-10 text-center text-lg font-bold text-purple-500 shadow-lg'>
          <h2>Keywords</h2>
          <div className='rounded-lg bg-red-100 p-1 text-center text-lg font-bold text-red-500 shadow-lg'>
            {game?.keywords != undefined &&
              game?.keywords?.map((item) => {
                return <p>{item?.name}</p>
              })}
          </div>
        </div>
      </div>

      {/* Franchise */}
      {/* collection, dlcs, expanded_games,expansions, franchise, bundles, version_title, version_parent,standalone_expansions, remasters, remakes, parent_game, ports */}
      <div className='grid grid-flow-row grid-rows-1 gap-4 p-5'>
        <div className='rounded-lg bg-purple-100 p-10 text-center text-lg font-bold text-purple-500 shadow-lg'>
          <h2>Franchise</h2>
          <div className='rounded-lg bg-red-100 p-1 text-center text-lg font-bold text-red-500 shadow-lg'></div>
        </div>
      </div>

      {/* Genres */}
      {/* genres.name */}
      <div className='grid grid-flow-row grid-rows-1 gap-4 p-5'>
        <div className='rounded-lg bg-purple-100 p-10 text-center text-lg font-bold text-purple-500 shadow-lg'>
          <h2>Genres</h2>
          <div className='rounded-lg bg-red-100 p-1 text-center text-lg font-bold text-red-500 shadow-lg'>
            {game?.genres != undefined &&
              game?.genres?.map((item) => {
                return <p>{item?.name}</p>
              })}
          </div>
        </div>
      </div>

      {/* Total Rating */}
      {/* total_rating */}
      <div className='grid grid-flow-row grid-rows-1 gap-4 p-5'>
        <div className='rounded-lg bg-purple-100 p-10 text-center text-lg font-bold text-purple-500 shadow-lg'>
          <h2>Rating</h2>
          <div className='rounded-lg bg-red-100 p-1 text-center text-lg font-bold text-red-500 shadow-lg'>
            <h3>{game?.total_rating}</h3>
          </div>
        </div>
      </div>

      {/* Tags */}
      {/* tags */}
      <div className='grid grid-flow-row grid-rows-1 gap-4 p-5'>
        <div className='rounded-lg bg-purple-100 p-10 text-center text-lg font-bold text-purple-500 shadow-lg'>
          <h2>Tags</h2>
          <div className='rounded-lg bg-red-100 p-1 text-center text-lg font-bold text-red-500 shadow-lg'>
            {game?.tags != undefined &&
              game?.tags?.map((item) => {
                return <p>{item}</p>
              })}
          </div>
        </div>
      </div>

      {/* Similar Games */}
      {/* similar_games.name, similar_games.cover.image_id, similar_games.cover.width, similar_games.cover.height, similar_games.total_rating */}
      <div className='grid grid-flow-row grid-rows-1 gap-4 p-5'>
        <div className='rounded-lg bg-purple-100 p-10 text-center text-lg font-bold text-purple-500 shadow-lg'>
          <h2>Similar Games</h2>
          <div className='flex flex-row rounded-lg bg-red-100 p-1 text-center text-lg font-bold text-red-500 shadow-lg'>
            {game?.similar_games != undefined &&
              game?.similar_games?.map((item) => {
                return (
                  <div flex flex-col>
                    <p>{item?.name}</p>
                    <p>{item?.total_rating}</p>

                    <img
                      src={`https://images.igdb.com/igdb/image/upload/t_cover_small/${item?.cover?.image_id}.jpg`}
                      alt={item?.name}
                      width='90'
                      height='128'
                    ></img>
                    <div
                      style={{
                        backgroundImage: `url("https://images.igdb.com/igdb/image/upload/t_cover_big/${item?.cover?.image_id}.jpg")`,
                        backgroundPosition: 'center',
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat',
                        width: '90px',
                        height: '128px'
                      }}
                    ></div>
                  </div>
                )
              })}
          </div>
        </div>
      </div>

      {/* // "//images.igdb.com/igdb/image/upload/t_thumb/co1rg6.jpg"
          style={{
            backgroundImage:
              "url('https://images.igdb.com/igdb/image/upload/t_cover_big/co1rg6.jpg')",
              https://images.igdb.com/igdb/image/upload/t_{size}/{hash}.jpg
            height: '264px',
            width: '374px',
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat'
          }} */}

      <div className='grid grid-flow-col grid-cols-1 gap-4 p-5'>
        <div className='rounded-lg bg-green-100 p-10 text-center text-lg font-bold text-green-500 shadow-lg'>
          <div className='grid-rows-8 grid grid-flow-row gap-4 p-5'>
            <div className='row-span-4 row-start-2 h-96 rounded-lg bg-blue-100 p-10 text-center text-lg font-bold text-blue-500 shadow-lg'>
              Cover
            </div>
            <div className='h-24 rounded-lg bg-blue-100 p-10 text-center text-lg font-bold text-blue-500 shadow-lg'>
              Data
            </div>
            <div className='row-span-6 row-start-2 h-24 rounded-lg bg-blue-100 p-10 text-center text-lg font-bold text-blue-500 shadow-lg'>
              Rating
            </div>
          </div>
        </div>
        <div className='rounded-lg bg-green-100 p-10 text-center text-lg font-bold text-green-500 shadow-lg'>
          <div className='grid-rows-7 grid grid-flow-row gap-4 p-5'>
            <div className='h-96 rounded-lg bg-blue-100 p-10 text-center text-lg font-bold text-blue-500 shadow-lg'>
              cover art
            </div>
            <div className='h-48 rounded-lg bg-blue-100 p-10 text-center text-lg font-bold text-blue-500 shadow-lg'>
              summary
            </div>
            <div className='h-12 rounded-lg bg-blue-100 p-10 text-center text-lg font-bold text-blue-500 shadow-lg'>
              rating
            </div>
            <div className='h-12 rounded-lg bg-blue-100 p-10 text-center text-lg font-bold text-blue-500 shadow-lg'>
              release date
            </div>
            <div className='h-12 rounded-lg bg-blue-100 p-10 text-center text-lg font-bold text-blue-500 shadow-lg'>
              developer
            </div>
            <div className='h-12 rounded-lg bg-blue-100 p-10 text-center text-lg font-bold text-blue-500 shadow-lg'>
              publisher
            </div>
            <div className='h-12 rounded-lg bg-blue-100 p-10 text-center text-lg font-bold text-blue-500 shadow-lg'>
              tags
            </div>
          </div>
        </div>
      </div>

      <div className='grid grid-flow-row grid-rows-3 gap-4 p-5'>
        <div className='rounded-lg bg-green-100 p-10 text-center text-lg font-bold text-green-500 shadow-lg'>
          4
        </div>
        <div className='rounded-lg bg-green-100 p-10 text-center text-lg font-bold text-green-500 shadow-lg'>
          5
        </div>
        <div className='rounded-lg bg-green-100 p-10 text-center text-lg font-bold text-green-500 shadow-lg'>
          6
        </div>
        <div className='rounded-lg bg-green-100 p-10 text-center text-lg font-bold text-green-500 shadow-lg'>
          7
        </div>
        <div className='rounded-lg bg-green-100 p-10 text-center text-lg font-bold text-green-500 shadow-lg'>
          8
        </div>
        <div className='rounded-lg bg-green-100 p-10 text-center text-lg font-bold text-green-500 shadow-lg'>
          9
        </div>
      </div>
      {/* <div className='flex flex-row'>
        {' '}
        className="flex flex-row-reverse" className="flex flex-col"
        className='flex-wrap' className='flex-nowrap' flex-none = fixed size
        flex-initial = flex item to shrink but not grow flex-1 = flex item to
        grow and shrink as needed shrink = shrink if needed shrink-0 = prevent
        from shrinking flex-auto = grow and shrink with initial size taking in
        to account grid-cols-{n} gap-{n}
        col-start-{n} col-end-{n} col-span{n}
        grid-rows-{n} gap-{n}
        row-span-{n} row-start-{n} row-end-{n}
        grid-flow-col grid-flow-row grid-flow-dense grid-flow-row-dense
        grid-flow-col-dense
        auto-cols-auto auto-cols-min auto-cols-max auto-cols-fr auto-rows-auto
        auto-rows-min auto-rows-max auto-rows-fr gap-{n} gap-x-{n} gap-y-{y}
        justify-normal start end center between around evenly stretch
        justify-items-start end center stretch
        justify-self-auto start end center stretch
        content-normal center start end between around evenly baseline stretch
        items-start end center baseline stretch
        self-auto start end center stretch baseline
        place-content-center start end between around evenly baseline stretch
        place-items-start end center baseline stretch
        place-self-auto start end center stretch
      </div> */}
    </div>
  )
}

export default Detail
