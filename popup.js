console.log("world");
function sendmsg(msg){
chrome.tabs.query({active:true,currentWindow:true},
function(tabs){
  chrome.tabs.sendMessage(tabs[0].id,{message:msg}, function(response){
console.log("response hello!");   
 //If you need a response, do stuff with it here
  });
});
}
chrome.extension.sendMessage({key:"isreload",value:"on"},function(response){
	console.log("the reload is on"+response.result);
})
document.addEventListener('DOMContentLoaded', function() {
  backgroundPage=chrome.extension.getBackgroundPage();
  document.getElementById('on').addEventListener('click', function() {
	console.log("clicked on input on");
	chrome.extension.sendMessage({key:"isreload",value:true},function(response){
	console.log("the reload is on"+response.result);
})
  });
  document.getElementById('off').addEventListener('click', function() {
	console.log("clicked on input off");
	chrome.extension.sendMessage({key:"isreload",value:false},function(response){
	console.log("the reload is on"+response.result);
})
  });
  document.getElementById('stop').addEventListener('click', function() {
        console.log("clicked on input stop");
	chrome.extension.sendMessage({key:"sound",value:"stop"},function(){
	})
  });
  document.getElementById('time_set').addEventListener('click', function() {
        var text_time=document.getElementById('time');
        var time=text_time.value;
	chrome.extension.sendMessage({key:"time",value:time},function(response){
	console.log("the reload is on"+response.result);
	})
	console.log("time:"+time);
  });
  document.getElementById('money_set').addEventListener('click', function() {
        var text_money=document.getElementById('money');
        var money=text_money.value;
	chrome.extension.sendMessage({key:"money",value:money},function(response){
	console.log("the reload is on"+response.result);
	})
	console.log("money:"+money);
  });
});
