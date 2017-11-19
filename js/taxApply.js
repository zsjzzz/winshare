$(function () {
    taxApplyFormLoading();
    openTaxApplyAudit();
})

// 1.开税票申请
function taxApplyFormLoading() {
    var html = '';
    $.ajax({
        url: 'taxApply.json',
        type: 'GET',
        dataType: 'json',
        success: function (json) {
            json.forEach(function (datas, idx) {
                html = "<tr>";
                html += '<td>' + datas.category + '</td>';
                html += '<td>' + datas.clientName + '</td>';
                html += '<td class="orderListSum">' + datas.orderListSum + '</td>';
                html += '<td class="totalTaxSum">' + datas.totalTaxPaperSum + '</td>';
                html += '<td class="availableTaxSum">' + datas.availableTaxPaperSum + '</td>';
                html += '<td>' + datas.currentClientName + '</td>';
                html += '<td><input class="taxApplySum" type="text" style="width:100px"></td>';
                html += '<td><select class="taxApplyDetailOption"><option value="yes">是</option><option value="no">否</option></select></td>';
                html += '</tr>';
                $(html).appendTo('#taxApplyForm table tbody');
            });
            ctrlUserTaxApplyInput($('.taxApplySum'), $('.totalAvailableTaxSum'), '.availableTaxSum', $('.taxApplyTotalSum'));
        }
    })
}

