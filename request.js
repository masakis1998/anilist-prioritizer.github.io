/*
var tagList = ["Amnesia"
      ,"Anti-Hero"
      ,"Battle Royale"
      ,"Boys' Love"
      ,"Classic Literature"
      ,"Coming of Age"
      ,"Cute Girls Doing Cute Things"
      ,"Cyberpunk"
      ,"Dystopian"
      ,"Ensemble Cast"
      ,"Episodic"
      ,"Family Life"
      ,"Female Protagonist"
      ,"Food"
      ,"Fugitive"
      ,"Harem"
      ,"Historical"
      ,"Idol"
      ,"Isekai"
      ,"Iyashikei"
      ,"Josei"
      ,"LGBTQ Issues"
      ,"Love Triangle"
      ,"Magic"
      ,"Male Protagonist"
      ,"Military"
      ,"Philosophy"
      ,"Politics"
      ,"Primarily Adult Cast"
      ,"Primarily Child Cast"
      ,"Primarily Female Cast"
      ,"Primarily Male Cast"
      ,"Revenge"
      ,"Reverse Harem"
      ,"School"
      ,"Seinen"
      ,"Shoujo"
      ,"Shounen"
      ,"Space"
      ,"Survival"
      ,"Time Skip"
      ,"Tragedy"
      ,"Video Games"
      ,"War"
      ,"Work"
      ,"Yuri"];

var genreList = [
      "Action",
      "Adventure",
      "Comedy",
      "Drama",
      "Ecchi",
      "Fantasy",
      "Hentai",
      "Horror",
      "Mahou Shoujo",
      "Mecha",
      "Music",
      "Mystery",
      "Psychological",
      "Romance",
      "Sci-Fi",
      "Slice of Life",
      "Sports",
      "Supernatural",
      "Thriller"
    ];
*/
//var formatList = ['TV', 'MOVIE','OVA', 'ONA', 'SPECIAL', 'TV_SHORT', 'MUSIC'];
//var sourceList = ['ORIGINAL', 'MANGA', 'LIGHT_NOVEL', 'VISUAL_NOVEL', 'VIDEO_GAME', 'OTHER'];

var basicFeatures = [
  "averageScore",
  "meanScore",
  "year",
  "popularity",
  "favourites",
  "episodes",
  "duration"
];

$(document).ready(function(){$('.datafetch').click(fetchALdata)});
//$('.datafetchfirst').ready(function(){$('.datafetchfirst').click(fetchALdata)});
$(document).ready(function(){$('.prediction').click(createIOMatrix)});
$(document).ready(function(){$('.onetitle').click(predictOneTitle)});
$(document).ready(function(){$('.clear').click(clearList)});
$(document).ready(function(){$('.changeuser').click(changeUser)});
$(document).ready(function(){$('.help').click(addHelp)});
$(document).ready(function(){
  if (!localStorage.getItem("username")){
    //$(".input").append('<div style="font-size:45px;">Enter Your Username:</div>');
    $(".input").append('<input type="text" id="input" class="userName" placeholder="Enter Your Username" style="background-color:rgb(34,39,51);border-block-color:transparent;border-inline-color:transparent;border-color: transparent;-webkit-border-radius:20px;height:140px;width:590px;font-size:50pt;color:#EEE;padding:20px;margin-top: 17%;">');
    $(".input").append('<br id="input">');
    $(".input").append('<button type="button" id="input" onclick="fetchALdata()" class="datafetchfirst" style="background-color:rgb(34,39,51);width:250px;height:60px;font-size:40px;margin-top:30px;border-radius:15px;border-block-color:transparent;border-inline-color:transparent;border-color: transparent;color:#999;">Get Started!</button>');
  }
  else {
    addAvator();
  }
});

