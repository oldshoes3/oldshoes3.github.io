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

noteDownGroup = [
    '\uE1D1', '\uE1D2', '\uE1D4', '\uE1D6',
    '\uE1D8', '\uE1DA', '\uE1DC', '\uE1DE',
    '\uE1E0', '\uE1E2', '\uE1E4', '\uE1E6'
];

restGroup = [
    '\uE4E2', '\uE4F4', '\uE4F5', '\uE4E5', //with leger lines!
    '\uE4E6', '\uE4E7', '\uE4E8', '\uE4E9',
    '\uE4EA', '\uE4EB', '\uE4EC', '\uE4ED'
];

ptchClassInd = ['C', 'D', 'E', 'F', 'G', 'A', 'B']

accidental = ['\uE264', '\uE260', '\uE261', '\uE262', '\uE263']

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

var currentNote = '';
var sumDur = 0;
var entireText = '';
var entireNotes = '';
var noteList = [];
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

    //get the duration, and 
    var currentNoteDurInd = event.target.value;
    var currentNoteDur = dur_ind[currentNoteDurInd][1];

    //write the note info in textarea
    currentNote = currentNotePtchClass + currentNoteAccidental + currentNoteRegister + '(' + currentNoteDur + ')'
    sumDur = sumDur + currentNoteDur;
    document.getElementById('codeWindow').value += ' ' + currentNote;
    entireText = document.getElementById('codeWindow').value;

    //update notelist
    noteList.push([currentNotePtchClass, currentNoteRegister, currentNoteAccidental, currentNoteDur])
    var nthNote = noteList.length
    
    //display notes
    var dataSpan = document.createElement('span');
    var currentNotePtchNoAcc = (currentNoteRegister * 7) + ptchClassInd.indexOf(currentNotePtchClass)
    var vertPos = ((currentNotePtchNoAcc) * 2.4 - 79.6).toString();
    var horiPos = (nthNote * 19 + 16).toString();

    dataSpan.setAttribute(
        'style', 'position: absolute; left: ' + horiPos + 'px; bottom: ' + vertPos + 'px;'
    ) //3rd is 4.8px?????? oct is 16.8px???
    var insideNotes = document.getElementById('notes');

    var noteDisplay = (currentNotePtchNoAcc < 34) ? noteGroup[currentNoteDurInd] : noteDownGroup[currentNoteDurInd];
    if (currentNoteAccidental == 'bb') {
        noteDisplay = '\uE264 ' + noteDisplay;
    } else if (currentNoteAccidental == 'b') {
        noteDisplay = '\uE260 ' + noteDisplay;
    } else if (currentNoteAccidental == '') {
        noteDisplay = '\uE261 ' + noteDisplay;
    } else if (currentNoteAccidental == '#') {
        noteDisplay = '\uE262 ' + noteDisplay;
    } else if (currentNoteAccidental == 'x') {
        noteDisplay = '\uE263 ' + noteDisplay;
    }
    var noteData = document.createTextNode(noteDisplay);
    dataSpan.appendChild(noteData);
    insideNotes.appendChild(dataSpan);
    entireNotes = document.getElementById('notes').value;
}

//clear last note will erase the last note in textarea
function eraseLastNote() {
    document.getElementById('codeWindow').value = entireText.substring(0, (entireText.lastIndexOf(' ')))
    entireText = document.getElementById('codeWindow').value;

    document.getElementById('notes').value = entireNotes.substring(0, (entireNotes.lastIndexOf('<span style=')))
    entireNotes = document.getElementById('notes').value;

}

//clear all button will erase text in textarea
function eraseText() {
    document.getElementById('codeWindow').value = '';
    entireText = document.getElementById('codeWindow').value;

    document.getElementById('notes').value = '';
    entireNotes = document.getElementById('note').value;
}

accidental = ['\uE264', '\uE260', '\uE261', '\uE262', '\uE263']
