import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Myadmin } from './myadmin';

describe('Myadmin', () => {
  let component: Myadmin;
  let fixture: ComponentFixture<Myadmin>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Myadmin]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Myadmin);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