function addHelp(){
  $(".finished").remove();
  $(".resultTable").remove();
  $(".input").empty();
  var wrapper = $('<div style="width:800px;text-align:center;margin-left:21%;margin-top:70px;"></div>');
  var poly = $('<div style="text-align:center;display:flex;flex-direction:column;"></div>');
  poly.append('<div style="font-size:30px;font-weight:bold;margin-bottom:10px;">How Predict PTW Works</div>');
  poly.append('<div style="font-size:22px;">Polynomial Regression is used to predict scores.</div>');
  poly.append('<div style="font-size:22px;">Simplified Polynomial Regression equation is following.</div>');
  poly.append('<div style="font-size:25px;">a + b*x^(1/s) + c*x^(2/s) +...+ + z*x^(n/s)</div>');
  poly.append('<div style="font-size:22px;">n is order and s is step.</div>');
  poly.append('<div style="font-size:22px;">n is in range [1, 20] and s is in range [1, 10].</div>');
  poly.append('<div style="font-size:22px;">Recommended value for n is 3~5.</div>');
  poly.append('<div style="font-size:22px;">Recommended value for s is 1.</div>');
  poly.append('<div style="font-size:22px;">Depending on the value, prediction score can be unusual like -300.</div>');
  poly.append('<div style="font-size:22px;">Please adjust order/step value accordingly.</div>');

  var one = $('<div style="margin-top:20px;text-align:center;display:flex;flex-direction:column;"></div>');
  one.append('<div style="font-size:30px;font-weight:bold;margin-bottom:10px;margin-top:20px;">How Predict a Title Works</div>');
  one.append('<div style="font-size:22px;">This feature can predict a title that is not in your PTW.</div>');
  one.append('<div style="font-size:22px;">Predict by simply entering Anilist ID next to the button.</div>');
  one.append('<div style="font-size:22px;">Anilist ID can be found in URL of entry on AL.</div>');
  one.append('<div style="font-size:22px;">For example, URL for Cowboy Bebop is https://anilist.co/anime/1/Cowboy-Bebop/</div>');
  one.append('<div style="font-size:22px;">1 is the Anilist ID for Cowboy Bebop.</div>');


  wrapper.append(poly);
  wrapper.append(one);
  $(".input").append(wrapper);
}

function addAvator(){
  $(".avatar").append('<div style="font-size:23px;margin-right:12px;margin-top:13px;">'+localStorage.getItem("username")+'</div>');
  $(".avatar").append('<img src="'+ localStorage.getItem("photo")+'" width="50" height="50" style="margin-right:5px;">');
}

function changeUser(){
  localStorage.removeItem("username");
  localStorage.removeItem("listData");
  $(".input").empty();
  $(".finished").remove();
  $(".resultTable").remove();
  $(".avatar").empty();
  $(".input").append('<input type="text" id="input" class="userName" placeholder="Enter Your Username" style="background-color:rgb(34,39,51);border-block-color:transparent;border-inline-color:transparent;-webkit-border-radius:20px;height:140px;width:590px;font-size:50pt;color:#EEE;padding:20px;margin-top: 17%;">');
  $(".input").append('<br id="input">');
  $(".input").append('<button type="button" id="input" onclick="fetchALdata()" class="datafetchfirst" style="background-color:rgb(34,39,51);width:250px;height:60px;font-size:40px;margin-top:30px;border-radius:15px;border-block-color:transparent;border-inline-color:transparent;color:#999;">Get Started!</button>');

}

function clearList(){
  localStorage.removeItem("listData");
  $(".clear").empty();
  $(".clear").append("Cleared!");
}

function createMatForOne(id, datalist){
  var order = parseInt($(".order").val())+1;
  var step = parseInt($(".step").val());

  var result = [];
  for(var j=0; j<basicFeatures.length; j++){
    for(var k=1; k<order; k++){
      if(datalist[basicFeatures[j]]){
        result.push(1*Math.pow(datalist[basicFeatures[j]], k/step));
      }
      else{
        result.push(0);
      }
    }
  }

  for(var k=1; k<order; k++){
    result.push(1*Math.pow(datalist["episodes"]*datalist["duration"], k/step));
  }

  result.push(1);

  return [result];
}

