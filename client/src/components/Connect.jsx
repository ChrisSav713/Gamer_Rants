import React, { useState, useContext } from 'react'
import { useSessionStorage } from './useStorage'
import Authorize from './Authorize'
import Credentials from './Credentials'
import AuthorizeResponse from './AuthorizeResponse'
import CredentialsResponse from './CredentialsResponse'
import GameList from './GameList'
import axios from 'axios'
import { GameContext } from '../App'

function Connect(props) {
  const [searchResult, setSearchResult] = useState([{}])
  const cont = useContext(GameContext)
  const { proxyInfo, setProxyInfo, removeProxyInfo } = cont

  let getTokenPost = {
    method: 'POST',
    url: 'https://id.twitch.tv/oauth2/token',
    data: {
      client_id: 'x4rniov57q0741nf6ptq41ohvlvrfs',
      client_secret: 'huuyqcxyj40thirl0z9f3iawyhj9yk',
      grant_type: 'client_credentials'
    }
  }

  let apiSearchPost = {
    method: 'POST',
    url: 'https://api.igdb.com/v4/games',
    // mode: 'no-cors',
    // withCredentials:true,
    // credentials:'same-origin',
    headers: {
      // 'Access-Control-Allow-Origin': '*',
      // 'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, OPTIONS',
      'Client-ID': 'x4rniov57q0741nf6ptq41ohvlvrfs',
      Authorization: 'Bearer '
    },
    body: `fields name; limit 10;`
  }

  const sendCustomRequest = async () => {
    const searchOptions = {
      clientId: proxyInfo.client_id,
      token: proxyInfo.access_token,
      endpoint: '/games',
      body: [
        `fields id, name, cover.url, artworks.url, genres.name, storyline, summary, screenshots.url, platforms.name, platforms.platform_logo.url, tags, rating, url;`,
        `search "age of wonders";`
      ]
    }
    console.log(searchOptions)
    await axios
      .post('http://localhost:8000/games/fetch', {
        searchOptions: searchOptions
      })
      .then((res) => {
        console.log('api finished')
        console.log(res.data)
        setSearchResult(res.data)
      })
      .catch((err) => console.log(err))
      .finally()
  }

  const sendBuilderRequest = async (
    endPoint,
    fields,
    search,
    where,
    limit,
    offset,
    sort
  ) => {
    console.log('***********************Send Builder Request*****************')
    const searchOptions = {
      clientId: proxyInfo.client_id,
      token: proxyInfo.access_token,
      endpoint: endPoint,
      requestBody: `${fields} ${search} ${where} ${limit} ${offset} ${sort}`
    }

    console.log(searchOptions)
    await axios
      .post('http://localhost:8000/builder', {
        searchOptions: searchOptions
      })
      .then((res) => {
        console.log('api finished')
        console.log(res.data)
        setSearchResult(res.data)
      })
      .catch((err) => console.log(err))
      .finally()
  }

  const sendApiRequest = async () => {
    console.log('sending api request')
    const searchOptions = {
      token: proxyInfo.access_token,
      endpoint: '/games',
      fields: [
        'id',
        'name',
        'cover.url',
        'artworks.url',
        'genres.name',
        'storyline',
        'summary',
        'screenshots.url',
        'platforms.name',
        'platforms.platform_logo.url',
        'tags',
        'rating',
        'url'
      ],
      search: null,
      where: null,
      limit: '10',
      offset: '10',
      sort: null
    }
    console.log(searchOptions)
    await axios
      .post('http://localhost:8000/api/user/comefindme', {
        searchOptions: searchOptions
      })
      .then((res) => {
        console.log('api finished')
        console.log(res.data)
        setSearchResult(res.data)
      })
      .catch((err) => console.log(err))
      .finally()
  }

  const whatIsToken = () => {
    console.log(proxyInfo)
  }

  const getToken = () => {
    axios(getTokenPost)
      .then((res) => {
        console.log(res.data)
        setProxyInfo({
          ...proxyInfo,
          access_token: res.data.access_token,
          expires_in: res.data.expires_in,
          token_type: res.data.token_type
        })
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const searchMethods = [
    { id: 'title', title: 'Title' },
    { id: 'platform', title: 'Platform' },
    { id: 'genre', title: 'Genre' },
    { id: 'theme', title: 'Theme' },
    { id: 'company', title: 'Company' },
    { id: 'character', title: 'Character' },
    { id: 'rating', title: 'Rating' }
  ]

  const searchSorts = [
    { id: 'relevancy', title: 'Relevancy' },
    { id: 'rating', title: 'Rating' },
    { id: 'releasedate', title: 'Release Date' }
  ]

  return (
    <div className='grid grid-flow-row auto-rows-max'>
      <div>
        <Authorize />
      </div>
      <div>
        <AuthorizeResponse />
      </div>
      <div>
        <Credentials />
      </div>
      <div>
        <CredentialsResponse />
      </div>
      <button
        className='rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700'
        onClick={whatIsToken}
      >
        What is
      </button>
      <button
        className='rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700'
        onClick={getToken}
      >
        Get Token
      </button>
      <button
        className='rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700'
        onClick={sendApiRequest}
      >
        Send Search Request
      </button>
      <button
        className='rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700'
        onClick={sendCustomRequest}
      >
        Custom Search
      </button>
      <button
        className='rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700'
        onClick={() =>
          sendBuilderRequest(
            '/regions',
            'fields *;',
            '',
            '',
            'limit 20;',
            '',
            ''
          )
        }
      >
        Builder Request
      </button>

      <br></br>
      <div>
        <GameList searchResult={searchResult} />
      </div>
    </div>
  )
}

export default Connect
