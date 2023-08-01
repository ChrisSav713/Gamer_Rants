import React from 'react'
import {
  ArrowLongLeftIcon,
  ArrowLongRightIcon
} from '@heroicons/react/20/solid'

export default function MediaScroll(props) {
  //game.videos.video_id, game.videos.name,
  //game.artworks.width, game.artworks.url, game.artworks.height, game.artworks.image_id,
  //game.screenshots.image_id, game.screenshots.url, game.screenshots.width, game.screenshots.height

  const { game } = props

  function moveRight() {
    document.getElementById('container').scrollLeft -= 600
  }
  function moveLeft() {
    document.getElementById('container').scrollLeft += 600
  }

  return (
    <div className='h-auto bg-white'>
      <nav className='flex items-center justify-between border-t border-gray-200 px-4 sm:px-0'>
        <div className='-mt-px flex w-0 flex-1'>
          <a
            href='www.google.com'
            onClick={moveRight}
            className='inline-flex items-center border-t-2 border-transparent pr-1 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700'
          >
            <ArrowLongLeftIcon
              className='mr-3 h-5 w-5 text-gray-400'
              aria-hidden='true'
            />
            Previous
          </a>
        </div>

        <div className='-mt-px flex w-0 flex-1 justify-end'>
          <a
            href='www.google.com'
            onClick={moveLeft}
            className='inline-flex items-center border-t-2 border-transparent pl-1 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700'
          >
            Next
            <ArrowLongRightIcon
              className='ml-3 h-5 w-5 text-gray-400'
              aria-hidden='true'
            />
          </a>
        </div>
      </nav>

      <div
        id='container'
        className='container flex h-auto overflow-auto scrollbar scrollbar-track-gray-100 scrollbar-thumb-gray-900'
      >
        {game?.videos?.map((item) => (
          <div key={game.id} className='group relative'>
            <div className='flex justify-between' />
            <iframe
              title={item?.id}
              width='600'
              height='400'
              src={`https://www.youtube.com/embed/${item?.video_id}?controls=0`}
            ></iframe>
          </div>
        ))}

        {game?.artworks?.map((item) => {
          return (
            <>
              <img
                alt='artwork'
                src={`https://images.igdb.com/igdb/image/upload/t_screenshot_big/${item?.image_id}.jpg`}
                width='600px'
                height='400px'
              ></img>
            </>
          )
        })}

        {game?.screenshots?.map((item) => {
          return (
            <>
              <img
                alt='artwork'
                src={`https://images.igdb.com/igdb/image/upload/t_screenshot_big/${item?.image_id}.jpg`}
                width='600px'
                height='400px'
              ></img>
            </>
          )
        })}
      </div>
    </div>
  )
}
