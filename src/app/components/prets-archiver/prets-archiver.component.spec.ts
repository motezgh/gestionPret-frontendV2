import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PretsArchiverComponent } from './prets-archiver.component';

describe('PretsArchiverComponent', () => {
  let component: PretsArchiverComponent;
  let fixture: ComponentFixture<PretsArchiverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PretsArchiverComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PretsArchiverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
