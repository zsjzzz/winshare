/**
 * Created by liaoh on 2017/7/9.
 */
function getProductTable() {
    var table = $("#dataTable").DataTable({
            "ajax": {
                "url": path + "/baseMan/product/product/searchProduct",
                "type": "post",
                "data": function () {
                    return $('#productSearch').serialize();
                }
            },
            "columns": [
                {
                    data: {},
                    render: function (data) {
                        var html = data.productName;
                        html += "<input name='id' type='hidden' value='" + data.productNo + "' / > ";
                        html += "<input name='name' type='hidden' value='" + data.productName + "' / > ";
                        return html;
                    }
                },
                {data: "categoryName"},
                {data: "supperCategoryName"},
                {data: "productNo"},
                {data: "brand"},
                {data: "productModel"},
                {data: "unit"},
                {data: "defSupplier"},

            ],
            language: tableLanguage,
            "dom": 'lrtip',
            "dom": 'r<"datatable_my_wrapper"t>lip',
            "ordering": false,

        })
    ;

    return table;
}


function openCategoryLv1() {
    popId = layer.open({
        title: "一级分类",
        area: ['auto', '600px'],
        resize: false,
        type: 1,
        content: $("#ptCategoryLv1Div"), //这里content是一个普通的String
        cancel: function () {
            $("#ptCategoryLv1Div").css({
                "display": "none"
            });
        },
        end: function () {
            $("#ptCategoryLv1Div").css({
                "display": "none"
            });
        }
    });
}

function getCategoryLv1Table() {
    var table = $("#ptCategoryLv1SearchTable").DataTable({
        "ajax": {
            "url": path + "/baseMan/product/ptCategory/searchPtCategories",
            "type": "post",
            "data": function () {
                return $('#ptCategoryLv1Search').serialize();
            }
        },
        "columns": [
            {
                data: {},
                render: function (data) {
                    var html = data.categoryName
                    html += "<input name='id' type='hidden' value='" + data.categoryId + "' / > ";
                    html += "<input name='name' type='hidden' value='" + data.categoryName + "' / > ";
                    return html;
                }
            },
            {
                "data": "categoryLevel",
                render: function (data, type, row) {
                    if (data === 1) {
                        return "一级分类";
                    } else if (data === 2) {
                        return "二级分类";
                    } else if (data === 3) {
                        return "三级分类";
                    } else {
                        return data;
                    }
                }
            }
            ,
            {
                "data": "supperName"
            }
        ],
        language: tableLanguage,
        "dom": 'r<"datatable_my_wrapper"t>lip',
        "ordering": false,
        "searching": false,
        bLengthChange: false,
    });
    return table;
}

function searchPtCategoryLv1(table) {
    table.ajax.reload();
}

function setCategoryLv1Value(table) {
    $('#ptCategoryLv1SearchTable tbody').on('click', 'tr', function () {
        var name = $('#ptCategoryLv1SearchTable .selected').find("input[name = 'name']").val();
        var id = $('#ptCategoryLv1SearchTable .selected').find("input[name = 'id']").val();
        if (name !== undefined && id !== undefined) {
            $('#productForm').find("input[name='supperCategoryName']").val(name);
            $('#productForm').find("input[name='supperCategoryId']").val(id);

        } else {
            $('#productForm').find("input[name='supperCategoryName']").val(null);
            $('#productForm').find("input[name='supperCategoryId']").val(null);
        }
        $('#ptCategoryLv2Search').find("input[name='supperId']").val(id);
        $('#productForm').find("input[name='categoryName']").val(null);
        $('#productForm').find("input[name='categoryId']").val(null);
        table.ajax.reload();
        // $('#categoryLevel').focus().blur();
        layer.close(popId);
    });
}

