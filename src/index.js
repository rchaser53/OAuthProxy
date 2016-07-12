window.onload = function(){
	document.querySelector("#submitBtn").addEventListener("click",(e)=>{
		var xhr = new XMLHttpRequest();
		xhr.open("GET","http://localhost:3000/proxy");
		xhr.onreadystatechange = function (){
			switch(xhr.readyState){
			case 4:
				if((200 <= xhr.status && xhr.status < 300) || (xhr.status == 304)){
					console.log(xhr)
				}else{
					console.log(xhr)
				}
				break;
			}
		};
		xhr.send(null);
	})
}
