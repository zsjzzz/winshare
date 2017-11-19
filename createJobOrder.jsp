<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<c:set var="path" value="${pageContext.request.contextPath}"/>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>新建派工单</title>
    <jsp:include page="/WEB-INF/views/tables/cssBase.jsp"/>
    <style>
        .wx-seek-input-div {
            overflow: auto;
        }

    </style>
</head>
<!-- 表单 -->
<div class="row table_content product_1 new-window" id="project">
    <div class="col-md-12 col-sm-12 col-xs-12">
        <div class="x_panel">
            <div class="x_title">
                <h2>新建派工单</h2>
                <div class="clearfix"></div>
            </div>
            <div class="x_search clearfix">
                <div class="x_search_l">
                    <form id="projectFrom" action="#">


                        <div style="padding-left: 145px"
                             class="wx-lh-30 wx-mb-30 wx-mt-40  wx-pr-55 col-lg-6 col-md-6 col-sm-6 text-left">
                            <span>销售订单编号：</span><span>PZYJY*2016</span>

                        </div>
                        <div style="height: 30px;" class="wx-mb-30 wx-mt-40  wx-pr-55 col-lg-6 col-md-6 col-sm-6">

                        </div>
                        <div class="wx-mb-30 wx-pr-55 col-lg-6 col-md-6 col-sm-6">
                            <span>外包商</span>
                            <input class="wx-radius wx-w-250" type="text" readonly="readonly"
                                   data-rule="所属市公司: required;"/>
                            <span onclick=""
                                  class="fa fa-search form-control-feedback wx-fa-search wx-icon-font-span"></span>
                        </div>


                        <div class="wx-mb-30 wx-pr-55 col-lg-6 col-md-6 col-sm-6">
                            <span>预计开始时间</span>
                            <input class="wx_daterange wx-radius wx-w-250" type="text" name="projectTime"/>
                            <span class="fa fa-calendar form-control-feedback right wx-fa-search wx-fa-time"
                                  aria-hidden="true"></span>
                        </div>

                        <div class="wx-mb-30 wx-pr-55 col-lg-6 col-md-6 col-sm-6">
                            <span>预计完成时间</span>
                            <input class="wx-radius wx_daterange wx-w-250" type="text" name="bidOpenTime"/>
                            <span class="fa fa-calendar form-control-feedback right wx-fa-search wx-fa-time"
                                  aria-hidden="true"></span>
                        </div>

                        <div class="wx-mb-30 wx-pr-55 col-lg-6 col-md-6 col-sm-6">
                            <span>项目负责人</span>
                            <input class=" wx-w-250" type="text" maxlength="15"/>
                        </div>
                        <div class="wx-mb-40 wx-pr-55 col-lg-6 col-md-6 col-sm-6">
                            <span>项目负责人电话</span>
                            <input class=" wx-w-250" type="text" maxlength="15"/>
                        </div>

                        <div style="padding-left: 145px"
                             class="wx-lh-30 text-left wx-mb-30 wx-pr-55 col-lg-12 col-md-12 col-sm-12">
                            <span>派工单列表</span>
                        </div>
                        <div style="padding-left: 145px"
                             class="wx-lh-30 text-left wx-mb-30 wx-pr-55 col-lg-12 col-md-12 col-sm-12">
                            <table id="exp" class="table table-striped table-bordered tables">
                                <thead>
                                <tr>
                                    <th><span class="basics-my_checkbox all_checkbox"></span></th>
                                    <th>客户名称</th>
                                    <th>客户编号</th>
                                    <th>所属分公司</th>
                                    <th>安装分配套数</th>
                                    <th>安装总价(元)</th>
                                    <th>操作</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td><span onclick="checkNormalSpan(this)" class="basics-my_checkbox"></span></td>
                                    <td>千佛小学</td>
                                    <td>DIS-0015</td>
                                    <td>简阳分公司</td>
                                    <td><input type="text"></td>
                                    <td><input onblur="setTotalCost()" class="install_cost" type="text"></td>
                                    <td><span onclick="checkList(this)"
                                              class="x_search_but wx-bg-green choice_list">选择清单</span>
                                        <div class="wx-section-pop new-window" style="width: 800px">
                                            <div class="wx-seek-input-div">

                                                <table id="" style="width: 100%"
                                                       class="table table-striped table-bordered tables">
                                                    <thead>
                                                    <tr>
                                                        <th><span class="basics-my_checkbox all_checkbox"></span></th>
                                                        <th>产品名称</th>
                                                        <th>销售订单编号</th>
                                                        <th>产品编号</th>
                                                        <th>规格型号</th>
                                                        <th>品牌</th>
                                                        <th>单位</th>
                                                        <th>单价(元)</th>
                                                        <th>产品数量</th>
                                                        <th>安装套数</th>
                                                    </tr>
                                                    </thead>
                                                    <tbody>
                                                    <tr>
                                                        <td><span onclick="checkNormalSpan(this)"
                                                                  class="basics-my_checkbox"></span></td>
                                                        <td>书桌</td>
                                                        <td>PL-20141112</td>
                                                        <td>CP20151122</td>
                                                        <td>DAKS</td>
                                                        <td>联想</td>
                                                        <td>台</td>
                                                        <td>100</td>
                                                        <td>5</td>
                                                        <td><input type="text"></td>
                                                    </tr>
                                                    <tr>
                                                        <td><span onclick="checkNormalSpan(this)"
                                                                  class="basics-my_checkbox"></span></td>
                                                        <td>书桌</td>
                                                        <td>PL-20141112</td>
                                                        <td>CP20151122</td>
                                                        <td>DAKS</td>
                                                        <td>联想</td>
                                                        <td>台</td>
                                                        <td>100</td>
                                                        <td>5</td>
                                                        <td><input type="text"></td>
                                                    </tr>
                                                    </tbody>
                                                </table>

                                            </div>
                                            <div class="x_submit clearfix">
                                                <div class="wx-mb-60 wx-pr-55 wx-mt-40 col-lg-12 col-md-12 col-sm-12">
                                                    <button class="x_search_but wx-bg-blue list_btn">提交</button>
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td><span onclick="checkNormalSpan(this)" class="basics-my_checkbox"></span></td>
                                    <td>千佛小学</td>
                                    <td>DIS-0015</td>
                                    <td>简阳分公司</td>
                                    <td><input type="text"></td>
                                    <td><input onblur="setTotalCost()" class="install_cost" type="text"></td>
                                    <td><span onclick="checkList(this)" class="x_search_but wx-bg-green choice_list">选择清单</span>
                                        <div id="commodity_list" class="wx-section-pop new-window" style="width: 800px">
                                            <div class="wx-seek-input-div">

                                                <table id="teamTable" style="width: 100%"
                                                       class="table table-striped table-bordered tables">
                                                    <thead>
                                                    <tr>
                                                        <th><span class="basics-my_checkbox all_checkbox"></span></th>
                                                        <th>产品名称</th>
                                                        <th>销售订单编号</th>
                                                        <th>产品编号</th>
                                                        <th>规格型号</th>
                                                        <th>品牌</th>
                                                        <th>单位</th>
                                                        <th>单价(元)</th>
                                                        <th>产品数量</th>
                                                        <th>安装套数</th>
                                                    </tr>
                                                    </thead>
                                                    <tbody>
                                                    <tr>
                                                        <td><span onclick="checkNormalSpan(this)"
                                                                  class="basics-my_checkbox"></span></td>
                                                        <td>书桌</td>
                                                        <td>PL-20141112</td>
                                                        <td>CP20151122</td>
                                                        <td>DAKS</td>
                                                        <td>联想</td>
                                                        <td>台</td>
                                                        <td>100</td>
                                                        <td>5</td>
                                                        <td><input type="text"></td>
                                                    </tr>
                                                    </tbody>
                                                </table>

                                            </div>
                                            <div class="x_submit clearfix">
                                                <div class="wx-mb-60 wx-pr-55 wx-mt-40 col-lg-12 col-md-12 col-sm-12">
                                                    <button class="x_search_but wx-bg-blue list_btn">提交</button>
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                <tr class="text-right">
                                    <td colspan="7">总价(元)：<span class="total_install_cost">xxxx</span></td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                        <div class="x_submit clearfix">
                            <div class="wx-mb-60 wx-pr-55 wx-mt-40 col-lg-12 col-md-12 col-sm-12">
                                <button class="x_search_but wx-bg-blue">提交
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>

        </div>
    </div>
