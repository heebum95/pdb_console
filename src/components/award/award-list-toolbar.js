import {
    Box,
    Button,
    Card,
    CardContent,
    TextField,
    InputAdornment,
    SvgIcon, Typography
  } from '@mui/material';
  
  
  export const AwardToolbar = (props) => (
    <Box {...props}>
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          m: -1
        }}
      >
        <Typography
          sx={{ m: 1 }}
          variant="h4"
        >
          Award Database
        </Typography>
        <Box sx={{ m: 1 }}>
  
          <Button
            color="primary"
            variant="contained"
          >
            Add Person
          </Button>
        </Box>
      </Box>
  
    </Box>
  );
  