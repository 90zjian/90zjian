time=7000;
money=1000;
isreload=false;
function playSound(){
	console.log("playSound");
	var audio=document.getElementById("audiotab");
	console.log(audio.id);
	audio.play();
	}
function stopSound(){
	var audio=document.getElementById("audiotab");
	console.log(audio.id);
	audio.pause();
	}
function sendAction(theJob,theMoney){
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
	    chrome.tabs.sendMessage(tabs[0].id, {job:theJob,money:theMoney }, function(response) {console.log("send the job");});  
	});
}
function sendReloadAndTimeout(timeout){
    setTimeout(function(){
	if(window.isreload==true){
		sendAction("reload",0);
	}
    },timeout);
}
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if(request.key == "haveMoney"){
	if(request.value == false){
	    console.log("no Money");
	    sendReloadAndTimeout(window.time);
	}
  	else if(request.value == true){
	    playSound();
	    sendAction("borrowMoney",window.money);
	}
    }
   else if(request.key=="isreload"){
	window.isreload=request.value;
	console.log(window.isreload);
	if(request.value==true){
	    window.isreload=true
	    sendReloadAndTimeout(1000);//the page will reload in one second after pressed the 'autoReload' button
	}
	}
    else if(request.key=="time"){
	if (parseInt(request.value)>1000)
	    window.time=parseInt(request.value);
	    console.log(window.time+"-window.time");
	}
    else if(request.key=="money"){
	if (parseInt(request.value)>0)
	    window.money=parseInt(request.value)
	    console.log(window.money+"-window.money");
	}
    else if(request.key=="sound" && request.value=="stop" ){
	stopSound();
	}
  sendResponse({result:"success"});
  });
