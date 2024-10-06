const sik = {
  kelas: "B",
  angkatan: "2023",
  walidosen: "Wildan",
}

console.log(sik.kelas);
console.log(sik.angkatan);
console.log(sik.walidosen);

const siKel = {}

siKel.atribut1 = "contoh atribut 1"
siKel.atribut2 = "contoh atribut 2"
siKel.atribut3 = "contoh atribut 3"
console.log(siKel.atribut1);

delete siKel.atribut1;

let orang = {
  name: "Wildan",
  age: 20,
  address: "Surakarta",
  kendaraan: {
    mobil: "fortuner",
    motor: "Ninja",
  }
}
console.log(orang.kendaraan.motor)

let tampil = "nama saya " + orang.name + ", saya bekerja sebagai " + orang.pekerjaan + " sehari-hari saya terbiasa menggunakan pesawat pribadi dengan jenis " + orang.kendaraan.pesawat;
document.getElementById("objek").innerHTML = tampil

let mahasiswa = {
  name: "Wildan",
  age: 20,
  address: "Surakarta",
  kendaraan: {
    mobil: "fortuner",
    motor: "Ninja",
    namaDepan: "Wildan",
    namaBelakang: "Ramadhan",
    NamaLengkap: function() {
      return this.namaDepan + " " + this.namaBelakang
    }
  }
}

let tampilMhs = mahasiswa.kendaraan.NamaLengkap();
document.getElementById("objek").innerHTML = tampilMhs

function MahasiswaSIK(nama, kelas, angkatan) {
  this.nama = nama;
  this.kelas = kelas;
  this.angkatan = angkatan;
}