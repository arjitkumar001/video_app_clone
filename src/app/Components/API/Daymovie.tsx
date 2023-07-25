'use client'
import axios from 'axios';

const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const apikey = "70832fbf4e20b8e11a44971719bde149";
const endpoint = '/trending/movie/day';

export async function Daymovie(): Promise<any> {
  const url = `${TMDB_BASE_URL}${endpoint}?api_key=${apikey}`;

  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error('Error fetching data from TMDB:', error);
    return null;
  }
}
