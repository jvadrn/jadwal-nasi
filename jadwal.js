
/* script.js */
let data = JSON.parse(localStorage.getItem('data')) || [];
let anggota = JSON.parse(localStorage.getItem('anggota')) || [];
let masak = JSON.parse(localStorage.getItem('masak')) || [];

function save() {
  localStorage.setItem('data', JSON.stringify(data));
  localStorage.setItem('anggota', JSON.stringify(anggota));
  localStorage.setItem('masak', JSON.stringify(masak));
}

function showPage(id) {
  document.querySelectorAll('.page').forEach(p=>p.style.display='none');
  document.getElementById(id).style.display='block';
  render();
}

function getToday() {
  return new Date().toISOString().split('T')[0];
}

function render() {
  // view
  let todayList = document.getElementById('today');
  if(todayList){
    todayList.innerHTML='';
    data.filter(d=>d.tanggal===getToday()).forEach(d=>{
      let li=document.createElement('li');
      li.textContent = `${d.nama} - ${d.aksi}`;
      todayList.appendChild(li);
    });
  }

  // anggota
  let anggotaList = document.getElementById('anggotaList');
  if(anggotaList){
    anggotaList.innerHTML='';
    anggota.forEach((a,i)=>{
      let li=document.createElement('li');
      li.innerHTML = `${a} <button onclick="hapusAnggota(${i})">x</button>`;
      anggotaList.appendChild(li);
    });
  }

  // masak
  let masakList = document.getElementById('masakList');
  if(masakList){
    masakList.innerHTML='';
    masak.forEach((m,i)=>{
      let li=document.createElement('li');
      li.innerHTML = `${m} <button onclick="hapusMasak(${i})">x</button>`;
      masakList.appendChild(li);
    });
  }
}

function addAnggota(){
  let val = document.getElementById('anggotaInput').value;
  if(!val) return;
  anggota.push(val);
  save(); render();
}

function hapusAnggota(i){
  anggota.splice(i,1);
  save(); render();
}

function addMasak(){
  let val = document.getElementById('masakInput').value;
  if(!val) return;
  masak.push(val);
  save(); render();
}

function hapusMasak(i){
  masak.splice(i,1);
  save(); render();
}

render();