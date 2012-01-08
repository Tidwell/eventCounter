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
  //used for calling methods like add() and destroy(), string, optional
  counterId: 'xyz',
  //number of times the event can fire before triggering onTrigger, number
  every: 2,
  //event to track (passed to jQuery.bind), string, defaults 'click'
  eventType: 'click',
  //function to call, function
  onTrigger: function(){}
}
```

Sets up an eventCounter [named {counterId}] that counts the number
of times {eventType} is fired on $(elements) and every {every} times the
eventType occurs, will fire {onTrigger}

## onTrigger
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