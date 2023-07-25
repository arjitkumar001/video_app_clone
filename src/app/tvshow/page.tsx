'use client'
import React from 'react'
import TrendingTv from '../Components/TrendingTv'
import TopRatedMovie from '../Components/TopRatedMovie'
import NewAndRecentlyMovie from '../Components/NewAndRecently'
import {Suspense} from "react"
import { Box } from '@mui/material'
const page = () => {
  return (
  <Box>
     <Suspense>
    <TrendingTv/>
    <TopRatedMovie />
    <NewAndRecentlyMovie />
    </Suspense>
    </Box>
  )
}

export default page
