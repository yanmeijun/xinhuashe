const _ = require('underscore'),
    monk = require('monk'),
    log4js = require('../util/log4j'),
    config = require('../../config/config'),
    DB = monk(config.db.url, config.db.options);
const tableP = "procure";
const tableS = "service";
let procureDAO = {};

//查询所有采购信息，并与服务信息合并
procureDAO.findProcureAll = async (procureQuery, procureQueryAll, procureAgain, serviceQuery,serviceQueryAll,serviceAgain, sort, skip, limit) => {
    let options  = {};
    if (!_.isEmpty(sort)) {
        options = _.extend(options, {"sort": sort});
    }
    try {
        const procureData = await DB.get(tableP).find({$or: procureQueryAll, $and: procureQuery}, options);   //  procureData
        const serviceData = await DB.get(tableS).find({$or: serviceQueryAll, $and: serviceQuery});
        let lastData;
        if(procureData.length!=0 && serviceData.length!=0){
            let serviceIDArr=procureData.map(item=>{
                return item.serviceID;
            });
            let query={serviceID: {$in:serviceIDArr}};
            Object.assign(query,serviceAgain);
            data = await DB.get(tableS).find(query);
            let newData=[];
            procureData.forEach(item=>{
                let f=data.find(d =>{
                    return d.serviceID===item.serviceID;
                });

                if(f){
                    let d={};
                    Object.assign(d,f,item);
                    newData.push(d);
                }
            });
            let count=newData.length;
            let newData2=newData.slice(skip,skip+limit);
            let r={};
            r.res=newData2;
            r.count=count;
            return r;
        }else if(procureData.length!=0 && serviceData.length==0){
            data = await DB.get(tableS).find(serviceAgain);
            let newData=[];
            procureData.forEach(item=>{
                let f=data.find(da =>{
                    return da.serviceID===item.serviceID;
                });

                if(f){
                    let d={};
                    Object.assign(d,f,item);
                    newData.push(d);
                }
            });
            let count=newData.length;
            let newData2=newData.slice(skip,skip+limit);
            let r={};
            r.res=newData2;
            r.count=count;
            return r;
        }else{
            data = await DB.get(tableP).find(procureAgain);
            let newData=[];
            data.forEach(item=>{
                let f=serviceData.find(d =>{
                    return d.serviceID===item.serviceID;
                });

                if(f){
                    let d={};
                    Object.assign(d,f,item);
                    newData.push(d);
                }
            });
            let count=newData.length;
            let newData2=newData.slice(skip,skip+limit);
            let r={};
            r.res=newData2;
            r.count=count;
            return r;
        }
    } catch (err) {
        log4js.error(err);
        return null;
    }
}
//查询所有采购信息，无service信息
procureDAO.findProcureAllByOpenID = async (query) => {
    try {
        return await DB.get(tableP).find(query);  //procureData
    } catch (err) {
        log4js.error(err);
        return null;
    }
}

//获取采购详情信息
procureDAO.getProcureInfo = async (procureQuery,  serviceQuery) => {

    console.log(procureQuery);
    console.log(serviceQuery);
    try {
        const procureData = await DB.get(tableP).find(procureQuery);
        const serviceData = await DB.get(tableS).find(serviceQuery);
        console.log(procureData.length);//  serviceData
        console.log(serviceData.length);//  serviceData

        let d={};
        Object.assign(d,procureData[0],serviceData[0]);
        return d;
    } catch (err) {
        log4js.error(err);
        return null;
    }
}


//审核采购（通过或驳回）
procureDAO.checkProcure = async (query, update) => {
    console.log("query:"+query)
    console.log("update:"+update)
    try {
        const procureData = await DB.get(tableP).update(query,{$set:update});
        console.log('procureData:'+procureData);
        return procureData;
    } catch (err) {
        log4js.error(err);
        return null;
    }
}
/*通过procureID查找单个数据和包含service信息*/
procureDAO.getServiceInfo = async(query) =>{
  try {
    let item = {};
    let procureData = await DB.get(tableP).findOne(query);  //procureData
    if (!_.isEmpty(procureData)) {
      const serviceQuery = {serviceID: procureData.serviceID};
      const serviceData = await DB.get(tableS).findOne(serviceQuery);
      if (!_.isEmpty(serviceData)) {
        item = {
          serviceName: serviceData.serviceName,
          serviceID: serviceData.serviceID,
          logo: serviceData.logo,
          url: serviceData.url,
          summary: serviceData.summary,
          online: false,
          index: serviceData.index,
          templateID: serviceData.templateID,
          city: procureData.region,
          serviceType: serviceData.serviceType,
          openID: procureData.openID,
          useForAddress: procureData.useForAddress,
          hotLogo: serviceData.hotLogo || ""
        }
      }
    }
    return item;
  } catch (err) {
    log4js.error(err);
    return null;
  }
}

exports.procureDAO = procureDAO;