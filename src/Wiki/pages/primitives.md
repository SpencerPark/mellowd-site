Primitive Elements
==================

!lead!Music is made up of 2 main elements notes and beats. A performer can play more than 1 note at a time to create a `chord`. The combination of a `melody` (a collection of notes or chords) with a `rhythm` (a collection of beats) creates a `phrase`. The `phrase` is what the performer plays.

### Phrases

Phrases are portions of the song that can actually be preformed. A phrase is a combination of a [melody][melodies] and [rhythm][rhythms] with the `*` operator. There are many examples in the sections to follow.

## Phrase Elements

### Melodies

Melodies are a collection of pitch descriptions. They describe what notes to perform and can therefor contain [notes][notes] or [chords][chords]. The notes and chords appear between `[` and `]` separated by `,`.

---

### Rhythms

Rhythms are a collection of beats that describe the duration that [notes][notes] or [chords][chords] should be played for. The beats appear between `<` and `>` separated by `,`.

---

### Building Phrases

A phrase is a playable element constructed with the 2 components described above. The **left hand side** describes the pitches of the notes to preform and the **right hand side** describes the duration for which to play the pitches.

The **left hand side** may be a melody or simply a chord. The **right hand side** must be a rhythm. Each element in the melody maps to a beat in the rhythm. For example the following code will play an `a` whole note, a `b` half note and a `c` quarter note.
```mellowd
!def block Lead
!
!Lead {
    [a, b, c]*<w, h, q>
!}
```

If one side of the phrase is shorter than the other, that side will be repeated until both sides have the same length. For example the following will play a `c` scale alternating between quarter and eight notes.
```mellowd
!def block Lead
!
!Lead {
    [c, e, f, g, a, b, c+1]*<q, e>
!}
```

This feature can be especially useful when a note or chord should be played multiple times. For example, repeating a `C#` chord for 4 quarter notes.
```mellowd
!def block Lead
!
!Lead {
    [C#]*<q, q, q, q>
!}
```

### Melody Elements

### Notes

A single note looks like `a`. The note may be shifted up or down a semi-tone (sharp or flat) with `#` or `$`. This note can be shifted up or down an octave with `+1` or `-1` respectively.

Try listening to the following by putting it in the editor with the button in the bottom right corner of the code block.
```mellowd
!def block Lead
!
!Lead {
    [a, a$, a#, a+1, a$+1, a#+1]*<q>
!}
```

---

### Chords

Chords are a collection of notes performed at the same time. You can build chords by putting [notes][notes] between `(` and `)` with a `,` separating each one. For example we can build a C major chord:
```mellowd
!def block Lead
!
!Lead {
    [(c, e, g)]*<q>
!}
```

Chords follow a pattern with the intervals in between notes. A major chord is the root note followed by a major third (+4 semi tones) and a perfect fifth (+7 semi tones). Due to these patterns you can ask Mellow D to create the chord for you by simply supplying the root note and the chord type (by default it is a major chord).
```mellowd
!def block Lead
!
!Lead {
    [(c, e, g), C, Cmaj]*<h>
!}
```

To create a chord from the table use the format: `upper-case note name`, optionally `'#' or '$'` for a sharp or flat version, `Identifier`, with `'+' or '-' a number` to shift the chord up or down a number of octaves.

Ex: `A#dom7+1` is the A sharp dominant 7th chord shifted 1 octave higher.

#### Supported chord classes:

