import {createMuiTheme} from '@material-ui/core/styles'

const palette = {
    primary: {
        light: "#3C5A73",
        main: "#243746",
        dark: "#152029"
    },
    secondary: {
        light: '#5F99af',
        main: '#368eaf',
        dark: '235d73'
    },
    light: '#73c3d5',
    dark: 'rgba(36,55,70,0.1)'
}

const themeLight = createMuiTheme({
    palette,
    text: {
        primary: "rgba(255,255,255,0.90)",
        secondary: "rgba(255,255,255,0.70)",
        disabled: "rgba(255,255,255,0.38)",
      },
    divider: "rgba(255,255,255,0.05)",
    background: {
        default: '#fff',
        paper: 'rgba(36,55,70,0.3)'
    },
    elevation: [
        "rgba(255, 255, 255, 0.05)",
        "rgba(255, 255, 255, 0.07)",
        "rgba(255, 255, 255, 0.08)",
        "rgba(255, 255, 255, 0.09)",
        "rgba(255, 255, 255, 0.11)",
        "rgba(255, 255, 255, 0.14)",
        "rgba(255, 255, 255, 0.14)",
        "rgba(255, 255, 255, 0.15)",
        "rgba(255, 255, 255, 0.16)",
      ],
    overrides: {
        MuiButton: {
            containedPrimary: {
                color: "rgba(255,255,255,1)",
                borderRadius: 8,
                backgroundColor: `${palette.primary.main}`,
                "&:hover": {
                  boxShadow: `0 0px 12px 0 ${palette.primary.main}`,
                  backgroundColor: `${palette.primary.main}`,
                },
                "&:focus": {
                    border: "none",
                    outline: "none",
                  },
                  "&:active": {
                    backgroundColor: `${palette.primary.dark}`,
                  },
            },
            containedSecondary: {
                color: "rgba(255,255,255,0.90)",
                borderRadius: 8,
                backgroundColor: `${palette.secondary.main}`,
                "&:hover": {
                  boxShadow: `0 0px 12px 0 ${palette.secondary.main}`,
                  backgroundColor: `${palette.secondary.main}`,
                },
                "&:focus": {
                  border: "none",
                  outline: "none",
                },
                "&:active": {
                  backgroundColor: `${palette.secondary.dark}`,
                }, 
            },
        },
        MuiCssBaseline: {
          '@global': {
            body: {
              // background: 'radial-gradient(circle, rgba(25,171,171,1) 0%, rgba(26,75,88,1) 0%, rgba(26,27,47,1) 100%)',
            },
            '*::-webkit-scrollbar': {
              width: '0.5em'
            },
            '*::-webkit-scrollbar-track': {
              borderRadius: "10px",
              '-webkit-box-shadow': `${palette.dark}`,
            },
            '*::-webkit-scrollbar-thumb': {
              background: `${palette.primary.main}`,
              borderRadius: "6px",
              border: `3px solid ${palette.dark}`,
            },
            '*::-webkit-scrollbar:vertical':{
              '-webkit-appearance': "none"
            },
            '*::-webkit-scrollbar-button:increment,.contenedor::-webkit-scrollbar-button': {
              display: "none"
            },
            '*::-webkit-scrollbar:horizontal': {
              height: '0.8em'
            },
          },
        },  
    }
})

export default themeLight;