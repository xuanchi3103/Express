var SchemaUser = require('../schema/user')

module.exports ={
    getall:function(query){
        // var sort={};
        // var Search={};
        // if(query.sort){
        //     if(query.sort[0]=='-'){
        //         sort[query.sort.substring(1)]='desc';
        //     }else{
        //         sort[query.sort]='asc';
        //     }
        // }
        // if(query.key){
        //     Search.userName= new RegExp(query.key,'i');
        // }
        // var limit = parseInt(query.limit)||2;
        // var page = parseInt(query.page)||1;
        // var skip = (page-1)*limit;
        // return SchemaUser.find(Search).select('userName password').sort(sort).limit(limit).skip(skip).exec();
        return SchemaUser.find({}).exec();
    },
    getOne:function(id){
        return modelUser.findById(id);
    },
    getByName:function (name){
        return SchemaUser.findOne({}).exec();
    },
    createUser:function(user){
        return new SchemaUser(user).save();
    }
}