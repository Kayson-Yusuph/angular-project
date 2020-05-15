import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReciepeItemComponent } from './reciepe-item.component';

describe('ReciepeItemComponent', () => {
  let component: ReciepeItemComponent;
  let fixture: ComponentFixture<ReciepeItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReciepeItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReciepeItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
