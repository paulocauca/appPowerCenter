var folder = '';
var wf 		=' ';
var escolha 		=' ';

function verificaEscolha(){
	
		folder  	= $("#formShowLog input[name=inputFolder]").val()	
		wf 		= $("#formShowLog input[name=inputWf]").val()	
		escolha = $("#formShowLog select[name=optionPowerCenter]").val()
		
		
		

		if((folder == '' ) || (wf == '' ) || (escolha == '')  ){
			alert('Favor preencher todos os campos !')
		} else{
			$('#resultFeeder').html('<br /> <br /> <div class="progress"><div class="progress-bar" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: 100%;">Carregando ...</div></div>')
			window[escolha.valueOf()](); // chama função escolhida
		}
		
		
}

function showLog(){
	var output = ''	;
	
	$.post('showLogPowerCenter/', {
							folder : folder,
							wf : wf
						
						}, function (data,status) {
							data = data.split('\n');
							$.each(data, function( i, value ) {
							
							if(value.match(/ORA-/)){
								output += '<h4><strong><code >' + value + '</code></strong></h4>'
								
							}else{
								output += '<h6><samp>' + value + '</samp></h6>'
							}
								
							});
							$('#resultFeeder').html(output);
							
	})
					
}


function showModifiedProcess() {

    var output = '';

    $.post('showModifiedProcess/', {
        wf : wf
    }, function (data,status) {



        data = data.split('], [');


    	output = '';
        output += '<table class="table">' +
			'<th>FOLDER</th>' +
			'<th>COMENTARIO</th>' +
			'<th>OBJ</th>' +
			'<th>TIPO</th>' +
			'<th>VERSION</th>' +
			'<th>MACHINE</th>' +
			'<th>DATE</th>';


        $.each(data, function( i, value ) {

        	value = value.split(',');

        	output += '<tr>';
			output += '<td>'+ value[0].replace("[[","").replace(/'/g,"") +'</td>';
			output += '<td>'+ value[1].replace(/'/g,"") +'</td>';
			output += '<td>'+ value[2].replace(/'/g,"") +'</td>';
			output += '<td>'+ value[3].replace(/'/g,"") +'</td>';
			output += '<td>'+ value[4].replace(/'/g,"") +'</td>';
			output += '<td>'+ value[5].replace(/'/g,"") +'</td>';
			output += '<td>'+ value[6].replace("]]","").replace(/'/g,"") +'</td>';
        	output += '</tr>';

        });


        // $.each(data, function( i, value ) {
        //     console.log(value[4]);
        //
        //     output += '<h4><strong><code >' + value + '</code></strong></h4>'
        //
        // });


        // $.each(data, function( i, value ) {
        //
        //
        //     if(value.match(/ORA-/)){
        //         output += '<h4><strong><code >' + value + '</code></strong></h4>'
        //
        //     }else{
        //         output += '<h6><samp>' + value + '</samp></h6>'
        //     }
        // });

        output += '</table>';

        $('#resultFeeder').html(output);

    })


}

