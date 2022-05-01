var jsonRanking = localStorage.getItem("ranking");
rankingInfo = JSON.parse(jsonRanking);

var str = rankingInfo.map(function(item){
    for (var key in item)
    console.log(item[key]);
        return item;

}).join("<br/>");
document.getElementById('OneRoundContainer').innerHTML = str;

var jsonRanking2 = localStorage.getItem("rankinginf");
rankingInfo2 = JSON.parse(jsonRanking);

var str2 = rankingInfo.map(function(item){
    for (var key2 in item2)
    console.log(item2[key2]);
        return item2;

}).join("<br/>");
document.getElementById('infRoundContainer').innerHTML = str;