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
    <Card sx={{ maxWidth: 280 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={image}  // Use image prop
          alt={title} 
            // Use title prop as alt text
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}  {/* Use title prop */}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {description}  {/* Use description prop */}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button variant="contained" size="small" color="success" onClick={onButtonClick}>
          {buttonText}  {/* Use buttonText prop */}
        </Button>
      </CardActions>
    </Card>
  );
}
