import React, { Component } from 'react';
import { getHackerNews } from '../api-services/getHackerNewsApi';
import NewsTable from '../components/dataTable';
import { COMMON_CONSTANT } from './../constant/constant'
import _ from 'lodash'
import history from '../history';
import Loader from './../components/common/loader-over-lay/Spinner'

class HackerNewsList extends Component {
    state = {
        upVotes: {},
        page: _.get(this.props,'match.params.page_no',0),
        data: [],
        voteCountObj: {},
        hiddenNewsId: [],
        loader: false
    }
    async componentDidMount() {
        console.log(`-----params----------${JSON.stringify(this.props.match.params)}`)
        console.log(`---------------${this.state.page}`)
        await this.getNewsList({ page: this.state.page })

        let getVoteObt = localStorage.getItem('setUpVote') || null;
        let hiddenNewsId = localStorage.getItem('hidedIds') || [];
        if (getVoteObt) {
            let getVoteCounts = JSON.parse(getVoteObt)
            this.setState({
                voteCountObj: getVoteCounts,
                hiddenNewsId: hiddenNewsId
            })
        }
        this.callLoader(false)
    }

    getNewsList = async (query = {}) => {
        console.log(`-----query----------${JSON.stringify(query)}`)
        this.callLoader(true)
        const result = await getHackerNews(query);
        if (result.data) {
            this.setState({
                data: result.data
            })
        }
        
    }

    callLoader =(status)=>{
        this.setState({
            loader: status
        })
    }

    handleUpVote = async (id) => {
        let getVoteCounts = this.state.voteCountObj
        let getVoteObt = localStorage.getItem('setUpVote') || null;
        if (getVoteObt) {
            getVoteCounts = JSON.parse(getVoteObt)
            getVoteCounts = {
                ...getVoteCounts,
                [id]: getVoteCounts[id] ? getVoteCounts[id] + 1 : 1
            }
        } else {
            getVoteCounts = {
                [id]: 1
            }
        }
        localStorage.setItem('setUpVote', JSON.stringify(getVoteCounts));
        this.setState({
            voteCountObj: getVoteCounts
        })
    }

    handleHideNews = (id) => {
        let getHidedIds = this.state.hiddenNewsId
        let hiddenNewsId = localStorage.getItem('hidedIds') || null;
        if (hiddenNewsId) {
            getHidedIds = JSON.parse(hiddenNewsId)
            getHidedIds.push(id)
        } else {
            getHidedIds.push(id)
        }
        localStorage.setItem('hidedIds', JSON.stringify(getHidedIds));
        this.setState({
            hiddenNewsId: getHidedIds
        })
    }

    handlePagination = async (actionType) => {
        let currentPage = this.state.page;
        let totalPages = _.get(this.state, 'data.nbPages', 0);
        let updatedPage = currentPage
        if (actionType === COMMON_CONSTANT.NEXT && currentPage < totalPages) {
            updatedPage = parseInt(currentPage)+COMMON_CONSTANT.INC_BY
            await this.getNewsList({ page:updatedPage })
            history.push(`/page/${updatedPage}`)
           
        } else if (actionType === COMMON_CONSTANT.PREVIEW && currentPage > 0) {
            updatedPage = parseInt(currentPage)-COMMON_CONSTANT.DEC_BY
            await this.getNewsList({ page: updatedPage })
            history.push(`/page/${updatedPage}`)
        } else {
            await this.getNewsList({ page: currentPage })
        }
        this.callLoader(false)
    }

    render() {

        return (
            <React.Fragment>
                <NewsTable
                data={this.state.data}
                handleUpVote={this.handleUpVote}
                voteCountObj={this.state.voteCountObj}
                handleHideNews={this.handleHideNews}
                hiddenNewsId={this.state.hiddenNewsId}
                handlePagination={this.handlePagination}
            />
                {this.state.loader &&<Loader></Loader>}
            </React.Fragment>
            
        )
    }
}

export default HackerNewsList