async function predictOneTitle(){
  $(".finished").remove();
  $(".resultTable").remove();
  $(".input").empty();
  var comp = JSON.parse(localStorage.getItem("comp"));
  var train = await createMat(comp);
  localStorage.setItem("train", JSON.stringify(train));

  console.log(train);

  var id = parseInt($(".ALid").val());

  var media = await fetchMedia(id);
  if(!media){
    $(".result").append('<div class="finished" style="font-size:40px;margin-top: 15%;margin-left: -2%;">Invalid AL id</div>');
    return;
  }
  media = media['data']['Media'];

  var datalist = {};
  datalist['averageScore'] = media['averageScore'];
  datalist['duration'] = media['duration'];
  datalist['episodes'] = media['episodes'];
  datalist['coverImage'] = media['coverImage'];
  //datalist['format'] = data['format'];
  datalist['favourites'] = media['favourites'];
  //datalist['genres'] = data['genres'];
  datalist['meanScore'] = media['meanScore'];
  datalist['year'] = media['startDate']['year'];
  datalist['popularity'] = media['popularity'];
  //datalist['source'] = data['source'];
  if(media['title'][localStorage.getItem("language")]){
    datalist['title'] = media['title'][localStorage.getItem("language")];
  }
  else{
    datalist['title'] = media['title']['romaji'];
  }



  var test = await createMatForOne([{mediaId:id}], datalist);

  var target = await trainTarget();
  localStorage.setItem("target", JSON.stringify(target));

  console.log(target);

  var coeff = await createPolyfit(train, target);
  localStorage.setItem("coeff", JSON.stringify(coeff));

  console.log(coeff);

  var prediction = await predictPolyfit(test, coeff);
  console.log(prediction);

  var result = {};
  result["image"] = '<a href="https://anilist.co/anime/'+id+'" target="_blank"><img src="'+media["coverImage"]["large"]+'" height="150" width="100" style="border-radius:5px;"></a>' ;
  //temp["mediaId"] = plan[i]["mediaId"];
  if(media["title"][localStorage.getItem("language")]){
    result["title"] = media["title"][localStorage.getItem("language")];
  }
  else{
    result["title"] = media["title"]['romaji'];
  }

  result["prediction"] = Math.round(((prediction[0]))*100)/100;

  createTable([result], $(".result"));
}

function createMat(list){
  var order = parseInt($(".order").val())+1;
  var step = parseInt($(".step").val());

  var listD = JSON.parse(localStorage.getItem("listData"));
  var keysData = [];
  for(var k in listD){keysData.push(k)};

  var result = [];
  for (var i=0; i<list.length; i++){
    if(!keysData.includes(list[i]["mediaId"].toString())){
      continue;
    }
    var temp = [];
    for(var j=0; j<basicFeatures.length; j++){

      for(var k=1; k<order; k++){
        if(listD[list[i]["mediaId"]][basicFeatures[j]]){
          temp.push(1*Math.pow(listD[list[i]["mediaId"]][basicFeatures[j]], k/step));
        }
        else{
          temp.push(0);
        }
      }
    }

    for(var k=1; k<order; k++){
      temp.push(1*Math.pow(listD[list[i]["mediaId"]]["episodes"]*listD[list[i]["mediaId"]]["duration"], k/step));
    }

    /*
    var format = 0;
    for(var j=0; j<formatList.length; j++){
      if (listD[list[i]["mediaId"]]["format"]==formatList[j]){
        format += j;
      }
    }
    temp.push(format);

    var source = 0;
    for(var j=0; j<sourceList.length; j++){
      if (listD[list[i]["mediaId"]]["source"]==sourceList[j]){
        source+=j;
      }
    }
    temp.push(source);


    /*
    var genre = 0;
    for(var j=0; j<genreList.length; j++){
      if (listD[list[i]["mediaId"]]["genres"].includes(genreList[j])){
        genre += j;
      }
    }
    temp.push(genre);
    */

    /*
    var tag = 0;
    for(var j=0; j<tagList.length; j++){
      if (listD[list[i]["mediaId"]]["tags"].includes(tagList[j])){
        tag +=j;
      }
    }
    temp.push(tag);
    */



    temp.push(1);
    result.push(temp);
  }
  //console.log(result);
  return result;
}

