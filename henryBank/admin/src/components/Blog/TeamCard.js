import React from 'react'
import {Git, Code} from '../SvgIcons/IconsMaterial'
import {Grid, Avatar, Typography, Icon, Link} from '@material-ui/core'
import useStyles from './styles.js'

const TeamCard = (props) => {
    const classes = useStyles()

    return (
        <Grid item container xs={5} className={classes.cntCard}>
            <Grid item container className={classes.cardHead}>
                <Avatar src={props.user.img} className={classes.cardImg}/>
                <Typography variant='subtitle1'>{props.user.name}</Typography>

            </Grid>
            <Grid item container className={classes.cardInfo}>
                <Grid item>
                    <Icon>
                        <Code />
                    </Icon>
                    <Typography>{props.user.workAs} developer</Typography>
                </Grid>
                <Grid item>
                    <Icon>
                        <Link href={props.user.github}>
                            <Git />
                        </Link>
                    </Icon>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default TeamCard
