dur_ind = [
    ['doublewhole', '2'], ['whole', '1'], ['half', '1/2'], ['quarter', '1/4'],
    ['8th', '1/8'], ['16th', '1/16'], ['32nd', '1/32'], ['64th', '1/64'],
    ['128th', '1/128'], ['256th', '1/256'], ['512th', '1/512'], ['1024th', '1/1024']
];

noteGroup = [
    '\uE1D1', '\uE1D2', '\uE1D3', '\uE1D5',
    '\uE1D7', '\uE1D9', '\uE1DB', '\uE1DD',
    '\uE1DF', '\uE1E1', '\uE1E3', '\uE1E5'
];

restGroup = [
    '\uE4E2', '\uE4F4', '\uE4F5', '\uE4E5', //with leger lines!
    '\uE4E6', '\uE4E7', '\uE4E8', '\uE4E9',
    '\uE4EA', '\uE4EB', '\uE4EC', '\uE4ED'
];

var key = 'C/a' //for future have all 12 keys
var meter = '4/4' //for future multiple meters
var measureLen = eval(meter) //this is actually dangerous use of eval but music meter...

//to decide whether notes or rests will be displayed in the duration panel
var noteOrRest = noteGroup;
function isNoteOrRest(event) {
    noteOrRest = (event.target.value == 'note') ? noteGroup : restGroup
    for (let i = 0; i < 8; i++) {
        document.getElementById(dur_ind[i][0]).innerText = noteOrRest[i];
    }
}

var sumDur = 0;
//get all info of the next note
function currentNoteCode(event) {
//get the pitch class? checked (C, D, E, F, G, A or B)
var ptchCheckedEx = document.getElementsByName('ptchSelector');
for (i = 0; i < ptchCheckedEx.length; i++) {
    if (ptchCheckedEx[i].checked) {
        currentNotePtchClass = ptchCheckedEx[i].value;
    }
}

//get the accidental info
var accidentalCheckedEx = document.getElementsByName('accidental');
for (i = 0; i < accidentalCheckedEx.length; i++) {
    if (accidentalCheckedEx[i].checked) {
        currentNoteAccidental = accidentalCheckedEx[i].value;
    }
}

//get the register
var currentNoteRegister = document.getElementById('register').value;

//get the duration, and write a note info in textarea
var currentNoteDur = dur_ind[event.target.value][1];
sumDur = sumDur + currentNoteDur;
document.getElementById('codeWindow').value += ' ' + currentNotePtchClass + currentNoteAccidental + currentNoteRegister + '(' + currentNoteDur + ')';
}

//clear button will erase text in textarea
function eraseText() {
    document.getElementById('codeWindow').value = '';
}