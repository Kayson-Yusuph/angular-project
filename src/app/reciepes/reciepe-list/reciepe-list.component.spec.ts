import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReciepeListComponent } from './reciepe-list.component';

describe('ReciepeListComponent', () => {
  let component: ReciepeListComponent;
  let fixture: ComponentFixture<ReciepeListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReciepeListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReciepeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
