import React from 'react'
import useStyle from './styles'
import isoBlack from '../../images/isoFullWhite.svg'
import fontBlack from '../../images/FontWhite.svg'
import {NavLink} from 'react-router-dom'
import 
{AppBar,
Toolbar,
Typography,
Button,
Icon,
} from '@material-ui/core'

const NavBar = () => {
    const classes = useStyle()
    return (
        <div className={classes.root}> 
            <AppBar position="fixed" color='primary' className={classes.appBar}>
              <Toolbar>
                <NavLink to='/' className={classes.title}>
                  <img  src={fontBlack} />
                </NavLink>
                <div className={classes.space}></div>
                <NavLink to='/login' className={classes.btn}>
                  <Button color='inherit'>Login</Button>
                </NavLink>
                <NavLink to='/form' className={classes.btn}>
                  <Button color='inherit'>Register</Button>
                </NavLink>
              </Toolbar>
            </AppBar>
        </div>
    )
}

export default NavBar
