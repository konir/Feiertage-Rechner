<!-------------------------------------------------->
<!-- Copyright 2014 Design by Koni                -->
<!-- Copyright 2014 All Rights Reserved Koni      -->
<!-- 						                      -->
<!-- Wenn Du dieses Programm auch verwendest,     -->
<!-- mach doch wenigstens einen Vermerk auf mich  -->
<!-- und meine Homepage.			              -->
<!-- http:// koni.mobi -->
<!--						                      -->
<!-- Thanks and have fun! Gruss KONI	          -->
<!-------------------------------------------------->

var weekday=new Array(7);
weekday[0]="Sonntag";
weekday[1]="Montag";
weekday[2]="Dienstag";
weekday[3]="Mittwoch";
weekday[4]="Donnerstag";
weekday[5]="Freitag";
weekday[6]="Samstag";

var monthName = new Array("Januar","Februar","März","April","Mai","Juni","Juli","August","September","Oktober","November","Dezember");

Date.prototype.addDays = function(days){
    var dat = new Date(this.valueOf());
    dat.setDate(dat.getDate() + days);
    return dat;
}

function getErsterAdvent(jahr){
	theDate = new Date(jahr, 10, 27, 0, 0, 0, 0);
	while (theDate.getDay() != 0)
	{
		theDate = theDate.addDays(1);
	}
	return theDate;
}


// monat beginnt mit 0=Jan, 1=Feb, 2=März...
function getErsterSonntagImMonat(monat, jahr){
	theDate = new Date(jahr, monat, 1, 0, 0, 0, 0);
	while (theDate.getDay() != 0)
	{
		theDate = theDate.addDays(1);
	}
	return theDate;
}
// Üblicherweise findet der Muttertag am zweiten Sonntag im Mai statt.
function getMuttertag(jahr){
	return getErsterSonntagImMonat(4,jahr).addDays(7);
}
// Der eidg. Dank-, Buss- und Bettag ist der dritte Sonntag im September
function getBettag(jahr){
	return getErsterSonntagImMonat(8,jahr).addDays(14);	
}

// Das Kabenschiessen beginnt am zweiten Samstag im September und dauert 3 Tage
function getKnabenschiessen(jahr){
	return getErsterSonntagImMonat(8,jahr).addDays(6);	
}
// Der Zibelemärit findet immer am 4. Montag im November in der Stadt Bern statt
function getZibelimaerit(jahr){
	return getErsterSonntagImMonat(10,jahr).addDays(22);	
}

function getFormatedDate(date){
	var dayName = weekday[date.getDay()];
    var day = date.getDate();
    if (day < 10){
    	day = "0"+day;
    }
    var month = date.getMonth() + 1;
    if (month < 10){
    	month = "0"+month;
    }
    var year = date.getFullYear();
    return "<span style='font-size:1.0em'>"+day+"."+month+"."+year+"</span><br><span style='font-size:0.7em'>"+dayName+"</span>";
}

function appendFeiertag(name, date){
    $('#feiertageList').append(
		    '<li>'+
		    '<table border="0" style="margin:0px;padding:0px;"><tr>'+
		    '<td style="width: 90px;">'+getFormatedDate(date)+'</td>'+
		    '<td><b><span style="font-size:1.0em">&nbsp;'+name+'</span></b></td>'+
		    '</tr></table>'+
		    '</li>');
}

