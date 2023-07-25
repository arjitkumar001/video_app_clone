'use client'
import React from 'react'
import NewAndRecentlyMovie from '../Components/NewAndRecently'
import PopularmoviePage from '../Components/PopularMovies'
import TopRatedMovie from '../Components/TopRatedMovie'
import NowPlaingMovie from '../Components/NowPlayingMovie'
import DayByDayMovie from '../Components/DayByDayMovie'
import {Suspense} from 'react'
import { Box } from '@mui/material'
const page = () => {
  return (
  <Box>
    <Suspense>
      <NowPlaingMovie />
      <PopularmoviePage />
      <TopRatedMovie />
      <DayByDayMovie />
      <NewAndRecentlyMovie />
    </Suspense>
    </Box>
  )
}

export default page