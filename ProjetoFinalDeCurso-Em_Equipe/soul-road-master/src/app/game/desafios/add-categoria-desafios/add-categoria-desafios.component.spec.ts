import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCategoriaDesafiosComponent } from './add-categoria-desafios.component';

describe('AddCategoriaDesafiosComponent', () => {
  let component: AddCategoriaDesafiosComponent;
  let fixture: ComponentFixture<AddCategoriaDesafiosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCategoriaDesafiosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCategoriaDesafiosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
