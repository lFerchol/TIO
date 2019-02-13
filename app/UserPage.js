import React from 'react'
import update from 'react-addons-update'
import APIInvoker from './utils/APIInvoker'
import { Link } from 'react-router'
class UserPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            edit: false,
            profile: {
                name: "",
                description: "",
                avatar: null,
                banner: null,
                userName: ""
            }
        }
    }
    componentWillMount() {
        let user = this.props.params.user
        APIInvoker.invokeGET('/profile/' + user, response => {
            this.setState({
                edit: false,
                profile: response.body
            });
        }, error => {
            window.location = '/'
        })
    }
    follow(e) {
        let request = {
            followingUser: this.props.params.user
        }
        APIInvoker.invokePOST('/secure/follow', request, response => {
            if (response.ok) {
                this.setState(update(this.state, {
                    profile: {
                        follow: { $set: !response.unfollow }
                    }
                }))
            }
        }, error => {
            console.log("Error al actualizar el perfil");
        })
    }
    render() {
        let profile = this.state.profile
        let storageUserName = window.localStorage.getItem("username")
        let bannerStyle = {
            backgroundImage: 'url(' + (profile.banner) + ')'
        }
        return (
            <div id="user-page" className="app-container">
                <header className="user-header">
                    <div className="user-banner" style={bannerStyle}>
                    </div>
                    <div className="user-summary">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="hidden-xs col-sm-4 col-md-push-1 68. col-md-3 col-lg-push-1 col-lg-3" >
                                </div>
                                <div className="col-xs-12 col-sm-8 col-md-push-1 71. col-md-7 col-lg-push-1 col-lg-7">
                                    <ul className="user-summary-menu">
                                        <li className={this.props.route.tab === 'tweets' ? 'selected' : ''}>
                                            <Link to={"/" + profile.userName}>
                                                <p className="summary-label">TWEETS</p>
                                                <p className="summary-value">{profile.tweetCount}</p>
                                            </Link>
                                        </li>
                                        <li className={this.props.route.tab === 'followings' ? 'selected' : ''}>
                                            <Link to={"/" + profile.userName + "/following"}>
                                                <p className="summary-label">SIGUIENDO</p>
                                                <p className="summary-value">{profile.following}</p>
                                            </Link>
                                        </li>
                                        <li className={this.props.route.tab === 'followers' ? 'selected' : ''}>
                                            <Link to={"/" + profile.userName + "/followers"}>
                                                <p className="summary-label">SEGUIDORES</p>
                                                <p className="summary-value">{profile.followers}</p>
                                            </Link>
                                        </li>
                                    </ul>
                                    
                                    <If condition={profile.follow != null && profile.userName !== storageUserName} >
                                        <button className="btn edit-button" onClick={this.follow.bind(this)} >
                                            {profile.follow ? (<span><i className="fa fa-user-times" aria-hidden="true"></i>
                                                Siguiendo</span>)
                                                : (<span><i className="fa fa-user-plus" aria-hidden="true"></i> Seguir</span>)
                                            }
                                        </button>
                                    </If>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>
                <div className="container-fluid">
                    <div className="row">
                        <div className="hidden-xs col-sm-4 col-md-push-1 col-md-3 116. col-lg-push-1 col-lg-3" >
                            <aside id="user-info">
                                <div className="user-avatar">
                                    <div className="avatar-box">
                                        <img src={profile.avatar} />
                                    </div>
                                </div>
                                <div>
                                    <p className="user-info-name">{profile.name}</p>
                                    <p className="user-info-username">@{profile.userName}</p>
                                    <p className="user-info-description">
                                        {profile.description}</p>
                                </div>
                            </aside>
                        </div>
                        <div className="col-xs-12 col-sm-8 col-md-7 132. col-md-push-1 col-lg-7">
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default UserPage;