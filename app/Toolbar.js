import React from 'react'
import { browserHistory, Link } from 'react-router'
import PropTypes from 'prop-types'
class Toolbar extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }
    logout(e) {
        e.preventDefault()
        window.localStorage.removeItem("token")
        window.localStorage.removeItem("username")
        window.location = '/login';
    }
    changeToEditMode(e){
        if(this.state.edit){
            let request = {
                username: this.state.profile.userName,
                name: this.state.profile.name,
                description: this.state.profile.description,
                avatar: this.state.profile.avatar,
                banner: this.state.profile.banner
            }
            APIInvoker.invokePUT('/secure/profile', request, response => {
                if(response.ok){
                    this.setState(update(this.state,{
                        edit: {$set: false}
                    }))
                }
            },error => {
                console.log("Error al actualizar el perfil");
            })
        }else{
            let currentState = this.state.profile
            this.setState(update(this.state,{
                edit: {$set: true},
                currentState: {$set: currentState}
            }))
        }
    }

    render() {
        return (
            <nav className="navbar navbar-default navbar-fixed-top">
                <span className="visible-xs bs-test">XS</span>
                <span className="visible-sm bs-test">SM</span>
                <span className="visible-md bs-test">MD</span>
                <span className="visible-lg bs-test">LG</span>
                <div className="container-fluid">
                    <div className="container-fluid">
                        <div className="navbar-header">
                            <a className="navbar-brand" href="#">
                                <i className="fa fa-twitter" aria-hidden="true"></i>
                            </a>
                            <ul id="menu">
                                <li id="tbHome" className="selected">
                                    <Link to="/">
                                        <p className="menu-item">
                                            <i className="fa fa-home menu-item-icon" aria-hidden="true">
                                            </i> <span className="hidden-xs hidden-sm">Inicio</span>
                                        </p>
                                    </Link>
                                </li>
                            </ul>
                            <If condition={profile.userName === storageUserName}>
                                <button className="btn btn-primary edit-button" onClick={this.changeToEditMode.bind(this)} >
                                    {this.state.edit ? "Guardar" : "Editar perfil"}</button>
                            </If>
                        </div>
                        <If condition={this.props.profile != null} >
                            <ul className="nav navbar-nav navbar-right">
                                <li className="dropdown">
                                    <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
                                        <img className="navbar-avatar" src={this.props.profile.avatar} alt={this.props.profile.userName} />
                                    </a>
                                    <ul className="dropdown-menu">
                                        <li>
                                            <a href={"/" + this.props.profile.userName}>Ver perfil</a>
                                        </li>
                                        <li role="separator" className="divider"></li>
                                        <li><a href="#" onClick={this.logout.bind(this)}>
                                            Cerrar sesión </a></li>
                                    </ul>
                                </li>
                            </ul>
                        </If>
                    </div>
                </div>
            </nav>
        )
    }
}
Toolbar.propTypes = { profile: PropTypes.object }

export default Toolbar;