import React from 'react'
import useStyles from './styles'
import logo from '../../images/Blanco.svg'
import isoBlack from '../../images/isoNegro.svg'
import app from '../../images/mobile.svg'
import us from '../../images/design.svg'
import wallet from '../../images/wallet.svg'
import pig from '../../images/saving.svg'
import vault from '../../images/vault.svg'
import mates from '../../images/team.svg'
import team from './team'
import {
    Grid,
    Paper,
    Avatar,
    Box,
    Drawer,
    Divider,
    List,
    ListItem,
    ListItemText,
    Typography,
} from '@material-ui/core'
import TeamCard from './TeamCard'

const Blog = () => {
    const classes = useStyles()

    return (
        <Grid container className={classes.root} xs={12}>
            
            <Grid item container>
                <Grid item container xs={12} >
                    <Grid item conatiner className={classes.cnt}>
                        <Grid item container className={classes.cntBlog}>
                            <Grid item container className={classes.banner} >
                                <Grid item className={classes.dev}>
                                    <img src={logo} className={classes.bannerImg}/>
                                    <Typography variant='h5' className={classes.bannerTxt}>Better Faster Stronger</Typography>
                                </Grid>
                            </Grid>
                        </Grid >
                        <Grid item container className={classes.cntBlog} >
                            <Grid item container className={classes.field} id='app'>
                                <Grid item className={classes.ctntitle}>
                                    <Typography variant='h2' className={classes.title}>
                                        Your APP
                                    </Typography>
                                    <img src={app} className={classes.svg} />
                                </Grid>
                                <Grid item>
                                    <iframe width="100%" height="500vh" className={classes.video} src="https://www.youtube.com/embed/MPbUaIZAaeA" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item container className={classes.cntBlog}>
                            <Grid item container className={classes.field2} id='why'>
                                <Grid item className={classes.ctntitle}>
                                    <Typography variant='h2' className={classes.title}>
                                        Why Dev Bank
                                    </Typography>
                                    <img src={us} className={classes.svg}/> 
                                </Grid>
                                <Grid item container className={classes.text}>
                                    <Grid item xs={2} />
                                    <Grid item xs={3}>
                                        <img src={wallet} className={classes.svgText} />
                                    </Grid>
                                    <Grid item xs={7}>
                                        <Typography variant='h2' className={classes.text}>
                                            "Better"
                                        </Typography>
                                    </Grid>
                                </Grid>
                                <Grid item container className={classes.text}>
                                    <Grid item xs={4}>
                                        <Typography variant='h2' className={classes.text2}>
                                            "Faster"
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={3}>
                                        <img src={pig} className={classes.svgText} />
                                    </Grid>
                                </Grid>
                                <Grid item container className={classes.text}>
                                    <Grid item xs={2} />    
                                    <Grid item xs={2}>
                                        <img src={vault} className={classes.svgText} />
                                    </Grid>
                                    <Grid item xs={8} >
                                        <Typography variant='h2' className={classes.text}>
                                            "Stronger"
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item container className={classes.cntBlog}>
                            <Grid item container className={classes.field} id='team'>
                                <Grid item className={classes.ctntitle}>
                                    <Typography variant='h2' className={classes.title}>
                                        Team
                                    </Typography>
                                    <img src={mates} className={classes.svg}/>
                                </Grid>
                                <Grid item container spacing={2} className={classes.cntTeam}>
                                    <Grid item container xs={3} className={classes.cntCard}>
                                        <Grid item className={classes.card}>
                                            <Avatar src={team[0].img} />
                                            <Typography variant='h6'>{team[0].name}</Typography>
                                            <Typography variant='subtitle2'>{team[0].workAs}</Typography>
                                        </Grid>
                                    </Grid>
                                    <Grid item container xs={3} className={classes.cntCard}>
                                        <Grid item className={classes.card}>
                                            <Avatar src={team[1].img}/>
                                            <Typography variant='h6'>{team[1].name}</Typography>
                                            <Typography variant='subtitle2'>{team[1].workAs}</Typography>
                                        </Grid>
                                    </Grid>
                                    <Grid item container xs={3} className={classes.cntCard}>
                                        <Grid item className={classes.card}>
                                            <Avatar src={team[2].img} />
                                            <Typography variant='h6'>{team[2].name}</Typography>
                                            <Typography variant='subtitle2'>{team[2].workAs}</Typography>
                                        </Grid>
                                    </Grid>
                                    <Grid item container xs={3} className={classes.cntCard}>
                                        <Grid item className={classes.card}>
                                            <Avatar src={team[3].img} />
                                            <Typography variant='h6'>{team[3].name}</Typography>
                                            <Typography variant='subtitle2'>{team[3].workAs}</Typography>
                                        </Grid>
                                    </Grid>
                                    <Grid item container xs={3} className={classes.cntCard}>
                                        <Grid item className={classes.card}>
                                            <Avatar src={team[4].img} />
                                            <Typography variant='h6'>{team[4].name}</Typography>
                                            <Typography variant='subtitle2'>{team[4].workAs}</Typography>
                                        </Grid>
                                    </Grid>
                                    <Grid item container xs={3} className={classes.cntCard}>
                                        <Grid item className={classes.card}>
                                            <Avatar src={team[5].img} />
                                            <Typography variant='h6'>{team[5].name}</Typography>
                                            <Typography variant='subtitle2'>{team[5].workAs}</Typography>
                                        </Grid>
                                    </Grid>
                                    <Grid item container xs={3} className={classes.cntCard}>
                                        <Grid item className={classes.card}>
                                            <Avatar src={team[6].img} />
                                            <Typography variant='h6'>{team[6].name}</Typography>
                                            <Typography variant='subtitle2'>{team[6].workAs}</Typography>
                                        </Grid>
                                    </Grid>
                                    <Grid item container xs={3} className={classes.cntCard}>
                                        <Grid item className={classes.card}>
                                            <Avatar src={team[7].img} />
                                            <Typography variant='h6'>{team[7].name}</Typography>
                                            <Typography variant='subtitle2'>{team[7].workAs}</Typography>
                                        </Grid>
                                    </Grid>
                                   
                                    
                                    
                                </Grid>
                                {/* <Grid item container >
                                    {team.map((item, i) => ( 
                                                    <TeamCard user={item} id={i} /> 
                                                ))}
                                </Grid> */}
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                
                {/* <Drawer
                    className={classes.drawer}
                    variant='permanent'
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                    anchor='right'
                >
                    <div className={classes.toolbar} /> 
                    <Divider />
                    <List >
                        <ListItem button className={classes.drawerText}>
                            <a href='#app'>
                                <ListItemText secondary='Your APP' />
                            </a>
                        </ListItem>
                        <ListItem button className={classes.drawerText}>
                            <a href='#why'>
                                <ListItemText secondary='Why Dev Bank' />
                            </a>
                        </ListItem>
                        <ListItem button className={classes.drawerText}>
                            <a href='#team'>
                                <ListItemText secondary='Team' />
                            </a>
                        </ListItem>
                    </List>
                    <img src={isoBlack} className={classes.img}/>
                </Drawer> */}
            </Grid>
        </Grid>
    )
}

export default Blog
