Functions
=========

!lead!Functions are a great way to reduce code duplication. The concept should be familiar to developers with a programming background. Functions are sections of code that can be executed when desired to preform a specific task.

!lead!In Mellow D, functions are block fragments that can be executed inside other blocks.

## Definitions

A function is defined with a few keywords followed by the function's name, [parameters][parameters] and body.
```mellowd
!def block Lead
!
def function myFunction => chord toPlay, rhythm beat {
    [toPlay:0, toPlay:1, toPlay:2]*<beat>;
}
!Lead {
!    { C, <q> } => myFunction
!}
```

The code `def function myFunction` creates a function with the name `myFunction`.

!info!Function names **can** be used multiple times to **overload** the name in a namespace. When this occurs the correct function body is determined at runtime based on the types of the arguments given and the argument names if needed as a fallback. <br> More information can be found at [function overloading][function overloading]

The section following the `=>`, is the [parameters][parameters] which in the example is a `chord` named `toPlay` and a `rhythm` named `beat`. Parameters are things that the caller must provide in order for the function to execute.

The code inside the `{` and `}`makes up the function body. This is the code that is executed when the function is called.

---

### Parameters

Parameters are descriptions of the elements that the function caller should provide to manipulate how the function performs. For example a function can ask that the caller provides a chord so that the function plays the given chord.

!warning!From the perspective of the function body, parameters should be treated as [variables][variables] and the reader should be familiar with them before continuing with this section.

A parameter does not require a type but if one can be applied, it is recommended that the developer specifies it. Types describe what the contents of the variable should be and may be one of the following keywords: `chord`, `melody`, or `rhythm`.

!info!Specifying types help resolve [overloaded functions][function overloading]

Parameters may also be optional meaning that it is not required for the parameter to be given. Optional parameters are declared by adding a `?` after the name. If a parameter is optional the developer can set a default value to be used when the value is absent. Following the `?` the developer may write `->` followed by the value of the parameter. For example the `toPlay` parameter has a type `chord` that if not given is set to be `C#`.
```mellowd
!def block Lead
!
def function myFunction => chord toPlay? -> C# {
    [toPlay:0, toPlay:1, toPlay:2]*<q>
}
!Lead {
!    { C } => myFunction
!}
```
!success!<h4>Test Yourself</h4> Try removing the `C` from the `{ ... }` in the function call in the 1Lead1 block and listen to what is played!

To summarize the parameter syntax: `type` if applicable, `parameter name`, `?` if optional and `-> value` if optional default value is desired.

## Calls

### Function Calls

Functions are called with 2 components: the arguments, `=>` and the function name. The arguments are bundled between `{` and `}`.

---

### Arguments

Arguments are given to configure the function that is being executed. For example an argument may be a chord to play.

!warning!Building arguments is assigning values to [parameters][parameters] and therefor an understanding of [parameters][parameters] is recommended before going over this section.

A single argument follows the syntax: `name:` `value` where both are optional. Arguments are separated by a `,` if there is more than one.