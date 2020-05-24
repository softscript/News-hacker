import apiRequest from "../utils/apiRequest";
import URL from "../api-config/apiUrls";

/**
 * @des Get Hacker news
 * @route GET /api/v1/search
 * @access Public
 */

export const getHackerNews = async (query = {}) => {

    let customUrl = URL.GET_HACKER_NEWS;
    customUrl += query.page ? `?page=${query.page}` : `?page=0`;
    // customUrl += query.tags ? `?tags=${query.tags}` : ``; for any other query params
    return await apiRequest({
        url: customUrl,
        method: 'GET'
    })
}