import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CardActionArea from '@mui/material/CardActionArea';
import CardActions from '@mui/material/CardActions';

export default function MultiActionAreaCard({
  title,
  description,
  image,
  buttonText,
  onButtonClick
}) {
  return (
    <Card sx={{ maxWidth: 280, backgroundColor: '#bdc3c7' }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={image}
          alt={title}
          sx={{
            width: 140,
            height: 140,
            borderRadius: '50%',
            margin: '20px auto',
          }}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button variant="outlined" size="small" color="secondary" onClick={onButtonClick}>
          {buttonText}
        </Button>
      </CardActions>
    </Card>
  );
}
