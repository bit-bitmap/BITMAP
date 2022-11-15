// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境

// 云函数入口函数
exports.main = async (event, context) => {
    if(event.action == 'shoucang'){
        return await cloud.database().collection("articlelist").doc(event.id)
        .update({
            data:{
                shoucang : event.shoucang
            }
        })
        .then(res=>{
            console.log("改变收藏状态成功",res)
            return res
        })
        .catch(res=>{
            console.log("改变收藏状态失败",res)
            return res
        })
    }else if(event.action == 'dianzan'){
        return await cloud.database().collection("articlelist").doc(event.id)
        .update({
            data:{
                dianzan : event.dianzan,
                like : event.like
            }
        })
        .then(res=>{
            console.log("改变点赞状态成功",res)
            return res
        })
        .catch(res=>{
            console.log("改变点赞状态失败",res)
            return res
        })
    }else{
        return await cloud.database().collection("articlelist").doc(event.id)
        .update({
            data:{
                comments : event.comments
            }
        })
        .then(res=>{
            console.log("评论成功",res)
            return res
        })
        .catch(res=>{
            console.log("评论失败",res)
            return res
        })
    }
    

        
}