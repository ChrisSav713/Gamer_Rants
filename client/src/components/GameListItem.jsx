import React from 'react'
import './GameListItem.css'
import { useNavigate } from 'react-router-dom'

function GameListItem(props) {
  const { gameInfo } = props
  const navigate = useNavigate()

  return (
    <tr key={gameInfo?.id}>
      <td className='border-collapse border-spacing-2 whitespace-nowrap  text-sm sm:pl-0'>
        <div className='flex items-center'>
          <div className='h-30 w-30 flex-shrink-0'>
            {gameInfo?.cover?.url != null ? (
              <img className='h-30 w-30' src={gameInfo?.cover?.url} alt='' />
            ) : (
              <img className='h-30 w-30' src='' alt='' />
            )}
          </div>
          <div className='flex-grow-1 ml-4 w-96 overflow-hidden'>
            <div className='text-left text-xl text-gray-900'>
              {gameInfo?.name != null && (
                <a onClick={() => navigate(`/detail/${gameInfo?.id}`)}>
                  {gameInfo?.name}
                </a>
              )}
            </div>
            <div className='inline-flex justify-items-start'>
              {gameInfo?.platforms != null &&
                gameInfo?.platforms.map((item) => {
                  return <p className='ps-2'>{item?.name}</p>
                })}
            </div>
          </div>
        </div>
      </td>
      <td className='whitespace-nowrap px-3 py-5 text-sm text-gray-500'>
        <div className='text-gray-900'></div>
        <div className='mt-1 text-gray-500'></div>
      </td>
      <td className='whitespace-nowrap px-3 py-5 text-sm text-gray-500'>
        <span className='inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20'>
          {Math.round(gameInfo?.rating)}
        </span>
      </td>
    </tr>
  )
}

export default GameListItem