function trainTarget(){
  var comp = JSON.parse(localStorage.getItem("comp"));
  //console.log(comp);
  var result = [];

  for(var i=0; i<comp.length; i++){
    if(comp[i]["score"]>0){
      result.push(comp[i]["score"]);
    }
  }
  return result;
}

async function createIOMatrix(){
  $(".finished").remove();
  $(".resultTable").remove();
  $(".input").empty();
  var comp = JSON.parse(localStorage.getItem("comp"));
  var train = await createMat(comp);
  localStorage.setItem("train", JSON.stringify(train));

  console.log(train);

  var plan = JSON.parse(localStorage.getItem("plan"));
  var test = await createMat(plan);
  localStorage.setItem("test", JSON.stringify(test));

  console.log(test);

  var target = await trainTarget();
  localStorage.setItem("target", JSON.stringify(target));

  console.log(target);

  var coeff = await createPolyfit(train, target);
  localStorage.setItem("coeff", JSON.stringify(coeff));

  console.log(coeff);

  var prediction = await predictPolyfit(test, coeff);
  localStorage.setItem("prediction", JSON.stringify(prediction));

  console.log(prediction);

  await setPrediction();

  var result = JSON.parse(localStorage.getItem("result"));

  createTable(result, $(".result"));
}

function compare( a, b ) {
  if ( a["prediction"] < b["prediction"] ){
    return 1;
  }
  if ( a["prediction"] > b["prediction"] ){
    return -1;
  }
  return 0;
}
function standardDeviation(values){
  var avg = average(values);

  var squareDiffs = values.map(function(value){
    var diff = value - avg;
    var sqrDiff = diff * diff;
    return sqrDiff;
  });

  var avgSquareDiff = average(squareDiffs);

  var stdDev = Math.sqrt(avgSquareDiff);
  return stdDev;
}

function average(data){
  var sum = data.reduce(function(sum, value){
    return sum + value;
  }, 0);

  var avg = sum / data.length;
  return avg;
}

function setPrediction(){
  var plan = JSON.parse(localStorage.getItem("plan"));
  var prediction = JSON.parse(localStorage.getItem("prediction"));
  var ave = average(prediction);
  var std = standardDeviation(prediction);
  for (i = 0; i < prediction.length; i++) {
    //prediction[i] = Math.round(((prediction[i]-ave)/std)*100)/100;
    prediction[i] = Math.round(((prediction[i]))*100)/100;
  }

  var listD = JSON.parse(localStorage.getItem("listData"));
  var result = [];
  for(var i=0; i<plan.length; i++){
    temp = {};
    temp["image"] = '<a href="https://anilist.co/anime/'+plan[i]["mediaId"]+'" target="_blank"><img src="'+listD[plan[i]["mediaId"].toString()]["coverImage"]["large"]+'" height="150" width="100" style="border-radius:5px;"></a>' ;
    //temp["mediaId"] = plan[i]["mediaId"];
    temp["title"] = listD[plan[i]["mediaId"].toString()]["title"];
    temp["prediction"] = prediction[i];
    result[i] = temp;
  }
  result.sort( compare );
  localStorage.setItem("result", JSON.stringify(result));
}

function predictPolyfit(x, coeff){
  return numeric.transpose(numeric.dot(x, coeff))[0];
}

function createPolyfit(x, y){
  var xMatrix = x;
  var yMatrix = numeric.transpose([y]);

  var xMatrixT = numeric.transpose(xMatrix);
  var dot1 = numeric.dot(xMatrixT,xMatrix);
  console.log("a");
  var dotInv = numeric.inv(dot1);
  console.log("b");
  var dot2 = numeric.dot(xMatrixT,yMatrix);
  var solution = numeric.dot(dotInv,dot2);
  return solution;
}




