import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRespostaComponent } from './add-resposta.component';

describe('AddRespostaComponent', () => {
  let component: AddRespostaComponent;
  let fixture: ComponentFixture<AddRespostaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddRespostaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddRespostaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
