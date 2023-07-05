import React, { useState, useContext, useRef } from 'react'
import { useSessionStorage } from './useStorage'
import GameList from './GameList'
import axios from 'axios'
import { GameContext } from '../App'
import {
  AgeRating,
  AgeRatingCategory,
  Platform_Category,
  Game_Category,
  Game_Status,
  Image_Sizes
} from '../constants/Enums'

import imageB from '../components/imgs/B.jpg'
import imageC from '../components/imgs/C.jpg'

import AwesomeSlider from 'react-awesome-slider'
import withAutoplay from 'react-awesome-slider/dist/autoplay'
import 'react-awesome-slider/dist/styles.css'

import { Fragment } from 'react'
import { Dialog, Disclosure, Menu, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import {
  ChevronDownIcon,
  FunnelIcon,
  MinusIcon,
  PlusIcon,
  Squares2X2Icon,
  MagnifyingGlassIcon
} from '@heroicons/react/20/solid'

function Search(props) {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
  const [searchResult, setSearchResult] = useState([{}])
  const cont = useContext(GameContext)
  const { proxyInfo, setProxyInfo, removeProxyInfo } = cont
  const inputEndpoint = useRef()
  const inputFields = useRef()
  const inputSearch = useRef()
  const inputWhere = useRef()
  const inputLimit = useRef()
  const inputOffset = useRef()
  const inputSort = useRef()

  const sortOptions = [
    { name: 'Title', href: '#', current: true },
    { name: 'Rating', href: '#', current: false },
    { name: 'Release Date', href: '#', current: false }
  ]

  const subCategories = []

  const filters = [
    {
      id: 'platforms',
      name: 'Platforms',
      options: [
        { value: '14', label: 'Mac', checked: false },
        { value: '6', label: 'PC (Microsoft Windows)', checked: false },
        { value: '3', label: 'Linux', checked: false },
        { value: '169', label: 'Xbox Series X|S', checked: false },
        { value: '167', label: 'PlayStation 5', checked: false },
        { value: '49', label: 'Xbox One', checked: false },
        { value: '48', label: 'PlayStation 4', checked: false },
        { value: '130', label: 'Nintendo Switch', checked: false },
        { value: '9', label: 'PlayStation 3', checked: false },
        { value: '11', label: 'XBox 360', checked: false }
      ]
    },
    {
      id: 'genres',
      name: 'Genres',
      options: [
        { value: '2', label: 'Point-and-Click', checked: false },
        { value: '4', label: 'Fighting', checked: false },
        { value: '5', label: 'Shooter', checked: false },
        { value: '7', label: 'Music', checked: false },
        { value: '8', label: 'Platform', checked: false },
        { value: '9', label: 'Puzzle', checked: false },
        { value: '10', label: 'Racing', checked: false },
        { value: '11', label: 'Real Time Strategy (RTS)', checked: false },
        { value: '12', label: 'Role-playing (RPG)', checked: false },
        { value: '13', label: 'Simulator', checked: false },
        { value: '14', label: 'Sport', checked: false },
        { value: '15', label: 'Strategy', checked: false },
        { value: '16', label: 'Turn-based strategy (TBS)', checked: false },
        { value: '24', label: 'Tactical', checked: false },
        { value: '26', label: 'Quiz/Trivia', checked: false },
        { value: '25', label: "Hack and slash/Beat 'em up", checked: false },
        { value: '30', label: 'Pinball', checked: false },
        { value: '31', label: 'Adventure', checked: false },
        { value: '33', label: 'Arcade', checked: false },
        { value: '34', label: 'Visual Novel', checked: false },
        { value: '32', label: 'Indie', checked: false },
        { value: '35', label: 'Card & Board Game', checked: false },
        { value: '36', label: 'MOBA', checked: false }
      ]
    },
    {
      id: 'themes',
      name: 'Themes',
      options: [
        { value: '17', label: 'Fantasy', checked: false },
        { value: '20', label: 'Thriller', checked: false },
        { value: '18', label: 'Science Fiction', checked: false },
        { value: '1', label: 'Action', checked: false },
        { value: '19', label: 'Horror', checked: false },
        { value: '21', label: 'Survival', checked: false },
        { value: '22', label: 'Historical', checked: false },
        { value: '23', label: 'Stealth', checked: false },
        { value: '28', label: 'Business', checked: false },
        { value: '27', label: 'Comedy', checked: false },
        { value: '31', label: 'Drama', checked: false },
        { value: '32', label: 'Non-ficiton', checked: false },
        { value: '34', label: 'Educational', checked: false },
        { value: '33', label: 'Sandbox', checked: false },
        { value: '35', label: 'Kids', checked: false },
        { value: '38', label: 'Open World', checked: false },
        { value: '39', label: 'Warefare', checked: false },
        { value: '41', label: '4x', checked: false },
        { value: '43', label: 'Mystery', checked: false },
        { value: '40', label: 'Party', checked: false },
        { value: '44', label: 'Romance', checked: false }
      ]
    },
    {
      id: 'modes',
      name: 'Modes',
      options: [
        { value: '1', label: 'Single player', checked: false },
        { value: '2', label: 'Multiplayer', checked: false },
        { value: '3', label: 'Co-operative', checked: false },
        { value: '4', label: 'Split screen', checked: false },
        {
          value: '5',
          label: 'Massively Multiplayer Online (MMO)',
          checked: false
        },
        { value: '6', label: 'Battle Royale', checked: false }
      ]
    },
    {
      id: 'perspectives',
      name: 'Perspectives',
      options: [
        { value: '6', label: 'Auditory', checked: false },
        { value: '3', label: 'Bird view/Isometric', checked: false },
        { value: '1', label: 'First person', checked: false },
        { value: '4', label: 'Side View', checked: false },
        { value: '5', label: 'Text', checked: false },
        { value: '2', label: 'Third person', checked: false },
        { value: '7', label: 'Virtual Reality', checked: false }
      ]
    }
  ]

  let getTokenPost = {
    method: 'POST',
    url: 'https://id.twitch.tv/oauth2/token',
    data: {
      client_id: 'x4rniov57q0741nf6ptq41ohvlvrfs',
      client_secret: 'huuyqcxyj40thirl0z9f3iawyhj9yk',
      grant_type: 'client_credentials'
    }
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

  const AutoplaySlider = withAutoplay(AwesomeSlider)

  const images = [
    'https://www.youtube.com/embed/BHdojrcu61E?controls=0',
    'https://www.youtube.com/embed/XD9JPHmu_cU?controls=0',
    'https://images.igdb.com/igdb/image/upload/t_screenshot_big/ar21mj.jpg'
  ]
  const slider = (
    <AutoplaySlider
      className='h-96'
      play={true}
      cancelOnInteraction={false} // should stop playing on user interaction
      interval={6000}
    >
      {images.map((item) => {
        return <div data-src={item} />
      })}
    </AutoplaySlider>
  )

  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }

  return (
    <div className='grid grid-flow-row auto-rows-max'>
      <button
        className='rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700'
        onClick={getToken}
      >
        Get Token
      </button>

      {slider}

      {/* Search Section */}
      <h2 className='pl-10 pr-10 pt-10 text-xl'>Search Games</h2>
      <div className='flex flex-row pb-10 pl-10 pr-10'>
        <div className='flex-1'>
          <input
            type='text'
            name='search'
            id='search'
            ref={inputSearch}
            className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
          />
        </div>

        <button
          className='rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700'
          onClick={() =>
            sendBuilderRequest(
              '/games',
              `fields id, name, cover.url, artworks.url, genres.name, storyline, summary, screenshots.url, platforms.name, platforms.platform_logo.url, tags, rating, url;`,
              'search *"' + inputSearch.current.value + '"*;',
              '',
              'limit 20;',
              '',
              ''
            )
          }
        >
          <span className='inline-flex'>
            Search &nbsp; &nbsp;
            <MagnifyingGlassIcon className='h-5 w-5' aria-hidden='true' />
          </span>
        </button>
      </div>
      <div className='bg-white'>
        <div>
          {/* Mobile filter dialog */}
          <Transition.Root show={mobileFiltersOpen} as={Fragment}>
            <Dialog
              as='div'
              className='relative z-40 lg:hidden'
              onClose={setMobileFiltersOpen}
            >
              <Transition.Child
                as={Fragment}
                enter='transition-opacity ease-linear duration-300'
                enterFrom='opacity-0'
                enterTo='opacity-100'
                leave='transition-opacity ease-linear duration-300'
                leaveFrom='opacity-100'
                leaveTo='opacity-0'
              >
                <div className='fixed inset-0 bg-black bg-opacity-25' />
              </Transition.Child>

              <div className='fixed inset-0 z-40 flex'>
                <Transition.Child
                  as={Fragment}
                  enter='transition ease-in-out duration-300 transform'
                  enterFrom='translate-x-full'
                  enterTo='translate-x-0'
                  leave='transition ease-in-out duration-300 transform'
                  leaveFrom='translate-x-0'
                  leaveTo='translate-x-full'
                >
                  <Dialog.Panel className='relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl'>
                    <div className='flex items-center justify-between px-4'>
                      <h2 className='text-lg font-medium text-gray-900'>
                        Filters
                      </h2>
                      <button
                        type='button'
                        className='-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400'
                        onClick={() => setMobileFiltersOpen(false)}
                      >
                        <span className='sr-only'>Close menu</span>
                        <XMarkIcon className='h-6 w-6' aria-hidden='true' />
                      </button>
                    </div>

                    {/* Filters */}
                    <form className='mt-4 border-t border-gray-200'>
                      <h3 className='sr-only'>Categories</h3>
                      <ul
                        role='list'
                        className='px-2 py-3 font-medium text-gray-900'
                      >
                        {subCategories.map((category) => (
                          <li key={category.name}>
                            <a href={category.href} className='block px-2 py-3'>
                              {category.name}
                            </a>
                          </li>
                        ))}
                      </ul>

                      {filters.map((section) => (
                        <Disclosure
                          as='div'
                          key={section.id}
                          className='border-t border-gray-200 px-4 py-6'
                        >
                          {({ open }) => (
                            <>
                              <h3 className='-mx-2 -my-3 flow-root'>
                                <Disclosure.Button className='flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500'>
                                  <span className='font-medium text-gray-900'>
                                    {section.name}
                                  </span>
                                  <span className='ml-6 flex items-center'>
                                    {open ? (
                                      <MinusIcon
                                        className='h-5 w-5'
                                        aria-hidden='true'
                                      />
                                    ) : (
                                      <PlusIcon
                                        className='h-5 w-5'
                                        aria-hidden='true'
                                      />
                                    )}
                                  </span>
                                </Disclosure.Button>
                              </h3>
                              <Disclosure.Panel className='pt-6'>
                                <div className='space-y-6'>
                                  {section.options.map((option, optionIdx) => (
                                    <div
                                      key={option.value}
                                      className='flex items-center'
                                    >
                                      <input
                                        id={`filter-mobile-${section.id}-${optionIdx}`}
                                        name={`${section.id}[]`}
                                        defaultValue={option.value}
                                        type='checkbox'
                                        defaultChecked={option.checked}
                                        className='h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500'
                                      />
                                      <label
                                        htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                        className='ml-3 min-w-0 flex-1 text-gray-500'
                                      >
                                        {option.label}
                                      </label>
                                    </div>
                                  ))}
                                </div>
                              </Disclosure.Panel>
                            </>
                          )}
                        </Disclosure>
                      ))}
                    </form>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </Dialog>
          </Transition.Root>

          <main className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
            <div className='flex items-baseline justify-between border-b border-gray-200 pb-6'>
              <h1 className='text-4xl font-bold tracking-tight text-gray-900'></h1>

              <div className='flex items-center'>
                <Menu as='div' className='relative inline-block text-left'>
                  <div>
                    <Menu.Button className='group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900'>
                      Sort
                      <ChevronDownIcon
                        className='-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500'
                        aria-hidden='true'
                      />
                    </Menu.Button>
                  </div>

                  <Transition
                    as={Fragment}
                    enter='transition ease-out duration-100'
                    enterFrom='transform opacity-0 scale-95'
                    enterTo='transform opacity-100 scale-100'
                    leave='transition ease-in duration-75'
                    leaveFrom='transform opacity-100 scale-100'
                    leaveTo='transform opacity-0 scale-95'
                  >
                    <Menu.Items className='absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none'>
                      <div className='py-1'>
                        {sortOptions.map((option) => (
                          <Menu.Item key={option.name}>
                            {({ active }) => (
                              <a
                                href={option.href}
                                className={classNames(
                                  option.current
                                    ? 'font-medium text-gray-900'
                                    : 'text-gray-500',
                                  active ? 'bg-gray-100' : '',
                                  'block px-4 py-2 text-sm'
                                )}
                              >
                                {option.name}
                              </a>
                            )}
                          </Menu.Item>
                        ))}
                      </div>
                    </Menu.Items>
                  </Transition>
                </Menu>

                <button
                  type='button'
                  className='-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7'
                >
                  <span className='sr-only'>View grid</span>
                  <Squares2X2Icon className='h-5 w-5' aria-hidden='true' />
                </button>
                <button
                  type='button'
                  className='-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden'
                  onClick={() => setMobileFiltersOpen(true)}
                >
                  <span className='sr-only'>Filters</span>
                  <FunnelIcon className='h-5 w-5' aria-hidden='true' />
                </button>
              </div>
            </div>

            <section aria-labelledby='products-heading' className='pb-24 pt-6'>
              <h2 id='products-heading' className='sr-only'>
                Products
              </h2>

              <div className='grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4'>
                {/* Filters */}
                <form className='hidden lg:block'>
                  <h3 className='sr-only'>Categories</h3>
                  <ul
                    role='list'
                    className='space-y-4 border-b border-gray-200 pb-6 text-sm font-medium text-gray-900'
                  >
                    {subCategories.map((category) => (
                      <li key={category.name}>
                        <a href={category.href}>{category.name}</a>
                      </li>
                    ))}
                  </ul>

                  {filters.map((section) => (
                    <Disclosure
                      as='div'
                      key={section.id}
                      className='border-b border-gray-200 py-6'
                    >
                      {({ open }) => (
                        <>
                          <h3 className='-my-3 flow-root'>
                            <Disclosure.Button className='flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500'>
                              <span className='font-medium text-gray-900'>
                                {section.name}
                              </span>
                              <span className='ml-6 flex items-center'>
                                {open ? (
                                  <MinusIcon
                                    className='h-5 w-5'
                                    aria-hidden='true'
                                  />
                                ) : (
                                  <PlusIcon
                                    className='h-5 w-5'
                                    aria-hidden='true'
                                  />
                                )}
                              </span>
                            </Disclosure.Button>
                          </h3>
                          <Disclosure.Panel className='pt-6'>
                            <div className='space-y-4'>
                              {section.options.map((option, optionIdx) => (
                                <div
                                  key={option.value}
                                  className='flex items-center'
                                >
                                  <input
                                    id={`filter-${section.id}-${optionIdx}`}
                                    name={`${section.id}[]`}
                                    defaultValue={option.value}
                                    type='checkbox'
                                    defaultChecked={option.checked}
                                    className='h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500'
                                  />
                                  <label
                                    htmlFor={`filter-${section.id}-${optionIdx}`}
                                    className='ml-3 text-sm text-gray-600'
                                  >
                                    {option.label}
                                  </label>
                                </div>
                              ))}
                            </div>
                          </Disclosure.Panel>
                        </>
                      )}
                    </Disclosure>
                  ))}
                </form>

                {/* Product grid */}
                <div className='lg:col-span-3'>
                  <GameList searchResult={searchResult} />
                </div>
              </div>
            </section>
          </main>
        </div>
      </div>
      <div></div>
    </div>
  )
}

export default Search