// 2.开税票申请审核
function openTaxApplyAudit() {
    var html = '';
    // 测试数据
    var curTaxApplySum = [4900, 2240, 7140];
    var detailOptionAry = ['是', '否', '是'];
    // layer变量
    var opTAA;
    // 清空tbody
    $('#taxApplyAuditForm table tbody').empty();
    // ajax请求
    $.ajax({
        url: 'taxApply.json',
        type: 'GET',
        dataType: 'json',
        success: function (json) {
            $(json).each(function (idx, datas) {
                html = "<tr>";
                html += '<td class="clientCategory">' + datas.category + '</td>';
                html += '<td class="clientName">' + datas.clientName + '</td>';
                html += '<td class="orderListSum">' + datas.orderListSum + '</td>';
                html += '<td class="totalTaxSum">' + datas.totalTaxPaperSum + '</td>';
                html += '<td class="availableTaxSum">' + datas.availableTaxPaperSum + '</td>';
                html += '<td>' + datas.currentClientName + '</td>';
                html += '<td class="taxApplySum">' + curTaxApplySum[idx] + '</td>';
                html += '<td>' + detailOptionAry[idx] + '</td>';
                html += '<td flag1="flase"><button idx="' + idx + '" class="wx-delete-btn clientDetail">明细</button></td>'; // idx为自定义属性 以便后期处理
                html += '</tr>';
                $(html).appendTo('#taxApplyAuditForm table tbody');
            });
            taxClientDetailLoad(json);
        }
    });
}
// 两个全局变量 关于点击明细 或 录入明细时的idx 用来索引查找json数据 
var detailClickIdx;
var detailLogClickIdx;
// 3.开税票客户明细 loading
function taxClientDetailLoad(json) {
    var html = '';
    // 用来存储json数据idx的数组
    var i = 0;
    var idxAry = [];
    // 自动填充准备
    // 申请开票总额
    var applyAry = [];
    // 教育局idx
    var JYJidx1;
    $('.taxApplySum').each(function () {
        applyAry.push(parseFloat($(this).text()));
    });
    // layer
    var opTCD;
    //    $.ajax({
    //        url: 'taxApply.json',
    //        type: 'GET',
    //        dataType: 'json',
    //        success: function (json) {
    json.forEach(function (datas, idx) {
        html = '<div style="width: 1200px" class="wx-section-pop" id="taxClientDetail' + idx + '">'; //需修改
        html += '<div class="wx-seek-input-div">';
        html += '<form id="taxClientDetailForm' + idx + '" action="#">';
        html += '<div class="title-warp clearfix">';
        html += '<div class="wx-mb-30 wx-pl-55 wx-mt-40 wx-pr-55 col-lg-6 col-md-6 col-sm-6 text-left wx-h-30 wx-lh-30 ">';
        html += '<span>申请编号 :</span>';
        html += '<span><span class="wx-ml-30">20161201</span></span>';
        html += '</div>';
        html += '<div class="wx-mb-30 wx-pl-55 wx-mt-40 wx-pr-55 col-lg-6 col-md-6 col-sm-6 text-left wx-h-30 wx-lh-30 ">';
        html += '<span>申请日期 :</span>';
        html += '<span class="wx-ml-30">2016-12-01</span>';
        html += '</div>';
        html += '<div class="wx-mb-30 wx-pl-55 wx-pr-55 col-lg-6 col-md-6 col-sm-6 text-left wx-h-30 wx-lh-30 "><span>市公司 :</span><span class="wx-ml-30">成都市公司</span></div>';
        html += '<div class="wx-mb-30 wx-pl-55 wx-pr-55 col-lg-6 col-md-6 col-sm-6 text-left wx-h-30 wx-lh-30 "><span>分公司 :</span><span class="wx-ml-30">高新分公司</span></div>';
        html += '<div class="wx-mb-30 wx-pl-55 wx-pr-55 col-lg-6 col-md-6 col-sm-6 text-left wx-h-30 wx-lh-30 "><span>合同编号 *</span><span class="wx-ml-30">JH-334123</span></div>';
        html += '<div class="wx-mb-30 wx-pl-55 wx-pr-55 col-lg-6 col-md-6 col-sm-6 text-left wx-h-30 wx-lh-30 "><span>合同名称 *</span><span class="wx-ml-30">高新小学设备采购</span></div>';
        html += '<div class="wx-mb-30 wx-pl-55 wx-pr-55 col-lg-6 col-md-6 col-sm-6 text-left wx-h-30 wx-lh-30 "><span>当前客户名称 *</span>'
        html += '<span class="wx-ml-30 curClientName">' + datas.clientName + '</span></div>';
        html += '<div class="wx-mb-30 wx-pl-55 wx-pr-55 col-lg-6 col-md-6 col-sm-6 text-left wx-h-30 wx-lh-30 "><span>当前客户类别 *</span>'
        html += '<span class="wx-ml-30 curClientCategory">' + datas.category + '</span></div>';
        html += '<div class="wx-mb-30 wx-pl-55 wx-pr-55 col-lg-6 col-md-6 col-sm-6 text-left wx-h-30 wx-lh-30 ">'
        html += '<span>当前订单分配表金额 :</span><span class="wx-ml-30 curOrderListSum">' + datas.orderListSum + '</span></div>';
        html += '<div class="wx-mb-30 wx-pl-55 wx-pr-55 col-lg-6 col-md-6 col-sm-6 text-left wx-h-30 wx-lh-30 "><span>当前客户累计开票金额 :</span>'
        html += '<span class="wx-ml-30 curTotalTaxSum">' + datas.totalTaxPaperSum + '</span></div>';
        html += '<div class="wx-mb-30 wx-pl-55 wx-pr-55 col-lg-6 col-md-6 col-sm-6 text-left wx-h-30 wx-lh-30 "><span>当前客户可开票金额 :</span>'
        html += '<span class="wx-ml-30 curAvailableTaxSum">' + datas.availableTaxPaperSum + '</span></div>';
        html += '<div class="wx-mb-30 wx-pl-55 wx-pr-55 col-lg-6 col-md-6 col-sm-6 text-left wx-h-30 wx-lh-30 "><span>本次开票申请总金额 :</span>'
        html += '<span class="wx-ml-30 curTaxApplySum' + idx + '">' + $('.taxApplySum').eq(idx).text() + '</span></div>';
        html += '<div class="col-lg-12 col-md-12 col-sm-12 text-left wx-pb-10 wx-plr-55"><span>客户列表</span></div>';
        html += '<div class="col-lg-12 col-md-12 col-sm-12 wx-plr-55">';
        html += '<div style="overflow-x: scroll">';
        html += '<table id="taxClientDetailTable' + idx + '" style="margin-bottom: 0" class="table table-striped table-bordered tables text-left">';
        html += '<thead><tr><th>销售订单编号</th><th>订单数量</th><th>订单金额</th><th>累计开票金额</th><th>可开票金额</th><th>订单税金</th><th>订单税率</th><th>开票税率</th><th>开票税金</th><th>开票数量</th><th>开票金额</th><th>操作</th></tr></thead>';
        html += '<tbody>';
        datas.salesOrderList.forEach(function (Ddatas, Didx) {
            if (datas.clientName == '教育局') {
                JYJidx1 = idx;
                return true;
            }
            html += "<tr>";
            html += '<td class="d-listNumber' + idx + '">' + Ddatas.listNumber + '</td>'; // d 代表 detail
            html += '<td class="d-listQuantity' + idx + '">' + Ddatas.listQuantity + '</td>';
            html += '<td class="d-listSum' + idx + '">' + Ddatas.listSum + '</td>';
            html += '<td class="d-totalTaxSum' + idx + '">' + Ddatas.totalTaxPaperSum + '</td>';
            html += '<td class="d-availableTaxSum' + idx + '">' + Ddatas.availableTaxPaperSum + '</td>';
            html += '<td class="d-listTaxSum' + idx + '">' + Ddatas.listTaxSum + '</td>';
            html += '<td class="d-listTaxRate' + idx + '">' + Ddatas.listTaxRate + '</td>';
            html += '<td class="d-taxPaperTaxRate' + idx + '">' + Ddatas.taxPaperTaxRate + '</td>';
            html += '<td class="d-taxPaperTaxSum' + idx + '" id="d-taxPaperTaxSumLog' + i + '">0</td>';
            html += '<td class="d-taxPaperQuantity' + idx + '">0</td>';
            html += '<td class="d-taxApplySumBox' + idx + '"><input style="width:50px" class="d-taxApplySum' + idx + '" id="d-taxApplySumLog' + i + '" type="text"></td>';
            html += '<td flag="false"><i style="display:none"></i><button idx="' + i + '" class="wx-delete-btn logClientDetail">录入明细</button></td>';
            html += '</tr>';;
            i++;
        })
        html += '</tbody>';
        html += '</table>';
        html += '</div>';
        html += '<div style="border: 1px solid rgb(221,221,221);border-collapse: collapse; height: 50px;line-height: 50px" class="col-lg-12 col-md-12 col-sm-12 text-left wx-pb-10 text-right"><span>本次开票总金额 :</span><span class="wx-ml-30 curTaxApplySum' + idx + '">' + $('.taxApplySum').eq(idx).text() + '</span></div>';
        html += '</div>';
        html += '<div class="x_submit"><div class="wx-mb-30 wx-pl-130 wx-pr-55 wx-mt-40 col-lg-12 col-md-12 col-sm-12 text-right"><button class="x_search_but wx-bg-blue d-submit' + idx + '">提交</button></div></div>';
        html += '</div>';
        html += '</form>';
        html += '</div>';
        html += '</div>';
        idxAry.push(idx);
        $('body').append(html);
        ctrlUserTaxApplyInput($('.d-taxApplySum' + idx), $('.curTaxApplySum' + idx), ('.d-availableTaxSum' + idx));
        calcTaxAndQuantity($('.d-taxApplySum' + idx), idx);
        // 自动填充准备
        // 单个订单可开票金额
        var listAvaiAry = [];
        // 单个订单可开票金额push
        $('.d-availableTaxSum' + idx).each(function () {
            listAvaiAry.push(parseFloat($(this).text()));
        });
        // 循环绑定自动填充
        autoLogDetail(applyAry[idx], listAvaiAry, $('.d-taxApplySum' + idx), $('.d-taxApplySum' + idx));
    });
    JYJtableAdd();
    // 点击打开相应页面
    clickOpenPage($('.clientDetail'), '#taxClientDetail');
    // 利用索引绑定事件
    idxAry.forEach(function (data, idx) {
        if (idx != JYJidx1) {
            submitDetail($('.d-submit' + idx), $('.d-taxApplySum' + idx), $('.curTaxApplySum' + idx), $('.clientDetail'), idx, 'flag1');
        }
    });
    taxClientDetailLogLoad();
    //        }
    //    })
}


