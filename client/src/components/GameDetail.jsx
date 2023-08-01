import React from 'react'
import MediaScroll from '../components/MediaScroll'

function GameDetail() {
  return (
    <>
      <div className='container grid grid-cols-3 gap-4'>
        <div className='tile col-span-1 row-start-1 row-end-6 bg-teal-500'>
          <div className='tile-marker'>Cover</div>
        </div>

        <div className='container flex bg-blue-800'>
          <div className='tile flex bg-blue-500'>
            <div className='tile-marker'>Name</div>
          </div>
        </div>

        <div className='container flex bg-red-800'>
          <div className='tile flex bg-red-500'>
            <div className='tile-marker'>Release Date</div>
          </div>
        </div>

        <div className='tile col-span-1 col-start-3 row-start-1 row-end-6 bg-yellow-500'>
          <div className='tile-marker'>Rating</div>
        </div>

        <div className='container flex bg-purple-800'>
          <div className='tile flex bg-purple-600'>
            <div className='tile-marker'>Company</div>
          </div>
        </div>

        <div className='container flex bg-orange-800'>
          <div className='tile flex bg-orange-400'>
            <div className='tile-marker'>Genre: </div>
            <div className='tile-marker'>GenreLink</div>
          </div>
        </div>

        <div className='container flex bg-emerald-800'>
          <div className='tile flex bg-emerald-500'>
            <div className='tile-marker'>Platforms: </div>
            <div className='tile-marker'>PlatformLink</div>
          </div>
        </div>
      </div>

      <div className='container grid grid-cols-3 gap-4'>
        <div className='tile col-span-1 row-start-1 row-end-6 bg-teal-500'>
          <div className='tile-marker'>Cover</div>
        </div>

        <div className='container flex bg-emerald-800'>
          <div className='tile flex bg-emerald-500'>
            <div className='tile-marker'>Editions: </div>
            <div className='tile-marker'>EditionLink</div>
          </div>
        </div>

        <div className='container flex bg-red-800'>
          <div className='tile flex bg-red-500'>
            <div className='tile-marker'>Description</div>
          </div>
        </div>

        <div className='tile col-span-1 col-start-3 row-start-1 row-end-6 bg-yellow-500'>
          <div className='tile-marker'>Rating</div>
        </div>

        <div className='container flex bg-purple-800'>
          <div className='tile flex bg-purple-600'>
            <div className='tile-marker'>Apps</div>
          </div>
        </div>

        <div className='container flex bg-orange-800'>
          <div className='tile flex bg-orange-400'>
            <div className='tile-marker'>Websites</div>
          </div>
        </div>
      </div>

      <div className='container h-60 bg-blue-500'>
        <MediaScroll/>
      </div>

      <div className='container flex flex-row flex-nowrap bg-red-500'>
        <div className='container flex h-48 bg-yellow-500'>
          <div className='container flex flex-col'>
            <div className='container flex bg-emerald-800'>
              <div className='tile flex bg-emerald-500'>
                <div className='tile-marker'>Video</div>
              </div>
            </div>

            <div className='container flex bg-emerald-800'>
              <div className='tile flex bg-emerald-500'>
                <div className='tile-marker'>Storyline</div>
              </div>
            </div>

            <div className='container flex bg-emerald-800'>
              <div className='tile flex bg-emerald-500'>
                <div className='tile-marker'>Recommendations</div>
              </div>
            </div>

            <div className='container flex bg-emerald-800'>
              <div className='tile flex bg-emerald-500'>
                <div className='tile-marker'>Recently Visited</div>
              </div>
            </div>
          </div>
        </div>
        <div className='container flex h-48 bg-purple-500'>
          <div className='container flex flex-col'>
            <div className='container flex bg-emerald-800'>
              <div className='tile flex bg-emerald-500'>
                <div className='tile-marker'>ReleaseDates</div>
              </div>
            </div>

            <div className='container flex bg-emerald-800'>
              <div className='tile flex bg-emerald-500'>
                <div className='tile-marker'>Developers</div>
              </div>
            </div>

            <div className='container flex bg-emerald-800'>
              <div className='tile flex bg-emerald-500'>
                <div className='tile-marker'>Publishers</div>
              </div>
            </div>

            <div className='container flex bg-emerald-800'>
              <div className='tile flex bg-emerald-500'>
                <div className='tile-marker'>Game Modes:</div>
              </div>
            </div>

            <div className='container flex bg-emerald-800'>
              <div className='tile flex bg-emerald-500'>
                <div className='tile-marker'>Genre:</div>
                <div className='tile-marker'>GenreLink</div>
              </div>
            </div>

            <div className='container flex bg-emerald-800'>
              <div className='tile flex bg-emerald-500'>
                <div className='tile-marker'>Themes:</div>
                <div className='tile-marker'>ThemeLink</div>
              </div>
            </div>

            <div className='container flex bg-emerald-800'>
              <div className='tile flex bg-emerald-500'>
                <div className='tile-marker'>Series:</div>
                <div className='tile-marker'>SeriesLink</div>
              </div>
            </div>

            <div className='container flex bg-emerald-800'>
              <div className='tile flex bg-emerald-500'>
                <div className='tile-marker'>Player Perspectives:</div>
                <div className='tile-marker'>PerspectiveLink</div>
              </div>
            </div>

            <div className='container flex bg-emerald-800'>
              <div className='tile flex bg-emerald-500'>
                <div className='tile-marker'>GameEngine:</div>
                <div className='tile-marker'>EngineLink</div>
              </div>
            </div>

            <div className='container flex bg-emerald-800'>
              <div className='tile flex bg-emerald-500'>
                <div className='tile-marker'>Keywords:</div>
                <div className='tile-marker'>KeywordLink</div>
              </div>
            </div>

            <div className='container flex bg-emerald-800'>
              <div className='tile flex bg-emerald-500'>
                <div className='tile-marker'>ESRB Rating:</div>
                <div className='tile-marker'>RatingLink</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default GameDetail
