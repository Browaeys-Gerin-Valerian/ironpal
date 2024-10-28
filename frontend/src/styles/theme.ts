import { createTheme } from '@mui/material/styles';

export const colorPrimary = '#13DC94'; 
export const colorWhite = '#FFF'; 
export const colorBlack = '#000'; 
export const colorGrey = '#EFEFEF'; 

const theme = createTheme({
    breakpoints: {
        // valeurs MUI par défaut
        // values: {
        //     xs: 0,
        //     sm: 500,
        //     md: 900,
        //     lg: 1200,
        //     xl: 1536,
        // },
    },
    palette: {
        primary: {
            main: colorPrimary,
            // light: '#fff',
            // dark: '#13DC94',
            // contrastText: '#fff',
        },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: "inherit",
                    fontSize: '20px',
                    // '@media (max-width: 600px)': {
                    //     fontSize: '16px',
                    // },
                    // [theme.breakpoints.down('md')]: {
                    //     fontSize: '16px',
                    // },
                    borderRadius: "50px",
                    color: colorWhite,
                    boxShadow: 'none',
                    '&:hover': {
                        backgroundColor: colorPrimary,
                        color: '#fff',
                        // fontWeight: 'bold',
                        boxShadow: '0px 2px 4px -1px rgba(0,0,0,0.2),0px 4px 5px 0px rgba(0,0,0,0.14),0px 1px 10px 0px rgba(0,0,0,0.12)',
                    },
                },
                outlined: {
                    borderColor: colorPrimary,  
                    color: colorPrimary,        
                    '&:hover': {
                        backgroundColor: colorPrimary,
                        color: '#fff'
                    },
                },
            },
        },
    },
});

export default theme;