// 4.开税票客户明细录入 loading
function taxClientDetailLogLoad() {
    var html = '';
    // 自动填充准备
    // 申请开票总额
    var applyAry = [];
    // 可开票金额
    var listAvaiAry = [];
    // 记录循环次数的i和j;
    var i = 0;
    var j = 0;
    // 记录循环次数的arr;
    var idxAry = [];
    //    $('.taxApplySum').each(function () {
    //        applyAry.push(parseFloat($(this).text()));
    //    });
    // layer
    var opTCDL;
    $.ajax({
        url: 'taxApply.json',
        type: 'GET',
        dataType: 'json',
        success: function (json) {
            json.forEach(function (datas, idx) {
                if (datas.clientName == '教育局') {
                    return true;
                }
                datas.salesOrderList.forEach(function (Ddatas, Didx) {
                    html = ' <div style="width: 1200px" class="wx-section-pop" id="taxClientDetailLog' + i + '">';
                    html += '<div class="wx-seek-input-div">';
                    html += '<form id="taxClientDetailLogForm' + i + '" action="#">';
                    html += '<div class="title-warp clearfix">';
                    html += '<div class="wx-mb-30 wx-pl-55 wx-mt-40 wx-pr-55 col-lg-6 col-md-6 col-sm-6 text-left wx-h-30 wx-lh-30 "><span>销售订单编号 :</span>';
                    html += '<span class="wx-ml-30 ld-listNumber' + i + '">' + Ddatas.listNumber + '</span></div>';
                    html += '<div class="wx-mb-30 wx-pl-55 wx-mt-40 wx-pr-55 col-lg-6 col-md-6 col-sm-6 text-left wx-h-30 wx-lh-30 "><span>订单数量 :</span>';
                    html += '<span class="wx-ml-30 ld-listQuantity' + i + '">' + Ddatas.listQuantity + '</span></div>';
                    html += '<div class="wx-mb-30 wx-pl-55 wx-pr-55 col-lg-6 col-md-6 col-sm-6 text-left wx-h-30 wx-lh-30 "><span>客户名称 :</span>';
                    html += '<span class="wx-ml-30 ld-clientName' + i + '">' + datas.clientName + '</span></div>';
                    html += '<div class="wx-mb-30 wx-pl-55 wx-pr-55 col-lg-6 col-md-6 col-sm-6 text-left wx-h-30 wx-lh-30 "><span>客户类别 :</span>';
                    html += '<span class="wx-ml-30 ld-clientCategory' + i + '"></span>' + datas.category + '</div>';
                    html += '<div class="wx-mb-30 wx-pl-55 wx-pr-55 col-lg-6 col-md-6 col-sm-6 text-left wx-h-30 wx-lh-30 "><span>累计开票金额 :</span>';
                    html += '<span class="wx-ml-30 ld-totalTaxSum' + i + '">' + Ddatas.totalTaxPaperSum + '</span></div>';
                    html += '<div class="wx-mb-30 wx-pl-55 wx-pr-55 col-lg-6 col-md-6 col-sm-6 text-left wx-h-30 wx-lh-30 "><span>订单金额 :</span>';
                    html += '<span class="wx-ml-30 ld-orderListSum' + i + '">' + Ddatas.listSum + '</span></div>';
                    html += '<div class="wx-mb-30 wx-pl-55 wx-pr-55 col-lg-6 col-md-6 col-sm-6 text-left wx-h-30 wx-lh-30 "><span>本次申请金额 :</span>'
                    html += '<span class="wx-ml-30 ld-curTaxApplySum' + i + '">' + $('#d-taxApplySumLog' + i).val() + '</span></div>';
                    html += '<div class="wx-mb-30 wx-pl-55 wx-pr-55 col-lg-6 col-md-6 col-sm-6 text-left wx-h-30 wx-lh-30 "><span>可开票金额 :</span>'
                    html += '<span class="wx-ml-30 ld-availableTotalTaxSum' + i + '"></span>' + Ddatas.availableTaxPaperSum + '</div>';
                    html += '<div class="wx-mb-30 wx-pl-55 wx-pr-55 col-lg-6 col-md-6 col-sm-6 text-left wx-h-30 wx-lh-30 "><span>开票税率 :</span>'
                    html += '<span class="wx-ml-30 ld-taxPaperTaxRate' + i + '"></span>' + Ddatas.listTaxRate + '</div>';
                    html += '<div class="wx-mb-30 wx-pl-55 wx-pr-55 col-lg-6 col-md-6 col-sm-6 text-left wx-h-30 wx-lh-30 "><span>开票税金 :</span>'
                    html += '<span class="wx-ml-30 ld-taxPaperTaxSum' + i + '">' + $('#d-taxPaperTaxSumLog' + i).text() + '</span></div>';
                    html += '<div class="col-lg-12 col-md-12 col-sm-12 text-left wx-pb-10 wx-plr-55"><span>客户及产品明细列表</span></div>'
                    html += '<div class="col-lg-12 col-md-12 col-sm-12 wx-plr-55"><div style="overflow-x: auto">';
                    html += '<table style="margin-bottom: 0" class="table table-striped table-bordered tables text-left">'
                    html += '<thead><tr><th>客户名称</th><th>产品名称</th><th>产品编号</th><th>规格型号</th><th>品牌</th><th>单位</th><th>数量</th><th>销售单价</th><th>销售总价</th><th>累计开票金额</th><th>可开票金额</th><th>开票数量</th><th>开票金额</th></tr></thead>';
                    html += '<tbody>';
                    Ddatas.detail.forEach(function (LDdatas, LDidx) {
                        html += "<tr>";
                        html += '<td>' + LDdatas.subAccountName + '</td>';
                        html += '<td>' + LDdatas.productName + '</td>';
                        html += '<td>' + LDdatas.productNumber + '</td>';
                        html += '<td>' + LDdatas.productType + '</td>';
                        html += '<td>' + LDdatas.productBrand + '</td>';
                        html += '<td>' + LDdatas.unit + '</td>';
                        html += '<td>' + LDdatas.quantity + '</td>';
                        html += '<td class="ld-listUnit' + i + '" id="ld-listUnit' + j + '">' + LDdatas.unitPrice + '</td>';
                        html += '<td class="ld-listSum' + i + '" id="ld-listSum' + j + '">' + LDdatas.totalPrice + '</td>';
                        html += '<td>' + LDdatas.totalTaxPaperSum + '</td>';
                        html += '<td class="ld-availableTaxSum' + i + '" id="ld-availableTaxSum' + j + '">' + LDdatas.availableTaxPaperSum + '</td>';
                        html += '<td class="ld-taxPaperQuantity' + i + '"></td>'; // ld 代表 logdetail
                        html += '<td><input style="width:50px" class="ld-taxApplySum' + i + '" id="ld-taxApplySum' + j + '" type="text" value=""></td>';
                        html += '</tr>';
                        j++;
                    })
                    html += '</tbody>';
                    html += '</table>';
                    html += '</div>';
                    html += '<div style="border: 1px solid rgb(221,221,221);border-collapse: collapse; height: 50px;line-height: 50px" class="col-lg-12 col-md-12 col-sm-12 text-left wx-pb-10 text-right"><span>本次开票总金额 :</span>';
                    html += '<span class="wx-ml-30 ld-curTotalTaxApplySum' + i + '"></span></div></div>';
                    html += '<div class="x_submit"><div class="wx-mb-30 wx-pl-130 wx-pr-55 wx-mt-40 col-lg-12 col-md-12 col-sm-12 text-right">';
                    html += '<button class="x_search_but wx-bg-blue submitDetailLog' + i + '">确认</button></div>';
                    html += '</div>';
                    html += '</div>';
                    html += '</form>';
                    html += '</div>';
                    html += '</div>';
                    $('body').append(html);
                    $('.d-taxApplySum' + idx).eq(Didx).each(function () {
                        applyAry.push(parseFloat($(this).val()));
                    });
                    $('.ld-availableTaxSum' + i).each(function () {
                        listAvaiAry.push(parseFloat($(this).text()));
                    });
                    // 循环绑定求和及验证
                    ctrlUserTaxApplyInput2($('.ld-taxApplySum' + i), $('#d-taxApplySumLog' + i), ('.ld-availableTaxSum' + i), $('.ld-curTotalTaxApplySum' + i));
                    // 循环绑定计算税率和数量
                    calcQuantity($('.ld-taxApplySum' + i), i);
                    autoLogDetail(applyAry[i], listAvaiAry, $('.ld-taxApplySum' + i), $('.ld-taxApplySum' + i));
                    autoLogDetailWhileChange($('#d-taxApplySumLog' + i), $('.ld-taxApplySum' + i), '.ld-availableTaxSum', '.ld-taxApplySum', $('.ld-taxApplySum' + i), '', '.JYJld-taxApplySum');
                    idxAry.push(i);
                    submitDetailLog($('.submitDetailLog' + i), $('.ld-taxApplySum' + i), $('#d-taxApplySumLog' + i), '#d-taxApplySumLog');
                    i++;
                })
            });
            // 点击打开相应页面
            clickOpenPage2($('.logClientDetail'), '#taxClientDetailLog', '.ld-curTaxApplySum', '#d-taxApplySumLog', '.ld-taxPaperTaxSum', '#d-taxPaperTaxSumLog');
        }
    })
}

