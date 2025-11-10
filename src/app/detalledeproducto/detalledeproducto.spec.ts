import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Detalledeproducto } from './detalledeproducto';


describe('Detalledeproducto', () => {
  let component: Detalledeproducto;
  let fixture: ComponentFixture<Detalledeproducto>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Detalledeproducto]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Detalledeproducto);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
