import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReciepeDetailComponent } from './reciepe-detail.component';

describe('ReciepeDetailComponent', () => {
  let component: ReciepeDetailComponent;
  let fixture: ComponentFixture<ReciepeDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReciepeDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReciepeDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
