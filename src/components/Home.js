import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import CssBaseline from '@material-ui/core/CssBaseline'

import { requestHelloWorld } from '../store/actions'
import DbList from './DbList'

class Home extends React.Component {
    componentDidMount() {
        this.props.requestHelloWorld()
    }

    render() {
        return (
            <React.Fragment>
                <CssBaseline />
                <DbList />
                <h1>a {this.props.helloWorld}</h1>
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => ({ helloWorld: state.helloWorld })

const mapDispatchToProps = dispatch =>
    bindActionCreators({ requestHelloWorld }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Home)
