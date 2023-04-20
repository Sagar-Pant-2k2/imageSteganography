//flag that indicates whether image has been selected or not
let file_uploded = 0;
let imageCanvas = document.querySelector('#imageCanvas');

//button used for file selection
const fileInput = document.querySelector("#files");


//this function displays the image as soon as image is selected
// let selectedFile = null;
console.log("hello world");
fileInput.addEventListener('change',(event)=>{
	file_uploded = 1;  //file uploaded
	let selectedFile = event.target.files[0];
  //created url to present selected image
	const url = URL.createObjectURL(selectedFile); 
	document.querySelector('.originalImage').src = url;
	// document.querySelector('.for-extraction').src = url;
	document.querySelector('.originalImage').classList.remove('hidden');
});

//encrypt is the button that will fire function for data hiding
const encrypt = document.querySelector('.encrypt');

encrypt.addEventListener('click',()=>{
	//only proceed if image has been selected
	if(file_uploded===1) {
    //main function start
		console.log('ready');
		createImageCanvas();
		document.querySelector('.download').style.display = "block";
    	// startHiding();
		document.querySelector('.result').style.display="flex";
		document.querySelector('.data-extracted').style.display = "none";
	}
	else alert("select image file");

});
		

function createImageCanvas(){
	// let selectedFile = fileInput.target.files;
	// imageCanvas.height = 
	let img = new Image();
	img.src = URL.createObjectURL(fileInput.files[0]);
	img.onload = function(){
		imageCanvas.width = img.width;
		imageCanvas.height = img.height;
		const ctx = imageCanvas.getContext("2d");
		ctx.drawImage(img, 0, 0);
		// console.log(img.height+" "+img.width);
		const imageData = ctx.getImageData(0,0,imageCanvas.width,imageCanvas.height);
		const pixelData = imageData.data;		//array containg pixel info
		// console.log("original pixel data " + pixelData);
		let message = document.querySelector('.content').value;
		message = ("Valid\n"+message);
		// console.log("message to be hidden" + message);
		
		const arr = [];


		//converting message to binary array
		for(let i=0;i<message.length;i++) {
			let x = message[i].charCodeAt(0);
			let  a=128;
			while(a>0){
				if(((a&x) === a)) {
					
					arr.push(1);
				}
				else arr.push(0);
				a>>=1;
				
			}	
		}
		
		//to make target pixels 0;
		
		// console.log("binary array of message " + arr);
		for (let i = 0; ((i < pixelData.length)); i += 1) {
			pixelData[i] &=252 ; 
		}
		
		//* *Reminder 
		// Write a case when text is too big

		//this part is to add data in last 2 bits

		let ctr=0;
		for(let i=0;i<arr.length;i+=2){
			pixelData[ctr] += (2*arr[i] + arr[i+1]);
			ctr++;
		}
		
		ctx.putImageData(imageData, 0, 0);
		// console.log("has it changed " + imageData.data);
		  
	}

	document.querySelector('.download').addEventListener('click',()=>{
		imageCanvas.toBlob(function(blob) {
			// Create a new anchor element with a download attribute
			const downloadLink = document.createElement('a');
			downloadLink.download = 'myCanvasImage.png';
		
			// Create a URL for the blob
			const url = URL.createObjectURL(blob);
		
			// Set the download link's href to the URL of the blob
			downloadLink.href = url;
		
			// Trigger a click on the download link to download the image
			downloadLink.click();
		
			// Release the URL object
			URL.revokeObjectURL(url);
		  }, 'image/png');
	});	

	//for Download button
	const download = document.querySelector('.download');
	download.href = img.src;
	
	
}



// logic for extract button
document.querySelector('.extract').addEventListener('click',()=>{
	if(file_uploded===1) {
		//main function start
			// document.querySelector('.extracted').classList.remove('hidden');

			document.querySelector('.result').style.display = "none";
			document.querySelector('.download').style.display = "none";	
			document.querySelector('.data-extracted').style.display = "flex";

			let imageCanvas2 = document.querySelector('#imageCanvas2');
			let img = new Image();
			img.src = URL.createObjectURL(fileInput.files[0]);
			img.onload = function(){
				imageCanvas2.width = img.width;
				imageCanvas2.height = img.height;
				let ctxt= imageCanvas2.getContext("2d");
				ctxt.drawImage(img, 0, 0);
				let imageData = ctxt.getImageData(0,0,imageCanvas2.width,imageCanvas2.height);
				const pixelData = imageData.data;
				// console.log(pixelData);
				const data_wali_array = [];
				for(let i=0;i<pixelData.length;i++){
					data_wali_array.push((((pixelData[i]&2)!=0)?1:0));
					data_wali_array.push(pixelData[i]&1);
				}
				console.log(data_wali_array);
				let ans="";
				let x = 0;
				let flag=1;
				let count=0;
				for(let i=0;i<data_wali_array.length;i++) {
					let a=1;
					console.log("hemlo");
					if(data_wali_array[i]==1){
						a<<=(7-i%8);
						x+=a;
						// continue;
					}
					if(i%8===7){
						count++;
						if(String.fromCharCode(x)==='\0'){
							break;
						}
						x%=128;
						// console.log('y');
						ans+=String.fromCharCode(x);
						x=0;
					}
					if(ans.length===5 &&  ans!=="Valid") {
						document.querySelector('.extracted-item').value = "";
						// console.log("not encoded" + ans); 
						// alert("no data hidden");
						document.querySelector('.notice').style.display = "block";
						console.log("not encoded" + ans); 
						flag=0;
						break;
					}
					// if(count>10000) break;
				}
				if(flag) {
					document.querySelector('.notice').style.display = "none";
					document.querySelector('.extracted-item').value = ans.substring(6);
					console.log(ans);
				}
				console.log("decoded");
			}
			
		}
		else alert("select image file");
});