function calcFeiertage(Jahr)
 {
    var r = Jahr-1900;
    var s = r % 19;
    var a = (7*s+1)/19;
    if (a >= 1)
    {
     a = parseInt(a);
    }
    else
    {a=0};
    var t = (s*11+4-a) % 29;
    var b = parseInt(r/4);
    var u = (b+r+31-t) % 7;
    var w = 25-(u+t);
    var check = 1;
    var osterDate;
    if (Jahr < 1900)  
     {
      alert("Das Jahr " +Jahr+ " ist zu KLEIN! \n\n Wähle zwischen 1900 und 2099\n");
      check=0;
      return;
     }
    if (Jahr > 2099)  
     {
      alert("Das Jahr " +Jahr+ " ist zu GROSS!\n\nWähle zwischen 1900 und 2099\n");
      check=0;
      return;
     }
// alert("check="+check)
    if (check == 1)
    {
      if (w >= 1)
       {
        // alert(Jahr+" ist Ostern am "+w+". April\n\n(c)1998 by Koni");
        osterDate = new Date(Jahr, 3, w, 0, 0, 0, 0);
       }
      else
       {
        w=w+31;
        // alert(Jahr+" ist Ostern am "+w+". März\n\n(c)1998 by Koni");
        osterDate = new Date(Jahr, 2, w, 0, 0, 0, 0);
       }   
    }
	$("#feiertageList").empty();
    appendFeiertag("Neujahr", new Date(Jahr, 0, 1, 0, 0, 0, 0));
    appendFeiertag("Berchtoldstag", new Date(Jahr, 0, 2, 0, 0, 0, 0));
    appendFeiertag("Heilige 3 Könige", new Date(Jahr, 0, 6, 0, 0, 0, 0));
    appendFeiertag("Valentinstag", new Date(Jahr, 1, 14, 0, 0, 0, 0));
    appendFeiertag("Schmutziger Donnerstag", osterDate.addDays(-52));
    appendFeiertag("Fasnachts-Sonntag", osterDate.addDays(-49));
    appendFeiertag("Güdismontag / Rosenmontag", osterDate.addDays(-48));
    appendFeiertag("Faschingsdienstag", osterDate.addDays(-47));
    appendFeiertag("Aschermittwoch", osterDate.addDays(-46));
    appendFeiertag("1. Fastensonntag", osterDate.addDays(-42));
    appendFeiertag("Morgestraich Basler Fasnacht", osterDate.addDays(-41));
    appendFeiertag("Palmsonntag", osterDate.addDays(-7));
    appendFeiertag("Gründonnerstag", osterDate.addDays(-3));
    appendFeiertag("Karfreitag", osterDate.addDays(-2));
    appendFeiertag("Ostern", osterDate);
    appendFeiertag("Ostermontag", osterDate.addDays(1));
    appendFeiertag("Tag der Arbeit", new Date(Jahr, 4, 1, 0, 0, 0, 0));
    appendFeiertag("Muttertag", getMuttertag(Jahr));
    appendFeiertag("Auffahrt / Christi Himmelfahrt", osterDate.addDays(39));
    appendFeiertag("Pfingstsonntag", osterDate.addDays(49));
    appendFeiertag("Pfingstmontag", osterDate.addDays(50));
    appendFeiertag("Fronleichnam", osterDate.addDays(60));
    appendFeiertag("Nationalfeiertag CH", new Date(Jahr, 7, 1, 0, 0, 0, 0));
    appendFeiertag("Mariä Himmelfahrt", new Date(Jahr, 7, 15, 0, 0, 0, 0));
    appendFeiertag("Buss- und Bettag", getBettag(Jahr));
    appendFeiertag("Knabenschiessen (ZH) 3 Tage", getKnabenschiessen(Jahr));
    appendFeiertag("Halloween", new Date(Jahr, 9, 31, 0, 0, 0, 0));
    appendFeiertag("Allerheiligen", new Date(Jahr, 10, 1, 0, 0, 0, 0));
    appendFeiertag("Zibelimaerit (BE)", getZibelimaerit(Jahr));
    appendFeiertag("Erster Advent", getErsterAdvent(Jahr));
    appendFeiertag("Mariä Empfängnis", new Date(Jahr, 11, 8, 0, 0, 0, 0));
    appendFeiertag("Heiligabend", new Date(Jahr, 11, 24, 0, 0, 0, 0));
    appendFeiertag("Weihnachten", new Date(Jahr, 11, 25, 0, 0, 0, 0));
    appendFeiertag("Stephanstag", new Date(Jahr, 11, 26, 0, 0, 0, 0));
    appendFeiertag("Silvester", new Date(Jahr, 11, 31, 0, 0, 0, 0));
	$('ul').listview('refresh');

 }
// -->
