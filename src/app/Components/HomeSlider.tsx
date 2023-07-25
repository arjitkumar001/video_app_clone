import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Typography, Box, Grid } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import LinearIndeterminate from '@/app/Components/ProgressBar/Progressbar';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import VolumeOffOutlinedIcon from '@mui/icons-material/VolumeOffOutlined';
import Modal from '@mui/material/Modal';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import ReactPlayer from 'react-player';
import PauseIcon from '@mui/icons-material/Pause';
interface MovieData {
    id: number;
    title: string;
    release_date: string;
    original_language: string;
    vote_average: number;
    overview: string
    backdrop_path: string
}
const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    width: "50%",
    transform: 'translate(-50%, -50%)',
    bgcolor: '#171717',
  };


const overlayStyle: React.CSSProperties = {
    position: 'absolute',
    bottom: '100px',
    left: '20px',
    maxWidth: '70%',
};

const ImageChangeComponent: React.FC = () => {
    const [movieData, setMovieData] = useState<MovieData | null>(null);
    const [movies, setMovies] = useState<MovieData[]>([]);
    const [open, setOpen] = useState(false);
    const [selectedTvShow, setSelectedTvShow] = useState<MovieData | null>(null);
    const [videoData, setVideoData] = useState<any | null>(null);
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [isMuted, setIsMuted] = useState<boolean>(false);
    const [displayedMovies, setDisplayedMovies] = useState<MovieData[]>([]);
   


    const mainDivStyle: React.CSSProperties = {
        width: '100%',
        height: '100vh',
        backgroundImage: movieData
            ? `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.8)), url(https://image.tmdb.org/t/p/original${movieData.backdrop_path})`
            : '',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white',
        fontSize: '24px',
        position: 'relative',
    };


    useEffect(() => {
        fetchMovieData();
    }, []);

    const fetchMovieData = async () => {
        try {
            const apiKey = '70832fbf4e20b8e11a44971719bde149';
            const response = await axios.get(
                `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`
            );

            if (response.data && response.data.results && response.data.results.length > 0) {
                setMovies(response.data.results); // Update movies state with the array of MovieData
                const randomIndex = Math.floor(Math.random() * response.data.results.length);
                const movie: MovieData = response.data.results[randomIndex];
                setMovieData(movie);
              }
        } catch (error) {
            console.error('Error fetching movie data from TMDB API:', error);
        }
    };

    useEffect(() => {
        // Fetch video data for each movie when movies state changes
        const fetchVideoData = async (id: number) => {
          try {
            const response = await axios.get(
              `https://api.themoviedb.org/3/movie/${id}/videos?api_key=70832fbf4e20b8e11a44971719bde149`
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
    
        movies.map((movie: MovieData) => fetchVideoData(movie.id));
      }, [movieData]);
    
    useEffect(() => {
        setDisplayedMovies(movies);
    }, [movieData]);
    const handleOpen = (tvShow: MovieData) => {
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
        <Box sx={{...mainDivStyle,height:{sm:"60vh",xs:"50vh",md:"80vh",lg:"100vh"}}}>
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
                  style={{ opacity: ".5", }}
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
                      <VolumeOffOutlinedIcon sx={{ position: 'absolute', bottom: { xs: '15px', sm: '15px', md: '10px', lg: '8px' }, right: '20px', fontWeight: '400', color: 'white', cursor: 'pointer', fontSize: { xs: '2rem', sm: '2rem', md: '2.3rem' }, backgroundColor: 'transparent', border: '2px solid gray', borderRadius: '10px', ':hover': { color: 'darkgray' } }} />
                    ) : (
                      <VolumeUpIcon sx={{ position: 'absolute', bottom: { xs: '15px', sm: '15px', md: '10px', lg: '8px' }, right: '20px', fontWeight: '400', color: 'white', cursor: 'pointer', fontSize: { xs: '2rem', sm: '2rem', md: '2.3rem' }, backgroundColor: 'transparent', border: '2px solid gray', borderRadius: '10px', ':hover': { color: 'darkgray' } }} />
                    )
                  }
                </Typography>
              </Grid>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} sx={{ textAlign: 'justify', paddingLeft: { xs: '5px', sm: '10px', md: '10px' }, paddingBottom: '20px', paddingTop: '10px', width: '100%', color: 'white' }}>
              <Grid>
                <Typography sx={{ fontSize: { xs: '14px', sm: '16px', md: '20px' } }}>
                  Title: {selectedTvShow.title}
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
                <Typography sx={{ fontSize: { xs: '12px', sm: '12px', md: '14px' },whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis",width:"100%"}}>
                  {selectedTvShow.overview}
                </Typography>
              </Grid>
            </Grid>
          </Box>

        </Modal>
      )}
            {movieData && (
                <Box sx={{...overlayStyle,bottom:{xs:"30px",sm:"50px",md:"100px",lg:"100px"}}}>
                    <Typography  sx={{textTransform:"uppercase",fontSize:{xs:"28px",sm:"30px",md:"36px"}}}>{movieData.title}</Typography>
                    <Typography style={{ color: "#7FFF00" }}> {movieData.vote_average}% {movieData.release_date} <span style={{ color: "black", textTransform: "uppercase", fontSize: "1rem", fontWeight: "bold", border: "2px solid black" }}>{movieData.original_language}</span></Typography>
                    <Typography style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", width: "100%" }}>{movieData.overview}</Typography>
                    <Stack spacing={2} direction="row" marginTop={"10px"} sx={{ fontSize: { sm: '16px', xs: '14px', } }}>
                        <Button onClick={() => handleOpen(movieData)} variant="contained" sx={{ color: "#000", fontWeight: "bold", backgroundColor: "white", ":hover": { backgroundColor: "#2F4F4F" }, padding: { xs: "5px 10px", }, fontSize: { xs: "12px" }, textAlign: "center" }}><PlayArrowIcon /> Play</Button>
                        <Button onClick={() => handleOpen(movieData)} variant="outlined" sx={{ color: "white", border: "1px solid gray", padding: { xs: "5px 5px", }, fontSize: { xs: "12px" } ,":hover":{borderColor:"skyblue"}}}><InfoOutlinedIcon /> More info</Button>
                    </Stack>
                </Box>
            )}
        </Box>
    );
};

export default ImageChangeComponent;
