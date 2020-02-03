import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CateoriesComponent } from './cateories.component';

describe('CateoriesComponent', () => {
  let component: CateoriesComponent;
  let fixture: ComponentFixture<CateoriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CateoriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CateoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
