window.onload = function(){
    ////////////////////////////////////////////////////
    // Uppgift 1: Kvadrattal
    ////////////////////////////////////////////////////

    // Skriv ut de "nbr" första Kvadrattalen
    function squareNbrList(nbr) 
    {
        let text = "<p>";
        for (let i = 1; i < nbr + 1; i++)
        {
            text += i + ' * ' + i + ' = ' + i*i + '<br>'; 
        }
        text += "</p>";
        return text;
    }

    document.getElementById("squareNbr").innerHTML = squareNbrList(10);

    ////////////////////////////////////////////////////
    //Uppgift 2: Multiplikationstabell
    ////////////////////////////////////////////////////

    //Skriv ut en Mutiplikationstabell, Storleken bestäms av nbrRow * nbrCol 
    function multiplicationTable(nbrOfRow,nbrOfCol)
    {
        let table = "<table id=mTable>";
        for (let row = 1; row < nbrOfRow + 1 ; row++)
        {
            table += "<tr>";
            for (let col = 1; col < nbrOfCol + 1; col++)
            {
                table+= `<td class = "mTableTD" id = "${col}c${row}">${row*col}</td>`;
            }
            table += "</tr>"; 
        }
        table += "</table>"
        return table;
    }

    document.getElementById("multiTable").innerHTML = multiplicationTable(10,10);

    ////////////////////////////////////////////////////
    //Uppgift 3 & 6: Gissa Numret
    ////////////////////////////////////////////////////

    //jämför input med number och svara lika, lägre eller högre
    function guessNumber(input, number)
    {
        let output ='';
        if (input == number) {
            output = "Svar: Grattis du gissade korrekt!";    
        }
        else  {
            let highOrLow = (input < number) ? 'Högre' : 'Lägre';
            output = "Svar: Det var fel, Gissa " + highOrLow;    
        }
        return output; 
    }

    // Set ett Random Nummer mellan 1-100
    var guessNumberAnswer = Math.floor(Math.random() * 100 + 1);
    console.log(guessNumberAnswer);

    // När submit är triggad kör translate to robber funktionen
    document.getElementById("guessNumberForm").addEventListener("submit", function(evt){
        evt.preventDefault();
        let input = document.getElementById("guessNumberInput").value;
        document.getElementById("guessNumberOutput").innerHTML = guessNumber(input, guessNumberAnswer);
    });

    ////////////////////////////////////////////////////
    //Uppgift 4: Översätt input till rövarspråket
    ////////////////////////////////////////////////////
    function translateToRobber(input) {
        let output = '';
        const regex = /[bcdfghjklmnpqrstvwxz]/i;
        // Kollar varje position av strängen x om den matchar en konsonant.
        for (let i = 0; i < input.length; i++) {
            //returnerar en matchande sträng eller null, så om det inte är null så är det en konsonant.
            if (input[i].match(regex)) {
                //kollar om det är stor eller liten bokstav
                let filler = (input[i] == input[i].toUpperCase()) ? 'O' : 'o'; 
                output += input[i] + filler + input[i];
            }
            else {
                output += input[i];
            }
        }
        return output;
    }
    // När submit är triggad kör translateToRobber funktionen
    document.getElementById("translateForm").addEventListener("submit", function(evt){
        evt.preventDefault();
        let input = document.getElementById("translateInput").value;
        document.getElementById("translateOutput").value = translateToRobber(input);
    });

    ////////////////////////////////////////////////////
    //Uppgift 5 : Classer och Arv
    ////////////////////////////////////////////////////
    class Person {
        constructor(name, age, address, postcode, city) {
            this.name = name;
            this.age = age;
            this.address = address;
            this.postcode = postcode;
            this.city = city;
        }
        postalAdress = function(){
            let output = this.name + "<br>" + this.address + "<br>" + this.postcode + "<br>" + this.city;
            console.log(output);
            return output;   
        }
        birthYear = function(){
            let date = new Date();
            return `${this.name} föddes år ${date.getFullYear() - this.age}.`;
        }
    }

    class Student extends Person {
        constructor(name, age, address, postcode, city, grade, degree, facultyProgrammeDirector) {
            super(name, age, address, postcode, city);   
            this.grade = grade;
            this.degree = degree;
            this.facultyProgrammeDirector = facultyProgrammeDirector;
        }
        study = function() {
            console.log(this.name + " sitter och pluggar.");
        }
        result = function() {
            return `${this.name} har en ${this.degree} examen med ett snittbetyg av ${this.grade}.`; 
        }
        director = function() {
            return `Programansvarig utbildningsledare för ${this.name}s utbildning var ${this.facultyProgrammeDirector}.`;
        }
    }

    const joelKarlsson = new Student("Joel Karlsson", 24, "Stenvägen 12", "541 25", "Skövde", "VG", "Kandidat", "Petra Lund");
   
    document.getElementById("postaladdress").innerHTML = "Postadress: <br>" + joelKarlsson.postalAdress();
    document.getElementById("birthyear").innerHTML = joelKarlsson.birthYear();
    document.getElementById("result").innerHTML = joelKarlsson.result();
    document.getElementById("director").innerHTML = joelKarlsson.director();

    ////////////////////////////////////////////////////
    //Uppgift 7: Resebokning
    ////////////////////////////////////////////////////

    //Regex: Bokstäver, whitespace, - och '
    const regexName = /^[a-öA-Ö\s\-'`]+$/;
    //Regex: Bokstäver, siffror, whitespace, - och '  
    const regexAddress = /^[a-öA-Ö0-9\s\-'`]+$/;
    //Regex: Siffror i xxx xx eller xxxxx
    const regexPostalcode = /^(\d{3}\s\d{2}|\d{5})$/;
    //Regex: beyond me, source: https://emailregex.com/
    const regexMail =/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    //Regex Måste innehålla minst: en stor bokstav, en liten bokstav, en siffra och vara 8 tecken lång
    const regexPsw = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/;

    //Varningsmeddelanden vid ej Validerade inmatningar
    const warning = {}
    warning.invalidDefault = "Inmatningsfältet är tomt eller Innehåller ett ogiltigt tecken";
    warning.invalidPostalcode = "Ogiltigt postnummer: Giltigt format 123 45 eller 12345" 
    warning.invalidMail = "Ogiltig Mejladdress";
    warning.invalidPsw = "Ogiltigt Lösenord: Måste innehålla minst 8 tecken, en siffra, en liten och en stor bokstav"

    //Definiera const att använda till att spara input elementen
    const departureDate = document.getElementById("departureDateInput");
    const returnDate = document.getElementById("returnDateInput");
    const fName = document.getElementById("fNameInput");
    const sName = document.getElementById("sNameInput");
    const address = document.getElementById("addressInput");
    const postalcode = document.getElementById("postcodeInput");
    const city = document.getElementById("cityInput");
    const email = document.getElementById("emailInput");
    const psw = document.getElementById("pswInput");

    //Funktion som Validerar ett inmatningsfält mot en Regex
    //Byter färg och ger ett varningsmedelande vid fel
    function validate(element,regex,warning){
        if (element.value.match(regex)) {
            element.style = "background-color: white;";
            element.setCustomValidity('');
            element.reportValidity();
        }
        else {
            element.style = "background-color: salmon;";
            element.setCustomValidity(warning);
            element.reportValidity();
        }   
    }

    //funktion för att plussa på dagar på en datum sträng
    function addDays(dateString,days) {
        if (dateString !== ""){
            let date = new Date(dateString);
            let dateAdded= date.setDate(date.getDate() + days);
            return new Date(dateAdded).toISOString().substring(0,10);
        }
        else {
            return "";
        }
    }

    //Sätt minimum till dagensdatum för avgångstid och återkomst
    let currentDate = new Date().toISOString().substring(0,10);
    departureDate.min = currentDate;
    returnDate.min = addDays(currentDate,7);

    //Uppdatera så återkomst inte är mindre än avgångstid
    departureDate.addEventListener("blur", function(){
        returnDate.min = addDays(departureDate.value,7);
        if ( returnDate.value < returnDate.min){
            returnDate.value = returnDate.min;
        }
    });
    
    //Validera inmatningsfälten
    fName.addEventListener("input", function(){validate(fName,regexName,warning.invalidDefault)});
    sName.addEventListener("input", function(){validate(sName,regexName,warning.invalidDefault)});
    address.addEventListener("input", function(){validate(address,regexAddress,warning.invalidDefault)});
    postalcode.addEventListener("input", function(){validate(postalcode,regexPostalcode, warning.invalidPostalcode)});
    city.addEventListener("input", function(){validate(city,regexName,warning.invalidDefault)});
    email.addEventListener("input", function(){validate(email,regexMail, warning.invalidMail)});
    psw.addEventListener("input", function(){validate(psw,regexPsw, warning.invalidPsw)});

    // När submit är triggad kör en Alert
    document.getElementById("booking").addEventListener("submit", function(evt){
        evt.preventDefault();
        alert("Bokning Skickad! bekäftelse mejl dyker kommer snart.")
    });

    ////////////////////////////////////////////////////
    // Uppgift 8: jQuery
    ////////////////////////////////////////////////////

    //Gör slidetogglar alla element som följer en h2 rubrik när du trycker på den
    $("h2").click(function(){
        $(this).next().slideToggle("slow");
    });

    //Starta dolda
    $("h2").next().css("display", "none");



    //Gör storleken på fonten större när du hovrar över en pragraf
    $("p").hover(function(){
        $(this).css("font-size", "larger")
    },function(){
        $(this).css("font-size", "large")
    });

    //Highlightar celler i Multiplikationstabellen när muspekaren hovrar
    $(".mTableTD").hover(function(){
        const id = $(this).attr("id");
        const splitId = id.split("c");
        const x = splitId[0];
        const y = splitId[1];
        //Byt färg på celler på samma rad fram till "hover"
        for (let i = 1; i < x; i++) {
            let tdid = i +"c"+ y;
            $(`#${tdid}`).css({"background-color" : "cadetblue", "color" : "white"}); 
        }
        //Byt färg på celler i samma kolumn fram till "hover"
        for (let i = 1; i < y; i++) {
            let tdid = x +"c"+ i;
            $(`#${tdid}`).css({"background-color" : "cadetblue", "color" : "white"}); 
        }
        //Byt färg på "Hover" samt första i raden och kolumnen
        $(this).css({"background-color" : "darkcyan", "color" : "white"});
        $(`#${x}c${1}`).css({"background-color" : "darkcyan", "color" : "white"});
        $(`#${1}c${y}`).css({"background-color" : "darkcyan", "color" : "white"});
    },
    function(){
        //Som ovan men Återställer färgerna
        const id = $(this).attr("id");
        const splitId = id.split("c");
        const x = splitId[0];
        const y = splitId[1];
        for (let i = 1; i < x; i++) {
            let tdid = i +"c"+ y;
            $(`#${tdid}`).css({"background-color" : "white", "color" : "black"}); 
        }
        for (let i = 1; i < y; i++) {
            let tdid = x +"c"+ i;
            $(`#${tdid}`).css({"background-color" : "white", "color" : "black"}); 
        }
        $(this).css({"background-color" : "white", "color" : "black"});
    });
}    