let nama;
let umur;

nama = prompt("Siapa Nama Anda?")
umur = prompt("Berapa Usia Anda?")

if(umur < 20){
    alert("Selamat Datang," +nama +",usia anda" + umur +",anda belum cukup umur");

}else if(umur <15 && umur>=15){
    alert("Selamat Datang," +nama +",usia anda" + umur +",anda terlalu muda");
}else if(umur <15){
    alert("Selamat Datang," +nama +",usia anda" + umur +",usia anda cukup");
}else{
    alert("Selamat Datang," +nama +",usia anda" + umur +",usia anda cukup");
}