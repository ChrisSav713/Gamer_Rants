import React from 'react'

function SimilarIndividual(props) {
  const {item, game} = props
  
  return (
  <div class="grid grid-row-3 w-20 ml-5">
    <img
      src={`https://images.igdb.com/igdb/image/upload/t_cover_small/${item?.cover?.image_id}.jpg`}
      alt={item.name}
      width='120'
      height='200'
    ></img>
    <div className="flex flex-wrap"><p>{item.name}</p></div>
    {game?.total_rating != undefined && <div className="flex w-14 h-14 bg-green-500 text-center rounded-full justify-self-center"><span class="text-white text-4xl align-middle text-center inline-block leading-normal ml-2">{Math.round(item?.total_rating)}</span></div>}
  </div>
  )
}

export default SimilarIndividual