function openCategoryLv2() {
    popId = layer.open({
        title: "一级分类",
        area: ['auto', '600px'],
        resize: false,
        type: 1,
        content: $("#ptCategoryLv2Div"), //这里content是一个普通的String
        cancel: function () {
            $("#ptCategoryLv2Div").css({
                "display": "none"
            });
        },
        end: function () {
            $("#ptCategoryLv2Div").css({
                "display": "none"
            });
        }
    });
}

function getCategoryLv2Table() {
    var table = $("#ptCategoryLv2SearchTable").DataTable({
        "ajax": {
            "url": path + "/baseMan/product/ptCategory/searchPtCategories",
            "type": "post",
            "data": function () {
                return $('#ptCategoryLv2Search').serialize();
            }
        },
        "columns": [
            {
                data: {},
                render: function (data) {
                    var html = data.categoryName
                    html += "<input name='id' type='hidden' value='" + data.categoryId + "' / > ";
                    html += "<input name='name' type='hidden' value='" + data.categoryName + "' / > ";
                    html += "<input name='supperId' type='hidden' value='" + data.supperId + "' / > ";
                    html += "<input name='supperName' type='hidden' value='" + data.supperName + "' / > ";
                    return html;
                }
            },
            {
                "data": "categoryLevel",
                render: function (data, type, row) {
                    if (data === 1) {
                        return "一级分类";
                    } else if (data === 2) {
                        return "二级分类";
                    } else if (data === 3) {
                        return "三级分类";
                    } else {
                        return data;
                    }
                }
            }
            ,
            {
                "data": "supperName"
            }
        ],
        language: tableLanguage,
        "dom": 'r<"datatable_my_wrapper"t>lip',
        "ordering": false,
        "searching": false,
        bLengthChange: false,
    });
    return table;
}

function searchPtCategoryLv2(table) {
    table.ajax.reload();
}

function setCategoryLv2Value() {
    $('#ptCategoryLv2SearchTable tbody').on('click', 'tr', function () {
        var name = $('#ptCategoryLv2SearchTable .selected').find("input[name = 'name']").val();
        var id = $('#ptCategoryLv2SearchTable .selected').find("input[name = 'id']").val();
        var supperName = $('#ptCategoryLv2SearchTable .selected').find("input[name = 'supperName']").val();
        var supperId = $('#ptCategoryLv2SearchTable .selected').find("input[name = 'supperId']").val();
        if (name !== undefined && id !== undefined) {
            $('#productForm').find("input[name='categoryName']").val(name);
            $('#productForm').find("input[name='product.categoryId']").val(id);
            $('#productForm').find("input[name='supperCategoryName']").val(supperName);
            $('#productForm').find("input[name='supperCategoryId']").val(supperId);
        } else {
            $('#productForm').find("input[name='categoryName']").val(null);
            $('#productForm').find("input[name='product.categoryId']").val(null);
        }
        // $('#categoryLevel').focus().blur();
        layer.close(popId);
    });
}

function createProduct() {
    $.ajax(
        {
            url: path + "/baseMan/product/product/createProduct",
            data: $("#productForm").serialize(),
            type: "post",
            success: function (data) {
                setMsg(data);
            }
        }
    )
}