// 5.教育局填充表格
function JYJtableAdd() {
    var length = $('.clientDetail').length;
    var JYJidx;
    var html = '';
    var i = 0;
    var idxAry = [];
    $('.clientName').each(function (idx, datas) {
        if ($(this).text() == '教育局') {
            JYJidx = idx;
            return false;
        };
    });
    $('#taxClientDetailTable' + JYJidx).children('tbody').empty();
    $.ajax({
        url: 'taxApply.json',
        type: 'GET',
        dataType: 'json',
        success: function (json) {
            json.forEach(function (datas, idx) {
                datas.salesOrderList.forEach(function (Ddatas, Didx) {
                    html += "<tr>";
                    html += '<td class="JYJ-clientName' + idx + '" id="JYJ-clientName' + i + '">' + datas.clientName + '</td>';;
                    html += '<td class="JYJ-listNumber' + idx + '" id="JYJ-listNumber' + i + '">' + Ddatas.listNumber + '</td>'; // d 代表 detail
                    html += '<td class="JYJ-listQuantity' + idx + '" id="JYJ-listQuantity' + i + '">' + Ddatas.listQuantity + '</td>';
                    html += '<td class="JYJ-listSum' + idx + '" id="JYJ-listSum' + i + '">' + Ddatas.listSum + '</td>';
                    html += '<td class="JYJ-totalTaxSum' + idx + '" id="JYJ-totalTaxSum' + i + '">' + Ddatas.totalTaxPaperSum + '</td>';
                    html += '<td class="JYJ-availableTaxSum' + idx + '" id="JYJ-availableTaxSum' + i + '">' + Ddatas.availableTaxPaperSum + '</td>';
                    html += '<td class="JYJ-listTaxSum' + idx + '" id="JYJ-listTaxSum' + i + '">' + Ddatas.listTaxSum + '</td>';
                    html += '<td class="JYJ-listTaxRate' + idx + '" id="JYJ-listTaxRate' + i + '">' + Ddatas.listTaxRate + '</td>';
                    html += '<td class="JYJ-taxPaperTaxRate' + idx + '" id="JYJ-taxPaperTaxRate' + i + '">' + Ddatas.taxPaperTaxRate + '</td>';
                    html += '<td class="JYJ-taxPaperTaxSum' + idx + '" id="JYJ-taxPaperTaxSum' + i + '">0</td>';
                    html += '<td class="JYJ-taxPaperQuantity' + idx + '" id="JYJ-taxPaperQuantity' + i + '">0</td>';
                    html += '<td class="JYJ-taxApplySumBox' + idx + '" id="JYJ-taxApplySumBox' + i + '"><input style="width:50px" class="JYJ-taxApplySum' + idx + ' JYJ-taxApplySum" id="JYJ-taxApplySumLog' + i + '" type="text" value="0"></td>';
                    html += '<td flag="false"><i style="display:none"></i><button idx="' + i + '" class="wx-delete-btn JYJlogClientDetail">录入明细</button></td>';
                    html += '</tr>';;
                    idxAry.push(i);
                    i++;
                });
            });
            $('<th>客户名称</th>').prependTo($('#taxClientDetailTable' + JYJidx).children('thead').children('tr'));
            $(html).prependTo($('#taxClientDetailTable' + JYJidx).children('tbody'));
            // 自动填充准备
            // 总申请开票金额
            var totalApplySum = parseFloat($('.curTaxApplySum' + JYJidx).eq(0).text());
            // 单个订单可开票金额
            var listAvaiAry = [];
            idxAry.forEach(function (datas, i) {
                ctrlUserTaxApplyInput($('.JYJ-taxApplySum'), $('.curTaxApplySum' + JYJidx), ('#JYJ-availableTaxSum' + i));
                calcTaxAndQuantity2($('#JYJ-taxApplySumLog' + i), i);
                // 单个订单可开票金额push
                // 订单可开票金额
                var avaiSum = parseFloat($('#JYJ-availableTaxSum' + i).text());
                // 已开票金额
                var appliedSum = parseFloat($('#d-taxApplySumLog' + i).val());
                if (isNaN(avaiSum) == true) {
                    avaiSum = 0;
                }
                if (isNaN(appliedSum) == true) {
                    appliedSum = 0;
                }
                listAvaiAry.push(avaiSum - appliedSum);
                listApplySumVerify($('#JYJ-taxApplySumLog' + i), '#JYJ-taxApplySumLog', $('#d-taxApplySumLog' + i), '#d-taxApplySumLog', '#JYJ-availableTaxSum');
            });
            // 循环绑定自动填充
            autoLogDetail(totalApplySum, listAvaiAry, $('.JYJ-taxApplySum'), $('.JYJ-taxApplySum'));
            submitDetail($('.d-submit' + JYJidx), $('.JYJ-taxApplySum'), $('.curTaxApplySum' + JYJidx), $('.clientDetail'), JYJidx, 'flag1');
            JYJtaxClientDetailLogLoad();
        }
    })
}