async function fetchALdata(){
  $(".finished").remove();
  $(".resultTable").remove();
  await fetchUserList();
  await cleanComp();
  await storeList();
  $(".input").empty();
  await createListOfAllEntries();
  await fetchAllMedia();
  await inputScore();
  console.log(JSON.parse(localStorage.getItem("comp")));
  console.log(JSON.parse(localStorage.getItem("plan")));
  console.log(JSON.parse(localStorage.getItem("listData")));
}

function inputScore(){
  var listD = JSON.parse(localStorage.getItem("listData"));
  var listJ = JSON.parse(localStorage.getItem("listJson"));

  var keys = [];
  for(var k in listJ){keys.push(k)};

  var keysData = [];
  for(var k in listD){keysData.push(k)};

  for(var i=0; i<keysData.length; i++){
    if (keys.includes(keysData[i])){
      listD[keysData[i]]["score"] = listJ[keysData[i]]["score"];
    }
    else{
      delete listD[keysData[i]];
    }
  }
  localStorage.setItem("listData", JSON.stringify(listD));
}

function createListOfAllEntries(){
  if (!localStorage.getItem("listData")){
    localStorage.setItem("listData", JSON.stringify({}));
  }
  var listD = JSON.parse(localStorage.getItem("listData"));

  var listJ = JSON.parse(localStorage.getItem("listJson"));
  var listR = JSON.parse(localStorage.getItem("listRemainings"));

  var keys = [];
  for(var k in listJ){keys.push(k)};

  var keysData = [];
  for(var k in listD){keysData.push(k)};

  localStorage.setItem("listEntries", JSON.stringify(keys));
  //localStorage.setItem("listRemainings", JSON.stringify(keys));
  //console.log(keys.filter(x => !keysData.includes(x)));
  localStorage.setItem("listRemainings", JSON.stringify(keys.filter(x => !keysData.includes(x))));
}

async function fetchAllMedia(){
  $(".loading").append('<div class="load" style="font-size:40px;margin-top:13%;">Loading</div><img class="load" src="img/load.gif" width="170" style="margin-top:20px;">');
  var listR = JSON.parse(localStorage.getItem("listRemainings"));

  var interval = setInterval(async function(){
    if(listR.length<=0) {
      clearInterval(interval);
      $(".load").remove();
      $(".loading").append('<div class="finished" style="font-size:40px;margin-top:15%;">Finished!</div>');
    }
    var id = listR[0];
    var listD = JSON.parse(localStorage.getItem("listData"));
    var data = await fetchMedia(id);
    //console.log(data);
    //console.log(listR.length);
    $(".count").remove();
    $(".load").append('<div class="count" style="font-size:30px;margin-top:5px;">'+listR.length+' Remaining</div>');

    listD = await alterMediaData(listD, id, data);

    listR.shift();

    localStorage.setItem("listData", JSON.stringify(listD));
    localStorage.setItem("listRemainings", JSON.stringify(listR));

  }, 1000);
}

async function alterMediaData(listJ, id, data){

        listJ[id.toString()] = {};
        data = data['data']['Media'];

        listJ[id.toString()]['averageScore'] = data['averageScore'];
        listJ[id.toString()]['duration'] = data['duration'];
        listJ[id.toString()]['episodes'] = data['episodes'];
        listJ[id.toString()]['coverImage'] = data['coverImage'];
        //listJ[id.toString()]['format'] = data['format'];
        listJ[id.toString()]['favourites'] = data['favourites'];
        //listJ[id.toString()]['genres'] = data['genres'];
        listJ[id.toString()]['meanScore'] = data['meanScore'];
        listJ[id.toString()]['year'] = data['startDate']['year'];
        listJ[id.toString()]['popularity'] = data['popularity'];
        //listJ[id.toString()]['source'] = data['source'];
        if (data['title'][localStorage.getItem("language")]){
          listJ[id.toString()]['title'] = data['title'][localStorage.getItem("language")];
        }
        else{
          listJ[id.toString()]['title'] = data['title']['romaji'];
        }


        //listJ[id.toString()]['tags'] = await createTagList(data['tags']);

        return listJ;

        function createTagList(tags){
          var tempList = [];
          for (var i=0; i<tags.length; i++){
            if (tagList.includes(tags[i]['name'])){
              tempList.push(tags[i]['name']);
            }
          }
          return tempList;
        }
}

