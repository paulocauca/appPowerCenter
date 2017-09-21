
// CARREGA ACOES QUANDO A PAGINA E CARREGADA
$(document).ready( function()
{
	if($(location).attr('pathname') != '/'  )
	{
		returnCountObjetos();
	}
	   
// TODO : Configurando ambiente para gerar os pacotes
	$('#ambienteOrigem').change(function(){
		if(document.getElementById("ambienteOrigem").value == 'ambDesenvolvimento'){
			returnFoldersDEV();
		}
	});
	$('#ambienteDestino').change(function(){
		if(document.getElementById("ambienteDestino").value == 'ambProducaoBI'){
			returnFoldersProd();
		}else if(document.getElementById("ambienteDestino").value == 'ambProducaoDep'){
			returnFoldersProd();
		}

	});
	$('#tipoObjetoID').change(function(){
			  if(document.getElementById("tipoObjetoID").value == 'Source'){
				  returnListaSourceByFolderID();
		}else if(document.getElementById("tipoObjetoID").value == 'Target'){
				  returnListaTargeteByFolderID();
		}else if(document.getElementById("tipoObjetoID").value == 'Mapping'){
				  returnListaMappingByFolderID();
		}else if(document.getElementById("tipoObjetoID").value == 'Workflow'){
				returnListaWorkflowByFolderID();
		}
	});
	$('#objetosID').change(function(){
		if(document.getElementById("tipoObjetoID").value == 'Source'){
			carregaSource();
		}else if(document.getElementById("tipoObjetoID").value == 'Target'){
			carregaTarget();
		}else if(document.getElementById("tipoObjetoID").value == 'Mapping'){
			carregaMapping();
		}else if(document.getElementById("tipoObjetoID").value == 'Workflow'){
			carregaWFandSession();
		}	
	});
	$('#idNovoPacote').click(function(){
		getNextPkge();
				
	});
	$('#btnAddPkge').click(function(){
		doObjeto();
	})
});


// TODO : Botão adicionar na pagina inicial de Infra
$(document).on('click', '#btnApperPkge', function()
{
	if ( document.getElementById("spanAddInfra").className == "glyphicon glyphicon-minus"){
		document.getElementById("spanAddInfra").className = "glyphicon glyphicon-plus";
		document.getElementById("divAdd").style.display = 'none';
	}else {
		document.getElementById("spanAddInfra").className = "glyphicon glyphicon-minus";
		document.getElementById("divAdd").style.display = 'block';
	}
});

// TODO : Valida se todos as vari�veis est�o OK e libera para adicionar objeto no carrinho
function validaLiberaPackge(){

		var turnON = true;
		var tableObjetos = document.getElementById('tableObjetos');

		for (var r = 0, n = tableObjetos.rows.length; r < n; r++) {
			for (var c = 0, m = tableObjetos.rows[r].cells.length; c < m; c++) {
				if (String(tableObjetos.rows[r].cells[c].innerHTML) == 'NOK'){
					turnON = false
				}
			}
		}
		if (turnON == true ){
			btnAddPkge = document.getElementById("btnAddPkge");
			btnAddPkge.className = "btn btn-success";
			btnAddPkge.disabled = false;
		}else {
			btnAddPkge = document.getElementById("btnAddPkge");
			btnAddPkge.className = "btn btn-danger";
			btnAddPkge.disabled = 'disabled';
		}
}

// TODO : Realiza a troca do Status na página inicial 
function changeStatusPackage(){
	var    opt = document.getElementById("statusPackage");
	var status = opt.options[opt.selectedIndex].value;
	var pkge = getNumPkge();
	var url = pkge +'/'+status
	console.log(url);
	
	$.ajax({
		url: 'http://svuxppbi1:3002/changeStatusPackage/' + url, // Node.js Server REST Call
		type: "POST",
		dataType: "text",
			success: function(seed) {
				returnStatusRequest(seed,'Status Alterado');
		}
	});
}

