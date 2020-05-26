import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';

configure({adapter: new Adapter()});
import HackerNewsTable from './../../components/newsDataTable';
import _ from 'lodash'

const singleRow = {
    "created_at": "2017-02-23T13:01:08.000Z",
    "title": "Announcing the first SHA-1 collision",
    "url": "https://security.googleblog.com/2017/02/announcing-first-sha1-collision.html",
    "author": "pfg",
    "points": 3030,
    "story_text": null,
    "comment_text": null,
    "num_comments": 485,
    "story_id": null,
    "story_title": null,
    "story_url": null,
    "parent_id": null,
    "created_at_i": 1487854868,
    "relevancy_score": 7272,
    "_tags": [
        "story",
        "author_pfg",
        "story_13713480"
    ],
    "objectID": "13713480",
    "_highlightResult": {
        "title": {
            "value": "Announcing the first SHA-1 collision",
            "matchLevel": "none",
            "matchedWords": []
        },
        "url": {
            "value": "https://security.googleblog.com/2017/02/announcing-first-sha1-collision.html",
            "matchLevel": "none",
            "matchedWords": []
        },
        "author": {
            "value": "pfg",
            "matchLevel": "none",
            "matchedWords": []
        }
    }
}
const propsData = {
    page: 0,
    hiddenNewsIds:[],
    data: {
        hitsPerPage: 20,
        nbHits: 21597938,
        nbPages: 2,
        page: 0,
        hits: [{ ...singleRow }, { ...singleRow },]
    }
}
describe('Testing Table pagination action button', () => {
    let wrapped = shallow(<HackerNewsTable {...propsData}/>);
  it('should render the Title Component correctly', () => {   
    expect(wrapped).toMatchSnapshot();
  });

  it('Test news data table', () =>{
    let wrapped = shallow(<HackerNewsTable {...propsData}/>);
    expect(wrapped.exists()).toBe(true);
  })

  it('Test news data table with hidden ids', () =>{
      let props = _.cloneDeep(propsData)
      props.hiddenNewsIds = [13713480]
    let wrapped = shallow(<HackerNewsTable {...props}/>);
    expect(wrapped.exists()).toBe(true);
  })
});