import * as React from 'react';
import Box from '@mui/joy/Box';
import Card from '@mui/joy/Card';
import CardCover from '@mui/joy/CardCover';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import ci_7 from '../../assets/ci_7.jpg'
import ci_8 from '../../assets/ci_8.jpg'

export default function CategoryImages() {
  return (
    <>
      <Box
      component="ul"
      className='px-3'
      sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', p: 0, m: 0 }}
    >
      <Card component="li" sx={{ minWidth: 300, flexGrow: 1 }}>
        <CardCover>
          <img
            src={ci_7}
            // srcSet="https://images.unsplash.com/photo-1502657877623-f66bf489d236?auto=format&fit=crop&w=800&dpr=2 2x"
            loading="lazy"
            alt=""
          />
        </CardCover>
        <CardContent>
          <Typography
            level="body-lg"
            textColor="#fff"
            sx={{ fontWeight: 'lg', mt: { xs: 12, sm: 18, lg: 50, fontSize: '40px' } }}
          >
            Men
          </Typography>
        </CardContent>
      </Card>
      <Card component="li" sx={{ minWidth: 300, flexGrow: 1 }}>
      <CardCover>
          <img
            src={ci_8}
            // srcSet="https://images.unsplash.com/photo-1502657877623-f66bf489d236?auto=format&fit=crop&w=800&dpr=2 2x"
            loading="lazy"
            alt=""
          />
        </CardCover>
        <CardContent>
          <Typography
            level="body-lg"
            textColor="#fff"
            sx={{ fontWeight: 'lg', mt: { xs: 12, sm: 18, lg: 50 }, fontSize: '40px' }}
          >
            Women
          </Typography>
        </CardContent>
      </Card>
    </Box>
    </>
  
  );
}
