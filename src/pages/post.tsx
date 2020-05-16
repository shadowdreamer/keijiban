import React,{useState,useEffect} from 'react'
import {findPostByID , newReply} from '../api/keijiban'
import {useParams } from 'umi'

type PostData={
    content:string,
    reply:Reply[]
}
type Reply={
    _id:string,
    content:string
}
export default ()=>{
    const { id } = useParams()
    const [postData, setPostData] = useState<PostData>()
    const [loding, setLoding] = useState(false)
    useEffect(() => {
        (async ()=>{
            const res = await findPostByID(id)
            setPostData({
                content:res?.data?.findPostByID?.content || "",
                reply:res?.data?.findPostByID?.reply?.data || []
            })
        })()
    }, [])
    let content = ""
    const submitNewReply = async (id:string,content:string)=>{
        setLoding(true)
        const res = await newReply(id,content)
        setPostData({
            content:postData?.content || '',
            reply:postData?.reply?.concat({content:res?.data?.createContent?.content,_id:res?.data?.createContent?.id}) || []
        })
        console.log(postData)
        setLoding(false)
    }
    return (
        <React.Fragment>
            <div>标题：{postData?.content||'loading'}</div>            
            {
                postData?.reply.map(el=>{
                    return (<div key={el._id}>
                        {el.content}
                    </div>)
                })
            }
            {loding?<div>loding</div>:""}
            <input type="text" onChange={ev=>content=ev.target.value}></input>
            <button onClick={()=>submitNewReply(id,content)}>提交</button>
        </React.Fragment>
    )
}