function fetchMedia(id){
  const query = `query a($id: Int){

    Media(id: $id,type: ANIME){
    	title {
    	  romaji
        english
        native
    	}
      startDate {
        year
      }
    	format
      favourites
    	episodes
      duration
    	genres
    	tags {
        name
    	}
    	averageScore
    	meanScore
      source
    	popularity
    	coverImage {
    	  large
    	}
    }
}`;

  // Define our query variables and values that will be used in the query request
  var variables = {
      id: id
  };

  // Define the config we'll need for our Api request
  var url = 'https://graphql.anilist.co',
      options = {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
          },
          body: JSON.stringify({
              query: query,
              variables: variables
          })
      };


  // Make the HTTP Api request
  return fetch(url, options).then(handleResponse)
                     .then(handleData)
                     .catch(handleError);




  function handleResponse(response) {
      return response.json().then(function (json) {
          return response.ok ? json : Promise.reject(json);
      });
  }

  function handleData(data) {
    return data;
  }

  function handleError(error) {
      console.error(error);
  }
}

async function fetchUserList(){

    const query = `query a($userName: String){

        MediaListCollection(userName: $userName, type: ANIME, sort: MEDIA_ID){
          lists {
            entries {
              mediaId
              score
            }
            name
            isCustomList
          }
        }
    }`;

    // Define our query variables and values that will be used in the query request
    if (localStorage.getItem("username")){
      var username = localStorage.getItem("username");
    }
    else{
      var username = $(".userName").val();
      localStorage.setItem("username", username);
      await fetchUserPhoto();
      //$(".finished").remove();
    }

    var variables = {
        userName: username
    };

    // Define the config we'll need for our Api request
    var url = 'https://graphql.anilist.co',
        options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                query: query,
                variables: variables
            })
        };

    var comp = [];
    var plan = [];


    // Make the HTTP Api request
    fetch(url, options).then(handleResponse)
                       .then(handleData)
                       .catch(handleError);

    function handleResponse(response) {
        return response.json().then(function (json) {
            return response.ok ? json : Promise.reject(json);
        });
    }

    function handleData(data) {
        var j = data['data']['MediaListCollection']['lists'].length;
        var lists = data['data']['MediaListCollection']['lists'];

        for (var i=0;i<j;i++){
          if (!lists[i]['isCustomList']&&(lists[i]['name'] != 'Planning')){
            comp.push.apply(comp, lists[i]['entries'])
          }
          if (lists[i]['name'] == 'Planning'){
            plan = lists[i]['entries'];
          }
        }

        //$('.temp').html(comp[0]['mediaId']);
        //createTable(comp, $('.temp'));
        storeData();
        //createTable(localStorage.getItem("comp"), $('.temp'));
        //console.log(comp);
    }

    function storeData(){
      localStorage.setItem("comp", JSON.stringify(comp));
      localStorage.setItem("plan", JSON.stringify(plan));
    }

    function handleError(error) {
        console.error(error);
    }

}

function fetchUserPhoto(){
    const query = `query a($userName: String){
  User(name: $userName){
    avatar {
      medium
    }
    options{
      titleLanguage
    }
  }
}`;
    var username = localStorage.getItem("username");
    var variables = {
        userName: username
    };

    // Define the config we'll need for our Api request
    var url = 'https://graphql.anilist.co',
        options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                query: query,
                variables: variables
            })
        };


    // Make the HTTP Api request
    fetch(url, options).then(handleResponse)
                       .then(handleData)
                       .catch(handleError);

    function handleResponse(response) {
        return response.json().then(function (json) {
            return response.ok ? json : Promise.reject(json);
        });
    }

    function handleData(data) {
      localStorage.setItem("photo", data["data"]["User"]["avatar"]["medium"]);
      localStorage.setItem("language", data["data"]["User"]["options"]["titleLanguage"].toLowerCase());
      addAvator();;
    }

    function storeData(){
      localStorage.setItem("comp", JSON.stringify(comp));
      localStorage.setItem("plan", JSON.stringify(plan));
    }

    function handleError(error) {
        console.error(error);
    }

}

