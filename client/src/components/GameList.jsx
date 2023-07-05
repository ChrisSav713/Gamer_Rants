import React from 'react'
import GameListItem from './GameListItem'
import './GameList.css'

function GameList(props) {
  const { searchResult } = props

  console.log('Search Results')
  console.log(searchResult.length)
  return (
    <>
      {searchResult.length > 1 && (
        <div className='px-4 sm:px-6 lg:px-8'>
          <div className='sm:flex sm:items-center'>
            <div className='sm:flex-auto'>
              <p className='mt-2 text-sm text-gray-700'>Search results</p>
            </div>
          </div>
          <div className='mt-8 flow-root'>
            <div className='-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8'>
              <div className='inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8'>
                <table className='min-w-full divide-y divide-gray-300'>
                  <thead>
                    <tr>
                      <th
                        scope='col'
                        className='py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0'
                      >
                        Search Results
                      </th>
                    </tr>
                  </thead>
                  <tbody className='divide-y divide-gray-200 bg-white'>
                    {searchResult != null &&
                      searchResult?.map((item) => {
                        console.log(item.id)
                        return (
                          <GameListItem
                            key={item.id}
                            gameInfo={item}
                          ></GameListItem>
                        )
                      })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default GameList
