'use client'
import React from 'react'
import DayByDayMovie from '../Components/DayByDayMovie'
import PopularmoviePage from '../Components/PopularMovies'
import TopRatedMovie from '../Components/TopRatedMovie'
import NowPlaingMovie from '../Components/NowPlayingMovie'
import NewAndRecentlyMovie from '../Components/NewAndRecently'
import {Suspense} from 'react'

const page = () => {
  return (

    <Suspense>
      <NowPlaingMovie/>
      <DayByDayMovie />
      <PopularmoviePage />
      <NewAndRecentlyMovie />
      <TopRatedMovie />
    </Suspense>
  
  )
}

export default page
