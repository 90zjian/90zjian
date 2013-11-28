time=7000;//the time that the page reload.
money=1000;// the money that will filled to borrow.
isreload=true;
var text=document.getElementsByClassName("alert alert-error loan_cny_tips");
if(checkMoney()==false){
chrome.runtime.sendMessage({key:"haveMoney",value:false},function(response){
       	console.log("sended the message of noMoney");
	});
}
else{
chrome.runtime.sendMessage({key:"haveMoney",value:true},function(response){
       	console.log("sended the message of haveMoney");
	});
}
function checkMoney(){
   text=document.getElementsByClassName("alert alert-error loan_cny_tips");
   if(text.length==1){
	return false;   
   }else{
	return true;
	}
}
function borrowMoney(money_borrow){
	var currency=document.getElementById("currency_cny");
	var buy_btn=document.getElementsByClassName("buy_btn");
//	currency.value=money_borrow;
//	buy_btn.click();
	}

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log(sender.tab ?
                "from a content script:" + sender.tab.url :
                "from the extension");
    if(request.job == "reload"){
	sendResponse({result:"success"});
	location.reload();
	}
    else if(request.job == "borrowMoney"){
	borrowMoney(request.money);
	sendResponse({result:"success"});
    }
  });
