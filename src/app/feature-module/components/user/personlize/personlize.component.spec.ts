import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonlizeComponent } from './personlize.component';

describe('PersonlizeComponent', () => {
  let component: PersonlizeComponent;
  let fixture: ComponentFixture<PersonlizeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonlizeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonlizeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
