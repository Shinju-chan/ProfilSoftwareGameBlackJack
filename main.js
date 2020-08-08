	
		
		 var figura = ["Spades", "Hearts", "Diamonds", "Clubs"];
        var wartosc = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];
        var plansza = new Array();
        var gracze = new Array();
        var aktualnyGracz = 0;
		var ile = '';

		

        function tworzeniePlanszy()
        {
            plansza = new Array();
            for (var i = 0 ; i < wartosc.length; i++)
            {
                for(var x = 0; x < figura.length; x++)
                {
                    var waga = parseInt(wartosc[i]);
                    if (wartosc[i] == "J" || wartosc[i] == "Q" || wartosc[i] == "K")
                        waga = 10;
                    if (wartosc[i] == "A")
                        waga = 11;
                    var karta = { Wartosc: wartosc[i], Figura: figura[x], Waga: waga };
                    plansza.push(karta);
                }
            }
        } //tworzy tablice ze 52 obiektami/ stos
		
				
		function kreowanieGraczy(num)
		{
            gracze = new Array();
            for(var i = 1; i <= num; i++)
            {
                var reka = new Array();
                var gracz = { Name: 'Gracz ' + i, ID: i, Punkty: 0, Reka: reka };
                gracze.push(gracz);
            }			
			
		}// tworzenie graczy technicznie
		
		 function tworzenieGraczy()
        {
            document.getElementById('gracze').innerHTML = '';
            for(var i = 0; i < gracze.length; i++)
            {
                var div_gracz = document.createElement('div');
                var div_playerid = document.createElement('div');
                var div_reka = document.createElement('div');
                var div_points = document.createElement('div');

                div_points.className = 'points';
                div_points.id = 'points_' + i;
                div_gracz.id = 'gracz_' + i;
                div_gracz.className = 'gracz';
                div_reka.id = 'reka_' + i;

                div_playerid.innerHTML = 'Gracz ' + gracze[i].ID;
                div_gracz.appendChild(div_playerid);
                div_gracz.appendChild(div_reka);
                div_gracz.appendChild(div_points);
                document.getElementById('gracze').appendChild(div_gracz);
            }
        } //tworzenie gracza wizualnie
	
		 function shuffle()
        {
            // na 1000 tur
             // zamień wartości dwóch losowych kart
            for (var i = 0; i < 1000; i++)
            {
                var location1 = Math.floor((Math.random() * plansza.length));
                var location2 = Math.floor((Math.random() * plansza.length));
                var tmp = plansza[location1];

                plansza[location1] = plansza[location2];
                plansza[location2] = tmp;
            }
        }//algorytm testowania
		
		

        function startGry(ile)
        {	var x = ile;
            document.getElementById('btnStart').value = 'Restart';
            document.getElementById("status").style.display="none";
            // rozdaj 2 karty każdemu graczowi
            aktualnyGracz = 0;
            tworzeniePlanszy();
            shuffle();
            kreowanieGraczy(x);
            tworzenieGraczy();
            rozdajNaRece();
            document.getElementById('gracz_' + aktualnyGracz).classList.add('active');
			changeID (0, ile)
        }

        function rozdajNaRece()
        {
            // rozdawanie 2 kart graczom
            for(var i = 0; i < 2; i++)
            {
                for (var x = 0; x < gracze.length; x++)
                {
                    var karta = plansza.pop();
                    gracze[x].Reka.push(karta);
                    renderowanieKart(karta, x);
                    podliczPunkty();
                }
            }

            aktualizujPlansze();
        }//najwyższa krata ze stosu generowana jest na rękę

        function renderowanieKart(karta, gracz)
        {
            var reka = document.getElementById('reka_' + gracz);
            reka.appendChild(generowanieKart(karta));
        }//dodanie do ręki
		
			
        function generowanieKart(karta)
        {
            var el = document.createElement('div');
            var icon = '';
						
            if (karta.Figura == 'Hearts')
            icon='♥';
            else if (karta.Figura == 'Spades')
            icon = '♠';
            else if (karta.Figura == 'Diamonds')
            icon = '♦';
            else
            icon = '♣';    
			
            el.className = 'karta';
            el.innerHTML = karta.Wartosc+icon;
						
            return el;   
        }    
            
                // createIMG(Card);
                // renderAPI(card.Value, icon);	
                     
           // renderowanie karty
    
            // function renderAPI(C,I)
            // {       
        //     var C = ''
        //     var I = ''
        //     var newC = 'C+I'
        //     var data = [];
        //     data = JSON.parse(data);
                  
        //     var request = new XMLHttpRequest()
        //    // var ideck = '3p40paa87x90';
        //     request.open('GET', 'http://127.0.0.1:8000 ', true)
            
        //     request.onload = function ()
        //      {
        //         var data = JSON.parse(this.response)
            
        //       for (var i = 0; i < data.length; i++) {
        //           var Card = (data[i].image);
        //         return Card;
        //       }
        //     }        
        //     request.send();
             
                // WebSocket = new WebSocket ('ws://deckofcardsapi.com/');
                // var exampleStocker = new WebSocketc('ws://deckofcardsapi.com/');
                // exampleStocker.onmessage = funktion (event)
                // {console.log(event.data);}
       // } 
						
        // renderowanie karty

        // zwraca liczbę punktów, które gracz ma na ręku
        function sprwadzPunkty(gracz)
        {
            var points = 0;
            for(var i = 0; i < gracze[gracz].Reka.length; i++)
            {
                points += gracze[gracz].Reka[i].Waga;
            }
            gracze[gracz].Punkty = points;
            return points;
        }

        function podliczPunkty()
        {
            for (var i = 0 ; i < gracze.length; i++)
            {
                sprwadzPunkty(i);
                document.getElementById('points_' + i).innerHTML = gracze[i].Punkty;
            }
        }

        function dobierz()
        {
            //dorzuć kartę z talii do bieżącego gracza
            // sprawdź, czy liczba nowych punktów obecnego gracza przekracza 21
            var karta = plansza.pop();
            gracze[aktualnyGracz].Reka.push(karta);
            renderowanieKart(karta, aktualnyGracz);
            podliczPunkty();
            aktualizujPlansze();
            sprawdz();
        }//dobranie karty

        function pas()
        {
           // przejdź do następnego gracza, jeśli taki istnieje
            if (aktualnyGracz != gracze.length-1) {
                document.getElementById('gracz_' + aktualnyGracz).classList.remove('active');
                aktualnyGracz += 1;
                document.getElementById('gracz_' + aktualnyGracz).classList.add('active');
            }

            else {
                koniec();
            }
        } // pas, przejście do kolejne gracza jeśli jeszcze jakiś  jest, lub wywołanie zakończania

        function koniec()
        {
            var zwyciestca = -1;
            var wynik = 0;

            for(var i = 0; i < gracze.length; i++)
            {
                if (gracze[i].Punkty > wynik && gracze[i].Punkty < 22)
                {
                    zwyciestca = i;
                }

                wynik = gracze[i].Punkty;
            }

            document.getElementById('status').innerHTML = 'Wygrał: Gracz ' + gracze[zwyciestca].ID;
            document.getElementById("status").style.display = "inline-block";
        }//wygrany

        function sprawdz()
        {
            if (gracze[aktualnyGracz].Punkty > 21)
            {
                document.getElementById('status').innerHTML = 'Gracz: ' + gracze[aktualnyGracz].ID + ' Przegrał';
                document.getElementById('status').style.display = "inline-block";
                koniec();
            }
        }//przegrany

        function aktualizujPlansze()
        {
            document.getElementById('deckcount').innerHTML = plansza.length;
        }

        window.addEventListener('load', function(){
            tworzeniePlanszy();
            shuffle();
            kreowanieGraczy(1);
        });