// 6.开税票客户明细录入(教育局部分)
function JYJtaxClientDetailLogLoad() {
    var html = '';
    // 自动填充准备
    // 申请开票总额
    var applyAry = [];
    // 可开票金额
    var listAvaiAry = [];
    // 记录循环次数的i和j;
    var i = 0;
    var j = 0;
    // 记录循环次数的arr;
    var idxAry = [];
    var idxAry2 = [];
    // layer
    var opTCDL;
    $.ajax({
        url: 'taxApply.json',
        type: 'GET',
        dataType: 'json',
        success: function (json) {
            json.forEach(function (datas, idx) {
                datas.salesOrderList.forEach(function (Ddatas, Didx) {
                    html = ' <div style="width: 1200px" class="wx-section-pop" id="JYJtaxClientDetailLog' + i + '">';
                    html += '<div class="wx-seek-input-div">';
                    html += '<form id="JYJtaxClientDetailLogForm' + i + '" action="#">';
                    html += '<div class="title-warp clearfix">';
                    html += '<div class="wx-mb-30 wx-pl-55 wx-mt-40 wx-pr-55 col-lg-6 col-md-6 col-sm-6 text-left wx-h-30 wx-lh-30 "><span>销售订单编号 :</span>';
                    html += '<span class="wx-ml-30 JYJld-listNumber' + i + '">' + Ddatas.listNumber + '</span></div>';
                    html += '<div class="wx-mb-30 wx-pl-55 wx-mt-40 wx-pr-55 col-lg-6 col-md-6 col-sm-6 text-left wx-h-30 wx-lh-30 "><span>订单数量 :</span>';
                    html += '<span class="wx-ml-30 JYJld-listQuantity' + i + '">' + Ddatas.listQuantity + '</span></div>';
                    html += '<div class="wx-mb-30 wx-pl-55 wx-pr-55 col-lg-6 col-md-6 col-sm-6 text-left wx-h-30 wx-lh-30 "><span>客户名称 :</span>';
                    html += '<span class="wx-ml-30 JYJld-clientName' + i + '">' + datas.clientName + '</span></div>';
                    html += '<div class="wx-mb-30 wx-pl-55 wx-pr-55 col-lg-6 col-md-6 col-sm-6 text-left wx-h-30 wx-lh-30 "><span>客户类别 :</span>';
                    html += '<span class="wx-ml-30 JYJld-clientCategory' + i + '"></span>' + datas.category + '</div>';
                    html += '<div class="wx-mb-30 wx-pl-55 wx-pr-55 col-lg-6 col-md-6 col-sm-6 text-left wx-h-30 wx-lh-30 "><span>累计开票金额 :</span>';
                    html += '<span class="wx-ml-30 JYJld-totalTaxSum' + i + '">' + Ddatas.totalTaxPaperSum + '</span></div>';
                    html += '<div class="wx-mb-30 wx-pl-55 wx-pr-55 col-lg-6 col-md-6 col-sm-6 text-left wx-h-30 wx-lh-30 "><span>订单金额 :</span>';
                    html += '<span class="wx-ml-30 JYJld-orderListSum' + i + '">' + Ddatas.listSum + '</span></div>';
                    html += '<div class="wx-mb-30 wx-pl-55 wx-pr-55 col-lg-6 col-md-6 col-sm-6 text-left wx-h-30 wx-lh-30 "><span>本次申请金额 :</span>'
                    html += '<span class="wx-ml-30 JYJld-curTaxApplySum' + i + '">' + $('#JYJ-taxApplySumLog' + i).val() + '</span></div>';
                    html += '<div class="wx-mb-30 wx-pl-55 wx-pr-55 col-lg-6 col-md-6 col-sm-6 text-left wx-h-30 wx-lh-30 "><span>可开票金额 :</span>'
                    html += '<span class="wx-ml-30 JYJld-availableTotalTaxSum' + i + '"></span>' + Ddatas.availableTaxPaperSum + '</div>';
                    html += '<div class="wx-mb-30 wx-pl-55 wx-pr-55 col-lg-6 col-md-6 col-sm-6 text-left wx-h-30 wx-lh-30 "><span>开票税率 :</span>'
                    html += '<span class="wx-ml-30 JYJld-taxPaperTaxRate' + i + '"></span>' + Ddatas.listTaxRate + '</div>';
                    html += '<div class="wx-mb-30 wx-pl-55 wx-pr-55 col-lg-6 col-md-6 col-sm-6 text-left wx-h-30 wx-lh-30 "><span>开票税金 :</span>'
                    html += '<span class="wx-ml-30 JYJld-taxPaperTaxSum' + i + '">' + $('#JYJ-taxPaperTaxSum' + i).text() + '</span></div>';
                    html += '<div class="col-lg-12 col-md-12 col-sm-12 text-left wx-pb-10 wx-plr-55"><span>客户及产品明细列表</span></div>'
                    html += '<div class="col-lg-12 col-md-12 col-sm-12 wx-plr-55"><div style="overflow-x: auto">';
                    html += '<table style="margin-bottom: 0" class="table table-striped table-bordered tables text-left">'
                    html += '<thead><tr><th>客户名称</th><th>产品名称</th><th>产品编号</th><th>规格型号</th><th>品牌</th><th>单位</th><th>数量</th><th>销售单价</th><th>销售总价</th><th>累计开票金额</th><th>可开票金额</th><th>开票数量</th><th>开票金额</th></tr></thead>';
                    html += '<tbody>';
                    Ddatas.detail.forEach(function (LDdatas, LDidx) {
                        html += "<tr>";
                        html += '<td>' + LDdatas.subAccountName + '</td>';
                        html += '<td>' + LDdatas.productName + '</td>';
                        html += '<td>' + LDdatas.productNumber + '</td>';
                        html += '<td>' + LDdatas.productType + '</td>';
                        html += '<td>' + LDdatas.productBrand + '</td>';
                        html += '<td>' + LDdatas.unit + '</td>';
                        html += '<td>' + LDdatas.quantity + '</td>';
                        html += '<td class="JYJld-listUnit' + i + '" id="JYJld-listUnit' + j + '">' + LDdatas.unitPrice + '</td>';
                        html += '<td class="JYJld-listSum' + i + '" id="JYJld-listSum' + j + '">' + LDdatas.totalPrice + '</td>';
                        html += '<td>' + LDdatas.totalTaxPaperSum + '</td>';
                        html += '<td class="JYJld-availableTaxSum' + i + '" id="JYJld-availableTaxSum' + j + '">' + LDdatas.availableTaxPaperSum + '</td>';
                        html += '<td class="JYJld-taxPaperQuantity' + i + '"></td>'; // ld 代表 logdetail
                        html += '<td><input style="width:50px" class="JYJld-taxApplySum' + i + '" id="JYJld-taxApplySum' + j + '" type="text" value=""></td>';
                        html += '</tr>';
                        idxAry.push(j);
                        j++;
                    })
                    html += '</tbody>';
                    html += '</table>';
                    html += '</div>';
                    html += '<div style="border: 1px solid rgb(221,221,221);border-collapse: collapse; height: 50px;line-height: 50px" class="col-lg-12 col-md-12 col-sm-12 text-left wx-pb-10 text-right"><span>本次开票总金额 :</span>';
                    html += '<span class="wx-ml-30 JYJld-curTotalTaxApplySum' + i + '"></span></div></div>';
                    html += '<div class="x_submit"><div class="wx-mb-30 wx-pl-130 wx-pr-55 wx-mt-40 col-lg-12 col-md-12 col-sm-12 text-right">';
                    html += '<button class="x_search_but wx-bg-blue JYJsubmitDetailLog' + i + '">确认</button></div>';
                    html += '</div>';
                    html += '</div>';
                    html += '</form>';
                    html += '</div>';
                    html += '</div>';
                    $('body').append(html);
                    // 循环绑定求和及验证
                    ctrlUserTaxApplyInput2($('.JYJld-taxApplySum' + i), $('#JYJ-taxApplySumLog' + i), ('.JYJld-availableTaxSum' + i), $('.JYJld-curTotalTaxApplySum' + i));
                    // 循环绑定计算税率和数量
                    calcQuantity2($('.JYJld-taxApplySum' + i), i);
                    autoLogDetailWhileChange($('#JYJ-taxApplySumLog' + i), $('.JYJld-taxApplySum' + i), ('.JYJld-availableTaxSum'), ('.JYJld-taxApplySum'), $('.JYJld-taxApplySum' + i), '.ld-taxApplySum');
                    submitDetailLog($('.JYJsubmitDetailLog' + i), $('.JYJld-taxApplySum' + i), $('#JYJ-taxApplySumLog' + i), '#JYJ-taxApplySumLog');
                    // 总订单可开票金额push
                    $('#JYJ-taxApplySumLog' + i).each(function () {
                        if ($(this).val() == '') {
                            applyAry.push(0);
                        } else {
                            applyAry.push(parseFloat($(this).val()));
                        }
                    });
                    idxAry2.push(i);
                    i++;
                })
            });
            idxAry.forEach(function (datas, j) {
                // 单个订单可开票金额push
                // 订单可开票金额
                var avaiSum = parseFloat($('#JYJld-availableTaxSum' + j).text());
                // 已开票金额
                var appliedSum = parseFloat($('#ld-taxApplySum' + j).val());
                if (isNaN(avaiSum) == true) {
                    avaiSum = 0;
                }
                if (isNaN(appliedSum) == true) {
                    appliedSum = 0;
                }
                listAvaiAry.push(avaiSum - appliedSum);
                listApplySumVerify2($('#JYJld-taxApplySum' + j), '#JYJld-taxApplySum', $('#ld-taxApplySum' + j), '#ld-taxApplySum', '#JYJld-availableTaxSum');
            });
            idxAry2.forEach(function (datas, i) {
                var cutAry = listAvaiAry.splice(0, 4);
                autoLogDetail(applyAry[i], cutAry, $('.JYJld-taxApplySum' + i), $('.JYJld-taxApplySum' + i));
            });
            // 点击打开相应页面
            clickOpenPage2($('.JYJlogClientDetail'), '#JYJtaxClientDetailLog', '.JYJld-curTaxApplySum', '#JYJ-taxApplySumLog', '.JYJld-taxPaperTaxSum', '#JYJ-taxPaperTaxSum' + i);
        }
    })
}
// 点击打开相应界面
function clickOpenPage(clickBtn, pageID) {
    clickBtn.click(function () {
        detailClickIdx = $(this).attr('idx');
        popPage();

        function popPage() {
            opTCD = layer.open({
                type: 1,
                content: $(pageID + detailClickIdx),
                area: ['1200px', '650px'],
                resize: false,
                title: "开税票客户明细",
                isOutAnim: false,
                end: function () {
                    $(pageID + detailClickIdx).css({
                        "display": "none"
                    })
                }
            })
        }
    });
}
// 点击打开相应界面2
function clickOpenPage2(clickBtn, pageID, curTaxApplySum, enteredcurTaxApplySum, curTaxPaperSum, enteredcurTaxPaperSum) {
    clickBtn.click(function () {
        detailClickIdx = $(this).attr('idx');
        $(curTaxApplySum + detailClickIdx).text($(enteredcurTaxApplySum + detailClickIdx).val());
        $(curTaxPaperSum + detailClickIdx).text($(enteredcurTaxPaperSum + detailClickIdx).text());
        popPage();

        function popPage() {
            opTCDL = layer.open({
                type: 1,
                content: $(pageID + detailClickIdx),
                area: ['1200px', '650px'],
                resize: false,
                title: "开税票客户录入明细",
                isOutAnim: false,
                end: function () {
                    $(pageID + detailClickIdx).css({
                        "display": "none"
                    })
                }
            })
        }
    });
}