function cleanComp(){
  var comp = JSON.parse(localStorage.getItem("comp"));
  var result = [];
  for(var i=0; i<comp.length; i++){
    if(comp[i]["score"]>0){
      result.push(comp[i]);
    }
  }
  localStorage.setItem("comp", JSON.stringify(result));
  //console.log(JSON.parse(localStorage.getItem("comp")));
}

function storeList(){
  var comp = JSON.parse(localStorage.getItem("comp"));
  var plan = JSON.parse(localStorage.getItem("plan"));
  var listJson = {};
  for(var i=0; i<comp.length; i++){
    listJson[comp[i]['mediaId']] = {"score":comp[i]['score']};
  }
  for(var i=0; i<plan.length; i++){
    listJson[plan[i]['mediaId']] = {"score":plan[i]['score']};
  }
  localStorage.setItem("listJson", JSON.stringify(listJson));
}


/*
function createTable(list, selector){
  var keys = [];
  for(var k in list[0]){keys.push(k)};

  table = $('<table class="resultTable" align="center" cellspacing="10" style="margin-left:19%;margin-top:30px;padding-right:30px;background-color:rgba(16,20,25, 0.8);border-radius: 15px;"></table>');
  header = $('<tr style="padding-bottom:7px;"></tr>');
  for (var i=0; i<keys.length; i++){
    header.append('<th style="font-size:22px;font-weight:bold;">'+ keys[i] +'</th>');
  }
  table.append(header);

  for (var i=0; i<list.length; i++){
    row = $('<tr></tr>');
    for (var j=0; j<keys.length; j++){
      if(j==1){
        row.append('<th style="padding-right:30px;padding-left:30px;width: 460px;">'+ list[i][keys[j]] +'</th>');
      }
      else{
        row.append('<th style="padding-right:30px;padding-left:30px;">'+ list[i][keys[j]] +'</th>');
      }
    }
    table.append(row);
  }
  selector.append(table);
}
*/


function createTable(list, selector){
  var keys = [];
  for(var k in list[0]){keys.push(k)};

  table = $('<div class="resultTable" style="margin-left:20%;text-align:center;display:flex;flex-direction:column;"></table>');
  header = $('<div style="width:850px;background-color:rgb(25,29,38);border-radius:7px;display:flex;padding-bottom:12px;padding-top:10px;margin-top:40px;margin-bottom:10px;"></div>');
  for (var i=0; i<keys.length; i++){
    if(i==0){
      header.append('<div style="margin-left:20px;font-size:22px;font-weight:bold;">'+ keys[i] +'</div>');
    }
    else if(i==1){
      header.append('<div style="margin-left:290px;font-size:22px;font-weight:bold;">'+ keys[i] +'</div>');
    }
    else if(i==2){
      header.append('<div style="margin-left:245px;font-size:22px;font-weight:bold;">'+ keys[i] +'</div>');
    }
    else{
      header.append('<div style="font-size:22px;font-weight:bold;">'+ keys[i] +'</div>');
    }
  }
  table.append(header);

  for (var i=0; i<list.length; i++){
    row = $('<div style="height: 150px;width:850px;display:flex; margin-bottom:5px; background-color:rgb(25,29,38);border-radius:5px;"></div>');
    for (var j=0; j<keys.length; j++){
      if(j==1){
        row.append('<div style="padding-top:65px;padding-right:30px;padding-left:30px;width: 460px;">'+ list[i][keys[j]] +'</div>');
      }
      else if(j==2){
        row.append('<div style="padding-top:65px;padding-right:30px;padding-left:60px;">'+ list[i][keys[j]] +'</div>');
      }
      else{
        row.append('<div style="padding-right:30px;">'+ list[i][keys[j]] +'</div>');
      }
    }
    table.append(row);
  }
  selector.append(table);
}
