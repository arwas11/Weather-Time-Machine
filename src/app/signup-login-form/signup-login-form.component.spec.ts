import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupLoginFormComponent } from './signup-login-form.component';

describe('SignupLoginFormComponent', () => {
  let component: SignupLoginFormComponent;
  let fixture: ComponentFixture<SignupLoginFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignupLoginFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SignupLoginFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
