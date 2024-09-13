function bentukSegitiga(alas, tinggi) {
    var bentuk = "";
    for (let i = 1; i <= tinggi; i++) {
       
        for (let j = 0; j < tinggi - i; j++) {
            bentuk += " ";
        }
        for (let k = 0; k < (2 * i - 1); k++) {
            bentuk += "*";
        }

        bentuk += "\n";
    }
    console.log(bentuk);
}

bentukSegitiga(0, 5);
