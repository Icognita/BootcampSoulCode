import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditComComponent } from './edit-com.component';

describe('EditComComponent', () => {
  let component: EditComComponent;
  let fixture: ComponentFixture<EditComComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditComComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditComComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
