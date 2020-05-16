import React,{useEffect,useState} from 'react';
import styles from './index.less';
import { history } from 'umi';
import {allPost,newPost} from '../api/keijiban'

export default () => {
  const [data, setData] = useState<PostType[]>([])
  useEffect(() => {
    (async()=>{
      const res = await allPost()
      setData(data?.concat(res?.data?.allPost?.data||[]))
    })()
  }, [])
  let content = ""
  const [loading,setLoding] = useState(false)
  const submitNewPost = async (content:string)=>{
    setLoding(true)
    const res = await newPost(content)
    setData(data?.concat(res?.data?.createPost ||[]))
    setLoding(false)
  }
  return (
    <div>
      {data?<PostList data={data}/>:""}
      {loading?<div>loding</div>:""}
      <input type="text" onChange={ev=>content=ev.target.value}></input>
      <button onClick={()=>submitNewPost(content)}>提交</button>
    </div>
  );
}
type Iposts = {
  data:PostType[]
}
type PostType = {
  _id:string,
  content:string
}

const PostList = (prop:Iposts)=>{
  const {data} = prop
  const toPost = (id:string)=>{
    history.push({
      pathname:'./post/'+id,
    })
  }
  if(data.length == 0){
    return (<div></div>)
  }
  return (
    <React.Fragment>
      {
        data.map(el=>{
          return (
            <div key={el._id} onClick={()=>{toPost(el._id)}}>
              <p>{el.content}</p>
            </div>
          )
        })
      }
    </React.Fragment>
  )
}