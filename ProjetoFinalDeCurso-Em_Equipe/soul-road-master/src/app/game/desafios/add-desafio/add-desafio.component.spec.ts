import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDesafioComponent } from './add-desafio.component';

describe('AddDesafioComponent', () => {
  let component: AddDesafioComponent;
  let fixture: ComponentFixture<AddDesafioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddDesafioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDesafioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
