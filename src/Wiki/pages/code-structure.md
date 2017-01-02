Mellow D Code Structure
=======================

!lead!Source files can contain 3 main structures. Block/function declarations, block/function definitions and variable assignments.
        
### Blocks

!lead!Blocks can be thought of as adding a **performer** to your band. For developers with a programming background, a nice way to think of a `block` is as a thread or a process.

Each block is given a name and can either be a melodic block or a `percussion` block. This is decided when you declare it at the top of the code.

----------------

## Block declarations

Here are both types of **block declaration**s, one for `LeadGuitar` and `Drums`
```mellowd
def block LeadGuitar
def percussion block Drums
!
!LeadGuitar {
!    [a, b, c+1]*<q>
!}
```

You can tweak the performers a little bit with a `block configuration`. For example, the `LeadGuitar` should be playing a guitar!

```mellowd
def block LeadGuitar {
    instrument: "distortedGuitar"
}
def percussion block Drums
!
!LeadGuitar {
!    [a, b, c+1]*<q>
!}
```

## Block definitions

Block definitions are where you can instruct the performer to create music. The contents of the blocks are the meat and potatoes of a Mellow D song. A full tutorial on that can be found on the [statement wiki](#TODOstatement-wiki). For a quick example lets tell the `LeadGuitar` to play a `C chord` for a `whole note`.

```mellowd
!def block LeadGuitar {
!    instrument: "distortedGuitar"
!}
!def percussion block Drums
!
LeadGuitar {
    [C]*<w>
}
```

There can be as many block definitions as desired to keep your code looking nice. Each set of instructions is performed **in order from top to bottom** by the performer.

The performers play their own music at the same time and this makes adding some drums to the song pretty easy. In the example the `LeadGuitar` will play 1 `C chords` for a whole note while the `Drums` will hit the `snare` drum 4 times.

```mellowd
!def block LeadGuitar {
!    instrument: "distortedGuitar"
!}
!def percussion block Drums
!
LeadGuitar {
    [C]*<w>;
}

Drums {
    [snare]*<q, q, q, q>;
}
```

!success!<h4>Test Yourself</h4>
Try adding a second `LeadGuitar` block definition below the `Drums` to make the guitarist perform a `G chord` for a whole note.

## Overall

That covers the basic overall structure! There are many more things to cover but grasping blocks is the important part. Here is the code for the entire example covered in this overview with **comments** to layout a few of the other elements that can appear.

!info!<h4>Comments</h4>
Comments are sections of code that are only for the developer to read. <dl class="dl-horizontal">
    <dt>Line comments:</dt> <dd>The rest of the line following `//` is a comment.</dd>
    <dt>Multi-line comments:</dt> <dd>Everything between `/*` and `*/`is a comment.</dd>
</dl>

```mellowd
/* Import statements: These must go at the very top of the source
import FUNCTION_NAME from SOURCE_NAME as REFERENCE_NAME
*/

//Block declarations: These must follow the imports if any exist
def block LeadGuitar {
    instrument: "distortedGuitar"
}
def percussion block Drums

/* Block definitions, function definitions or variable assignments:
   These can go in any order following the imports and declarations
*/
LeadGuitar {
    [C]*<w>;
}

Drums {
    [snare]*<q, q, q, q>;
}
```