// TODO : Retorna Count dos Objetos
function returnCountObjetos(){
	$.ajax({
		url: 'http://svuxppbi1:3002/returnCountObjetos/'+getNumPkge(), // Node.js Server REST Call
		type: "GET",
		dataType: "json",
		success: function(seed) {

			var jsonobj = seed;
			var obj = jQuery.parseJSON(jsonobj);
			for(i=0;i<obj.length;i++){
				if(String(obj[i].tipoObjeto) == "Source"){
					document.getElementById('spanSource').innerHTML = String(obj[i].count);
				}else if(String(obj[i].tipoObjeto) == "Target"){
					document.getElementById('spanTarget').innerHTML = String(obj[i].count);
				}else if(String(obj[i].tipoObjeto) == "Mapping"){
					document.getElementById('spanMapping').innerHTML = String(obj[i].count);
				}else if(String(obj[i].tipoObjeto) == "Workflow"){
					document.getElementById('spanWorkflow').innerHTML = String(obj[i].count);
				}
			}
		}
	});
}

// TODO : Realiza Cleanup do Status da Request
function clearStatusRequest(timout,element){
	setTimeout(function(){
		document.getElementById(element).innerHTML = "";
		document.getElementById(element).className = "";
	},timout);
}

// TODO : Retorna status da Request
function returnStatusRequest(status, objeto){
	if(status == 'OK'){
		document.getElementById("statusRequest").innerHTML = "Sucesso : " + objeto;
		document.getElementById("statusRequest").className = retornaClasse(status);
		clearStatusRequest(2000,"statusRequest");
	}else{
		document.getElementById("statusRequest").innerHTML = "Erro : " +objeto;
		document.getElementById("statusRequest").className = retornaClasse(status);
		clearStatusRequest(2000,"statusRequest");
	}
}

// TODO : Retorna Nome da classe se OK - NOK
function retornaClasse(status) {
    if(status == 'OK')
	{
		return 'alert alert-success'
	}else{
		return 'alert alert-danger'
	}
}

// TODO : Carrega Folders Desenvolvimento
function returnFoldersDEV(){
			$.ajax({
			url: 'http://svuxppbi1:3002/listaFoldersDev/'+ getNumPkge(), // Node.js Server REST Call
			type: "GET",
			dataType: "json",
			success: function(seed) {
			
				var jsonobj = seed;
				var obj = jQuery.parseJSON(jsonobj);
					
				$('#foldersIDOrigem').empty();
				for(i=0;i<obj.length;i++){
					//var servidor = ;
					$('#foldersIDOrigem').append(new Option(String(obj[i].subj_name), String(obj[i].id), true, true));
				}
				$('#foldersIDOrigem').append(new Option('>> Escolher << ', '', true, true));
			}
			});
	
}

// TODO : Carrega Folders Produçaõ
function returnFoldersProd(){
			$.ajax({
			url: 'http://svuxppbi1:3002/listaFoldersProd/'+getNumPkge(), // Node.js Server REST Call
			type: "GET",
			dataType: "json",
			success: function(seed) {
			
				var jsonobj = seed;
				var obj = jQuery.parseJSON(jsonobj);
					
				$('#foldersIDdestino').empty();
				for(i=0;i<obj.length;i++){
					//var servidor = ;
					$('#foldersIDdestino').append(new Option(String(obj[i].subj_name), String(obj[i].id), true, true));
				}
				$('#foldersIDdestino').append(new Option('>> Escolher << ', '', true, true));
			}
			});
}


// TODO : Reserva numero do Pacote
function getNextPkge(){
	$.ajax({
			url: 'http://svuxppbi1:3002/numpackage/', // Node.js Server REST Call
			type: "GET",
			dataType: "json"})
			.done(function(seed) {
					
					var jsonobj = seed;
					var obj = jQuery.parseJSON(jsonobj);
					$.ajax({
						url: 'http://svuxppbi1:3002/doPackage/' + obj.numpkge, // Node.js Server REST Call
							type: "GET"
							}).done( function(seed) {
															
															//console.log('--------' + seed);
															//local.window.location.href(); 
															$(location).attr('href', '/package/' + obj.numpkge );
													});
			});
}