// 验证用户输入金额是否大于最大可申请金额
function ctrlUserTaxApplyInput(userInputSum, curTotalTaxApplySum, className, totalTaxApplyInput) { // 用户输入 当前已知最大值 要对比的可开票金额的class 用户输入求和(如果存在)
    var totalSum;
    var curSum = parseFloat(curTotalTaxApplySum.eq(0).text());
    userInputSum.on('keyup', function () {
        totalSum = 0;
        var avlbVal = parseFloat($(this).parent().siblings(className).text());
        var userVal = parseFloat($(this).val());
        userInputSum.each(function (idx, vals) {
            if ($(this).val() == '') {
                totalSum += 0;
                return;
            }
            totalSum += parseFloat($(this).val());
        });
        if (userVal > avlbVal) {
            alert("申请开票金额大于可开票金额, 请重新输入!");
            // 总额减去超出的这次计算并防止为负数
            totalSum = totalSum - parseFloat($(this).val());
            if (totalSum < 0) {
                totalSum = 0;
            }
            $(this).val('');
        };
        if (totalSum > curSum) {
            alert("开票金额大于本次开票总金额, 请重新输入!");
            // 总额减去超出的这次计算并防止为负数
            totalSum = totalSum - parseFloat($(this).val());
            if (totalSum < 0) {
                totalSum = 0;
            }
            $(this).val('');
        };
        if (totalTaxApplyInput) {
            totalTaxApplyInput.text(totalSum);
        };
    })
}

