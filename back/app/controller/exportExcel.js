const urlParse = require('url'),
    exportExcelService = require('../logic/exportExcel').exportExcelService;

let exportExcelCon = {};

exportExcelCon.getCon = async(ctx)=> {
    const pathName = urlParse.parse(ctx.req.url).pathname.replace("/", "").split("/")[1];
    await eval(pathName + "(ctx)");
};
//test
const exportExcel = async(ctx)=> {
    await exportExcelService.excel(ctx)
};
//服务接入Excel导出
const serviceJoinExcel = async(ctx)=> {
    await exportExcelService.serviceJoinExcel(ctx)
};

exports.exportExcelCon = exportExcelCon;