import { extend } from 'umi-request';

const request = extend({
    prefix: 'https://graphql.fauna.com/graphql',
    timeout: 1000,
    headers: {
      'Content-Type': 'multipart/form-data',
      "Authorization":"Bearer fnADr4tdw6ACAtJtJj2n7stmpBnEGeMrDKvRxLmo"
    }
  });
const allPost = ()=>{
  return request('', {
    method: 'post',
    data: {
      query:`query {
          allPost{
            data{
              _id
              content
            }
          }
        }`
    }
  })
}

const findPostByID = async (id:string,size:number=10,cursor?:string|undefined) =>{
  return request('', {
    method: 'post',
    data: {
      query:`query {
        findPostByID(
          id:${id}
        ){
    				content
            reply(_size:${size},${cursor?`_cursor:${cursor}`:""}){
              data{
                _id
                content
              }
      			after
            }
          }
        }`
    }
  })
} 
const newPost = async (content:string) =>{
  return request('', {
    method: 'post',
    data: {
      query:`mutation {
        createPost(data:{
          content:"${content}"
        }){
          content
          _id
        }
      }`
    }
  })
} 
const newReply = async (id:string,content:string) =>{
  return request('', {
    method: 'post',
    data: {
      query:`mutation{
        createContent(
          data:{
            content:"${content}"
            post:{
              connect:"${id}"
            }
          }       
        ){
          content
          _id
        }
      }`
    }
  })
} 

export default request
export {
  allPost,
  findPostByID,
  newPost,
  newReply
}