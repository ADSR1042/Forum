﻿import * as React from 'react';
import { connect } from 'react-redux';
import { AppState } from '../States/AppState';
import { match } from 'react-router';
import {
	BrowserRouter as Router,
	Route
} from 'react-router-dom';
import { Post } from './Topic/Topic';
import { List } from './Board/Board';
import { CurUserPost } from './Topic/Topic-Trace';
import { BoardList } from './Board/BoardList';
import { UserCenter } from './UserCenter/UserCenter';
import { Message } from './Message';
import { AllNewTopic } from './Topic/Topic-New';
import { Focus } from './Focus';
import { Header } from './Header';
import { Footer } from './Footer';
import { MainPage } from './MainPage';
import { User } from './UserCenter/User';
import { LogOn } from './LogOn';
import { CreateTopic } from './Topic/Topic-CreateTopic';
import * as Status from './Status';
import { UbbContainer } from './UbbContainer';
import { Search } from './Search';
import { SearchBoard } from './SearchBoard';


export class RouteComponent<TProps, TState, TMatch> extends React.Component<TProps, TState> {
	match: match<TMatch>;
	constructor(props, context) {
		super(props, context);
		this.match = props.match;
	}
}

class AppBeforeConnect extends React.Component<{isError: boolean, errorMessage: string}, AppState> {

    render() {
        let errorElement: JSX.Element;
        if (this.props.isError) {
            switch (this.props.errorMessage) {
                case 'LogOut': errorElement = <Status.LogOut />; break;
                case 'UnauthorizedBoard': errorElement = <Status.UnauthorizedBoard />; break;
                case 'UnauthorizedTopic': errorElement = <Status.UnauthorizedTopic />; break;
                case 'NotFoundTopic': errorElement = <Status.NotFoundTopic />; break;
                case 'NotFoundBoard': errorElement = <Status.NotFoundBoard />; break;
                case 'NotFoundUser': errorElement = <Status.NotFoundUser />; break;
                case 'ServerError': errorElement = <Status.ServerError />; break;
                case 'OperationForbidden': errorElement = <Status.OperationForbidden />; break;
                case 'Disconnected': errorElement = <Status.Disconnected />; break;
                case 'TopicDeleted': errorElement = <Status.TopicDeleted />; break;
            }
        }

        return <div style={{ width: "100%" }}>
                <Router>
                {!this.props.isError ? (
                    <div style={{ backGroundColor: '#F5FAFD', justifyContent: 'center', display: 'flex', flexDirection: 'column', alignItems: "center", width: "100%", minWidth: "1140px" }}>
                        <Header />
                        <Route exact path="/" component={MainPage}></Route>
                        <Route exact path="/topic/:topicid/:page?" component={Post} />
                        <Route exact path="/topic/:topicid/user/:userId/:page?" component={CurUserPost} />
                        <Route path="/list/:boardId/:type?/:page?" component={List} />
                        <Route exact path="/boardlist" component={BoardList} />
                        <Route path="/usercenter" component={UserCenter} />
                        <Route path="/message" component={Message} />
                        <Route path="/focus" component={Focus} />
                        <Route path="/newtopics" component={AllNewTopic} />
                        <Route path="/user" component={User} />
                        <Route path="/logon" component={LogOn} />
                        <Route path="/search" component={Search} />
                        <Route path="/searchBoard" component={SearchBoard} />
                        <Route path="/createtopic/:boardId" component={CreateTopic} />
                        <Footer />
                    </div>
                ) : <div style={{ backGroundColor: '#F5FAFD', justifyContent: 'center', display: 'flex', flexDirection: 'column', alignItems: "center", width: "100%", minWidth: "1140px" }}>
                        <Header />
                        {errorElement}
                        <Footer />
                    </div>
                }
                </Router>
        </div>;
	}
}

function mapState(state) {
    return {
        isError: state.error.isError,
        errorMessage: state.error.errorMessage
    };
}

export const App = connect(mapState, ()=>(null))(AppBeforeConnect);