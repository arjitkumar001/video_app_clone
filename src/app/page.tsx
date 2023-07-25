'use client'
import React from 'react'
import '@/app/style/home.css'
import { Box } from '@mui/material'
import TopRatedMovie from './Components/TopRatedMovie'
import PopularmoviePage from './Components/PopularMovies'
import UpcomingMovie from './Components/UpcomingMovie'
import { Suspense } from 'react'
import ImageChangeComponent from './Components/HomeSlider'

const page: React.FC = () => {
  return (
    <Box id="home-page">
      <Suspense>
        <ImageChangeComponent/>
        <UpcomingMovie/>
        <TopRatedMovie />
        <PopularmoviePage />
      </Suspense>
    </Box>
  );
};

export default page;
