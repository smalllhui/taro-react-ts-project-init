import request from '@/request'

const urlObj = {
  movieUrl: 'https://pcw-api.iqiyi.com/search/recommend/list?channel_id=1&data_type=1&mode=24&page_id=1&ret_num=',
}
/**
 * 查询电影列表
 */
export const getMovieList = (size: number) => request({ url: `${urlObj.movieUrl}${size}` }, 'GET')