</div>





<jsp:include page="/WEB-INF/views/tables/jsBase.jsp"/>
<script>
    $('#projectFrom').validator({
        invalidClass: "has-error",// 无效class
        msgClass: "n-right myClass wx-red",
        rules: {
            notRepeat: function (element) {
                if (checkProject(element.value) === false) {
                    return '招标项目已存在';
                } else {
                    return true;
                }
            }
        }
    });
    // 总价
    function setTotalCost() {
        var install_cost = $('.install_cost');
        var total_install_cost = $('.total_install_cost');
        var totalcost = 0;
        install_cost.each(function () {
            var now = $(this).val();
            totalcost += Number(now);
        });
        total_install_cost.html(totalcost);
    }

    checkAllCheckbox('#exp');
    checkAllCheckbox('#teamTable');

    // 选择清单弹窗,设置安装分配套数
    function checkList(element) {
        $('.choice_list').attr('id',' ');
        $(element).attr('id', 'thisId');
        popId = layer.open({
            title: "派工商品清单",
            area: ['auto', '600px'],
            type: 1,
            content: $(element).next(), //这里content是一个普通的String
            cancel: function () {
                $(element).next().css({
                    "display": "none"
                })
            },
            end: function () {
                $(element).next().css({
                    "display": "none"
                });
            }
        });
        // 每个清单的提交按钮
        var list_btn = $('.list_btn');
        list_btn.on('click',function(){
            var number = 0;
           var some =  $(this).parents('.layui-layer').find('.basics-my_checkbox.basics-Checked').parents('.wx-seek-input-div').find('input');
           some.each(function(){
               number += Number($(this).val());
           });
            var s = $('#thisId').parents('tr');
            s.find('td').eq(4).find('input').val(number);
           closePop();
        })
    }
    function closePop() {
        layer.close(popId);
    }
</script>
</body>

</html>