// TODO : Retorna o numero do Pacote
function getNumPkge(){
		return document.getElementById('idNumPkge').value;
}

// TODO : Retorno Lista de Workflow passando como parametro o ID da Folder
function returnListaWorkflowByFolderID (){
			var    opt = document.getElementById("foldersIDOrigem");
			var option = opt.options[opt.selectedIndex].value;
		
			$.ajax({
			url: 'http://svuxppbi1:3002/listaWorkflowByFolderID/'+ option + '/' + getNumPkge() , // Node.js Server REST Call
			type: "GET",
			dataType: "json",
			success: function(seed) {
			
				var jsonobj = seed;
				var obj = jQuery.parseJSON(jsonobj);
					
				$('#objetosID').empty();
				for(i=0;i<obj.length;i++){
					//var servidor = ;
					$('#objetosID').append(new Option(String(obj[i].task_name), String(obj[i].task_id), true, true));
				}
				$('#objetosID').append(new Option('>> Escolher << ', '', true, true));
			}
			})
}
// TODO : Retorno Lista de Mapping passando como parametro o ID da Folder

function returnListaMappingByFolderID (){
	var    opt = document.getElementById("foldersIDOrigem");
	var option = opt.options[opt.selectedIndex].value;

	$.ajax({
		url: 'http://svuxppbi1:3002/listaMappingByFolderID/'+ option + '/' + getNumPkge() , // Node.js Server REST Call
		type: "GET",
		dataType: "json",
		success: function(seed) {

			var jsonobj = seed;
			var obj = jQuery.parseJSON(jsonobj);
			//var obj = seed;
			$('#objetosID').empty();
			for(i=0;i<obj.length;i++){
				
				//console.log(String(obj[i].mapping_name));
				
				$('#objetosID').append(new Option(String(obj[i].mapping_name), String(obj[i].mapping_id), true, true));
			}
			$('#objetosID').append(new Option('>> Escolher << ', '', true, true));
		}
	})
}

// TODO : Retorno Lista de Source passando como parametro o ID da Folder
function returnListaSourceByFolderID (){
	var    opt = document.getElementById("foldersIDOrigem");
	var option = opt.options[opt.selectedIndex].value;
	$.ajax({
		url: 'http://svuxppbi1:3002/listaSourcesByFolderID/'+ option + '/' + getNumPkge() , // Node.js Server REST Call
		type: "GET",
		dataType: "json",
		success: function(seed) {

			var jsonobj = seed;
			var obj = jQuery.parseJSON(jsonobj);

			$('#objetosID').empty();
			for(i=0;i<obj.length;i++){
					$('#objetosID').append(new Option(String(obj[i].source_name), String(obj[i].src_id), true, true));
			}
			$('#objetosID').append(new Option('>> Escolher << ', '', true, true));
		}
	})
}

// TODO : Retorno Lista de Target passando como parametro o ID da Folder
function returnListaTargeteByFolderID (){
	var    opt = document.getElementById("foldersIDOrigem");
	var option = opt.options[opt.selectedIndex].value;
	$.ajax({
		url: 'http://svuxppbi1:3002/listaTargetsByFolderID/'+ option + '/' + getNumPkge() , // Node.js Server REST Call
		type: "GET",
		dataType: "json",
		success: function(seed) {

			var jsonobj = seed;
			var obj = jQuery.parseJSON(jsonobj);

			$('#objetosID').empty();
			for(i=0;i<obj.length;i++){
				$('#objetosID').append(new Option(String(obj[i].target_name), String(obj[i].target_id), true, true));
			}
			$('#objetosID').append(new Option('>> Escolher << ', '', true, true));
		}
	})
}

