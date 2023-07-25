'use client'
import React from 'react'
import '@/app/style/home.css'
import { Grid, Typography, Box,Button } from '@mui/material'
import { useRef } from 'react';
import { useEffect, useState } from 'react';
import { TopRated } from './API/TopRated'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import Modal from '@mui/material/Modal';
import Container from '@mui/material/Container/Container'
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import VolumeOffOutlinedIcon from '@mui/icons-material/VolumeOffOutlined';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import ReactPlayer from 'react-player';
import PauseIcon from '@mui/icons-material/Pause';
import axios from 'axios';


interface TMDBMovie {
  id: number;
  original_title: string
  poster_path: string
  release_date: string
  vote_average: number
  original_language: string
  overview: string
}

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  width: "50%",
  transform: 'translate(-50%, -50%)',
  bgcolor: '#171717',
};
const youtube = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  fontSize: "100px",
  fill: "red"
};
const isServer = typeof window === 'undefined';
const TopRatedMovie: React.FC = () => {
  const [movies, setMovies] = useState<TMDBMovie[]>([]);
  const [open, setOpen] = useState(false);
  const [selectedTvShow, setSelectedTvShow] = useState<TMDBMovie | null>(null);
  const [videoData, setVideoData] = useState<any | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);

  
  useEffect(() => {
    async function TopratedmovieApi() {
      try {
        const ratedmovie = await TopRated();
        // console.log(upcommingApi);
        if (ratedmovie && ratedmovie.results) {
          setMovies(ratedmovie.results);
        }
      } catch (error) {
        console.error('Error fetching data from TMDB:', error);
      }
    }
    TopratedmovieApi()
  }, []);
  useEffect(() => {
    // Fetch video data for each movie when movies state changes
    const fetchVideoData = async (id: number) => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}/videos?api_key=70832fbf4e20b8e11a44971719bde149&append_to_response=videos`
        );
        const videoKey = response.data.results[0]?.key;
        if (videoKey) {
          setVideoData((prevData: any) => ({
            ...prevData,
            [id]: videoKey,
          }));
        }
      } catch (error) {
        console.error('Error fetching video data:', error);
      }
    };

    movies.map((movie: TMDBMovie) => fetchVideoData(movie.id));
  }, [movies]);

  const containerRef = useRef<HTMLDivElement>(null);
  const handleScrollLeft = () => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        left: containerRef.current.scrollLeft - 300,
        behavior: 'smooth',
      });
    }
  };

  const handleScrollRight = () => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        left: containerRef.current.scrollLeft + 300,
        behavior: 'smooth',
      });
    }
  };
  const handleOpen = (tvShow: TMDBMovie) => {
    setSelectedTvShow(tvShow);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedTvShow(null);
  };

  const handlePlayVideo = () => {
    setIsPlaying((prevState) => !prevState);
  };
  const handleMute = () => {
    setIsMuted((prevIsMuted) => !prevIsMuted);
  };

  return (
    <>
        {/* Modal start here=================================== */}
        {selectedTvShow && (
        <Modal
          open={open}
          onClose={handleClose}
          sx={{ backgroundColor: 'rgba(23, 23, 23,0.8)' }}
        >
          <Box className="model-body" sx={{ ...style, display: 'flex', flexDirection: 'column' }}>
            <Grid item xs={12} sm={12} md={6} lg={6} sx={{ alignItems: 'center', width: '100%', position: 'relative', cursor: 'pointer' }}>
              {selectedTvShow && videoData[selectedTvShow.id] && (
                <ReactPlayer
                  playing={isPlaying}
                  controls={false}
                  muted={isMuted}
                  autoplay={false}
                  style={{ opacity: ".5",}}
                  url={`https://www.youtube.com/watch?v=${videoData[selectedTvShow.id]}`}
                  width="100%"
                  height={500}
                  config={{
                    youtube: {
                      playerVars: { showinfo: 0, disablekb: 1 },
                    },
                  }}
                />
              )}
              <Typography sx={{ position: 'absolute', right: '10px', top: { xs: '5px', sm: '5px', md: '5px' }, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '20px' }}>
                <IconButton onClick={handleClose}>
                  <CloseIcon sx={{ fontSize: '24px', fontWeight: '800', color: 'gray', backgroundColor: 'lightgray', borderRadius: '5px', ':hover': { color: 'darkgrey' } }} titleAccess="Close" />
                </IconButton>
              </Typography>
              <Grid sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Typography onClick={handlePlayVideo} display={"inline"} sx={{ position: "absolute", bottom: "10px", left: "20px", }}>
                  {
                    isPlaying ? (
                      <Button sx={{ color: "black", background: "white", fontWeight: "bold", border: "2px solid black", outline: "2px solid white", textTransform: "capitalize", ":hover": { background: "darkgray" } }}><PauseIcon />Pause</Button>
                    ) :
                      (
                        <Button sx={{ color: "black", background: "white", fontWeight: "bold", border: "2px solid black", outline: "2px solid white", textTransform: "capitalize", ":hover": { background: "darkgray" } }}><PlayArrowIcon />Play</Button>
                      )
                  }
                </Typography>
                <AddCircleOutlineOutlinedIcon titleAccess="Save" sx={{ position: 'absolute', bottom: { xs: '15px', sm: '15px', md: '10px', lg: '8px' }, right: '80px', fontWeight: '400', color: 'white', cursor: 'pointer', fontSize: { xs: '2rem', sm: '2rem', md: '2.5rem' }, ':hover': { color: 'darkgray' } }} />
                <Typography onClick={handleMute}>
                  {
                    isMuted ? (
                      <VolumeOffOutlinedIcon titleAccess='Mute' sx={{ position: 'absolute', bottom: { xs: '15px', sm: '15px', md: '10px', lg: '8px' }, right: '20px', fontWeight: '400', color: 'white', cursor: 'pointer', fontSize: { xs: '2rem', sm: '2rem', md: '2.3rem' }, backgroundColor: 'transparent', border: '2px solid gray', borderRadius: '10px', ':hover': { color: 'darkgray' } }} />
                    ) : (
                      <VolumeUpIcon titleAccess='Unmute' sx={{ position: 'absolute', bottom: { xs: '15px', sm: '15px', md: '10px', lg: '8px' }, right: '20px', fontWeight: '400', color: 'white', cursor: 'pointer', fontSize: { xs: '2rem', sm: '2rem', md: '2.3rem' }, backgroundColor: 'transparent', border: '2px solid gray', borderRadius: '10px', ':hover': { color: 'darkgray' } }} />
                    )
                  }
                </Typography>
              </Grid>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} sx={{ textAlign: 'justify', paddingLeft: { xs: '5px', sm: '10px', md: '10px' }, paddingBottom: '20px', paddingTop: '10px', width: '100%', color: 'white' }}>
              <Grid>
                <Typography sx={{ fontSize: { xs: '14px', sm: '16px', md: '20px' } }}>
                  Title: {selectedTvShow.original_title}
                </Typography>
                <Grid sx={{ display: 'flex', columnGap: '10px' }}>
                  <Typography sx={{ fontSize: { xs: '14px', sm: '16px', md: '20px', color: '#7FFF00' } }}>
                    {selectedTvShow.vote_average}%
                  </Typography>
                  <Typography sx={{ fontSize: { xs: '14px', sm: '16px', md: '20px' }, color: '#7FFF00' }}>
                    {selectedTvShow.release_date}
                  </Typography>
                  <Typography sx={{ fontSize: { xs: '12px', sm: '12px', md: '12px' }, border: '1px solid white', borderRadius: '3px', padding: '5px 7px', textTransform: 'uppercase' }}>
                    {selectedTvShow.original_language}
                  </Typography>
                </Grid>
                <Typography sx={{ fontSize: { xs: '12px', sm: '12px', md: '14px' } }}>
                  {selectedTvShow.overview}
                </Typography>
              </Grid>
            </Grid>
          </Box>

        </Modal>
      )}
      <Container maxWidth="xl">
        <Typography variant='h4' sx={{ color: "gray", padding: "10px 20px", textTransform: "uppercase", textAlign: "justify", fontSize: { xs: "20px" } }}>Top Rated </Typography>
        <Grid
          ref={containerRef}
          className='scroll-btn'
          sx={{ display: "flex", overflowX: "scroll", "&::-webkit-scrollbar": { display: "none" }, position: "relative" }}
        >
          <Grid item xs={12} className='scroll-button' onClick={() => handleScrollLeft()} sx={{ position: 'sticky', top: 0, left: 0, zIndex: 1, ":hover": { backgroundColor: "black", opacity: "0.3" }, borderRadius: "none", display: "flex", justifyContent: "center", alignItems: "center", padding: "0px 10px", width: "30px" }}>
            <ArrowBackIosIcon className='scroll-icon' sx={{ marginLeft: "10px", color: "black", fontSize: "2rem", zIndex: 2, }} />
          </Grid>
          {
            movies.map((movie) => {
              return (
                <Grid  key={movie.id} sx={{ cursor: "pointer", }}>
                  <Grid sx={{ width: "250px", height: "350px", columnGap: "10px", textAlign: "center", padding: "0px 2px", overflow: "hidden" }}>
                    <img
                      onClick={() => handleOpen(movie)}
                      className='home-Img'
                      src={"http://image.tmdb.org/t/p/w500" + movie.poster_path}
                      alt=""
                      height="auto"
                      width="100%"
                      loading='eager' // Set loading to eager 
                    />
                  </Grid>
                </Grid>
              )
            })
          }
          <Grid className='scroll-button' onClick={() => handleScrollRight()} sx={{ position: 'sticky', top: 0, right: 0, zIndex: 1, ":hover": { backgroundColor: "black", opacity: "0.3" }, borderRadius: "none", display: "flex", justifyContent: "center", alignItems: "center", padding: "0px 10px", width: "30px" }} >
            <ArrowForwardIosIcon className='scroll-icon' sx={{ color: "black", fontSize: "2rem", zIndex: 2, }} />
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default TopRatedMovie;
