import React from "react";


import { Box, Button, Container, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import { useNavigate } from "react-router-dom";
import NotFoundPAge from'.././resources/images/notFound.gif';

export default function PageNotFound(){
const navigate = useNavigate()


function handleNotFound(){
    navigate('/')
}
return (<Box
    sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh'
    }}
  >
    <Container maxWidth="md">
      <Grid  container
  spacing={0}
  direction="column"
  alignItems="center"
  justifyContent="center"
  style={{ minHeight: '100vh' }}>
      <Grid >
          <img
            src={NotFoundPAge}
            alt=""
            width={400} height={200}
          />
        </Grid>
        <Grid >
        
     
          <Button onClick={handleNotFound} variant="contained">Back Home</Button>
        </Grid>
   
      </Grid>
    </Container>
  </Box>);

}