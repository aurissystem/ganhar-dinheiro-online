function scrollLogin(){
 document.getElementById('login').scrollIntoView({behavior:'smooth'});
}

function simular(){
 let valor = document.getElementById('valor').value;
 document.getElementById('resultado').innerText =
 "Você pode ganhar até R$" + (valor * 3) + " por mês usando IA";
}

function comprar(){
 alert("Envie PIX para liberar acesso: exemplo@email.com");
}

const API = "http://localhost:8080";

async function hashSenha(senha){
 const enc = new TextEncoder().encode(senha);
 const hash = await crypto.subtle.digest("SHA-256", enc);
 return Array.from(new Uint8Array(hash)).map(b=>b.toString(16).padStart(2,'0')).join('');
}

async function cadastrar(){
 let nome = document.getElementById('nome').value;
 let email = document.getElementById('emailCad').value;
 let senha = await hashSenha(document.getElementById('senhaCad').value);

 fetch(API+"/cadastro",{
  method:"POST",
  headers:{"Content-Type":"application/json"},
  body:JSON.stringify({nome,email,senha})
 }).then(r=>r.text()).then(t=>msg.innerText=t);
}

async function login(){
 let email = document.getElementById('email').value;
 let senha = await hashSenha(document.getElementById('senha').value);

 fetch(API+"/login",{
  method:"POST",
  headers:{"Content-Type":"application/json"},
  body:JSON.stringify({email,senha})
 }).then(r=>r.text()).then(t=>{
   if(t.includes("OK")) alert("Login feito");
   else msg.innerText=t;
 });
}