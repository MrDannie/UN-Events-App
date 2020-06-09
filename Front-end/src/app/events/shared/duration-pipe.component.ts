import { Pipe, PipeTransform } from '@angular/core'


@Pipe({
 name: "duration"
})

export class DurationPipe implements PipeTransform{

 transform(value: number) : string{
  switch(value){
   case 1: return "Half Hour"
   case 2: return "one Hour"
   case 3: return "half Day"
   case 4: return "one Day"
   default: return value.toString();
  }

 }
}