function view_link(e,a){return"<a href='#' onclick='page_view("+a.rowId+")' >"+e+"</a>"}function set_type(){var e="";return e=":Бүгд;Алтай:Алтай;Арвайхээр:Арвайхээр;Баруун-Туруун:Баруун-Туруун;Баруун-Урт:Баруун-Урт;Бор-Өндөр:Бор-Өндөр;Баянхонгор:Баянхонгор;Булган - Булган:Булган-Булган;Булган - Ховд:Булган-Ховд;Далан:Далан;Даланзадгад:Даланзадгад;Өлгий:Өлгий;Өндөрхаан:Өндөрхаан;Мандалговь:Мандалговь;Мөрөн:Мөрөн;Мөнх-Өлзийт:Мөнх-Өлзийт;Сайншанд:Сайншанд;Тосонцэнгэл:Тосонцэнгэл;Улаанбаатар:Улаанбаатар;Улаангом:Улаангом;Улиастай:Улиастай;Ургамал:Ургамал;Хархорин:Хархорин;Ховд:Ховд;Хэнгэрэгтэй:Хэнгэрэгтэй;Ханбумбат:Ханбумбат;Чойбалсан:Чойбалсан",e}function get_section(){var e=$("#sec_code").val(),a=["COM","SUR","ELC","NAV"],i=a.indexOf(e),t="";if(i>-1)switch(e){case"COM":t="Холбоо:Холбоо";break;case"NAV":t="Навигаци:Навигаци";break;case"SUR":t="Ажиглалт:Ажиглалт";break;default:t="Гэрэл суулт цахилгаан:ГСЦ"}else t=":Бүгд;Ажиглалт:Ажиглалт;Гэрэл суулт, цахилгаан:ГСЦ;Навигаци:Навигаци;Холбоо:Холбоо";return t}function t_action(e,a,i){return action_str="<div title='Дэлгэрэнгүй' style='float:left;cursor:pointer;' class='ui-pg-div ui-inline-edit'><span id='log_none' onclick='page_view("+i.id+")' class='ui-icon ui-icon-extlink'></span></div></div>",$("input").hasClass("action")&&$("input.action").each(function(){switch($(this).val()){case"edit":action_str=action_str+"<div title='Засах' style='float:left;cursor:pointer;' class='ui-pg-div ui-icon-plus'><span onclick='edit_dialog("+i.id+")' class='ui-icon ui-icon-wrench'></span></div></div>";break;case"delete":action_str=action_str+"<div title='Устгах' style='float:left;cursor:pointer;' class='ui-pg-div ui-inline-edit'><span onclick='_delete("+i.id+")' target ="+a.log_num+" class='ui-icon ui-icon-trash'></span></div></div>";break;case"file":action_str=action_str+"<div title='Файл-г харах' style='float:left;cursor:pointer;' class='ui-pg-div ui-icon-document'><span onclick='_file("+i.id+")' class='ui-icon ui-icon-document'></span></div></div>"}}),action_str}function _delete(e){var a=confirm("ТА энэ ТАЗ-ыг устгахдаа итгэлтэй байна уу?");if(a){var i={id:e};$.ajax({type:"POST",url:base_url+"/manual/index/delete/",data:i,dataType:"json",success:function(e){"success"==e.status?(showMessage(e.message,"success"),reload()):showMessage(e.message,"error")}})}}function showMessage(e,a){$("p#notification").length||$("#nav-bar").prepend('<p id="notification"></p>');var i=$("p#notification");i.hasClass("success")?i.removeClass("sucess"):i.hasClass("error")&&i.removeClass("error"),i.addClass(a),i.html(e),i.stop().fadeIn("fast",function(){i.delay(3e3).fadeOut()})}function feeds(e,a,i){$("p.feedback",i).hasClass("error")&&$("p.feedback",i).removeClass("error"),$("p.feedback",i).hasClass("success")&&$("p.feedback",i).removeClass("success"),$("p.feedback",i).addClass(e).html(a).show()}function reload(){$("#grid").jqGrid("setGridParam",{search:!1,postData:{filters:""}}).trigger("reloadGrid")}function page_view(e){var a={id:e};title="Техник ашиглалтын заавар",$.ajax({type:"POST",url:base_url+"/manual/index/get/"+e,data:a,dataType:"json",success:function(e){$("#manual",page_open).val(e.manual),$("#equipment",page_open).val(e.equipment),$("#doc_index",page_open).val(e.doc_index),$("#update_date",page_open).text(e.update_date),e.filename?$("#_file",page_open).append("<span id='file_link'><a href='#' style='color:blue;' onclick='_file(\""+e.filename+"\")'>"+e.filename+"</a></span>"):$("#_file",page_open).append("<span id='file_link' style='color:red'>Файл байхгүй!</span>")}}).done(function(){switch(page_open.dialog("option","title",title),$("#role").val()){case"ADMIN":case"CIEFENG":case"TECHENG":page_open.dialog({buttons:{"Засах":function(){page_open.dialog("close"),edit_dialog(e)},"Хаах":function(){page_open.dialog("close")}}});break;default:page_open.dialog({buttons:{"Хаах":function(){page_open.dialog("close")}}})}page_open.dialog("open")})}function edit_dialog(e){var a={id:e};title="Техник ашиглалтын заавар: Засах",$.ajax({type:"POST",url:base_url+"/manual/index/get/"+e,data:a,dataType:"json",success:function(a){$("#id",edit).val(e),$("#section_id option[value="+a.section_id+"]",edit).attr("selected","selected"),$("#equipment_id option[value="+a.equipment_id+"]",edit).attr("selected","selected"),$("#manual",edit).val(a.manual),$("#doc_index",edit).val(a.doc_index),$("#edit_update_date").val(a.update_date),a.filename?($("#manual_file",edit).hide(),$("#uploaded_file",edit).val(a.filename),$("#_file",edit).append("<span id='file_link'><a href='#' style='color:blue;' onclick='_file(\""+a.filename+"\")'>"+a.filename+"</a> (<a href='#' style='color:red' onclick='del_file("+e+',"'+a.filename+"\", edit)'> Устгах </a>)</span>")):edit.is(":hidden")&&$("#manual_file",edit).show()}}).done(function(){edit.dialog("option","title",title),edit.dialog({buttons:{"Хадгалах":function(){var e={id:id},a=$('input[type="text"], input[type="hidden"], select, textarea',edit);a.each(function(){var a=$(this);e[a.attr("name")]=a.val()}),$.ajax({type:"POST",url:base_url+"/manual/index/edit/",data:e,dataType:"json",success:function(e){"success"==e.status?(edit.dialog("close"),showMessage(e.message,"success"),reload()):$("p.feedback",edit).removeClass("success, notify").addClass("error").html(e.message).show()}})},"Хаах":function(){edit.dialog("close"),reload()}}}),edit.dialog("open")})}function _file(e){e?window.open(base_url+"/pdf/web/viewer.html?file=../../download/taz_files/"+e,"_blank"):feeds("error","Энэ тоног төхөөрөмжийн гэрчилгээний файлыг хавсаргаагүй тул харуулах боломжгүй!")}function del_file(e,a,i){if(1!=confirm("["+a+"] энэ файлыг устгахдаа итгэлтэй байна уу?"))return 0;$.ajax({type:"POST",url:base_url+"/manual/index/del_file/"+e,data:{id:e,file_name:a},dataType:"json",success:function(e){e.success?(feeds("success",e.message),$("#file_link",i).remove(),$("#uploaded_file",i).val(),$("#manual_file",i).show()):(feeds("error",e.message),$("#file_link",i).remove(),$("#manual_file",i).show())}})}function _license(e){var a={id:e};$.ajax({type:"POST",url:base_url+"/certificate/index/page/"+e,data:a,dataType:"json"}).done(function(e){console.log(e)})}function add_new(){title="Техник ашиглалтын заавар:Шинэ",new_form.dialog("option","title",title),new_form.dialog({buttons:{"Нэмэх":function(){var e={},a=$('input[type="text"], input[type="hidden"], select, textarea',new_form);a.each(function(){var a=$(this);e[a.attr("name")]=a.val()}),$.ajax({type:"POST",url:base_url+"/manual/index/add/",data:e,dataType:"json",success:function(e){"success"==e.status?(new_form.dialog("close"),showMessage(e.message,"success"),reload()):$("p.feedback",new_form).removeClass("success").addClass("error").html(e.message).show()}})},"Хаах":function(){new_form.dialog("close")}}}),new_form.dialog("open")}var new_form,_id;$(function(){$("input[type='file",new_form).show();$("#role").val();sel_str=set_type(),str_section=get_section(),page_open=$("#page_dialog"),page_open.dialog({autoOpen:!1,width:640,resizable:!1,modal:!0,position:["center",100],close:function(){$('input[type="text"], input[type="hidden"], select, textarea',page_open).val(""),$(this).dialog("close"),$("#file_link",page_open).length&&$("#file_link",page_open).remove()}}),edit=$("#edit_dialog"),new_form=$("#new_form"),new_form.dialog({autoOpen:!1,width:"auto",resizable:!1,modal:!0,position:["center",100],close:function(){$('input[type="text"], input[type="hidden"],input[type="file"], select, textarea',new_form).val(""),"none"==$("input[type='file']",new_form).css("display")&&$("input[type='file']",new_form).show(),$("#file_link",new_form).length&&$("#file_link",new_form).remove(),$("p.feedback",new_form).text(""),$("p.feedback",new_form).removeClass("success"),$("p.feedback",new_form).removeClass("error"),$(this).dialog("close")}}),edit.dialog({autoOpen:!1,width:"auto",resizable:!1,modal:!0,position:["center",100],close:function(){$('input[type="text"], input[type="hidden"],input[type="file"], select, textarea',edit).val(""),$("#file_link",edit).length&&$("#file_link",edit).remove(),$("p.feedback",edit).text(""),$("p.feedback",edit).removeClass("success, error"),$(this).dialog("close")}}),license=$("#license_dialog"),license.dialog({autoOpen:!1,width:"auto",resizable:!1,modal:!0,position:["center",100],close:function(){$("p.feedback",edit).text(""),$("p.feedback",edit).removeClass("success, error")}}),jQuery("#grid").jqGrid({url:base_url+"/manual/index/grid",datatype:"json",mtype:"GET",height:"500",width:"1260",colNames:["#","Хэсэг","Тон/төхөөрөмж","Техник Ашиглалтын заавар","Индекс","Шинэчлэгдсэн огноо","Батлагдсан огноо","Файл","Үйлдэл"],colModel:[{name:"id",index:"id",search:!1,width:30},{name:"section",index:"section",width:60,align:"center",stype:"select",searchoptions:{value:str_section}},{name:"equipment",index:"equipment",width:110,align:"left",formatter:view_link},{name:"manual",index:"manual",width:80,align:"right",formatter:view_link},{name:"doc_index",index:"doc_index",width:60,align:"center",searchoptions:{dataInit:function(e){$(e).datepicker({dateFormat:"yy-mm-dd"}).change(function(){$("#grid")[0].triggerToolbar()})}}},{name:"updated_at",index:"updated_at",width:60,align:"center",searchoptions:{dataInit:function(e){$(e).datepicker({dateFormat:"yy-mm-dd"}).change(function(){$("#grid")[0].triggerToolbar()})}}},{name:"update_date",index:"update_date",width:60,align:"center",searchoptions:{dataInit:function(e){$(e).datepicker({dateFormat:"yy-mm-dd"}).change(function(){$("#grid")[0].triggerToolbar()})}}},{name:"filename",index:"filename",width:70},{name:"action",index:"action",width:75,align:"center",sortable:!1,search:!1,formatter:t_action}],jsonReader:{page:"page",total:"total",records:"records",root:"rows",repeatitems:!1,id:"id"},rowNum:20,rowList:[10,20,30],pager:"#pager",sortname:"id",viewrecords:!0,sortorder:"asc",caption:".: Техник ашиглалтын заавар :."}),jQuery("#grid").jqGrid("filterToolbar",{stringResult:!0,searchOnEnter:!1}),$("#update_dated",new_form).datepicker({dateFormat:"yy-mm-dd",changeMonth:!0,showOtherMonths:!0,showWeek:!0}),$("#edit_update_date",edit).datepicker({dateFormat:"yy-mm-dd"}),$("#issued_date").datepicker({dateFormat:"yy-mm-dd",changeMonth:!0,showOtherMonths:!0,showWeek:!0,opened:!1}),$(".edit_date",edit).datepicker({dateFormat:"yy-mm-dd"}),$("#manual_file",new_form).change(function(){var e=new FormData($("#new_form")[0]);$.ajax({url:base_url+"/manual/index/upload/",type:"POST",data:e,processData:!1,contentType:!1,success:function(e){"success"==e.status?(feeds("success",e.name+" нэртэй файлыг амжилттай байршууллаа!",new_form),$("input[type='file']",new_form).val("").hide(),$("#uploaded_file",new_form).val(e.name),$("#_file",new_form).lenght||$("#_file",new_form).append("<span id='file_link'><a href='#' style='color:blue' onclick='_file(\""+e.name+"\")'>"+e.name+"</a> (<a href='#' style='color:red' onclick='del_file("+e.id+', "'+e.name+"\", new_form)'>Устгах</a>)</span>")):(feeds("error",e.message,new_form),$("input[type='file",new_form).val(""))}})}),$("#manual_file",edit).change(function(){var e=new FormData($("#edit_dialog")[0]);$.ajax({url:base_url+"/manual/index/upload/",type:"POST",data:e,processData:!1,contentType:!1,success:function(e){"success"==e.status?(feeds("success",e.name+" нэртэй файлыг амжилттай байршууллаа!",edit),$("input[type='file",edit).val("").hide(),$("#uploaded_file",edit).val(e.name),$("#_file",edit).lenght||$("#_file",edit).append("<span id='file_link'><a href='#' style='color:blue' onclick='_file(\""+e.name+"\")'>"+e.name+"</a> (<a href='#' style='color:red' onclick='del_file("+e.id+', "'+e.name+"\", edit)'>Устгах</a>)</span>")):(feeds("error",e.message,edit),$("input[type='file",edit).val(""))}})}),$("#section_id",edit).change(function(){console.log("changing.."),$.ajax({data:{section_id:$(this).val()},type:"POST",url:base_url+"/manual/index/filter",async:!1}).done(function(e){var a=$("#equipment_id",edit);if(a.prop)var i=a.prop("options");else i=a.attr("options");$("option",a).remove(),$.each(e,function(e,a){i[i.length]=new Option(a,e)})})}),$("#section_id",new_form).change(function(){console.log("changing.."),$.ajax({data:{section_id:$(this).val()},type:"POST",url:base_url+"/manual/index/filter",async:!1}).done(function(e){var a=$("#equipment_id",new_form);if(a.prop)var i=a.prop("options");else i=a.attr("options");$("option",a).remove(),$.each(e,function(e,a){i[i.length]=new Option(a,e)})})})});