function setProductAttr(id) {
    if (id !== "") {
        $('#templetAttrTbody').children().remove();
        $.ajax({
            url: path + "/baseMan/product/ptTemplet/searchPtTempletAttrs",
            type: "post",
            cache: false,
            async: false,
            data: {templetId: id},
            success: function (data) {
                console.log(data);
                var arr = data.data;
                var attrNum = 0;
                for (var i = 0; i < arr.length; i++) {
                    var level = arr[i].attrLevel;
                    var attrId = arr[i].templetAttrId;
                    var sonNum = 0;
                    var rowId = "";
                    if (level === 1) {
                        var rowNum = 0;
                        for (var j = 0; j < arr.length; j++) {
                            var supperId = arr[j].supperId;
                            if (supperId === attrId) {
                                rowNum++;
                                sonNum++;
                                var entryMode = arr[j].entryMode;
                                $('#templetAttrTbody').append(
                                    "<tr id='attr" + attrNum + "'>" +
                                    "<td>" + arr[j].attrName + "</td>" +
                                    "</tr>"
                                );
                                var html = "";
                                if (entryMode === "TEXT") {
                                    html = "<input name='attributes[" + attrNum + "].attributeValue' type='text' />" +
                                        "<input name='attributes[" + attrNum + "].templetAttrId' type='hidden' value='" + arr[j].templetAttrId + "'/>";
                                    html = "<td>" + html + "</td>";
                                } else if (entryMode === "M_TEXT") {
                                    html = "<textarea name='attributes[" + attrNum + "].attributeValue' ></textarea>" +
                                        "<input name='attributes[" + attrNum + "].templetAttrId' type='hidden' value='" + arr[j].templetAttrId + "'/>";
                                    html = "<td>" + html + "</td>";
                                } else if (entryMode === "SELECT") {
                                    html = "<select name='attributes[" + attrNum + "].attributeValue'>";
                                    html += setAttrSelect(arr[j].value);
                                    html += "</select>" +
                                        "<input name='attributes[" + attrNum + "].templetAttrId' type='hidden' value='" + arr[j].templetAttrId + "'/>";
                                    html = "<td>" + html + "</td>";
                                }
                                $("#attr" + attrNum).append(html);
                                if (rowNum === 1) {
                                    rowId = "attr" + attrNum;
                                }
                                attrNum++;
                            }
                        }
                        if (sonNum === 0) {
                            var entryMode1 = arr[i].entryMode;
                            $('#templetAttrTbody').append(
                                "<tr id='attr" + attrNum + "'>" +
                                "<td>" + arr[i].attrName + "</td>" +
                                "</tr>"
                            );
                            var html = "";
                            if (entryMode1 === "TEXT") {
                                html = "<input name='attributes[" + attrNum + "].attributeValue' type='text' />" +
                                    "<input name='attributes[" + attrNum + "].templetAttrId' type='hidden' value='" + arr[i].templetAttrId + "'/>";
                                html = "<td colspan='2'>" + html + "</td>";
                            } else if (entryMode1 === "M_TEXT") {
                                html = "<textarea name='attributes[" + attrNum + "].attributeValue'></textarea>" +
                                    "<input name='attributes[" + attrNum + "].templetAttrId' type='hidden' value='" + arr[i].templetAttrId + "'/>";
                                html = "<td colspan='2' class='textarea'>" + html + "</td>";
                            } else if (entryMode1 === "SELECT") {
                                html = "<select name='attributes[" + attrNum + "].attributeValue'>";
                                html += setAttrSelect(arr[i].value);
                                html += "</select>" +
                                    "<input name='attributes[" + attrNum + "].templetAttrId' type='hidden' value='" + arr[i].templetAttrId + "'/>";
                                html = "<td colspan='2'>" + html + "</td>";
                            }

                            $("#attr" + attrNum).append(html);
                            attrNum++;
                        } else {
                            $("#" + rowId).children().first().before(
                                "<td rowspan='" + sonNum + "'>" + arr[i].attrName + "</td>"
                            );
                        }

                    }

                }
            }
        });
    }
}
function setAttrSelect(value) {
    var html = "";
    var column = "";
    if (value !== null) {
        for (var i = 0; i < value.length; i++) {
            var char = value.charAt(i);
            if (char === ",") {
                html += "<option value='" + column + "'>" + column + "</option>";
                column = "";
            } else if (i === value.length - 1) {
                column += char;
                html += "<option value='" + column + "'>" + column + "</option>";
            } else {
                column += char;
            }
        }
    }
    return html;
}
function setTemplet() {
    $('#ptTempletSearchTable tbody').on('click', 'tr', function () {
        var name = $('#ptTempletSearchTable .selected').find("input[name = 'name']").val();
        var id = $('#ptTempletSearchTable .selected').find("input[name = 'id']").val();
        if (name !== undefined && id !== undefined) {
            $('#productForm').find("input[name='templetName']").val(name);
            $('#productForm').find("input[name='product.templetId']").val(id);
            setProductAttr(id);
        } else {
            $('#productForm').find("input[name='templetName']").val(null);
            $('#productForm').find("input[name='product.templetId']").val(null);
        }

        // $('#categoryLevel').focus().blur();
        layer.close(popId);
    });
}

