<%--
  Created by IntelliJ IDEA.
  User: liaoh
  Date: 2017/7/9
  Time: 23:48
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<c:set var="path" value="${pageContext.request.contextPath}"/>
<!--新增产品弹出-->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>新增产品</title>
    <jsp:include page="/WEB-INF/views/tables/cssBase.jsp"/>
    <link rel="stylesheet" href="${path}/vendors/imgUP/css/IMGUP.css">
    <link rel="stylesheet" href="${path}/build/css/basics.css">
    <style>
        html {
            overflow: initial;
        }

        .supplier-table .msg-box {
            display: none;
        }

        .datatable_my_wrapper {
            height: 395px;
        }

        #supplierSelectTable {
            margin: 0 !important;
        }
    </style>

</head>
<body style="background: #fff;">
<form action="" id="productForm">
    <div class="col-md-12 col-sm-12 col-xs-12 col-lg-12 new-product">
        <div class="x_panel">
            <div class="x_title clearfix">
                <h2> 新增产品
                </h2>
            </div>
            <div class="x_content x_search_l">
                <div class="" role="tabpanel" data-example-id="togglable-tabs">
                    <ul id="myTab" class="nav nav-tabs bar_tabs" role="tablist">
                        <li role="presentation" class="active"><a href="#tab_content1" id="home-tab"
                                                                  role="tab" data-toggle="tab"
                                                                  aria-expanded="true">基本属性</a>
                        </li>
                        <li role="presentation" class=""><a href="#tab_content2" role="tab"
                                                            id="profile-tab" data-toggle="tab"
                                                            aria-expanded="false">特殊属性</a>
                        </li>
                        <li role="presentation" class=""><a href="#tab_content3" role="tab"
                                                            id="profile-tab2" data-toggle="tab"
                                                            aria-expanded="false">产品属性</a>
                        </li>
                    </ul>


                    <div id="myTabContent" class="tab-content clearfix" style="margin-right: 60px">
                        <div role="tabpanel" class="tab-pane fade active in" id="tab_content1"
                             aria-labelledby="home-tab">

                            <div class="wx-mb-30 wx-pr-55  col-lg-6 col-md-6 col-sm-6 wx-mt-40"><span>一级分类 *</span>
                                <input readonly="readonly" name="supperCategoryName" maxlength="15"
                                       data-rule='一级分类: required;length(~15);'
                                       class="wx-w-250 wx-radius"
                                       type="text"/>
                                <input name="supperCategoryId" maxlength="15" data-rule='一级分类: required;length(~15);'
                                       class="wx-w-250 "
                                       type="hidden"/>
                                <span onclick="openCategoryLv1(categoryLv2Table)"
                                      class="fa fa-search form-control-feedback wx-fa-search wx-icon-font-span"></span>
                            </div>
                            <div class="wx-mb-30 wx-pr-55  col-lg-6 col-md-6 col-sm-6 wx-mt-40"><span>二级分类 *</span>
                                <input readonly="readonly" name="categoryName" maxlength="15"
                                       data-rule='二级分类: required;length(~15);'
                                       class="wx-w-250 wx-radius"
                                       type="text"/>
                                <input name="product.categoryId" maxlength="15" data-rule='一级分类: required;length(~15);'
                                       class="wx-w-250 "
                                       type="hidden"/>
                                <span onclick="openCategoryLv2()"
                                      class="fa fa-search form-control-feedback wx-fa-search wx-icon-font-span"></span>
                            </div>
                            <div class="wx-mb-30 wx-pr-55  col-lg-6 col-md-6 col-sm-6 "><span>产品名称 *</span>
                                <input name="product.productName" maxlength="15" data-rule='产品名称: required;length(~15);'
                                       class="wx-w-250 "
                                       type="text"/>
                            </div>
                            <div class="wx-mb-30 wx-pr-55  col-lg-6 col-md-6 col-sm-6 "><span>产品型号 *</span>
                                <input name="product.productModel" maxlength="15"
                                       data-rule='产品型号: required;length(~15);'
                                       class="wx-w-250 "
                                       type="text"/>
                            </div>
                            <div class="wx-mb-30 wx-pr-55  col-lg-6 col-md-6 col-sm-6 "><span>品牌 *</span>
                                <input name="product.brand" maxlength="15" data-rule='品牌: required;length(~15);'
                                       class="wx-w-250 "
                                       type="text"/>
                            </div>
                            <div class="wx-mb-30 wx-pr-55  col-lg-6 col-md-6 col-sm-6 "><span>规格/型号 *</span>
                                <input name="product.productStandard" maxlength="15" data-rule='required;length(~15);'
                                       class="wx-w-250 "
                                       type="text"/>
                            </div>
                            <div class="wx-mb-30 wx-pr-55  col-lg-6 col-md-6 col-sm-6 "><span>产品单位 *</span>
                                <select data-rule="产品单位:requried;" class="wx-w-250" name="product.unit">
                                    <option value="台">台</option>
                                    <option value="个">个</option>
                                    <option value="件">件</option>
                                </select>
                            </div>
                            <div class="wx-mb-30 wx-pr-55  col-lg-6 col-md-6 col-sm-6 "><span>产品类型 *</span>
                                <select class="wx-w-250" name="product.productType">
                                    <option value="BEFORE_SALE">售前</option>
                                    <option value="AFTER_SALE">售后</option>
                                </select>
                            </div>
                            <div class="wx-mb-30 wx-pr-55  col-lg-6 col-md-6 col-sm-6 "><span>是否可展示 *</span>
                                <select class="wx-w-250" name="product.exhibitionStatus">
                                    <option value="0">是</option>
                                    <option value="1">否</option>
                                </select>
                            </div>
                            <div class="wx-mb-30 wx-pr-55  col-lg-6 col-md-6 col-sm-6 "><span>是否可销售 *</span>
                                <select class="wx-w-250" name="product.saleStatus">
                                    <option value="0">是</option>
                                    <option value="1">否</option>
                                </select>
                            </div>
                            <div class="wx-mb-30 wx-pr-55  col-lg-6 col-md-6 col-sm-6 "><span>是否可采购 *</span>
                                <select class="wx-w-250" name="product.purchaseStatus">
                                    <option value="0">是</option>
                                    <option value="1">否</option>
                                </select>
                            </div>


                            <div id="after-server" class="col-lg-7 col-md-7 col-sm-7 textarea_div text-left wx-mb-30"
                                 wx-pr-55
                                 style="padding-left: 90px">
                                <span>售后服务 *</span><textarea data-rule="售后服务:required;" maxlength="200"
                                                             name="product.afterSaleService"></textarea>
                            </div>
                            <div class="col-lg-5 col-md-5 col-sm-5"></div>
                            <div class="col-lg-7 col-md-7 col-sm-7 textarea_div text-left wx-mb-30" wx-pr-55
                                 style="padding-left: 90px">
                                <span>产品图片</span>
                                <div class="pc-pop-img-update_div">
                                    <div id="div_imglook">
                                        <div style="clear: both;"></div>
                                    </div>
                                    <a href="##" class="pc-pop-img-update_img" id="div_imgfile"></a>
                                </div>
                            </div>
                            <div class="col-lg-5 col-md-5 col-sm-5"></div>
                            <div class="col-lg-7 col-md-7 col-sm-7 textarea_div text-left wx-mb-30" wx-pr-55
                                 style="margin-bottom: 64px;padding-left: 90px;">
                                <span>产品描述</span><textarea name="product.productDescribe" maxlength="200"></textarea>
                            </div>
                            <%--<a href="##" class="pc-pop-bottom-btn pc-pop-bottom-btn1 wx-mt-40">保存至草稿</a>--%>
                            <button type="submit" class="pc-pop-bottom-btn pc-pop-bottom-btn2 wx-mt-40"
                                    id="btn_ImgUpStart">提交
                            </button>


                        </div>
                        <div role="tabpanel" class="tab-pane fade" id="tab_content2"
                             aria-labelledby="profile-tab" style="margin-top: 30px">
                            <div id="sale-area" class="property-title-div">
                                <div class="property-title-divs" style="margin-bottom: 4px">
                                    可销售区域 *
                                    <div class="area-select-div">
                                        <select class=" wx-w-250" name="area" id="area-select">
                                            <option value="2">全部区域</option>
                                            <option value="1">部分区域</option>
                                        </select>
                                    </div>
                                </div>

                                <div class="all-area-div">
                                    <div class="all-area-div-left" id="all-area">
                                        <ul id="city_company" class="all-check-ul">
                                        </ul>
                                    </div>
                                    <div id="child_company" class="all-area-div-right">

                                    </div>
                                </div>


                                <div class=" property-title-divs" style="margin-top: 20px;margin-bottom: 20px">
                                    产品定价策略 *
                                    <div class="area-select-div">
                                        <select class="wx-w-250" name="priceStrategy.strategyType" lay-verify="required"
                                                lay-filter="">
                                            <option value="ADD_SACLE">加成比例计算</option>
                                            <option value="ADD_PRICE">加价销售</option>
                                            <option value="LAST_PRICE">定价销售</option>
                                        </select>


                                    </div>
                                </div>
                                <div hidden id="lastPrice" style="width: 100%;height: 62px;">
                                    <div class="wx-mb-30 wx-pr-55  col-lg-6 col-md-6 col-sm-6 "
                                         style="width: 425px">
                                        产品定价*<input maxlength="12" data-rule="产品定价:required;产品定价:numberDP;产品定价:DP;"
                                                    disabled="disabled"
                                                    type="text"
                                                    class="wx-w-250"
                                                    name="priceStrategy.lastPrice"/>
                                    </div>
                                </div>
                                <div hidden id="addPrice" style="width: 100%;height: 62px;">
                                    <div class="wx-mb-30 wx-pr-55  col-lg-6 col-md-6 col-sm-6 "
                                         style="width: 425px">
                                        产品加价 *<input disabled="disabled" type="text" class="wx-w-250" maxlength="12"
                                                     data-rule="产品加价:required;产品加价:numberDP;产品加价:DP;"
                                                     name="priceStrategy.addPrice"/>
                                    </div>
                                </div>

                                <div class="supplier-div clearfix">
                                    <span>供应商 *</span>
                                    <div class="supplier-divs text-left" style="width: 855px;">
                                        <table class="supplier-table" cellpadding="0" cellspacing="0"
                                               style="border-collapse:collapse" border="0">
                                            <thead>
                                            <tr>
                                                <th>默认供应商</th>
                                                <th>供应商</th>
                                                <th>采购价格单价(元)</th>
                                                <th colspan="2" class="supplier-table-td-4">保质期<span
                                                        onclick="openSupplierSelect()"
                                                        class="table-seek-icon glyphicon glyphicon-search opo-seek-icon"></span>
                                                </th>
                                            </tr>
                                            </thead>
                                            <tbody id="pt_supplier">

                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                            <div class="x_submit col-lg-12 col-md-12 col-sm-12"
                                 style="position: relative;top: 65px;">
                                <%--<button type="" class="pc-pop-bottom-btn wx-mt-40 pc-pop-bottom-btn1 wx-mt-40">保存至草稿--%>
                                </button>
                                <button type="submit"
                                        class="pc-pop-bottom-btn wx-mt-40 pc-pop-bottom-btn2 wx-mt-40">
                                    提交
                                </button>
                            </div>
                        </div>
                        <div role="tabpanel" class="tab-pane fade" id="tab_content3"
                             aria-labelledby="profile-tab">
                            <div class="" style="position: relative">
                                <div class="wx-mb-30 wx-pr-55 col-lg-6 col-md-6 col-sm-6"
                                     style="padding-right: 85px;left: -20px;">
                                    <span>产品模版</span>
                                    <input maxlength="15" class="wx-w-250 wx-radius" name="templetName"
                                           readonly="readonly"
                                           class="wx-radius"
                                           type="text"
                                           value=""/>
                                    <input maxlength="15" name="product.templetId" value="" hidden="hidden">
                                    <span style="margin-right: 85px;top: inherit;" onclick="openPtTempletSearch()"
                                          class=" catSearch fa fa-search form-control-feedback wx-fa-search wx-icon-font-span"></span>
                                </div>
                                <div class="item3-form-content item3-form-content-input">
                                    <table class="item3-table" cellpadding="0" cellspacing="0"
                                           style="border-collapse:collapse;text-align: left"
                                           border="0">
                                        <thead>
                                        <tr>
                                            <th class="item3-table-th1">一级属性</th>
                                            <th class="item3-table-th2">二级属性</th>
                                            <th class="item3-table-th3">参数</th>
                                        </tr>
                                        </thead>
                                        <tbody id="templetAttrTbody">
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <%--<a href="##" class="pc-pop-bottom-btn pc-pop-bottom-btn1"--%>
                            <%--style="position: relative;top: 100px;left: -113px;">保存至草稿</a>--%>
                            <button type="submit" class="wx-mb-40 pc-pop-bottom-btn pc-pop-bottom-btn2"
                                    style="position: relative;top: 100px;">提交
                            </button>
                        </div>

                    </div>

                </div>

            </div>
        </div>
    </div>
