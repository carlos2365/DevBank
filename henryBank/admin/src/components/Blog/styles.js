import {makeStyles} from '@material-ui/styles'


const drawerWidth = 224;

const useStyles = makeStyles(theme => ({
    root: {
        marginTop: theme.spacing(8),
    },
    toolbar: theme.mixins.toolbar,
    drawer:{
        width: drawerWidth,
        flexShrink:0,
        
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerContainer: {
        overflow:'auto',
    },
    drawerText: {
        color: '#fff',
        textDecoration: 'none',
    },
    img: {
        marginTop: theme.spacing(8)
    },
    cnt: {
        width:'100%',
        // margin: `0 ${theme.spacing(7)}px 0 0`
        // display: 'flex',
        // flexDirection: 'column',
        // justifyContent: 'center',
        // alignItems: 'center'
    },
    cntBlog: {
        // padding: theme.spacing(4),
        // border: '1px solid black'
    },
    banner: {
        width: '100%',
        minHeight: '90vh',
        background: 'rgba(54,142,175,0.1)',
        display: 'flex',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        
    },
    dev:{
        display:'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        width: '70%',
        height: '80%',
        background: 'rgb(115,195,213)',
        background: 'linear-gradient(0deg, rgba(115,195,213,1) 0%, rgba(36,55,70,1) 100%)',
        boxShadow: theme.shadows[8],
        borderRadius: theme.spacing(6),
    },
    bannerImg: {
        width: '80%',
        height: '70%'
    },
    bannerTxt: {
        color: '#fff',
        fontStyle: 'italic'
    },
    field: {
        width: '100%',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'space-evenly',
        flexDirection: 'column',
        padding: theme.spacing(4),
    },
    field2: {
        width: '100%',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'space-evenly',
        flexDirection: 'column',
        padding: theme.spacing(4),
        backgroundColor: 'rgba(54,142,175,0.1)'
    },
    video: {
        boxShadow: theme.shadows[8],
        borderRadius: theme.spacing(2),

    },
    team: {
        display: 'flex',
        justifyContent: 'space-evenly',
    },
    title: {
        textAlign:'center',
        width: '35%',
        maxHeight: '32px',
    },
    text:{
        display: 'flex',
        alignItems:'center',
        justifyContent: 'center',
        height: theme.spacing(20),

    },
    text2:{
        display: 'flex',
        alignItems:'center',
        justifyContent: 'center',
        height: theme.spacing(20),

    },
    cntTeam: {
        display: 'flex',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        flexWrap: 'wrap'
    },
    cntCard: {
        display: 'flex',
        justifyContent:'center',
        alignItems:'center',
        width: '30%',
    },
    card:{
        display: 'flex',
        flexDirection: 'column',
        justifyContent:'space-evenly',
        alignItems:'center',
        width: '100%',
        minHeight: '30vh',
        borderRadius: theme.spacing(3),
        background: 'rgb(115,195,213)',
        background: 'linear-gradient(0deg, rgba(115,195,213,1) 0%, rgba(36,55,70,1) 100%)',
        color: '#fff',
        
    },
    ctntitle:{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: theme.spacing(30),
        margin: theme.spacing(2),

    },
    svg: {
        width: '80%',
        height: '80%'
    },
    svgText: {
        width: '60%',
        height: '60%'
    }


}))

export default useStyles;