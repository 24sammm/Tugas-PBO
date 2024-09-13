function bentukSegitiga(alas, tinggi){
    var bentuk= "";
    for(let i = 0; i<=alas; i++){
        for(let j=0; j < i; j++){
            bentuk+="*"
            console.log(bentuk);
        }
    
    }
}
bentukSegitiga(3, 2);