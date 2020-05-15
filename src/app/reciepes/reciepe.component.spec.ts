import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReciepeComponent } from './reciepe.component';

describe('ReciepeComponent', () => {
  let component: ReciepeComponent;
  let fixture: ComponentFixture<ReciepeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReciepeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReciepeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
