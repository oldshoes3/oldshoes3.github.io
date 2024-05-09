# [link to the final project](https://oldshoes3.github.io)



# Very very simple sheet music maker!



## What is it?
- It generates a very simple sheet music

## why is it?
- too heavy notation programs (Sibelius, Finale, Dorico) if just wanting a simple one-staff lead sheet
- user-friendlier, ligher version of Lilypond


## How to do?
- A web page
  - html with css for visual appearance. Javascript for coding.
- Bravura font (web font version)

- left/right windows
- The left window has buttons or anything so the user can input the note information
- The right window will show the result


## things work and don't work
- note will be input with right duration, accidentals, stem direction ✓
- ledger line ❌
- meter, barline ❌
- unnecessary accidentals ❌
- dotted notes ❌
- tied notes ❌
- different key signature ❌
- tempo, chord symbols, other text indication ❌
- correction via textarea ❌
- beaming ❌ -> still have zero idea how to achieve it
- multiple system ❌




## Detailed working process

- Instead or Bravura, BravuraText might be the best for text-based application
    - It turns out NO: ligature problem.

- The left/right windows
  - problem: Very initial thing I tried is make two windows, one at the left that shows buttons and one at the right that displays sheet. I searched and maybe relative/absolute position in CSS will work for it. It turns out no because the right window has to be relative and wrap other elements.
  - solve:Rachel gave me hint to use a column and gave me a link(https://us-west-2.protection.sophos.com/?d=w3schools.com&u=aHR0cHM6Ly93d3cudzNzY2hvb2xzLmNvbS9ob3d0by9ob3d0b19jc3NfdHdvX2NvbHVtbnMuYXNw&i=NjQ0M2U3MWE4OThlOTc3NDU2YWIzNDFm&t=eWI5V3h5bTRXcDRhbUF1eG5nQVB4YUNMczR4Z3RkUGRtcERGR1VucHROQT0=&h=9ba410ca932340e4b50404ccbb25afd2&s=AVNPUEhUT0NFTkNSWVBUSVbELJNmWKXOYD-l2HEd1wftUatP5CzttD0LjZD-ISmbEg), so problem solved.

- At the right window, I tried display 5 staff-line.
  - problem: The glyph for 5 staff-line are very short but systemically has no width. Type multiple times of this glyph will not make the staff longer, but the staff get thicker.
  - solve: (glyph - 6 spaces) repeat multiple times

- display trebel clef
  - problem: because the staff line has no width I can just type after staff-glyph, but the clef glyph has the width, the next staff-glyph will be drawn with a little gap after the clef
  - solve: lets make staff an relative element, and make clef, key signatures, meter, other notes absolute elements
    - problem: It turns out relative/absolute feature is nightmare I wasted most of time on it.
      - plus ligature problem of BravuraText added more headache.
        - Bravura documentation says 'use ligature feature to make each number for numerator and demoninator': I googled like being in a middle of pacific ocean and found the ligature feature in BravuraText is actually not working
    - So I had to manually posite numerator and donominator. problem is meter element is absolute element and the relative parent is staff. I can't make it displayed right next to clef without manual positioning
    - I thought this is important because if key signatures feature becomes added later, the three elements (clef - key signature - meter) should be next to each other. so I thought if I can make meter a absolute child of clef, the clef becomes a absolute child of staff and relative parent of meter
    - looks not possible. google searches didn't help
    - asked chatGPT and it suggested two solutions and none of them actually worked
      - chatGPT is not all-powerful and it is lier.
      - [link to the screenshots of chapGPT conservation](https://github.com/oldshoes3/oldshoes3.github.io/tree/main/test/chatgptSUCKS)
    - ended up clef, meter has individual left, bottom position in CSS. It will be a headache when different key signature option added.

- left panel, duration buttons and pitch buttons
  - I moved to the left panel, and started make a buttons. I first make buttons for duration. The button making is pretty easy, but I felt it has to be radio buttons so multiple buttons should not be selected at the same time.
  - I googled how to make radio buttons look like normal buttons, and there are some stackoverflow posts that deal with it. The problem is the text of each label in my webpage is in BravuraText font. The glyphes become to place weird heigh position, and I started touch CSS file for it, and also touched relative/absolute feature, but I gave up. Anyone who thought of relative/absolute feature should go to hell.

- textarea
  - I created a textarea that shows what notes the user have input. I wanted to make it more dynamical, so manipulating the text in the textarea will also manipulate the sheet display, but no enough time to do because of that searching time for relative/absolute

- scrript.js
  - then I started code when the user selected duration, it triggers a giant function that collect checked pitch, duration button, and will add the info of current note in the textarea and display the note. This works is relatively easier than goddamn relative/absolute. I had to search several methods like getElementById. I found JQuery might be useful, but because of not enough time (due to goddamn relative/absolute) I just sticked to pure js.



## [SMuFL info](https://w3c.github.io/smufl/latest/index.html)