// TODO : Carrega WF se o Tipo de Objeto escolhido para geração do Pacote tenha sido WF
function carregaWFandSession(){

	var    opt = document.getElementById("objetosID");
	var option = opt.options[opt.selectedIndex].value;

	$.ajax({
		url: 'http://svuxppbi1:3002/listaWorkflowByTaskID/' + option + '/' + getNumPkge(), // Node.js Server REST Call
		type: "GET",
		dataType: "json",
		success: function(seed) {

			var jsonobj = seed;
			var obj = jQuery.parseJSON(jsonobj);
			$('#infObjeto').empty();
			$('#infObjeto').append('<table class="table" id="tableObjetos"></table>');

			var table = $('#infObjeto').children();
			table.append("<tr><th>Object Name</th><th>Valid</th><th>CheckoOut User</th><th>ChechIn</th><th>Save Valid</th><th>Version</th></tr>");
			for(i=0;i<obj.length;i++)
			{
				table.append("<tr><td>" + String(obj[i].task_name) + "</td><td class='"+retornaClasse(String(obj[i].is_valid))+"'>" + String(obj[i].is_valid) + "</td><td class='"+retornaClasse(String(obj[i].checkout_user_id))+"'>" + String(obj[i].checkout_user_id) + "</td><td class='"+retornaClasse(String(obj[i].utc_checkin))+ "'>"+ String(obj[i].utc_checkin) + "</td><td class='"+retornaClasse(String(obj[i].saved_valid))+"'>"+ String(obj[i].saved_valid) + "</td><td id='obj_version'>"+ String(obj[i].version_number) + "</td></tr>");
			}
		}
	});

	$.ajax({
		url: 'http://svuxppbi1:3002/listaSessionByTaskID/' + option + '/'+ getNumPkge() , // Node.js Server REST Call
		type: "GET",
		dataType: "json",
		success: function(seed) {

			var jsonobj = seed;
			var obj = jQuery.parseJSON(jsonobj);

			var table = $('#infObjeto').children();

			for(i=0;i<obj.length;i++)
			{
				table.append("<tr><td>" + String(obj[i].instance_name) + "</td><td class='"+retornaClasse(String(obj[i].is_valid))+"'>" + String(obj[i].is_valid) + "</td><td>-</td><td>-</td><td>-</td><td>"+ String(obj[i].version_number) + "</td></tr>");
			}
			validaLiberaPackge();
		}

	});

}

// TODO : Carrega WF se o Tipo de Objeto escolhido para geração do Pacote tenha sido Mapping
function carregaMapping(){

	var    opt = document.getElementById("objetosID");
	var option = opt.options[opt.selectedIndex].value;

	$.ajax({
		url: 'http://svuxppbi1:3002/listaMappingByMappingID/' + option + '/' + getNumPkge(), // Node.js Server REST Call
		type: "GET",
		dataType: "json",
		success: function(seed) {

			var jsonobj = seed;
			var obj = jQuery.parseJSON(jsonobj);
			$('#infObjeto').empty();
			$('#infObjeto').append('<table class="table" id="tableObjetos"></table>');

			var table = $('#infObjeto').children();
			table.append("<tr><th>Object Name</th><th>Valid</th><th>CheckoOut User</th><th>ChechIn</th><th>Save Valid</th><th>Version</th></tr>");
			for(i=0;i<obj.length;i++)
			{
				table.append("<tr><td>" + String(obj[i].mapping_name) + "</td><td class='"+retornaClasse(String(obj[i].is_valid))+"'>" + String(obj[i].is_valid) + "</td><td class='"+retornaClasse(String(obj[i].checkout_user_id))+"'>" + String(obj[i].checkout_user_id) + "</td><td class='"+retornaClasse(String(obj[i].utc_checkin))+ "'>"+ String(obj[i].utc_checkin) + "</td><td class='"+retornaClasse(String(obj[i].saved_valid))+"'>"+ String(obj[i].saved_valid) + "</td><td id='obj_version'>"+ String(obj[i].version_number) + "</td></tr>");
			}
			validaLiberaPackge();
		}
	});
}

