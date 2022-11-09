const db = wx.cloud.database()
const account = db.collection("account")
export default{
    async getIdFromOpenid(openid) {
        let id = "0"
        let res = await account.where({ _openid: openid }).get()
        id = res.data[0]._id
        console.log(res.data[0]._id)
        return id
    },
    getInfoFromId(id) {
        var info
        account.doc(id).get()
            .then(res => {
                info = res.data
            }).catch(err => {
                console.log(err)
            })
        return info
    }
}