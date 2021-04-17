import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchEmployeComponent } from './search-employe.component';

describe('SearchEmployeComponent', () => {
  let component: SearchEmployeComponent;
  let fixture: ComponentFixture<SearchEmployeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchEmployeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchEmployeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
