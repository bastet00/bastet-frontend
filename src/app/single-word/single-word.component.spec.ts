import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleWordComponent } from './single-word.component';

describe('SingleWordComponent', () => {
  let component: SingleWordComponent;
  let fixture: ComponentFixture<SingleWordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SingleWordComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SingleWordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
