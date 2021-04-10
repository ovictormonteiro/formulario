const regexEmail = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

const encurtador = e=>document.querySelector(e);
const formulario = encurtador('form');
const email = encurtador('.inputEmail'); 
const senha = encurtador('.inputSenha');  
let senhaConfere = false;
let emailConfere = false;
formulario.addEventListener('submit',(e)=>{
  e.preventDefault();  
  if(emailConfere){         
    if(senhaConfere){
      encurtador('.alerta.sucesso').classList.add('ativo');
    } else {
      senha.nextElementSibling.nextElementSibling.classList.remove('inativo');
      senha.nextElementSibling.nextElementSibling.classList.add('ativo');
      setTimeout(()=>{
        senha.nextElementSibling.nextElementSibling.classList.remove('ativo');
        senha.nextElementSibling.nextElementSibling.classList.add('inativo');
      },3000)
    }
  } else {
    senhaConfere = false;
    email.nextElementSibling.classList.remove('inativo');
    email.nextElementSibling.classList.add('ativo');
    setTimeout(()=>{
      email.nextElementSibling.classList.remove('ativo');
      email.nextElementSibling.classList.add('inativo');
    },3000)
  }
})



function confereEmail(){
  email.addEventListener('keyup',()=>{
    if(regexEmail.test(email.value)){
      return emailConfere = true;    
    } else {      
      return emailConfere = false;      
    }
  })
}
confereEmail();

function confereSenha(){
   // ====Campo da Senha====  
  senha.addEventListener('keyup',(e)=>{
    // ====Regex====
    const regNum = /[0-9]/;
    const regCE = /[\@\ \#\!]/;
    const regLMA = /[A-Z]/;
    const regLMI = /[a-z]/;
  
    // ====Conferencias====
    const confNum = regNum.test(e.target.value);
    const confCE = regCE.test(e.target.value);
    const confLMA = regLMA.test(e.target.value);
    const confLMI = regLMI.test(e.target.value);
    const confTa = e.target.value.length > 8;    
    if(confNum){
      encurtador('.Numeros span').innerHTML = '😁';
    } else {
      encurtador('.Numeros span').innerHTML = '😭';
    }
    if(confCE){
      encurtador('.caracteresEspeciais span').innerHTML = '😁';
    } else {
      encurtador('.caracteresEspeciais span').innerHTML = '😭';
    }
    if(confLMA){
      encurtador('.letrasMaiusculas span').innerHTML = '😁';
    } else {
      encurtador('.letrasMaiusculas span').innerHTML = '😭';
    }
    
    if(confLMI){
      encurtador('.letrasMinusculas span').innerHTML = '😁';
    } else {
      encurtador('.letrasMinusculas span').innerHTML = '😭';
    }
    if(confTa){
      encurtador('.Tamanho span').innerHTML = '😁';
    } else {
      encurtador('.Tamanho span').innerHTML = '😭';
    }
    // ====Conferência final====
    if((confLMA && confCE && confLMI && confNum && confTa) === true){
      senhaConfere = true;
    } else {
      senhaConfere = false;
    }
  })
}
confereSenha();