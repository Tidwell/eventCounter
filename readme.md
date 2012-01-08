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
{
  counterId: 'xyz', //used for calling methods like add() and destroy()
  every: 2, //number of times the event can fire before triggering onTrigger
  eventType: 'click', //event to track (passed to jQuery.bind)
  onTrigger: function(){} //function to call
}
```

Sets up an eventCounter [named {counterId}] that counts the number
of times {eventType} is fired on $(elements) and every {every} times the
eventType occurs, will fire {onTrigger}
  
  onTrigger gets passed
  	1.  The jQuery event object
  	2.  The full set of elements that the counter is listening to
 
 	
## 	Additional methods
```
  $(elements).eventCounter('destroy' [,counterId])
```

removes all tracking from $(elements), or just the tracking from counterId

```
	$(elements).eventCounter('add', counterId)
```

adds $(elements) to the counterId tracking set


## Notes

*  Only tested with jQuery 1.7.1 in Chrome

## Version History

.1 - initial commit