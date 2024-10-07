class SensorPasut {
    constructor(nama, lokasi) {
        this.nama = nama;
        this.lokasi = lokasi;
        this._status = "Nonaktif";
    }

    aktifkan() {
        this._status = "Aktif";
        let message = `Sensor ${this.nama} di ${this.lokasi} telah diaktifkan.`;
        console.log(message);
        return message;
    }

    nonaktifkan() {
        this._status = "Nonaktif";
        let message = `Sensor ${this.nama} di ${this.lokasi} telah dinonaktifkan/dimatikan.`;
        console.log(message);
        return message;
    }

    getStatus() {
        let message = `Status Sensor ${this.nama} di ${this.lokasi} sedang ${this._status}.`;
        console.log(message);
        return message;
    }

    latihanKapal() {
        if (this._status === "Aktif") {
            let message = `Latihan kapal sedang berlangsung di sekitar lokasi sensor ${this.nama}.`;
            console.log(message);
            return message;
        } else {
            let message = `Latihan kapal tidak dapat berlangsung karena sensor ${this.nama} sedang nonaktif.`;
            console.log(message);
            return message;
        }
    }

    cekKalibrasi() {
        let message = `Sensor ${this.nama} memerlukan kalibrasi berkala.`;
        console.log(message);
        return message;
    }
}

class Kapal {
    constructor(nama, jenis, kapasitas, panjang, lebar) {
        this.nama = nama;
        this.jenis = jenis;
        this.kapasitas = kapasitas;
        this.panjang = panjang;
        this.lebar = lebar;
    }

    infoKapal() {
        let message = `Kapal ${this.nama} berjenis ${this.jenis} dengan kapasitas ${this.kapasitas} orang, memiliki panjang ${this.panjang} meter dan lebar ${this.lebar} meter.`;
        console.log(message);
        return message;
    }

    cekKetersediaanPeralatan(peralatan) {
        let message = `Kapal ${this.nama} dilengkapi dengan peralatan berikut: ${peralatan.join(', ')}.`;
        console.log(message);
        return message;
    }
}

class InfoTiket extends Kapal {
    constructor(nama, jenis, kapasitas, panjang, lebar, jumlahTiket) {
        super(nama, jenis, kapasitas, panjang, lebar);
        this.jumlahTiket = jumlahTiket;
        this.tiketAwal = jumlahTiket;
    }

    cekTiketTersedia() {
        let message = `Jumlah tiket tersedia adalah ${this.jumlahTiket}.`;
        console.log(message);
        return message;
    }

    beliTiket(jumlah) {
        if (this.jumlahTiket >= jumlah) {
            this.jumlahTiket -= jumlah;
            let message = `${jumlah} tiket berhasil dibeli. Tiket tersisa: ${this.jumlahTiket}.`;
            console.log(message);
            return message;
        } else {
            let message = `Jumlah tiket tidak mencukupi. Hanya tersisa ${this.jumlahTiket} tiket.`;
            console.log(message);
            return message;
        }
    }
}

class KapalPesiar extends Kapal {
    constructor(nama, kapasitas, panjang, lebar, fasilitas, tujuan) {
        super(nama, "Pesiar", kapasitas, panjang, lebar);
        this.fasilitas = fasilitas;
        this.tujuan = tujuan;
    }

    infoKapalPesiar() {
        let message = `Kapal pesiar ${this.nama} berkapasitas ${this.kapasitas} orang, dengan fasilitas: ${this.fasilitas.join(', ')}, dan berlayar menuju ${this.tujuan}.`;
        console.log(message);
        return message;
    }
}
let sensorMerak = new SensorPasut("Selat Sunda", "Merak");
sensorMerak.aktifkan(); 

let sensorList = [
    sensorMerak,
    new SensorPasut("Pantai Anyer", "Banten"),
    new SensorPasut("Pelabuhan Bakauheni", "Lampung")
];

sensorList.forEach(sensor => {
    console.log(sensor.getStatus());
    sensor.latihanKapal(); 
});

let ferryKapal = new InfoTiket("Ferry Express", "Penumpang", 500, 100, 30, 200);
ferryKapal.cekTiketTersedia();
ferryKapal.beliTiket(50);

let kapalPesiar = new KapalPesiar("Dream Cruise", 1000, 300, 50, ["Kolam renang", "Restoran mewah", "Spa"], "Bali");
kapalPesiar.infoKapalPesiar();
kapalPesiar.cekKetersediaanPeralatan(["Sekoci", "Pelampung", "Radar"]);
