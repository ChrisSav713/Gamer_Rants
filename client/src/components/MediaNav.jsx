import React from 'react'
import {
  ArrowLongLeftIcon,
  ArrowLongRightIcon
} from '@heroicons/react/20/solid'

function MediaNav() {
  function moveRight() {
    document.getElementById('container').scrollLeft -= 600
  }
  function moveLeft() {
    document.getElementById('container').scrollLeft += 600
  }
  return (
    <nav className='flex items-center justify-between border-t border-gray-200 px-4 sm:px-0'>
      <div className='-mt-px flex w-0 flex-1'>
        <a
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
  )
}

export default MediaNav