function setPriceStrategy() {
    $("select[name='priceStrategy.strategyType']").on('change', function () {
        var value = $("select[name='priceStrategy.strategyType']").val();
        if (value === "ADD_PRICE") {
            $("#addPrice").show();
            $("#lastPrice").hide();
            $('#addPrice').children().children().attr('disabled', false);
            $('#lastPrice').children().children().attr('disabled', true);
        } else if (value === "LAST_PRICE") {
            $("#addPrice").hide();
            $("#lastPrice").show();
            $('#addPrice').children().children().attr('disabled', true);
            $('#lastPrice').children().children().attr('disabled', false);
        } else {
            $("#addPrice").hide();
            $("#lastPrice").hide();
            $('#addPrice').children().children().attr('disabled', true);
            $('#lastPrice').children().children().attr('disabled', true);
        }
    })
}
// 添加供应商弹窗
function openSupplierSelect() {
    popId = layer.open({
        title: "供应商",
        area: ['auto', '600px'],
        resize: false,
        type: 1,
        content: $("#supplierSelectDiv"), //这里content是一个普通的String
        cancel: function () {
            $("#supplierSelectDiv").css({
                "display": "none"
            });
        },
        end: function () {
            $("#supplierSelectDiv").css({
                "display": "none"
            });
        }
    });
}
// 添加供应商
var alllength = 0;
var pt_supplier = 0;
var result = {};
var flag = true;
function setSelectedSupplier() {
    result = {};
    for (var key in result) {
        delete result[key];
    }
    pt_supplier = $('#pt_supplier tr td:first-child');
    var supplierNum = 0;
    var suppliers = $("#supplierSelectTable span.basics-Checked");
    if (pt_supplier.length != 0) {
        console.log('jin');
        suppliers.each(function (index) {
            var now = $(this).next().val();
            console.log(now);
            for (var i = 0; i < pt_supplier.length; i++) {
                var that = $(pt_supplier[i]).children('input').val();
                if (now == that) {
                    flag = false;
                    i = pt_supplier.length;
                } else {
                    result[now] = $(suppliers[index]);
                    flag = true;
                }
            }
            if (flag) {
                var id = $(this).next().val();
                var name = $(this).next().next().val();
                var html = "<tr>" +
                    "<td><span class='wx-radio'></span><input  type='hidden' name='' value='" + id + "'/></td>" +
                    "<td>" + name + "<input type='hidden' name='supplierNo' value='" + id + "'>" +
                    "<input readonly type='hidden' name='supplierName' value='" + name + "'/></td>" +
                    "<td><input  data-rule='采购单价:required;numberDP;DP;' maxlength='12' data-rule='NTextRequired;' name='price' type='text'></td>" +
                    "<td><input data-rule='质保期:required;' maxlength='10' data-rule='NTextRequired;' name='shelfLife' type='text'></td>" +
                    '<td><button onclick="del_now(this)" class="x_search_but wx-bg-red del_now">删除</button></td>' +
                    "</tr>"
                $('#pt_supplier').append(html);
                wxRadio($('#pt_supplier'));
                flag = false;
            }
        })
    } else {
        suppliers.each(suppliers_erg);
    }
    function suppliers_erg() {
        var id = $(this).next().val();
        var name = $(this).next().next().val();
        var html = "<tr>" +
            "<td><span class='wx-radio'></span><input  type='hidden' name='' value='" + id + "'/></td>" +
            "<td>" + name + "<input type='hidden' name='supplierNo' value='" + id + "'>" +
            "<input readonly type='hidden' name='supplierName' value='" + name + "'/></td>" +
            "<td><input  data-rule='采购单价:required;numberDP;DP;' maxlength='12' data-rule='NTextRequired;' name='price' type='text'></td>" +
            "<td><input data-rule='质保期:required;' maxlength='10' data-rule='NTextRequired;' name='shelfLife' type='text'></td>" +
            '<td><button onclick="del_now(this)" class="x_search_but wx-bg-red del_now">删除</button></td>' +
            "</tr>"
        $('#pt_supplier').append(html);
        wxRadio($('#pt_supplier'));
        supplierNum++;
    }

    $("input[name='product.defSupplier']").first().attr('checked', true);
    layer.close(popId);
}
// 删除当前属性
function del_now(that) {
    $(that).parents('tr').remove();
}

