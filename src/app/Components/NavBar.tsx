import React, { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import { Grid } from '@mui/material';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Link from 'next/link';
import Container from '@mui/material/Container/Container'
import Image from 'next/image';
import dynamic from "next/dynamic";
import SearchBar from './SearchField';



const pages = ['Home', 'TV Shows', 'Movies', 'Recently Added'];
const pageLink = ['/', '/tvshow', '/movies', '/recentlyadd'];


function NavBar() {
    const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
    const [scrollColor, setScrollColor] = useState('transparent');

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    //change background color onScroll
    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            const threshold = 100;

            if (scrollPosition > threshold) {
                setScrollColor('#171717');
            }
            else {
                setScrollColor('transparent');
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <AppBar position="fixed" sx={{ backgroundColor: { lg: scrollColor, md: scrollColor, sm: '#171717', xs: '#171717' }, boxShadow: "none", height: "70px" }}>
            <Container maxWidth="xl">
                <Toolbar >
                    <Grid
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                        }}
                    >
                        {/* logo */}
                        <Image src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg" alt="" height={40} width={150} priority={true} />
                    </Grid>

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                            className='menuIcon'

                        >
                            <Image src="https://upload.wikimedia.org/wikipedia/commons/0/0c/Netflix_2015_N_logo.svg" alt="" height={30} width={20} className='' priority={true} />
                            <MenuIcon sx={{ fontSize: "2.5rem" }} />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: "flex", md: 'none' },
                            }}
                        >
                            {pages.map((page, index) => (
                                <MenuItem key={page} onClick={handleCloseNavMenu} sx={{ padding: { xs: "10px 100px" }, textTransform: "uppercase", fontWeight: "800", borderBottom: "1px solid gray" }}>
                                    <Typography variant='body2' textAlign="center"><Link href={pageLink[index]} style={{ textDecoration: "none", fontWeight: "bold", color: "black" }}>{page}</Link></Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>

                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {pages.map((page, index) => (
                            <Link href={pageLink[index]} key={page} passHref style={{ textDecoration: "none" }}>
                                <Button
                                    onClick={handleCloseNavMenu}
                                    sx={{ my: 2, color: 'white', display: 'block' }}
                                >
                                    {page}
                                </Button>
                            </Link>
                        ))}
                    </Box>
                    <Box sx={{ flexGrow: 0 }}>
                        <SearchBar />
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}
// export default NavBar;
export default dynamic(() => Promise.resolve(NavBar), { ssr: false })


