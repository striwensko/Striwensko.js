# STRIWENSKO.js

This is a very simple library which purpose is to have available different classes that help build your projects. This touches 4 main areas which i think most applications need and a bit more.

1. Load External Ajax Data (JSON_Loader class)
2. Make smooth animations (TimeLine class)
3. Add mouse/touch interactions (DragTouch class)
4. DispatchEvents (ADD_EVENT_DISPATCHER function)

It also includes an EventDispatcher which makes any object being able to dispatch events. This helps build components like dropdwons, slider, checboxes, radio Buttons, tab groups in less than 100 lines of code each.

## Prerequisites

As a library is compatible with any framework so you have no restrictions in that sense. I recommend reading the documentation on the out folder for better understanding also it includes jsFiddle examples which help understand better how the library works.

If you are using jquery just for being able to make Ajax requests, and a couple of animations is worth checking out this library.

## Basic use

The concept behind this library is help you build your projects here is a list of examples without the use of any other libraries or frameworks of the use of this library.

1. Load External Ajax Data (JSON_Loader class)
[Load the 30 most popular js projects from Github] (https://jsfiddle.net/9ph3x41e/4/) 
2. Make Smooth Animations (TimeLine class)
[Make an object move on screen] (https://jsfiddle.net/ovu6u4hm/6/)
3. Add mouse/touch interactions (DragTouch class)
[Create a slider mobile/mouse ready] (https://jsfiddle.net/k1v4g5rw/3/)
4. DispatchEvents (ADD_EVENT_DISPATCHER function)
[Create a slider mobile/mouse ready] (https://jsfiddle.net/k1v4g5rw/3/)
[Create a radio button] (https://jsfiddle.net/skx8px2z/6/)

## Importance of Dispatching Events

I really like to make a point in here cause in js we have this popular thing call callback hell, in which you have a path of callback that at some point becomes so big and complex that is very hard to follow. Dispatching Events helps with this problem since eveythin is very explicit and it forces you into not nesting function inside functions keep things apart, and forces you instead of having a path of 6 callbacks, have 6 simple paths of event->action.

## Documentation

[http://striwensko.github.io/] Documentation of Striwensko.js
