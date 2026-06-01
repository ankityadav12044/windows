
function showRoom(type){

document
.querySelectorAll('.showroom-card')
.forEach(card=>card.classList.remove('active'));

if(type==="bokaro"){
document
.getElementById('bokaro-card')
.classList.add('active');
}

if(type==="bihar"){
document
.getElementById('bihar-card')
.classList.add('active');
}

}

