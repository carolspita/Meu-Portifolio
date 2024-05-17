var btn = document.querySelector('#show-or-hiden');
var container = document.querySelector('.container-escondido');

btn.addEventListener('click', function(){
    if(container.style.display === 'block' ){
        container.style.display = 'none';
    } else{
        container.style.display = 'block';
    }
});