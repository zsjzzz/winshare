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
	<title>销售项目成员分工表新建</title>
	<jsp:include page="/WEB-INF/views/tables/cssBase.jsp"/>
	<style>
		#createTeamForm .msg-box{
			display: none;
		}
	</style>
</head>
<!-- 表单 -->
<div class="row table_content product_1 project-team-newp new-window" id="createTeam">
	<div class="col-md-12 col-sm-12 col-xs-12">
		<div class="x_panel">
			<div class="x_title">
				<h2>新建项目组</h2>
				<div class="clearfix"></div>
			</div>
			<div class="x_search clearfix">
				<div class="x_search_l">
					<form id="createTeamForm" action="#">
						<div class="title-warp clearfix">
							<div class="wx-mb-30 wx-mt-40 wx-pr-55 col-lg-6 col-md-6 col-sm-6">
								<span>销售项目组编号 *</span>
								<input maxlength="15" data-rule="销售项目组编号: required;Nchinese;notRepeat;" type="text" name="projectTeamNo"/>
							</div>
							<div class="wx-mb-30 wx-mt-40 wx-pr-55 col-lg-6 col-md-6 col-sm-6">
								<span>项目名称 *</span> 
								<input maxlength="15" data-rule="项目名称: required;" type="text" name="projectName" />
							</div>
							<div class="wx-mb-30 wx-pr-55 col-lg-6 col-md-6 col-sm-6 ">
								<span>市公司 *</span> 
								<input data-rule="市公司: required;" class="wx-radius" type="text" readonly="readonly" name="cityOfficeName" />
								<span onclick="openSiteLv1Table()" class="fa fa-search form-control-feedback wx-fa-search wx-icon-font-span"></span>
							</div>
							<div class="wx-mb-30 wx-pr-55 col-lg-6 col-md-6 col-sm-6">
								<span>分公司 *</span> 
								<input data-rule="分公司: required;" class="wx-radius" type="text" readonly="readonly" name="branchOfficeName" />
								<input type="hidden" name="siteNo">
								<span onclick="openSiteLv2Table()" class="fa fa-search form-control-feedback wx-fa-search wx-icon-font-span"></span>
							</div>
							<div class="wx-mb-30 wx-pr-55 col-lg-6 col-md-6 col-sm-6">
								<span>成立时间 *</span> 
								<input data-rule="成立时间: required;" class="wx_daterange_3 wx-radius" type="text" name="createDate" />
								<span class="fa fa-calendar form-control-feedback right wx-fa-search wx-fa-time" aria-hidden="true"></span>
							</div>
							<div class="wx-mb-30 wx-pr-55 col-lg-6 col-md-6 col-sm-6" style="height: 31px;">
							</div>
						</div>
						<!-- 增加成员信息 -->
						<div class="text-left wx-mb-10 wx-plr-55 wx-mt-20 col-lg-6 col-md-6 col-sm-6"
							style="height :30px">
							<a class="x_search_but wx-bg-blue" style="width: 120px;" onclick="addMemberInfo()" href="javascript:;">增加成员信息</a>
						</div>

						<div class="wx-plr-55 col-lg-12 col-md-12 col-sm-12">
							<table id="addTable" class="table table-striped table-bordered tables">
								<thead>
								<tr>
									<th>姓名</th>
									<th>组内职务</th>
									<th>所在机构</th>
									<th>组内负责工作</th>
									<th>操作</th>
								</tr>
								</thead>
								<tbody></tbody>
							</table>
						</div>
						<div class="x_submit">
							<div class="wx-mb-30 wx-pr-55 wx-mt-40 col-lg-12 col-md-12 col-sm-12">                            
								<button class="x_search_but wx-bg-blue">提交</button>
							</div>

						</div>
					</form>

				</div>

			</div>
		</div>
	</div>
</div>
<jsp:include page="/WEB-INF/views/tables/jsBase.jsp"/>
<jsp:include page="/WEB-INF/views/tables/siteLv1Table.jsp"/>
<jsp:include page="/WEB-INF/views/tables/siteLv2Table.jsp"/>
<jsp:include page="/WEB-INF/views/tables/siteTable.jsp"/>
<script>
	var siteLv1Table;
    var siteLv2Table;
    /* var siteSearchTable; */
	$(function() {
		getDateTable3();
		//组织机构
		/* siteSearchTable = searchSiteTeam();
        setSelected($('#siteSearchTable tbody'), siteSearchTable); */
		//市公司
		setSiteLv1();
        siteLv1Table = getSiteLv1SearchTable();
        setSelected($('#siteLv1SearchTable tbody'), siteLv1Table);
        //分公司
        setSiteLv2();
        siteLv2Table = getSiteLv2SearchTable()
        setSelected($('#siteLv2SearchTable tbody'), siteLv2Table);
        //设值
        setSiteCreateLv1();
        setSiteCreateLv2();
        setMemSite();
	})
			
	// 本窗口大小为1300
	$('#createTeamForm').validator({
		invalidClass:'has-error',
		msgClass:'n-right myClass wx-red',
		rules: {
            notRepeat: function (element) {
            	if (checkProjectTeam(element.value) === false) {
                	return '项目组已存在';
                } else {
                    return true;
               	}
            }
        }
	})
	
	$('#createTeamForm').on('valid.form',function(){
        createProjectTeam();
	})
</script>
</body>

</html>

