import * as React from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Link from 'next/link';
import { Container, Typography } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import YouTubeIcon from '@mui/icons-material/YouTube';

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  boxShadow: "none"
}));
const style = {
  fontSize: "1.5rem",
  color: "white",
  marginRight: "20px",
};

export default function RowAndColumnSpacing() {
  return (
    <Box sx={{ width: '100%' }} mt={10}>
      <Container maxWidth="lg">
        <Grid container rowSpacing={1}>
          <Grid item xs={6} sm={3} md={3} lg={3} >
            <Item sx={{ color: "gray", height: "250px", backgroundColor: "transparent", cursor: "pointer",rowGap:"10px" }}>
              <Typography sx={{ textAlign: "center", }}>
                <FacebookIcon sx={{ ...style, ":hover": { color: "red" } }} />
                <InstagramIcon sx={{ ...style, ":hover": { color: "red" } }} />
                <TwitterIcon sx={{ ...style, ":hover": { color: "red" } }} />
                <YouTubeIcon sx={{ ...style, ":hover": { color: "red" },marginRight:"0px" }} />
              </Typography>
              <Typography variant='body2'>
                <Link href="#" className='footer-link'>Audio Description</Link>
              </Typography>
              <br />
              <Typography variant='body2'>
                <Link href="#" className='footer-link'>Investor Relations</Link>
              </Typography>
              <br />
              <Typography variant='body2'>
                <Link href="#" className='footer-link'>Legal Notices</Link>
              </Typography>
              <br />
              <Typography variant='subtitle1' display={"inline"} sx={{ border: "1px solid gray", borderColor: "skyblue", padding: "10px", ":hover": { background: "#ADD8E6", opacity: ".3", color: "black" } }}>
                Service Code
              </Typography>
              <br />
              <br />
              <Typography variant='body1'>
                @ 2023-2023 Netflix.
              </Typography>
            </Item>
          </Grid>
          <Grid item xs={6} sm={3} md={3} lg={3} >
            <Item sx={{ display: "flex", flexDirection: "column", justifyContent: "center", height: "250px", backgroundColor: "transparent", textAlign: "justify",rowGap:"10px" }}>
              <Typography variant='body2'>
                <Link href="#" className='footer-link'>Help Center</Link>
              </Typography>
              <Typography variant='body2'> 
                <Link href="#" className='footer-link'>Jobs</Link>
              </Typography>
              <Typography variant='body2'>
                <Link href="#" className='footer-link'>Cookies Preferences</Link>
              </Typography>
            </Item>
          </Grid>
          <Grid item xs={6} sm={3} md={3} lg={3} >
            <Item sx={{ height: "250px", display: "flex", flexDirection: "column", justifyContent: "center", textAlign: "justify", backgroundColor: "transparent",rowGap:"10px" }}>
              <Typography variant='body2'>
                <Link href="#" className='footer-link'>Gift Card</Link>
              </Typography>
              <Typography variant='body2'>
                <Link href="#" className='footer-link'>Term of use</Link>
              </Typography>
              <Typography variant='body2'>
                <Link href="#" className='footer-link'>Corporate Information</Link>
              </Typography>
            </Item>
          </Grid>
          <Grid item xs={6} sm={3} md={3} lg={3} >
            <Item sx={{ height: "250px", display: "flex", flexDirection: "column", justifyContent: "center", textAlign: "justify", backgroundColor: "transparent",rowGap:"10px" }}>
              <Typography variant='body2'>
                <Link href="#" className='footer-link'>Media Center</Link>
              </Typography>
              <Typography variant='body2'>
                <Link href="#" className='footer-link'>Privacy</Link>
              </Typography>
              <Typography variant='body2'>
                <Link href="#" className='footer-link'>Contact Us</Link>
              </Typography>

            </Item>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}