function getAllSites() {
    $.ajax(
        {
            url: path + "/system/info/site/getAllSites",
            type: "post",
            cache: false,
            async: false,
            success: function (data) {
                console.log(data);
                var arr = data.data;
                var siteNum = 0;
                for (var i = 0; i < arr.length; i++) {
                    var level = arr[i].siteLevel;
                    var name = arr[i].siteName;
                    var id = arr[i].siteNo;
                    if (level === 2) {
                        var childNum = 0;
                        for (var j = 0; j < arr.length; j++) {
                            var supperId = arr[j].supperNo;
                            if (supperId === id) {
                                childNum++;
                            }
                        }
                        var html = '<li>' +
                            '<span name="city_company" onclick="checkSpan(this)" class="basics-my_checkbox basics-Checked"></span> ' +
                            '<input type="hidden" value="' + id + '"/>' +
                            '<p onclick="showChildSites(\'' + id + '\')" class="basics-checkbox_text"> ' +
                            '<span class="basics-checkbox ">' + name + '</span> ' +
                            '<span>(<span name="' + id + '" class="basics-Checked_number"></span>/' +
                            '<span class="basics-all_number">' + childNum + '</span>)</span> </p> ' +
                            '</li>'
                        $('#city_company').append(html);
                        var html2 = '<ul id="' + id + '" class="all-area-ul basics-all-area-ul">' +
                            '</ul>';
                        $('#child_company').append(html2);
                        siteNum++;
                    }
                    for (var k = 0; k < arr.length; k++) {
                        var supperId = arr[k].supperNo;
                        var childId = arr[k].siteNo;
                        var childName = arr[k].siteName;
                        if (supperId === id) {
                            var html = '<li> ' +
                                '<span name="child_company" onclick="checkSpan(this)" class="basics-my_checkbox basics-Checked"></span> ' +
                                '<input type="hidden" value="' + childId + '"/>' +
                                '<span class="basics-checkbox basics-checkboxs">' + childName + '</span> ' +
                                '</li>';
                            $('#' + id).append(html);
                        }
                    }
                }
            }
        }
    );
    $('#child_company').find('ul').each(function () {
        var id = $(this).attr('id');
        selectedNum(id);
    });
}
function checkSpan(data) {

    if ($(data).hasClass('basics-Checked')) {
        $(data).removeClass('basics-Checked');
        if ($(data).attr("name") === "city_company") {
            var id = $(data).next().val();
            $('#' + id).find("span[name='child_company']").each(function () {
                $(this).removeClass('basics-Checked');
            })
        }
    } else {
        $(data).addClass('basics-Checked');
        if ($(data).attr("name") === "city_company") {
            var id = $(data).next().val();
            $('#' + id).find("span[name='child_company']").each(function () {
                $(this).addClass('basics-Checked');
            })
        }
        if ($(data).attr("name") === "child_company") {
            var id = $(data).parent().parent().attr("id");
            $('#city_company').find("input[value='" + id + "']").prev().addClass('basics-Checked');
        }
    }
    $('#child_company').find('ul').each(function () {
        var id = $(this).attr('id');
        selectedNum(id);
    });
}
function showChildSites(id) {
    $('.all-area-ul-active').removeClass('all-area-ul-active');
    $('#' + id).addClass("all-area-ul-active");

}