// TODO : Carrega Informações do Source de acordo com o SRC_ID
function carregaSource(){

	var    opt = document.getElementById("objetosID");
	var option = opt.options[opt.selectedIndex].value;

	$.ajax({
		url: 'http://svuxppbi1:3002/listaSourceBySrcID/' + option + '/' + getNumPkge(), // Node.js Server REST Call
		type: "GET",
		dataType: "json",
		success: function(seed) {

			var jsonobj = seed;
			var obj = jQuery.parseJSON(jsonobj);
			$('#infObjeto').empty();
			$('#infObjeto').append('<table class="table" id="tableObjetos"></table>');

			var table = $('#infObjeto').children();
			table.append("<tr><th>Source Name</th><th>Source</th><th>CheckoOut User</th><th>ChechIn</th><th>Version</th></tr>");
			for(i=0;i<obj.length;i++)
			{
				table.append("<tr><td>" + String(obj[i].source_name) + "</td><td>"+ String(obj[i].dbdnam) + "</td><td class='"+retornaClasse(String(obj[i].checkout_user_id))+"'>" + String(obj[i].checkout_user_id) + "</td><td class='"+retornaClasse(String(obj[i].utc_checkin))+ "'>"+ String(obj[i].utc_checkin) + "</td><td id='obj_version'>"+ String(obj[i].version_number) + "</td></tr>");
			};
			validaLiberaPackge();
		}
	});
}

// TODO : Carrega Informações do Source de acordo com o TARGET_ID
function carregaTarget(){

	var    opt = document.getElementById("objetosID");
	var option = opt.options[opt.selectedIndex].value;

	$.ajax({
		url: 'http://svuxppbi1:3002/listaTargetByTgtID/' + option + '/' + getNumPkge(), // Node.js Server REST Call
		type: "GET",
		dataType: "json",
		success: function(seed) {

			var jsonobj = seed;
			var obj = jQuery.parseJSON(jsonobj);
			$('#infObjeto').empty();
			$('#infObjeto').append('<table class="table" id="tableObjetos"></table>');

			var table = $('#infObjeto').children();
			table.append("<tr><th>Target Name</th><th>CheckoOut User</th><th>ChechIn</th><th>Version</th></tr>");
			for(i=0;i<obj.length;i++)
			{
				table.append("<tr><td>" + String(obj[i].target_name) + "</td><td class='"+retornaClasse(String(obj[i].checkout_user_id))+"'>" + String(obj[i].checkout_user_id) + "</td><td class='"+retornaClasse(String(obj[i].utc_checkin))+ "'>"+ String(obj[i].utc_checkin) + "</td><td id='obj_version'>"+ String(obj[i].version_number) + "</td></tr>");
			};
			validaLiberaPackge();
		}
	});
}

//TODO : Adicionar Objeto no pedido
function doObjeto(){

	var optAmbienteOrigem = document.getElementById("ambienteOrigem");
	var optAmbienteDestino= document.getElementById("ambienteDestino");
	var optForderOrigem= document.getElementById("foldersIDOrigem");
	var optForderDestino= document.getElementById("foldersIDdestino");
	var optTipoObjeto= document.getElementById("tipoObjetoID");
	var optObjeto= document.getElementById("objetosID");
	var obj_version= document.getElementById("obj_version").innerText;
	var obj_replace  = (document.getElementById("replaceObjeto").checked  == true ? "Y" : "N");
	var pkge = getNumPkge();
	var ambOrigem = optAmbienteOrigem.options[optAmbienteOrigem.selectedIndex].value;
	var ambDestino= optAmbienteDestino.options[optAmbienteDestino.selectedIndex].value;
	var folderOrigems= optForderOrigem.options[optForderOrigem.selectedIndex].text;
	var folderDestino= optForderDestino.options[optForderDestino.selectedIndex].text;
	var tipoObjeto= optTipoObjeto.options[optTipoObjeto.selectedIndex].value;
	var nomeObjeto = optObjeto.options[optObjeto.selectedIndex].text;

	
	var url = pkge +'/'+ambOrigem+'/'+ambDestino+'/'+folderOrigems+'/'+folderDestino+'/'+tipoObjeto+'/'+nomeObjeto+'/'+obj_version+'/' + obj_replace;

	$.ajax({
		url: 'http://svuxppbi1:3002/doObjeto/' + url, // Node.js Server REST Call
		type: "POST",
		dataType: "text",
			success: function(seed) {
				returnStatusRequest(seed,nomeObjeto);
				returnCountObjetos();
		}
	});

}
