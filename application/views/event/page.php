<head>
<meta charset="utf-8">
<title>eCNS::ТХҮАлба Цахим бүртгэлийн систем</title>
<link rel="stylesheet" type="text/css" media="print"
	href="<?php echo base_url();?>assets/css/print.css">
<style>
body {
	padding-top: 0;
	margin-top: 0;
	font-family: Arial;
	font-size: 10pt;
}

table.printed_2 {
	border-collapse: collapse;
	/*    height: 300px;*/
	width: 800px;
}

table.printed_2 tr {
	border: 1px solid black;
	font-size: 9pt;
}

table.printed_2 td.tdcss {
	background-color: #777 !important;
	font-weight: bold;
}

table.printed_3 {
	border-collapse: collapse;
	width: 800px;
}

table.printed_3 tr {
	border: 1px solid black;
	font-size: 9pt;
}

table.printed_3 td.tdcss {
	background-color: #777 !important;
	font-weight: bold;
}

table.printed {
	border-collapse: collapse;
	/*    height: 500px;*/
	width: 800px;
	margin: 0;
	padding: 0;
}

table.printed tr {
	border: 1px solid black;
	font-size: 9pt;
	margin: 0;
	padding: 0;
}

table.printed th {
	
}

table.printed tr.spacer {
	height: 70px;
}

table.printed tr.spacer2 {
	height: 100px;
}

table.printed tr.spacer3 {
	height: 200px;
}

table.printed td.tdcss {
	background-color: #777 !important;
	font-weight: bold;
}

.styled {
	font-style: italic;
}

.head {
	padding-top: 5px;
	font-weight: bold;
	padding-left: 7px;
}

div.value {
	margin-bottom: 5px;
	margin-left: 10px;
}

.italic {
	font-style: italic;
}

span.timer {
	padding-left: 7em;
}

#header {
	padding: 0;
	margin: 0;
	height: 50px;
	width: 740px;
}

#header_warn {
	width: 800px;
	height: 60px;
	margin-bottom: 0;
	text-align: center;
}

#logo {
	float: left;
	padding-bottom: 5px;
	margin-bottom: 10px;
	margin-left: 15px;
	position: absolute;
}

#workname {
	float: left;
	width: 650px;
	font-weight: bold;
	font-size: 10pt;
	padding-top: 0px;
}

#clear {
	clear: both;
}

#body {
	position: absolute;
	margin: 0;
	padding: 0;
}

#bottom {
	position: inherit;
}

tr.clorful {
	font-weight: bold;
	background-color: #616161 !important;
	background: url('../../images/td_bk.png');
}

