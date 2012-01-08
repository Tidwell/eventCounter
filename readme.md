# jQuery eventCounter Plugin

## Demo & Examples

See test.html

## Sample
###html
```
<div class="clicker">Click Me 1</div>
<div class="clicker">Click Me 2</div>
```
###js
```
$('.clicker').eventCounter({
  counterId: 'firstCounter',
  every: 5,
  eventType: 'click',
  onTrigger: function(event, allPossibleTriggers) {
    alert('The clickers have been clicked 5 times');
  }
});
```


## Options
```
In short, calling the plugin on a set of elements will create an eventCounter
named {counterId} that counts the number of times {eventType} is fired on
$(elements) and every {every} times the eventType occurs, will fire {onTrigger}


### counterId
#####string, optional

used for calling methods like add() and destroy().  If one isn't submitted,
a identifier will be generated internally (that can be used programatically with
add() and destroy() if desired)


### every
#####number, required

the number of times the eventType can fire before triggering onTrigger


### event
#####string, optional

event to track (passed to jQuery.bind), defaults to 'click'


### onTrigger

#####function, optional

onTrigger is passed

* The jQuery event object
* The full set of elements that the counter is listening to
 
 	
## 	Additional methods
### destroy
```
$(elements).eventCounter('destroy' [,counterId])
```

removes all tracking from $(elements), or just the tracking from counterId

### add
```
$(elements).eventCounter('add', counterId)
```

adds $(elements) to the counterId tracking set


## Notes

* Only tested with jQuery 1.7.1 in Chrome

## Version History

.1 - initial commit