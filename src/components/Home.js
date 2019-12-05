import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { requestHelloWorld } from '../store/actions'

class Home extends React.Component {
    componentDidMount() {
        this.props.requestHelloWorld()
    }

    render() {
        return <h1>a {this.props.helloWorld}</h1>
    }
}

const mapStateToProps = state => ({ helloWorld: state.helloWorld })

const mapDispatchToProps = dispatch =>
    bindActionCreators({ requestHelloWorld }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Home)
