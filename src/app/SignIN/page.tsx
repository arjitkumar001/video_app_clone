'use client'
import React from 'react'
import { Box, Grid, Typography } from '@mui/material'
import Button from '@mui/material/Button';
import Link from 'next/link';
import GoogleIcon from '@mui/icons-material/Google';

const page = () => {
    return (
        <Box sx={{ height: "100vh", width: "100%", display: "flex", justifyContent: "center", alignItems: "center", transform: "translate(-50% -50%)" }}>
            <Grid sx={{ background: "rgba(39,39,42,.25)", width:{lg:"30%",md:"40%",sm:"50%",xs:"90%"}, textAlign: "center", padding: "50px 0", borderRadius: "10px" }}>
                <Typography variant='h4' sx={{ padding: "10px 0", fontWeight: "800", color: "white" }}>
                    Sign in
                </Typography>
                <Button sx={{ width: "70%", background: "red", color: "white", ":hover": { background: "brown" } }}><GoogleIcon /> <Link href="https://accounts.google.com/o/oauth2/v2/auth/oauthchooseaccount?client_id=829258694426-bpp478b171aoni4v9q8jglb6ae5iue0n.apps.googleusercontent.com&scope=openid%20email%20profile&response_type=code&redirect_uri=https%3A%2F%2Fnetflx-web.vercel.app%2Fapi%2Fauth%2Fcallback%2Fgoogle&state=pXgO55LfJNpKCEXbTQeoDlTIYZ0RZZDg7fQlMkUvZa8&code_challenge=TS927_-TdVCUXCxIWvvcXZMoL-8s1XdHyARWV1EOhrI&code_challenge_method=S256&service=lso&o2v=2&flowName=GeneralOAuthFlow" style={{ textTransform: "capitalize", color: "white", fontWeight: "bold", textDecoration: "none", marginLeft: "10px" }}>Google</Link></Button>
            </Grid>
        </Box>
    )
}

export default page



