import { Component } from "@angular/core";

@Component({
  selector: "collapsible-well",
  template: `
    <div (click)="toggleContent()" class="well pointable" id="session-box">
      <h4>
        <ng-content select="[well-title]"></ng-content>
      </h4>
      <ng-content select="[well-body]" *ngIf="visible"></ng-content>
    </div>
    <div>
      <ng-content select="[footer]"> </ng-content>
    </div>
  `,
})
export class CollapsibleWellComponent {
  visible: boolean = true;

  toggleContent() {
    this.visible = !this.visible;
  }
}
