﻿import * as React from 'react';
import { FocusTopic } from '../../Props/FocusTopic';
import * as Utility from '../../Utility';

var APlayer = require('aplayer');

/**
 * 卡片模式的单个主题
 */
export class CardTopicSingle extends React.Component<FocusTopic> {
    ap: any;
    audioDiv: HTMLDivElement;

    componentDidMount() {
        if (!this.props.userId) {
            $(`#card_portrait_${this.props.id}`).removeAttr('href');
            $(`#card_portrait_${this.props.id}`).removeAttr('target');
            $(`#card_username_${this.props.id}`).removeAttr('href');
            $(`#card_username_${this.props.id}`).removeAttr('target');
            $(`#card_lastpost_${this.props.id}`).removeAttr('href');
            $(`#card_lastpost_${this.props.id}`).removeAttr('target');
            $(`#card_portrait_image_${this.props.id}`).addClass('card-topic-anonymous');
        }
    }

    componentWillUnmount() {
        this.ap && this.ap.destroy();
    }

    showOriginalImage(thumbnailUrl: string) {
        let imageUrl = thumbnailUrl.replace("thumbnail/earlier/", "").replace("thumbnail/", "");
        console.log(imageUrl);
        $(`#card_original_image_${this.props.id}`).attr('src', imageUrl);
        $(`#card_thumbnail_area_${this.props.id}`).hide();
        $(`#card_original_image_area_${this.props.id}`).show();
    }

    hideOriginalImage() {
        $(`#card_thumbnail_area_${this.props.id}`).show();
        $(`#card_original_image_area_${this.props.id}`).hide();
    }

    render() {
        let topicUrl = `/topic/${this.props.id}/1`;
        let userUrl = `/user/id/${this.props.userId}`;
        let boardUrl = `/board/${this.props.boardId}`;
        let a: any = (this.props.floorCount / 10) + 1;
        let b = parseInt(a);
        let c = this.props.floorCount + 10 - b * 10;
        let pageNum = `${b}#${c}`;
        if (c === 0) {
            pageNum = `${b - 1}#10`;
        }
        let lastPostUrl = `/topic/${this.props.id}/${pageNum}`;
        let lastPostUserUrl = `/user/name/${encodeURI(this.props.lastPostUser)}`;
        let userName: any = this.props.userName;

        let imageCount = !this.props.mediaContent || !this.props.mediaContent.thumbnail ?
            0 :
            (this.props.mediaContent.thumbnail.length > 6 ?
                6 :
                this.props.mediaContent.thumbnail.length);
        let thumbnailContent = null;
        if (this.props.contentType === 4) {
            switch (imageCount) {
                case 1:
                    thumbnailContent = (
                        <div className="card-topic-thumbnail-1">
                            {this.props.mediaContent.thumbnail.map((str) => { return <img src={str} onClick={() => { this.showOriginalImage(str); }} /> })}
                        </div>);
                    break;
                case 2:
                case 4:
                    thumbnailContent = (
                        <div className="card-topic-thumbnail-2">
                            {this.props.mediaContent.thumbnail.map((str) => { return <img src={str} onClick={() => { this.showOriginalImage(str); }} /> })}
                        </div>);
                    break;
                case 3:
                case 5:
                case 6:
                    thumbnailContent = (
                        <div className="card-topic-thumbnail-3">
                            {this.props.mediaContent.thumbnail.map((str) => { return <img src={str} onClick={() => { this.showOriginalImage(str); }} /> })}
                        </div>);
                    break;
                default:
                    break;
            }
        }

        let audioContent = null;
        if (this.props.contentType === 3) {
            try {
                this.ap = new APlayer({
                    element: this.audioDiv,
                    autoplay: false,
                    preload: 'metadata',
                    music: {
                        url: encodeURI(this.props.mediaContent.audio),
                        title: this.props.title,
                        author: this.props.userName,
                        pic: '/static/images/audio_cover.png'
                    }
                });
            } catch (e) {
                // IE 11 下会抛一个 InvalidStateError 的错误，忽略
            }
            audioContent = (<div className="aplayer"
                style={{ whiteSpace: 'normal', width: '350px', margin: '0 0 15px 0' }}
                ref={it => this.audioDiv = it}>
            </div>);
        }

        return (<div className="card-topic">
            <a className="card-topic-left" href={userUrl} target="_blank" id={`card_portrait_${this.props.id}`}>
                <img className="card-topic-portraitUrl" id={`card_portrait_image_${this.props.id}`} src={this.props.portraitUrl}></img>
            </a>
            <div className="card-topic-middle">
                <a className="card-topic-userName" href={userUrl} target="_blank" id={`card_username_${this.props.id}`}>{userName}</a>
                <a className="card-topic-time" href={topicUrl} target="_blank">{this.props.time}</a>
                <a className="card-topic-title" href={topicUrl} target="_blank">{this.props.title}</a>
                <div className="card-topic-thumbnail" id={`card_thumbnail_area_${this.props.id}`}>{thumbnailContent}</div>
                <div className="card-topic-original-image" id={`card_original_image_area_${this.props.id}`}>
                    <img src="" id={`card_original_image_${this.props.id}`} onClick={() => { this.hideOriginalImage(); }} />
                </div>
                <div className="card-topic-audio" id={`card_audio_${this.props.id}`}>{audioContent}</div>
                <div className="card-topic-board">
                    <div className="card-topic-boardName"><a href={boardUrl} target="_blank">{this.props.boardName}</a></div>
                    {this.props.tag1 ? <div className="card-topic-tag">{this.props.tag1}</div> : null}
                    {this.props.tag2 ? <div className="card-topic-tag">{this.props.tag2}</div> : null}
                </div>
                <div className="card-topic-info">
                    <div><a href={topicUrl} target="_blank"><i className="fa fa-eye fa-lg"></i>{this.props.hitCount}</a></div>
                    <div><a href={topicUrl} target="_blank"><i className="fa fa-commenting-o fa-lg"></i>{this.props.replyCount}</a></div>
                    {/* <div><i className="fa fa-thumbs-o-up fa-lg"></i>{this.props.likeCount}</div> */}
                    <div>最后回复：
                        <a href={lastPostUserUrl} target="_blank" id={`card_lastpost_${this.props.id}`}>{this.props.lastPostUser}</a>
                    </div>
                    <div><a href={lastPostUrl} target="_blank">{this.props.lastPostTime}</a></div>
                </div>
            </div>
        </div >);
    }
}