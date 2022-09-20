
let hexEl=document.getElementById("hexInput");
let colorEl=document.getElementById("inputColor");
let sliderTextEl=document.getElementById("sliderText");
let sliderEl=document.getElementById("slider");
let alterEl=document.getElementById("alteredColor");
let alterText=document.getElementById("altered-el");
let lightenText = document.getElementById('lightenText');
let darkenText = document.getElementById('darkenText');
let toggleBtn = document.getElementById('toggleBtn');


//Now we are going to check whether the toggled button is toggled or not so for that we are going to add an event listener
toggleBtn.addEventListener('click',function(){
    if(toggleBtn.classList.contains('toggled')){
        toggleBtn.classList.remove('toggled');
        lightenText.classList.remove('unselected');
        darkenText.classList.add('unselected');
    }else{
        toggleBtn.classList.add('toggled');
        lightenText.classList.add('unselected');
        darkenText.classList.remove('unselected');
    }reset();
})

//We are going to use keyup so that whatever hex value we are going to write in the textbox it automatically gets displayed in the required field.

hexEl.addEventListener('keyup',function(){
    const hex=hexEl.value;
    if(!check(hex)){
        return;
    }
    const strippedHex=hex.replace('#','');
    colorEl.style.backgroundColor='#'+strippedHex;//We are adding hastag because the colors are saved according to their hastags values so if the hastag is not present then the background will not change
    reset();
})


function check(hex){
    if(!hex){
        return false;
    }
    const strippedHex=hex.replace('#','');
    return strippedHex.length===3 || strippedHex.length===6;
}

// console.log(check('#79929'));   

function convertHexToRgb(hex){
    if(!check(hex)){
        return null;
    }
    const strippedHex=hex.replace('#','');
    if(strippedHex.length===3){
        strippedHex=strippedHex[0]+strippedHex[0]+strippedHex[1]+strippedHex[1]+strippedHex[2]+strippedHex[2];
    }
    const r=parseInt(strippedHex.substring(0,2),16);//parseInt is used to convert string to int value
    const g=parseInt(strippedHex.substring(2,4),16);
    const b=parseInt(strippedHex.substring(4,6),16);
    return {r,g,b};
}

// console.log(convertHexToRgb('#111111'));

function convertRGBToHex(r,g,b){
    const pair1=('0'+r.toString(16)).slice(-2);// Here we are using sliing because we have to take only last two digits 
    const pair2=('0'+g.toString(16)).slice(-2);// Here the method twoString converts the decimal into string with base 16.
    const pair3=('0'+b.toString(16)).slice(-2);

    const finalHex='#'+pair1+pair2+pair3;

    return finalHex;
}

// So now we are going to add an event listener on the slider

sliderEl.addEventListener('input',function(){
    if(!check(hexEl.value)){
        return;
    }
    sliderTextEl.textContent=`${sliderEl.value}%`
    const valueAddition=toggleBtn.classList.contains('toggled')? -sliderEl.value : sliderEl.value;
    const alteredColor=alterColor(hexEl.value,valueAddition);
    alterEl.style.backgroundColor= alteredColor;
    alterText.style.color=alteredColor;
    alterText.textContent="Altered Color :- "+alteredColor;
})

function increaseWithinRange0to255(hex,amount){
    // let newHex=hex+amount;
    // if(hex>255){
    //     return 255;
    // }if(hex<0){
    //     return 0;
    // }return newHex;
    return Math.min(255, Math.max(0, hex + amount));
}

function alterColor(hex,percentage){
    const {r,g,b}=convertHexToRgb(hex);
    let amount=Math.floor((percentage/100)*255);

    let newR=increaseWithinRange0to255(r,amount);
    let newG=increaseWithinRange0to255(g,amount);
    let newB=increaseWithinRange0to255(b,amount);

    return convertRGBToHex(newR,newG,newB);

}

//Now we are going to create a function which resets the slider value to 0 and slider text content to 0% so that whenever user switch between darken and lighten its value gets automatically reset.
function reset(){
    sliderEl.value=0;
    sliderTextEl.textContent='0%';
    alterEl.style.backgroundColor=hexEl.value;
    alterText.textContent=`Altered Color :- ${hexEl.value}`;
}