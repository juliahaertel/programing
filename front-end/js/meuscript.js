$(function() { 
    
 
    function exibir_girassol() {
        $.ajax({
            url: 'http://localhost:5000/listar_girassol',
            method: 'GET',
            dataType: 'json', 
            success: listar, 
            error: function() {
                alert("erro ao ler dados, verifique o backend");
            }
        });
        function listar (girassol) {
            
            $('#corpoTabelaGirassol').empty();
         
            mostrar_conteudo("tabelaGirassol");      
          
            for (var i in girassol) { 
                lin = '<tr>' + 
                '<td>' + girassol[i].nome + '</td>' + 
                '<td>' + girassol[i].dataplantio + '</td>' + 
                '<td>' + girassol[i].diametroflor + '</td>' + 
                '</tr>';
             
                $('#corpoTabelaGirassol').append(lin);
            }
        }
    }

    
    function mostrar_conteudo(identificador) {
      
        $("#tabelaGirassol").addClass('invisible');
        $("#conteudoInicial").addClass('invisible');
        $("#"+identificador).removeClass('invisible');      
    }

   
    $(document).on("click", "#linkListarGirassol", function() {
        exibir_girassol();
    });
    
    
    $(document).on("click", "#linkInicio", function() {
        mostrar_conteudo("conteudoInicial");
    });

  
    $(document).on("click", "#btIncluirGirassol", function() {
      
        nome = $("#campoNome").val();
        dataplantio = $("#campoDataplantio").val();
        diametroflor = $("#campoDiametroflor").val();
      
        var dados = JSON.stringify({ nome: nome, dataplantio: dataplantio, diametroflor: diametroflor });
     
        $.ajax({
            url: 'http://localhost:5000/incluir_girassol',
            type: 'POST',
            dataType: 'json', 
            contentType: 'application/json', 
            data: dados, 
            success: girassolIncluido, 
            error: erroAoIncluir
        });
        function girassolIncluido (retorno) {
            if (retorno.resultado == "ok") { 
                
                alert("Cachorro incluído com sucesso!");
              
                $("#campoNome").val("");
                $("#campoDataplantio").val("");
                $("#campoDiametroflor").val("");
            } else {
               
                alert(retorno.resultado + ":" + retorno.detalhes);
            }            
        }
        function erroAoIncluir (retorno) {
           
            alert("ERRO: "+ retorno.resultado + ":" + retorno.detalhes);
        }
    });


    $('#modalIncluirGirassol').on('hide.bs.modal', function (e) {
        
        if (! $("#tabelaGirassol").hasClass('invisible')) {
    
            exibir_girassol();
        }
    });

    
    mostrar_conteudo("conteudoInicial");
});