function removeSiteName() {
    var num = 0;
    $('.basics-Checked').each(function () {
        $(this).next().attr('name', 'sites[' + num + '].siteNo');
        num++;
    });
    $('.basics-my_checkbox').each(function () {
        if (!$(this).hasClass('basics-Checked')) {
            $(this).next().attr('name', '');
        }
    });
}
function selectedNum(id) {
    var selectedNum = 0;
    $('#' + id).find("span[name='child_company']").each(function () {
        if ($(this).hasClass('basics-Checked')) {
            selectedNum++;
        }
    });
    $('#city_company').find("span[name='" + id + "']").html(selectedNum);
    if (selectedNum === 0) {
        var city = $('#city_company').find("span[name='" + id + "']").parent().parent().parent().children().get(0);
        $(city).removeClass('basics-Checked');
    }
}

function createProductInfo() {
    removeSiteName();
    var formData = new FormData($('#productForm')[0]);
    $.ajax(
        {
            url: path + "/baseMan/product/product/createProductInfo",
            data: formData,
            async: false,
            cache: false,
            contentType: false,
            processData: false,
            type: "post",
            success: function (data) {
                setMsg(data);
            }
        }
    )
}
function updateProductInfo() {
    removeSiteName();
    setSupplierName();
    var formData = new FormData($('#productForm')[0]);
    $.ajax(
        {
            url: path + "/baseMan/product/product/updateProductInfo",
            data: formData,
            async: false,
            cache: false,
            contentType: false,
            processData: false,
            type: "post",
            success: function (data) {
                setMsg(data);
            }
        }
    )
}
function openUpdateProduct() {
    var id = $('#dataTable .selected').find("input[name = 'id']").val();
    if (id === undefined) {
        alert("请选择要修改的产品");
    } else {
        var url = path + "/baseMan/product/product/updateMenu?productNo=" + id;
        openMenu(url, 'updateProduct', 1100, 750);
    }
}
// 多选
function checkNormalSpan(data) {
    /* if ($(data).hasClass('basics-Checked')) {
     $(data).removeClass('basics-Checked');
     }
     else {
     $(data).addClass('basics-Checked');
     }*/
    $(data).toggleClass('basics-Checked');

}
// 单选
var flag = 0;
function wxRadio(box) {
    var radio = $(box).find('.wx-radio');
    if (flag === 0) {
        $(radio).eq(0).addClass('wx-radioChecked');
        flag++;
    }
    radio.on('click', function () {
        radio.removeClass('wx-radioChecked');
        $(this).toggleClass('wx-radioChecked');
        setDefSupplier();
    });
    setDefSupplier();
}

function setDefSupplier() {
    $('#pt_supplier .wx-radio').each(function () {
        var checked = $(this).hasClass('wx-radioChecked');
        if (checked) {
            $(this).next().attr('name', 'product.defSupplier');
        } else {
            $(this).next().attr('name', '');
        }
    })
}

function setSupplierName() {
    clearSupplierName();
    var i = 0;
    $('#pt_supplier tr').each(function () {
        $(this).find('input').each(function () {
            var name = $(this).attr('name');
            var subName = name.substr(0, 10);
            if (subName !== 'suppliers[') {
                $(this).attr('name', 'suppliers[' + i + '].' + name);
            }
        });
        i++;
    });
    setDefSupplier();
}

function clearSupplierName() {
    $('#pt_supplier input').each(function () {
        var name = $(this).attr('name');
        var subName = name.substr(0, 10);
        if (subName === 'suppliers[') {
            $(this).attr('name', name.substr(name.indexOf(']') + 2, name.length));
        }
    })
}