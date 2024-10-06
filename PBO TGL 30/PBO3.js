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

    cekLatihanKapal() {
        let message = `Latihan kapal sedang berlangsung di sekitar lokasi sensor ${this.nama}.`;
        console.log(message); 
        return message;
    }

    cekKondisiCuaca(cuaca) {
        let message = `Kondisi cuaca di ${this.lokasi} adalah ${cuaca}.`;
        console.log(message); 
        return message;
    }
}

class UsiaSensor extends SensorPasut {
    constructor(nama, lokasi, usia) {
        super(nama, lokasi);
        this.usia = usia;
    }

    getUsia() {
        let message = `Usia sensor ${this.nama} adalah ${this.usia} tahun.`;
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

let sensorMerak = new SensorPasut("Selat Sunda", "Merak");
document.getElementById('sensorStatus').innerHTML = sensorMerak.aktifkan();
document.getElementById('sensorStatusUpdate').innerHTML = sensorMerak.getStatus();
document.getElementById('latihanKapal').innerHTML = sensorMerak.cekLatihanKapal();
document.getElementById('kondisiCuaca').innerHTML = sensorMerak.cekKondisiCuaca("Cerah");

let ferryKapal = new InfoTiket("Ferry Express", "Penumpang", 500, 100, 30, 200);
document.getElementById('kapalInfo').innerHTML = ferryKapal.infoKapal();
document.getElementById('tiketStatus').innerHTML = ferryKapal.cekTiketTersedia();
document.getElementById('beliTiket').innerHTML = ferryKapal.beliTiket(210);
document.getElementById('tiketStatusUpdate').innerHTML = ferryKapal.cekTiketTersedia();