// 验证用户输入金额是否大于最大可申请金额2
function ctrlUserTaxApplyInput2(userInputSum, curTotalTaxApplySum, className, totalTaxApplyInput) { // 用户输入 当前已知最大值 要对比的可开票金额的class 用户输入求和(如果存在)
    var totalSum;
    userInputSum.on('keyup', function () {
        var curSum = parseFloat(curTotalTaxApplySum.val());
        totalSum = 0;
        var avlbVal = parseFloat($(this).parent().siblings(className).text());
        var userVal = parseFloat($(this).val());
        userInputSum.each(function (idx, vals) {
            if ($(this).val() == '') {
                totalSum += 0;
            } else {
                totalSum += parseFloat($(this).val());
            }
        });
        if (userVal > avlbVal) {
            alert("申请开票金额大于可开票金额, 请重新输入!");
            // 总额减去超出的这次计算并防止为负数
            totalSum = totalSum - parseFloat($(this).val());
            if (totalSum < 0) {
                totalSum = 0;
            }
            $(this).val('');
        };
        if (totalSum > curSum) {
            alert("开票金额大于本次开票总金额, 请重新输入!");
            // 总额减去超出的这次计算并防止为负数
            totalSum = totalSum - parseFloat($(this).val());
            if (totalSum < 0) {
                totalSum = 0;
            }
            $(this).val('');
        };
        if (totalTaxApplyInput) {
            totalTaxApplyInput.text(totalSum);
        };
    })
}
// 计算开票税金和开票数量
function calcTaxAndQuantity(userInput, idx) {
    var taxPaperSum;
    var taxPaperQuantity;
    userInput.on('keyup', function () {
        // 开票税率
        if ($(this).val() == '') {
            return;
        }
        var taxPaperRate = parseFloat($(this).parent().siblings('.d-taxPaperTaxRate' + idx).text()) / 100;
        // 开票单价   订单金额 / 订单数量
        var taxPaperUnitPrice = parseFloat($(this).parent().siblings('.d-listSum' + idx).text()) / parseFloat($(this).parent().siblings('.d-listQuantity' + idx).text());
        // 开票税金
        taxPaperSum = (parseFloat($(this).val()) * taxPaperRate).toFixed(2);
        $(this).parent().siblings('.d-taxPaperTaxSum' + idx).text(taxPaperSum);
        // 开票数量
        taxPaperQuantity = (parseFloat($(this).val()) / taxPaperUnitPrice).toFixed(2);
        $(this).parent().siblings('.d-taxPaperQuantity' + idx).text(taxPaperQuantity);
    })
}

// 计算开票税金和开票数量2
function calcTaxAndQuantity2(userInput, idx) {
    var taxPaperSum;
    var taxPaperQuantity;
    userInput.on('keyup', function () {
        // 开票税率
        if ($(this).val() == '') {
            return;
        }
        var taxPaperRate = parseFloat($(this).parent().siblings('#JYJ-taxPaperTaxRate' + idx).text()) / 100;
        // 开票单价   订单金额 / 订单数量
        var taxPaperUnitPrice = parseFloat($(this).parent().siblings('#JYJ-listSum' + idx).text()) / parseFloat($(this).parent().siblings('#JYJ-listQuantity' + idx).text());
        // 开票税金
        taxPaperSum = (parseFloat($(this).val()) * taxPaperRate).toFixed(2);
        $(this).parent().siblings('#JYJ-taxPaperTaxSum' + idx).text(taxPaperSum);
        // 开票数量
        taxPaperQuantity = (parseFloat($(this).val()) / taxPaperUnitPrice).toFixed(2);
        $(this).parent().siblings('#JYJ-taxPaperQuantity' + idx).text(taxPaperQuantity);
    })
}
// 计算开票数量
function calcQuantity(userInput, idx) {
    var taxPaperQuantity;
    userInput.on('keyup', function () {
        if ($(this).val() == '') {
            return;
        }
        // 开票单价
        var taxPaperUnitPrice = parseFloat($(this).parent().siblings('.ld-listUnit' + idx).text());
        // 开票数量
        taxPaperQuantity = (parseFloat($(this).val()) / taxPaperUnitPrice).toFixed(2);
        $(this).parent().siblings('.ld-taxPaperQuantity' + idx).text(taxPaperQuantity);
    })
}

// 计算开票数量2
function calcQuantity2(userInput, idx) {
    var taxPaperQuantity;
    userInput.on('keyup', function () {
        if ($(this).val() == '') {
            return;
        }
        // 开票单价
        var taxPaperUnitPrice = parseFloat($(this).parent().siblings('.JYJld-listUnit' + idx).text());
        // 开票数量
        taxPaperQuantity = (parseFloat($(this).val()) / taxPaperUnitPrice).toFixed(2);
        $(this).parent().siblings('.JYJld-taxPaperQuantity' + idx).text(taxPaperQuantity);
    })
}

// 自动顺序填充明细中的金额
function autoLogDetail(userInput, listAvaiLableAry, appendBox, autoTrigger) {
    var resultAry = [];
    var calcResult = 0;
    calcResult = parseFloat(userInput);
    listAvaiLableAry.forEach(function (data, idx) {
        userInput = calcResult;
        calcResult = userInput - data;
        if (calcResult <= 0) {
            resultAry.push(parseFloat(userInput));
        } else {
            resultAry.push(parseFloat(data));
        }
    });
    resultAry.forEach(function (data, idx) {
        if (data < 0) {
            resultAry[idx] = 0
        }
    });
    appendBox.each(function (idx) {
        $(this).val(resultAry[idx])
    });
    if (autoTrigger) {
        autoTrigger.each(function () {
            $(this).triggerHandler('keyup');
        });
    }
}

// 开税票客户明细 输入框变化后再次调用自动填充功能 开票金额 录入明细中的开票金额 录入明细中的可开票金额 录入明细金额盒子 trigger 分配客户的名字 教育局名字
function autoLogDetailWhileChange(taxApplySum, LDuserInput, LDlistAvaiLableAry, appendBox, autoLogtrigger, reserveCusName, JYJname) {
    taxApplySum.on('keyup', function () {
        var resultAry = [];
        var calcResult = 0;
        // 获取修改的id
        var nowID = $(this).attr('id');
        // 获取修改的idx
        var nowIdx = nowID.replace(/[^0-9]/ig, "");
        // 获取当前用户输入的开票金额
        var curTaxApplySum = parseFloat($(this).val());
        if (isNaN(curTaxApplySum) == true) {
            curTaxApplySum = 0
        }
        // 计算结果 先赋值
        calcResult = curTaxApplySum;
        // 录入明细中的可开票金额
        var listAvaiLableAry = [];
        $(LDlistAvaiLableAry + nowIdx).each(function (i) {
            if (reserveCusName) {
                var avaiSum = parseFloat($(this).text());
                var appliedSum = parseFloat($(reserveCusName + nowIdx).eq(i).val());
                if (isNaN(avaiSum) == true) {
                    avaiSum = 0
                };
                if (isNaN(appliedSum) == true) {
                    appliedSum = 0
                };
                listAvaiLableAry.push(avaiSum - appliedSum);
            };
            if (JYJname) {
                var avaiSum = parseFloat($(this).text());
                var appliedSum = parseFloat($(JYJname + nowIdx).eq(i).val());
                if (isNaN(avaiSum) == true) {
                    avaiSum = 0
                };
                if (isNaN(appliedSum) == true) {
                    appliedSum = 0
                };
                listAvaiLableAry.push(avaiSum - appliedSum);
            };
        })
        listAvaiLableAry.forEach(function (data, idx) {
            curTaxApplySum = calcResult;
            calcResult = curTaxApplySum - data;
            if (calcResult <= 0) {
                resultAry.push(parseFloat(curTaxApplySum));
            } else {
                resultAry.push(parseFloat(data));
            }
        });
        resultAry.forEach(function (data, idx) {
            if (data < 0) {
                resultAry[idx] = 0
            }
        });
        $(appendBox + nowIdx).each(function (idx) {
            $(this).val(resultAry[idx])
        })
        if (autoLogtrigger) {
            autoLogtrigger.each(function () {
                $(this).triggerHandler('keyup');
            });
        }
    })
}

