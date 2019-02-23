import request from '../../utils/request';
import {url} from '../../utils/url'

export function getBlogList({currentPage}) {
  return request(`${url}/blog/getBlogList?currentPage=${currentPage}`);
}

export function getBlog({title}) {
  return request(`${url}/blog/getBlog?title=${title}`)
}

export function getTagList() {
  return request(`${url}/tag/getTagList`)
}

export function insertBlog(v) {
  return request(`${url}/blog/insertBlog`, {
    headers: {
      "Content-Type": "application/json"
    },
    method: 'POST',
    body: JSON.stringify(v),
  });
}

export function updateBlog(v) {
  return request(`${url}/blog/updateBlog`, {
    headers: {
      "Content-Type": "application/json"
    },
    method: 'POST',
    body: JSON.stringify(v),
  });
}

export function deleteBlog({bid}) {
  return request(`${url}/blog/deleteBlog?bid=${bid}`)
}


