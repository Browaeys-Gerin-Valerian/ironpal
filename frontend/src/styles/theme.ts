import { createTheme } from '@mui/material/styles';

export const colorPrimary = '#13DC94'; 
export const colorWhite = '#FFF'; 
export const colorBlack = '#000'; 
export const colorGrey = '#EFEFEF'; 

export const fontTheme = { fontFamily: '"Bruno Ace SC", sans-serif'};
export const fontText = { fontFamily: '"Lexend", sans-serif'};

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
    typography: {
        ...fontText,
        fontWeightRegular: 300,
        fontSize: 16,
    },
    components: {
        MuiContainer: {
            styleOverrides: {
              root: {
                maxWidth: '1400px !important',
              },
            },
        },
        MuiAlert: {
            styleOverrides: {
              standardSuccess: {
                // backgroundColor: 'green',
                fontSize: '16px',
                fontWeight: 400,
              },
              standardError: {
                // backgroundColor: 'red',
                fontSize: '16px',
                fontWeight: 400,
              },
              standardWarning: {
                // backgroundColor: 'orange',
                fontSize: '16px',
                fontWeight: 400,
              },
              standardInfo: {
                // backgroundColor: 'grey',
                fontSize: '16px',
                fontWeight: 400,
              }
            }
        },
        MuiTypography: {
            styleOverrides: {
                h1: {
                    ...fontTheme,
                    fontSize: '50px',
                    marginBottom: '30px',
                    // test avec CLAMP : clamp(10px, 4em, 80px)
                },
                h2: {
                    ...fontTheme,
                    fontSize: '40px',
                    marginBottom: '30px',
                },
                h3: {
                    ...fontTheme,
                    fontSize: '35px',
                    marginBottom: '20px',
                },
                body1: {
                    ...fontText,
                    fontWeightRegular: 300,
                    fontSize: 18,
                }
            },
            defaultProps: {
                variantMapping: {
                  body1: 'span',
                },
              },
        },
        MuiLink: {
            styleOverrides: {
              root: {
                textDecoration: 'none',
                color: '#000',
                ...fontText,
                fontWeight: 400,
                fontSize: '20px !important',
                '&:hover': {
                  color: '#000',
                  fontWeight: 600,
                },
              },
            },
        },
        MuiCard: {
          styleOverrides: {
            root: {
              borderRadius: '15px !important',
              boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
              transition: 'box-shadow 0.3s ease-in-out', 
              overflow: 'hidden !important',
              height: 'fit-content !important',
              backgroundColor: colorGrey,
              '&:hover': {
                boxShadow: '0px 6px 12px rgba(0, 0, 0, 0.15)',
              },
            },
          },
        },
        MuiCardContent: {
          styleOverrides: {
            root: {
              padding: '16px',
            },
          },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: "inherit",
                    fontSize: '20px',
                    padding: '7px 50px',
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