// 点击提交则关闭页面验证传回值并修改flag 1.提交按钮 2.用户输入框 3.本次开票总金额 4.上个页面点击明细的按钮 5.全局变量点击的idx 6.flag的名字
function submitDetail(submitBtn, userInputSum, curTaxTotalSum, enteredBtn, idx, flag) {
    var curTotal;
    submitBtn.on('click', function () {
        var userTotalInput = 0;
        enteredBtn.eq(idx).attr(flag, 'true');
        curTotal = parseFloat(curTaxTotalSum.eq(0).text());
        userInputSum.each(function (idx, vals) {
            if ($(this).val() == '') {
                userTotalInput += 0;
            } else {
                userTotalInput += parseFloat($(this).val());
            }
        });
        if (userTotalInput != curTotal) {
            var marginSum = curTotal - userTotalInput;
            alert('开票金额与本次开票总金额不符, 相差' + marginSum + '请重新输入!');
        };
        if (userTotalInput == curTotal) {
            layer.close(opTCD);
        };
    });
}

// 点击提交则关闭页面验证传回值
function submitDetailLog(submitBtn, userInputSum, enteredSum, autoLogtrigger) {
    submitBtn.on('click', function () {
        var userTotalInput = 0;
        var clickClass = $(this).attr('class').split(' ').pop();
        var clickIdx = clickClass.replace(/[^0-9]/ig, "");
        userInputSum.each(function (idx, vals) {
            if ($(this).val() == '') {
                userTotalInput += 0;
                return;
            }
            userTotalInput += parseFloat($(this).val());
        });
        enteredSum.val(userTotalInput)
        layer.close(opTCDL);
        if (autoLogtrigger) {
            $(autoLogtrigger + clickIdx).triggerHandler('keyup');
        }
    });
}

// 教育局中订单的开票金额加上其他客户相应订单的开票金额不能超过 该订单的总可开票金额
function listApplySumVerify(JYJsum, JYJsumName, otherClientSum, otherClientSumName, availableSum) {
    JYJsum.on('keyup', function () {
        // 获取修改的id
        var nowID = $(this).attr('id');
        // 获取修改的idx
        var nowIdx = nowID.replace(/[^0-9]/ig, "");
        // 获取当前值
        var curSum = parseFloat($(this).val());
        if (curSum == '' || isNaN(curSum) == true) {
            curSum = 0;
        }
        // 获取另一边的值
        var otherSum = parseFloat($(otherClientSumName + nowIdx).val());
        if (otherSum == '' || isNaN(otherSum) == true) {
            otherSum = 0;
        }
        // 获取该订单可开票金额
        var avaiSum = parseFloat($(availableSum + nowIdx).text());
        // 当前总和
        var totalSum = curSum + otherSum;
        if (totalSum > avaiSum) {
            alert('当前订单开票金额大于该订单可开票金额!(教育局分配的开票金额与分配客户的开票金额总和不能大于该订单可开票金额),请重新检查输入');
            $(this).val('');
            $(this).parent().prev().text('0');
            $(this).parent().prev().prev().text('0');
        }
    });
    otherClientSum.on('keyup', function () {
        // 获取修改的id
        var nowID = $(this).attr('id');
        // 获取修改的idx
        var nowIdx = nowID.replace(/[^0-9]/ig, "");
        // 获取当前值
        var curSum = parseFloat($(this).val());
        if (curSum == '' || isNaN(curSum) == true) {
            curSum = 0;
        }
        // 获取另一边的值
        var otherSum = parseFloat($(JYJsumName + nowIdx).val());
        if (otherSum == '' || isNaN(otherSum) == true) {
            otherSum = 0;
        }
        // 获取该订单可开票金额
        var avaiSum = parseFloat($(availableSum + nowIdx).text());
        // 当前总和
        var totalSum = curSum + otherSum;
        if (totalSum > avaiSum) {
            alert('当前订单开票金额大于该订单可开票金额!(教育局分配的开票金额与分配客户的开票金额总和不能大于该订单可开票金额),请重新检查输入');
            $(this).val('');
            $(this).parent().prev().text('0');
            $(this).parent().prev().prev().text('0');
        }
    });
}

function listApplySumVerify2(JYJsum, JYJsumName, otherClientSum, otherClientSumName, availableSum) {
    JYJsum.on('keyup', function () {
        // 获取修改的id
        var nowID = $(this).attr('id');
        // 获取修改的idx
        var nowIdx = nowID.replace(/[^0-9]/ig, "");
        // 获取当前值
        var curSum = parseFloat($(this).val());
        if (curSum == '' || isNaN(curSum) == true) {
            curSum = 0;
        }
        // 获取另一边的值
        var otherSum = parseFloat($(otherClientSumName + nowIdx).val());
        if (otherSum == '' || isNaN(otherSum) == true) {
            otherSum = 0;
        }
        // 获取该订单可开票金额
        var avaiSum = parseFloat($(availableSum + nowIdx).text());
        // 当前总和
        var totalSum = curSum + otherSum;
        if (totalSum > avaiSum) {
            alert('当前订单开票金额大于该订单可开票金额!(教育局分配的开票金额与分配客户的开票金额总和不能大于该订单可开票金额),请重新检查输入');
            $(this).val('');
            $(this).parent().prev().text('0');
        }
    });
    otherClientSum.on('keyup', function () {
        // 获取修改的id
        var nowID = $(this).attr('id');
        // 获取修改的idx
        var nowIdx = nowID.replace(/[^0-9]/ig, "");
        // 获取当前值
        var curSum = parseFloat($(this).val());
        if (curSum == '' || isNaN(curSum) == true) {
            curSum = 0;
        }
        // 获取另一边的值
        var otherSum = parseFloat($(JYJsumName + nowIdx).val());
        if (otherSum == '' || isNaN(otherSum) == true) {
            otherSum = 0;
        }
        // 获取该订单可开票金额
        var avaiSum = parseFloat($(availableSum + nowIdx).text());
        // 当前总和
        var totalSum = curSum + otherSum;
        if (totalSum > avaiSum) {
            alert('当前订单开票金额大于该订单可开票金额!(教育局分配的开票金额与分配客户的开票金额总和不能大于该订单可开票金额),请重新检查输入');
            $(this).val('');
            $(this).parent().prev().text('0');
        }
    });
}
