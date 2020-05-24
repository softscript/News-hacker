export const beautyFyUrl = (url)=>{
    return url!= null ? url.replace(/^(?:https?:\/\/)?(?:www\.)?/i, "").split('/')[0]:'';
}