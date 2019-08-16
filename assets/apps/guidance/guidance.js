function jqgrid(){$("#grid").jqGrid({url:base_url+"/training/guidance/index/grid",datatype:"json",mtype:"GET",colNames:["#","№","Хэсэг","Төхөөрөмж","Хөтөлбөр","Газар","Цаг","Батлагдсан огноо"],colModel:[{name:"id",index:"id",width:15,align:"center"},{name:"number",index:"number",width:20,align:"center"},{name:"section",index:"section",width:50,align:"center",stype:"select",searchoptions:{value:set_section()}},{name:"equipment",index:"equipment",width:100,formatter:view_link},{name:"guidance",index:"guidance",width:80,align:"center",formatter:view_link},{name:"location",index:"location",width:60,align:"center",formatter:view_link},{name:"hours",index:"hours",width:50,align:"center",formatter:view_link},{name:"date",index:"date",width:50,align:"center"}],jsonReader:{page:"page",total:"total",records:"records",root:"rows",repeatitems:!1,id:"id"},pager:"#pager",rowNum:20,rowList:[10,20,30,40,60,80,100],sortname:"guidance.id",sortorder:"asc",viewrecords:!0,gridview:!0,caption:"Сургалтын хөтөлбөр",autowidth:!0,height:500,width:"100%",editurl:"server.php",loadComplete:function(){for(var e=$(this).jqGrid("getDataIDs"),i=0;i<e.length;i++){$("#grid").jqGrid("getRowData",e[i]);var t=jQuery("#"+e[i],jQuery("#grid"));t.addClass("context-menu1")}}}).navGrid("#pager",{edit:!1,add:!1,del:!1,search:!0}),jQuery("#grid").jqGrid("filterToolbar",{searchOperators:!0,stringResult:!0,defaultSearch:"cn"})}function set_section(){var e="";return $("#section_id option").each(function(){e=$(this).text()+":"+$(this).text(),0}),e=":Бүгд;ТТИХ:ТТИХ;Холбоо:Холбоо;Навигаци:Навигаци;Ажиглалт, автоматжуулалт:Ажиглалт, автоматжуулалт;Гэрэл суулт, цахилгаан:ГСЦ",e}function add_modal(){add.dialog({buttons:{"Хадгалах":function(){$("input[name=hours]",add).val(),$("input[name=minute]",add).val();var e=add.serialize();$.ajax({type:"POST",url:base_url+"/training/guidance/index/add",data:e,dataType:"json",async:!1,success:function(e){"success"==e.status?(add.dialog("close"),showMessage(e.message,"success"),jQuery("#grid").jqGrid("setGridParam",{datatype:"json"}).trigger("reloadGrid")):$("p.feedback",add).removeClass("success, notify").addClass("error").html(e.message).show()}})},"Хаах":function(){add.dialog("close")}}}),add.dialog("open")}function view_link(e,i){return"<a href='#' onclick='page_view("+i.rowId+', "'+e+"\")' >"+e+"</a>"}function page_view(e,i){view.dialog("option","title",'Хөтөлбөр: "'+i+'"');var t,a={id:e};$.ajax({type:"POST",url:base_url+"/training/guidance/index/get/",async:!1,data:a,dataType:"json",success:function(e){"false"==e.status?t=e.status:(set_dropdown(view,"equipment_id",e.json.equipment),$("#number","#view-form").val(e.json.number),$("#equipment_id","#view-form").val(e.json.equipment_id),$("#section_id option[value="+e.json.section_id+"]",view).attr("selected","selected"),$("#guidance","#view-form").val(e.json.guidance),$("#location","#view-form").val(e.json.location),$("#hours","#view-form").val(e.json.hours),$("#date","#view-form").val(e.json.date),$("#file_link a").text(e.json.Gfile.file_name).attr("href",base_url+"/pdf/web/viewer.html?file=../../download/guidance_file/"+e.json.Gfile.file_name))}}).done(function(){"false"!==t?(view.dialog({buttons:{"Хаах":function(){view.dialog("close")}}}),view.dialog("open")):alert("Алдаа гарлаа дахин оролдоно уу!")})}function filter_post(e,i,t){$.post(base_url+"/training/guidance/index/filter",{id:i,field:t},function(i){var a=$("#"+t,e);if(a.prop)var n=a.prop("options");else n=a.attr("options");$("option",a).remove(),$.each(i,function(e,i){n[n.length]=new Option(i,e)})})}function feeds(e,i,t){$("p.feedback",e).removeClass("error","success"),$("p.feedback",e).addClass(i).html(t).show(),$("p.feedback",e).stop().fadeIn("fast",function(){$("p.feedback",e).delay(7e3).fadeOut()})}function del_file(e,i){var t=current_form;if(1!=confirm("["+i+"] энэ файлыг устгахдаа итгэлтэй байна уу?"))return 0;$.ajax({type:"POST",url:my_url+"delete_file/"+e,data:{id:e,file_name:i},dataType:"json",success:function(e){e.success?($("input[name=file_id]",t).val(""),feeds(t,"success",e.message),$("#file_link",t).remove(),$("#_file",t).show()):(feeds(t,"error",e.message),$("#file_link",t).remove(),$("#_file",t).show(),$("input[name=file_id]",t).val(""))}})}function _delete(e){var i=confirm("ТА энэ хөтөлбөрийг устгахдаа итгэлтэй байна уу?");if(i){var t={id:e};$.ajax({type:"POST",url:my_url+"delete/",data:t,dataType:"json",success:function(e){"success"==e.status?(showMessage(e.message,"success"),$("#grid").jqGrid("setGridParam",{search:!1,postData:{filters:""}}).trigger("reloadGrid")):showMessage(e.message,"error")}})}}function edit_modal(e,i){var t;if(current_form=edit,$("input[name=id]",edit).val(e),edit.dialog("option","title","Засах: "+i),t=get_data(e)){set_dropdown(edit,"equipment_id",t.json.equipment),$("#number",edit).val(t.json.number),$("#section_id option[value="+t.json.section_id+"]",edit).attr("selected","selected"),$("#guidance",edit).val(t.json.guidance),$("#location",edit).val(t.json.location),$("input[name=hours]",edit).val(t.json.hours),$("input[name=minute]",edit).val(t.json.minute),$("#date",edit).val(t.json.date),$("input[type='file",edit).val("").hide(),$("#file_wrap",edit).lenght||$("#file_wrap",edit).append("<span id='file_link'><a href='"+base_url+"/pdf/web/viewer.html?file=../../download/guidance_file/"+t.json.Gfile.file_name+"' target='_blank' style='color:blue'>"+t.json.Gfile.file_name+"</a> (<a href='#' style='color:red' onclick='del_file("+t.json.Gfile.file_id+', "'+t.json.Gfile.file_name+"\")'>Устгах</a>)</span>"),$("input[name=file_id]",edit).val(t.json.Gfile.file_id);var a=$("#custom-handle",edit),n=$("#custom-handle-2",edit);$("#slider",edit).slider({range:!1,min:0,max:200,value:t.json.hours,create:function(){a.text(t.json.hours+"цаг")},slide:function(e,i){$("input[name=hours]",edit).val(i.value),a.text(i.value+" цаг")}}),$("#slider2",edit).slider({range:!1,min:0,max:60,value:t.json.minue,create:function(){n.text($(this).slider("value"))},slide:function(e,i){$("input[name=minute]",edit).val(i.value),n.text(i.value+" мин")}})}edit.dialog({buttons:{"Хадгалах":function(){var e=$("input[name=hours]",edit).val(),i=$("input[name=minute]",edit).val();$("input[name=hours]","#create-form").val(e+" "+i);var t=edit.serialize();$.ajax({type:"POST",url:base_url+"/training/guidance/index/edit",data:t,dataType:"json",async:!1,success:function(e){"success"==e.status?(edit.dialog("close"),showMessage(e.message,"success"),jQuery("#grid").jqGrid("setGridParam",{datatype:"json"}).trigger("reloadGrid")):$("p.feedback",edit).removeClass("success, notify").addClass("error").html(e.message).show()}})},"Хаах":function(){edit.dialog("close")}}}),edit.dialog("open")}function get_data(e){var i,t={id:e};return $.ajax({type:"POST",url:my_url+"/get",async:!1,data:t,dataType:"json",success:function(e){i=e}}),i}function set_dropdown(e,i,t){var a=$("#"+i,e);if(a.prop)var n=a.prop("options");else n=a.attr("options");$("option",a).remove(),$.each(t,function(e,i){n[n.length]=new Option(i,e)})}function file_upload(e){current_form=e;var i=new FormData(e[0]);return $.ajax({url:my_url+"upload",type:"POST",data:i,processData:!1,contentType:!1,success:function(i){"success"==i.status?(feeds(e,"success",i.name+" нэртэй файлыг амжилттай байршууллаа!"),i.name&&($("input[type='file",e).val("").hide(),$("#file_wrap",e).lenght||$("#file_wrap",e).append("<span id='file_link'><a href='"+base_url+"/pdf/web/viewer.html?file=../../download/guidance_file/"+i.name+"' target='_blank' style='color:blue'>"+i.name+"</a> (<a href='#' style='color:red' onclick='del_file("+i.file_id+', "'+i.name+"\")'>Устгах</a>)</span>"),$("input[name=file_id]",e).val(i.file_id))):(feeds(e,"error",i.message),$("input[type='file",e).val(""))}}),!0}var add,minus,view,my_url,edit,current_form;my_url=base_url+"/training/guidance/index/",$(function(){$(document).tooltip(),$("#date").datepicker({dateFormat:"yy-mm-dd",changeMonth:!0,showOtherMonths:!0,showWeek:!0,opened:!1}),jqgrid(),add=$("#create-form"),add.dialog({autoOpen:!1,width:600,resizable:!1,modal:!0,close:function(){$("p.feedback",$(this)).html("").hide(),$('input[type="text"], input[type="hidden"], select, textarea',$(this)).val(""),$(this).dialog("close"),current_form=null}}),edit=$("#edit-form"),edit.dialog({autoOpen:!1,width:600,resizable:!1,modal:!0,close:function(){$("p.feedback",$(this)).html("").hide(),$('input[type="text"], input[type="hidden"], select, textarea',$(this)).val(""),$("#file_link",$(this)).remove(),$(this).dialog("close"),current_form=null}}),$("#date",edit).datepicker({dateFormat:"yy-mm-dd",changeMonth:!0,showOtherMonths:!0,showWeek:!0,opened:!1}),view=$("#view-form"),view.dialog({autoOpen:!1,width:600,resizable:!1,modal:!0,close:function(){$("p.feedback",$(this)).html("").hide(),$('input[type="text"], input[type="hidden"], select, textarea',view).val(""),$("#file_link a",view).text("").attr("href",""),$(this).dialog("close")}}),$("#_file",add).change(function(){file_upload(add)}),$("#_file",edit).change(function(){file_upload(edit)}),$("#section_id",add).change(function(){var e=$(this).val();console.log("this_id"+e),filter_post(add,e,"equipment_id")});var e=$("#custom-handle",add),i=$("#custom-handle-2",add);$("#slider",add).slider({range:!1,min:0,max:200,create:function(){e.text($(this).slider("value"))},slide:function(i,t){$("input[name=hours]","#create-form").val(t.value+"цаг"),e.text(t.value+" цаг")}}),$("#slider2",add).slider({range:!1,min:0,max:60,create:function(){i.text($(this).slider("value"))},slide:function(e,t){$("#minute","#create-form").val();$("input[name=minute]","#create-form").val(t.value+"минут"),i.text(t.value+" мин")}})});