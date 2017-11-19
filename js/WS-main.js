// // ============================================================================产品JS
// //datatables配置
// $("#pc-product-table").dataTable({
//     "ordering": false,
//     language: {
//         "sLengthMenu": "显示 _MENU_ 条目",
//         "sInfo": "显示第 _START_ 至 _END_ 项结果，共 _TOTAL_ 项",
//         "oPaginate": {
//             "sFirst": "首页",
//             "sPrevious": "上页",
//             "sNext": "下页",
//             "sLast": "末页"
//         }
//     },
//     "dom": 'r<"datatable_my_wrapper"t>lip'
// });
//    弹出新窗口
// $('.new-pc-project').on('click',function(){
//
//     window.open('newProject.html','_black',"scrollbars=no,height=757px,width=1090px,menubar=0,resizable=0,titlebar=0,modal=false,alwaysRaised=yes,location=no,toolbar=no,left=300px,top=100px");
//
// });
// ================================================================================新增弹出层JS
// tab切换
$(document).ready(function () {

    $(".all-check-ul li").click(function () {

        var _index = $(this).index();

        $(".all-area-ul").eq(_index).addClass("all-area-ul-active").siblings().removeClass("all-area-ul-active");

    });

});

$(".layui-unselect").click(function () {

    $(this).hasClass("layui-form-checked")

});


//
// layui.use('element', function(){
//
//     var element = layui.element();
//
// });

$("#area-select").on('change', function () {

    var _value = $(this).val();

    if (_value == 1) {

        $(".all-area-div").css({

            "display": "block"

        });

    } else {
        $('#sale-area').find('.basics-my_checkbox').each(function () {
            if (!$(this).hasClass('basics-Checked')) {
                $(this).trigger('click');
            }
            // $(this).addClass('basics-Checked');
            // if ($(this).attr('name') === 'child_company') {
            //     var id = $(this).parent().parent().attr('id');
            //     selectedNum(id);
            // }
        });
        $(".all-area-div").css({

            "display": "none"
        });
    }

});
// $(".opo-seek-icon").click(function () {
//
//     var id = layer.open({
//         type: 1,
//         content: $('#supplier_pop'),
//         area: ['auto', 'auto'],
//         resize:false,
//         title:"供应商",
//         cancel:function () {
//             $("#supplier_pop").css({
//                 "display":"none"
//             });
//         }
//     });
// });


// =====================================================================================关联产品JS
//datatables配置
// $("#related-products-table").dataTable({
//     "ordering": false,
//     language: {
//         "sLengthMenu": "显示 _MENU_ 条目",
//         "sInfo": "显示第 _START_ 至 _END_ 项结果，共 _TOTAL_ 项",
//         "oPaginate": {
//             "sFirst": "首页",
//             "sPrevious": "上页",
//             "sNext": "下页",
//             "sLast": "末页"
//         }
//     },
//     "dom": 'r<"datatable_my_wrapper"t>lip',
//
// });
//    弹出新窗口
$('.basics-products-related_products-pop').on('click', function () {
    window.open('basics-products-related_products-pop.html', '_black', "scrollbars=no,height=365px,width=850px,menubar=0,resizable=0,titlebar=0,modal=false,alwaysRaised=yes,location=no,toolbar=no,left=300px,top=100px");
});


//=========================可销售区域checkbox
// $(".basics-my_checkbox").on("click", function () {
//
//     var _Checked = $(this).hasClass("basics-Checked");
//
//     if (_Checked) {
//
//         $(this).removeClass("basics-Checked");
//
//     } else {
//
//         $(this).addClass("basics-Checked");
//
//     }
//
// });

$(".basics-my_checkbox").on("click", function () {


    // var city_index = $(this).attr("data-index");
    //
    // if ($(this).hasClass("basics-Checked")) {
    //
    //     $(".basics-all-area-ul").eq(city_index).children("li").children(".basics-my_checkbox").addClass("basics-Checked");
    //
    //     var basics_all_number = $(".basics-all_number").eq(city_index).text();
    //
    //     $(".basics-Checked_number").eq(city_index).text(basics_all_number);
    //
    // } else {
    //
    //     $(".basics-all-area-ul").eq(city_index).children("li").children(".basics-my_checkbox").removeClass("basics-Checked");
    //
    //     $(".basics-Checked_number").eq(city_index).text(0);
    // }

});

$(".all-area-div-right .basics-all-area-ul li .basics-my_checkbox").click(function () {

    var _length = $(this).parents('ul').find('.basics-my_checkbox.basics-Checked').length;

    var _index = $(this).parents('ul').index();

    $('.all-check-ul li').eq(_index).children("p").children("span").find('.basics-Checked_number').html(_length);

});

$(".basics-checkboxs").click(function () {

    var _len = $(this).siblings(".basics-my_checkbox");

    var aa = _len.hasClass("basics-Checked");

    if (aa) {

        $(this).siblings(".basics-my_checkbox").removeClass("basics-Checked");

    } else {


        $(this).siblings(".basics-my_checkbox").addClass("basics-Checked");

    }

    var _length = $(this).parents('ul').find('.basics-my_checkbox.basics-Checked').length;

    var _index = $(this).parents('ul').index();

    $('.all-check-ul li').eq(_index).children("p").children("span").find('.basics-Checked_number').html(_length);

});