| **Identifier**     | **Chord**         | **Structure**                                                                                                      |
|--------------------|:-----------------:|--------------------------------------------------------------------------------------------------------------------|
| _nothing_ <br> maj | Major             | (root, [major third](!tt! "root + 4"), [perfect fifth](!tt! "root + 7"))                                           |
| m <br> min         | Minor             | (root, [minor third](!tt! "root + 3"), [perfect fifth](!tt! "root + 7"))                                           |
| aug                | Augmented         | (root, [major third](!tt! "root + 4"), [augmented fifth](!tt! "root + 8"))                                         |
| dim                | Diminished        | (root, [minor third](!tt! "root + 3"), [diminished fifth](!tt! "root + 6"))                                        |
| dim7               | Diminished 7th    | (root, [minor third](!tt! "root + 3"), [diminished fifth](!tt! "root + 6"), [diminished seventh](!tt! "root + 9")) |
| maj7b5             | Major 7th Flat 5  | (root, [minor third](!tt! "root + 3"), [diminished fifth](!tt! "root + 6"), [minor seventh](!tt! "root + 10"))     |
| min7               | Minor 7th         | (root, [minor third](!tt! "root + 3"), [perfect fifth](!tt! "root + 7"), [minor seventh](!tt! "root + 10"))        |
| minmaj7            | Minor Major 7th   | (root, [minor third](!tt! "root + 3"), [perfect fifth](!tt! "root + 7"), [major seventh](!tt! "root + 11"))        |
| 7 <br> dom7        | Dominant 7        | (root, [major third](!tt! "root + 4"), [perfect fifth](!tt! "root + 7"), [minor seventh](!tt! "root + 10"))        |
| maj7               | Major 7th         | (root, [major third](!tt! "root + 4"), [perfect fifth](!tt! "root + 7"), [major seventh](!tt! "root + 11"))        |
| aug7               | Augmented 7th     | (root, [major third](!tt! "root + 4"), [augmented fifth](!tt! "root + 8"), [minor seventh](!tt! "root + 10"))      |
| maj7s5             | Major 7th Sharp 5 | (root, [major third](!tt! "root + 4"), [augmented fifth](!tt! "root + 8"), [major seventh](!tt! "root + 11"))      |
| 6 <br> maj6        | Major 6th         | (root, [major third](!tt! "root + 4"), [perfect fifth](!tt! "root + 7"), [major sixth](!tt! "root + 9"))           |
| min6               | Minor 6th         | (root, [minor third](!tt! "root + 3"), [perfect fifth](!tt! "root + 7"), [major sixth](!tt! "root + 9"))           |

Rhythmic Elements
-----------------

### Beats

The beats in order from longest to shortest are `w` (whole), `h` (half), `q` (quarter), `e` (eighth), `s` (sixteenth) and `t` (thirty-second). Each beat is half the duration of the previous on.

For example, lets can play a `d` note for each of the available durations
```mellowd
!def block Lead
!
!Lead {
    [d]*<w, h, q, e, s, t>
!}
```

---


### Slurred Beats

In the example the listener can hear a distinct end to each of the notes. Sometimes the composer would prefer a more gentle transition between the notes. This is called a **slur** in music. By wrapping a portion of the rhythm between `(` and `)` the transition between those notes is smoother.
```mellowd
!def block Lead
!
!Lead {
    [d]*<q, q, q, q, (q, q, q, q)>
!}
```

---

### Dotted Beats

Another rhythmic construct used in music is a `.` (dot). It is used to extend the dotted beat by <sup>1</sup>&frasl;<sub>2</sub> of the original duration. A dotted half-note (`h.`) has the same duration as 1 and <sup>1</sup>&frasl;<sub>2</sub> half-notes. A double-dotted half-note (`h..`) has the duration of 1 and <sup>1</sup>&frasl;<sub>2</sub> half-notes plus <sup>3</sup>&frasl;<sub>4</sub> half-notes (half of a single dotted half note).
```mellowd
!def block Lead
!
!Lead {
    [d]*<h, h., h.., h...>
!}
```

---

### Tuplets

The most common tuplet is a **triplet** which plays 3 of the triplet beat in the time it takes to play 2.
```mellowd
!def block Lead
!def percussion block Drums

!Lead {
    [d]*<3q, q, q>
!}
!
!Drums {
!    [bass]*<q, q, q, q>
!}
```

A triplet is a `3:2` tuplet. If desired a `3:1` tuplet will perform 3 of the tuplet beat in the time it takes to play 1.
```mellowd
!def block Lead
!def percussion block Drums

!Lead {
    [d]*<3:2q, q, 3:1q>
!}
!
!Drums {
!    [bass]*<q, q, q, q>
!}
```

By default tuplets play the tuplet note the number of times described by the first number in the tuplet (3 in the previous examples) but sometimes a more specific division is desired. By putting the desired rhythm in `[` `]` the beats in the brackets are played with the tuplet in front of the brackets describing the tuplet.

```mellowd
!def block Lead
!def percussion block Drums

!Lead {
    [g, f, f, d, f, c, b$-1]*<q, 3[q, e, q, e], q, q>
!}
!
!Drums {
!    [bass]*<q, q, q, q>
!}
```