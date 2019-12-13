import React from 'react'
import { fade, makeStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'
import Container from '@material-ui/core/Container'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Collapse from '@material-ui/core/Collapse'
import ExpandLess from '@material-ui/icons/ExpandLess'
import ExpandMore from '@material-ui/icons/ExpandMore'
import SearchIcon from '@material-ui/icons/Search'
import InputBase from '@material-ui/core/InputBase'

import { store } from '../store/index'

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25)
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
            width: 'auto'
        }
    },
    searchIcon: {
        width: theme.spacing(7),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    inputRoot: {
        color: 'inherit'
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 7),
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: 120,
            '&:focus': {
                width: 200
            }
        }
    }
}))

// Dispatch the action which then triggers the SAGA with the API request. (Next Step: check sagas.js)
const action = type => store.dispatch({ type })
action('SHOW')

const HostCollapse = props => {
    const host = props.host

    const [open, setOpen] = React.useState(true)
    const handleClick = () => {
        setOpen(!open)
    }
    return (
        <React.Fragment>
            <ListItem button onClick={handleClick}>
                <ListItemText>{host.hostName}</ListItemText>
                {open ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            {host.dbs.map(db => {
                return (
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <ListItem button>
                                <ListItemText>{db.dbName}</ListItemText>
                            </ListItem>
                        </List>
                    </Collapse>
                )
            })}
        </React.Fragment>
    )
}

const DbList = props => {
    const classes = useStyles()

    let hosts = props.hosts.response

    // let updateHosts = () => {
    //     hosts
    // }

    return (
        <Container>
            {/* <pre>{JSON.stringify(hosts)}</pre> */}
            <div className={classes.search}>
                <div className={classes.searchIcon}>
                    <SearchIcon />
                </div>
                <InputBase
                    placeholder="Search…"
                    classes={{
                        root: classes.inputRoot,
                        input: classes.inputInput
                    }}
                    inputProps={{ 'aria-label': 'search' }}
                    // onChange={updateHosts}
                />
            </div>
            <List>
                {hosts.map(host => {
                    return <HostCollapse host={host} />
                })}
            </List>
        </Container>
    )
}

const mapStateToProps = state => ({ hosts: state.hosts })

export default connect(mapStateToProps)(DbList)