.page_break {
	page-break-after: always;
}
</style>
</head>
<body>      
      <?php
						foreach ( $log_cols as $row ) {
							?>
        <div id="header_warn" align="center">

		<div id="workname" align="right">ИНЕГ-ТХҮАлба</div>

		<div id="logo">
			<image height="70" src="/ecns/images/logo.png">
		
		</div>
		<div id="clear"></div>
		<h4 align="center">ТЕХНИК ҮЙЛЧИЛГЭЭ, ХЭМЖИЛТ ШАЛГАЛТЫН ХУУДАС №<?php echo $row->log_num;?></h4>
	</div>
	<div id="body" align="center">

		<h5 align="left"
			style="padding-left: 10px; padding-bottom: 3px; margin-bottom: 0px; font-style: italic;">1.Техник,
			үйлчилгээ</h5>
		<table border="1" cellpadding="5" cellspacing="0" class="printed">
			<tr height="5%" class="clorful">
				<td colspan="6" style="padding-left: 10px">Техник үйлчилгээ
					төлөвлөсөн албан тушаалтан</td>
			</tr>
			<tr style="height: 30px;">
				<th align="left"><span class="head">Хэсэг/Тасаг</span></th>
				<th align="left">Албан тушаал</th>
				<th align="left">Нэр</th>
				<th align="left">Гарын үсэг</th>
				<th align="left">Огноо</th>
				<th align="left">Утас</th>
			</tr>
			<tr style="height: 30px;">
				<td style="padding-left: 15px;"><?=$cr_sector?></td>
				<td><?php echo $cr_position; ?></td>
				<td><label class="styled">
                        <?=$cr_fullname?>
                        <label></td>
				<td>&nbsp;</td>
				<td><?=date("Y/m/d", strtotime($row->closed_datetime))?></td>
				<td><?=$cr_workphone;?></td>
			</tr>
			<tr style="height: 30px;">
				<td colspan="3" class="tdcss"><span class="italic"
					style="text-align: right;">Техник үйлчилгээг төлөвлөгөөг зөвшөөрсөн
						Ерөнхий зохицуулагч инженер</span></td>
				<td colspan="3"><?=$act_fullname?>  <span
					style="margin-left: 5px; margin-right: 100px;">/</span><span>&nbsp/</span></td>
			</tr>

			<tr valign="top">
				<td colspan="6">
					<table border="0" width="100%" height="10%">
						<tr>
							<td width="50%"><span class="head">Тоног төхөөрөмжийн байрлал:</span></td>
							<td width="50%"><span class="head">Тоног төхөөрөмжийн нэр:</span></td>
						</tr>
						<tr>
							<td><div class="value"><?php echo $row->location;?></div></td>
							<td><div class="value"><?php echo $row->equipment; ?></div></td>
						</tr>
					</table>
				</td>
			</tr>
			<tr style="height: 50px;">
				<td colspan="3" class="tdcss"><span class="head">Техник үйлчилгээ,
						Шалгалт тохируулга эхлэх хугацаа.</span></td>
				<td colspan="3" class="tdcss" height="2%"><span class="head"><?php echo $row->created_datetime?></span></td>
			</tr>
			<tr valign="top">
				<td colspan="6"><div class="head">Гүйцэтгэхээр төлөвлөсөн техник
						үйлчилгээ:</div>
					<div class="value italic">
                    <?php  echo $row->defect; echo ", "; echo $row->reason; ?>
                    </div></td>
			</tr>
		</table>
		<h5 align="left"
			style="padding-left: 10px; padding-bottom: 3px; margin-bottom: 0px; font-style: italic;">2.
			Техник үйлчилгээний гүйцэтгэл, түүний хэрэгжилт, үр дүн:</h5>
		<table border="1" cellpadding="5" cellspacing="0" class="printed_2">
			<tr class="spacer3" valign="top">
				<td colspan="6">
					<div class="value">
                    <?php echo $row->completion; ?>
                </div>
				</td>
			</tr>
			<tr style="height: 50px;">
				<td colspan="6" class="tdcss"><span class="head">Техник үйлчилгээ
						гүйцэтгэсэн ИТА-нууд.</span></td>
			</tr>
			<tr style="height: 10px;" align="center">
				<th align="left"><span class="head">Хэсэг/Тасаг</span></th>
				<th>Албан тушаал</th>
				<th>Нэр</th>
				<th>Гарын үсэг</th>
				<th>Огноо</th>

			</tr>
			<tr style="height: 10px;" align="center">
				<td><?=$row->section?></td>
				<td><?php echo $row->closedby_position; ?></td>
				<td><?php echo $row->closedby ?></td>

				<td></td>
				<td><? echo $row->closed_datetime; ?></td>

			</tr>
			<tr style="height: 30px;">
				<td colspan="3" class="tdcss"><span style="text-align: right;">Техник
						үйлчилгээг гүйцэтгэж дуусахад танилцсан Ерөнхий зохицуулагч
						инженер</span></td>
				<td colspan="3"><?=$row->provedby?>
                    <span style="margin-left: 5px; margin-right: 100px;">/</span><span>/</span>
				</td>
			</tr>

			<tr height="2%">
				<td colspan="2" rowspan="2" class="tdcss"><span class="head">Гэмтэл,
						дутагдлын дууссан хугацаа:</span></td>
				<td colspan="4" class="tdcss">Дууссан хугацаа:</td>
				</td>
			</tr>
			<tr height="2%">
				<td colspan="2"><span><?php
							
$date = strtotime ( $row->closed_datetime );
							echo date ( 'Y/m/d', $date );
							?></span> <span
					style="padding-left: 30px;" align="right"><?php echo date('H:i A', $date);?></span>
					<!--                    <span class="timer">12:01AM</span>--></td>
				<td colspan="2"><span><?php echo $row->duration_time; ?>                 
                    </span></td>
			</tr>
		</table>
		<h5 align="left"
			style="padding-left: 10px; padding-bottom: 3px; margin-bottom: 0px; font-style: italic;">3.
			Гэмтэл дутагдлыг арилгах үйл явцад ерөнхий инженерийн хийсэн дүгнэлт</h5>
		<table border="1" class="printed_3">
			<tr height="50%">
				<td colspan="6" height="60px" valign="top"><span class="head">Албаны
						ерөнхий инженерийн дүгнэлт:</span>
                    <?=$summary?>
            </td>
			</tr>
			<tr height="10%">
				<td colspan="2" class="tdcss">Нэр</td>
				<td colspan="2" class="tdcss">Гарын үсэг</td>
				<td colspan="2" class="tdcss">Огноо</td>
			</tr>
			<tr>
				<td colspan="2" style="height: 30px;"></td>
				<td colspan="2" style="height: 30px">&nbsp;</td>
				<td colspan="2" style="height: 30px">&nbsp;</td>
			</tr>
		</table>
		<div align="right" style="padding-right: 40px;" id="bottom">
			<form style="padding-top: 15px;">
				<input type="button" value="Буцах" class="button"
					onClick="window.location='/ecns/log';" /> <input type="button"
					value="Хуудсыг хэвлэ" class="button"
					onClick="window.print();return false;" />
			</form>
		</div>
	</div>        
        <?  } ?>    
    </body>    
</html>