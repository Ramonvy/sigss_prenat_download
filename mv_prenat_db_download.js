//Script pra download da lista em 'Pré-Natal'

function export2txt(data) {
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([JSON.stringify(data, null, 0)], {
      type: "text/plain"
    }));
    a.setAttribute("download", "page_1.txt");
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

//Retorna a 'página' de cadastros especificada
function getPage(page){
    //                                      /sigss/acompanhamentoPrenatal/getListGestante?status=TODOS&isenFullPK=&unsaReferenciaFullPK=&risco=&idadeGestacionalSemanasInicial=&idadeGestacionalSemanasFinal=&idadeInicial=&idadeFinal=&gestanteVariasGestacoesAberto=false&unsaAtendimentoFullPK=&areaFullPK=&semarea=false&semconsulta=false&prnaFullPK=&dataInicial=&dataFinal=&consultasAtendidas=&exameSifis=false&exameHiv=false&_search=false&nd=1692381436425&rows=20&page=1&sidx=enti.entiNome&sord=asc
    var theUrl = window.location.origin + '/sigss/acompanhamentoPrenatal/getListGestante?status=TODOS&isenFullPK=&unsaReferenciaFullPK=&risco=&idadeGestacionalSemanasInicial=&idadeGestacionalSemanasFinal=&idadeInicial=&idadeFinal=&gestanteVariasGestacoesAberto=false&unsaAtendimentoFullPK=&areaFullPK=&semarea=false&semconsulta=false&prnaFullPK=&dataInicial=&dataFinal=&consultasAtendidas=&exameSifis=false&exameHiv=false&_search=false&nd=1692381436425&rows=5000&page=' + page + '&sidx=enti.entiNome&sord=asc';
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
    xmlHttp.send( null );
    data = JSON.parse(xmlHttp.responseText);
    return data;
}

//Baixa todos os cadastros atualmente disponiveis na base
function getFullyDb(){
    let total = -1;
    let drop = {"page":1,"total":1,"records":0,"rows":[]};

    for(let i = 1; i <= total || total == -1; i++){
        var page = getPage(i);
        console.log('Page ' + i + '/' + total + ' downloaded...');

        if(total == -1){
            total = page['total'];
        }

        drop['rows'] = drop['rows'].concat(page['rows']);
    }

    drop['records'] = drop['rows'].length;

    export2txt(drop);
}

getFullyDb();