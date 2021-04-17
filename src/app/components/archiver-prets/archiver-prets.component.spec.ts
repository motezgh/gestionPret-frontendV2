import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchiverPretsComponent } from './archiver-prets.component';

describe('ArchiverPretsComponent', () => {
  let component: ArchiverPretsComponent;
  let fixture: ComponentFixture<ArchiverPretsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArchiverPretsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArchiverPretsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
