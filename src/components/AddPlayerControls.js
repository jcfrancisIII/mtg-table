import React from 'react'
import { makeStyles } from '@material-ui/core'
import AppBar from '@material-ui/core/AppBar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Icon from '@material-ui/core/Icon'

const useStyles = makeStyles(theme => ({
    root: {},
    appBar: {},
    appBarItem: {
        margin: theme.spacing(0, 0, 0, 3),
        backgroundColor: theme.palette.primary.dark,
        color: '#fff'
    },
    appBarStart: {
        backgroundColor: theme.palette.secondary.main,
        '&:hover': {
            backgroundColor: theme.palette.secondary.dark
        }
    }
}))

export default function AddPlayerControls(props) {
    const classes = useStyles()

    const start = () => {
        props.start()
    }

    const minus = () => {
        props.controlPlayers('minus')
    }

    const plus = () => {
        props.controlPlayers('plus')
    }

    return (
        <AppBar
            position="fixed"
            color="primary"
            className={classes.appBar}
            style={props.style}
        >
            <Toolbar>
                <Typography variant="h6" component="h1">
                    Set the # of Players
                </Typography>
                <IconButton
                    onClick={minus.bind(this)}
                    className={classes.appBarItem}
                    size="small"
                >
                    <Icon>remove</Icon>
                </IconButton>
                <IconButton
                    onClick={plus.bind(this)}
                    className={`${classes.appBarItem} ${classes.appBarIcon}`}
                    size="small"
                >
                    <Icon>add</Icon>
                </IconButton>
                <Button
                    onClick={start.bind(this)}
                    color="inherit"
                    className={`${classes.appBarItem} ${classes.appBarStart}`}
                >
                    Start
                </Button>
            </Toolbar>
        </AppBar>
    )
}
