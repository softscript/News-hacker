import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';
// import 'jest-localstorage-mock';
import { COMMON_CONSTANT } from './../../constant/constant'

configure({ adapter: new Adapter() });
import NewsContainer from '../../containers/NewsContainer';
import _ from 'lodash'

class LocalStorageMock {
    constructor() {
        this.store = {}
    }

    clear() {
        this.store = {}
    }

    getItem(key) {
        return this.store[key] || null
    }

    setItem(key, value) {
        this.store[key] = value
    }

    removeItem(key) {
        delete this.store[key]
    }
}

global.localStorage = new LocalStorageMock

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
const stateData = {
    page: 0,
    data: {
        hitsPerPage: 20,
        nbHits: 21597938,
        nbPages: 2,
        page: 0,
        hits: [{ ...singleRow }, { ...singleRow },]
    }
}

beforeEach(() => {
    // values stored in tests will also be available in other tests unless you run
    localStorage.clear();
});

describe('News Hacker container', () => {
    
    it('render the component', () => {
        const wrapper = shallow(<NewsContainer />);
        expect(wrapper.exists()).toBe(true);
    })

    it('Test loader method', () => {
        const wrapper = shallow(<NewsContainer />);
        const instance = wrapper.instance();
        wrapper.state('loader', false)
        instance.handleHideNews(true);
        expect(wrapper.state('loader')).toBe(true);
    })

    it('Test handle hide news method', () => {
        const wrapper = shallow(<NewsContainer />);
        const instance = wrapper.instance();
        expect(wrapper.state('hiddenNewsId')).toEqual(expect.arrayContaining([]));
        instance.handleHideNews(44);
        expect(wrapper.state('hiddenNewsId')).toEqual(expect.arrayContaining([44]));
    })

    it('Test handle hide with false news id', () => {
        const wrapper = shallow(<NewsContainer />);
        localStorage.setItem('hidedIds', JSON.stringify([99]))
        const instance = wrapper.instance();
        expect(wrapper.state('hiddenNewsId')).toEqual(expect.arrayContaining([]));
        instance.handleHideNews(44);
        expect(wrapper.state('hiddenNewsId')).toEqual(expect.arrayContaining([44]));
    })

    it('Test handleUpVote method with initial upVoteData as null ', () => {
        const wrapper = shallow(<NewsContainer />);
        localStorage.setItem('upVoteData', null)
        const instance = wrapper.instance();
        wrapper.state('voteCountObj', {})
        instance.handleUpVote(4);
        expect(wrapper.state('voteCountObj')).toEqual({
            "4": 1,
        });
    })

    it('Test handleUpVote method with upVoteData value ', () => {
        const wrapper = shallow(<NewsContainer />);
        localStorage.setItem('upVoteData', JSON.stringify({
            "4": 1,
        }))
        const instance = wrapper.instance();
        wrapper.state('voteCountObj', {})
        instance.handleUpVote(4);
        expect(wrapper.state('voteCountObj')).toEqual({
            "4": 2,
        });
    })

    it('Test handlePagination method with next with page 0', () => {
        const wrapper = shallow(<NewsContainer />);
        let state = _.cloneDeep(stateData)
        state.page = 0
        wrapper.setState({ ...state });
        const instance = wrapper.instance();
        instance.handlePagination(COMMON_CONSTANT.NEXT);
        expect(wrapper.state('page')).toBe(state.page+1);
    })

    it('Test handlePagination method with next param with page more than total page', () => {
        const wrapper = shallow(<NewsContainer />);
        let state = _.cloneDeep(stateData)
        state.page = 2
        wrapper.setState({ ...state } );
        const instance = wrapper.instance();
        instance.handlePagination(COMMON_CONSTANT.NEXT);
        expect(wrapper.state('page')).toBe(state.page);
    })

    it('Test handlePagination method with previous param', () => {
        const wrapper = shallow(<NewsContainer />);
        let state = _.cloneDeep(stateData)
        state.page = 2
        wrapper.setState({ ...state } );
        const instance = wrapper.instance();
        instance.handlePagination(COMMON_CONSTANT.PREVIOUS);
        expect(wrapper.state('page')).toBe(state.page-1);
    })

    it('Test resetData method to clear the local storage', () => {
        const wrapper = shallow(<NewsContainer />);
        const instance = wrapper.instance();
        instance.resetData();
        expect(localStorage.getItem('upVoteData')).toBe(null);
    })

    // it('Test componentDidMount', () => {
    //     try{
    //         const wrapper = shallow(<NewsContainer />);
    //         const instance = wrapper.instance();
    //         instance.componentDidMount();
    //         expect(localStorage.getItem('upVoteData')).toBeTruthy;
    //     }
    //     catch(err){
    //         console.log(`----err`, err)
    //     }
        
    // })

})
