import {makeStyles} from '@material-ui/styles'

const useStyle = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    appBar:{
        zIndex: theme.zIndex.drawer + 1, 
        background: 'rgb(115,195,213)',
        background: 'linear-gradient(0deg, rgba(115,195,213,1) 0%, rgba(36,55,70,1) 100%)',
    },
    title: {
        width: `${theme.spacing(2)}%`, 
        heigth: `${theme.spacing(2)}%`
    },
    space: {
        flexGrow: 1
    },
    btn: {
        color: '#fff',
        textDecoration: 'none',
    },
}))

export default useStyle;