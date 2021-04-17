import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchivePretsEmployeComponent } from './archive-prets-employe.component';

describe('ArchivePretsEmployeComponent', () => {
  let component: ArchivePretsEmployeComponent;
  let fixture: ComponentFixture<ArchivePretsEmployeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArchivePretsEmployeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArchivePretsEmployeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