</form>

<jsp:include page="/WEB-INF/views/tables/ptCategoryLv1Table.jsp"/>
<jsp:include page="/WEB-INF/views/tables/ptCategoryLv2Table.jsp"/>
<jsp:include page="/WEB-INF/views/tables/ptTempletTable.jsp"/>
<jsp:include page="/WEB-INF/views/tables/supplierSelectTable.jsp"/>

</body>
<script src="${path}/js/jquery-1.7.2.min.js"></script>
<script src="${path}/vendors/imgUP/js/IMGUP.js"></script>
<script src="${path}/build/js/WS-main.js"></script>
<jsp:include page="/WEB-INF/views/tables/jsBase.jsp"/>
<script src="${path}/build/js/product.js"></script>

<script>
    var categoryLv1Table;
    var categoryLv2Table;
    var ptTempletSearchTable;
    var supplierSelectTable;
    $(function () {
        categoryLv1Table = getCategoryLv1Table();
        categoryLv2Table = getCategoryLv2Table();
        ptTempletSearchTable = getPtTempletSearchTable();
        supplierSelectTable = getSupplierSelectTable();
        setSelected($('#ptCategoryLv1SearchTable tbody'), categoryLv1Table);
        setSelected($('#ptCategoryLv2SearchTable tbody'), categoryLv2Table);
        setSelected($('#ptTempletSearchTable tbody'), ptTempletSearchTable);
        setCategoryLv1Value(categoryLv2Table);
        setCategoryLv2Value();
        setTemplet();
        setPriceStrategy();
        getAllSites();
    })
    $(function () {
        $('#productForm').validator({
            invalidClass: "has-error",// 无效class
            msgClass: "n-right myClass wx-red",
            rules: {
                Percentage: [/^(([1-9]\d{0,2})|(0))(\.\d{1,2})?$/, "不能超过1000"],
                numberDP: [/^\d+(\.\d+)?$/, "必须为数字"],
                DP: [/^\d+(\.\d{1,2})?$/, "小数点不能超过两位"],
            },
        });
        $('#productForm').on('valid.form', function (e) {
            createProductInfo();
        });
    })

</script>
</html>