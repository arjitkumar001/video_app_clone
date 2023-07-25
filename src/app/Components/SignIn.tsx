import React from 'react'
import Button from '@mui/material/Button';
import Link from 'next/link';
const SignIn = () => {
  return (
  <Button sx={{ backgroundColor: "red", padding: "5px 0px", ":hover": { background: "brown" } }}>
    <Link href="/SignIN" style={{color:"white",textDecoration:"none", textTransform: "capitalize",fontWeight:"bold"}}>Sign In</Link>
  </Button>
  )
}

export default SignIn