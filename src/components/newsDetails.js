import React from 'react';
import _ from 'lodash';
import moment from 'moment';
import {beautyFyUrl} from './../utils/beautyFyUrl';

const newDetails = (props) => {
    const row = _.get(props, 'rowData', {});
    return (
        <React.Fragment>
            <span className = 'title'>{row.title}</span>
            <span className='url'><a href= {row.url} target="_blank" >({beautyFyUrl(row.url)})</a> by</span>
            <span className='by-author'><b> {_.get(row, 'author', '')}</b></span>
            <span className='update-created-on'>{moment(row.created_at).fromNow()}</span>
            [<span className='action-hide' onClick={() =>props.handleHideNews(row.objectID) }> Hide </span>]
        </React.Fragment>
    );
}

export default newDetails;