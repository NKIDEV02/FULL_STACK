import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CategoryEditor } from './category-editor';

describe('CategoryEditor', () => {
  let component: CategoryEditor;
  let fixture: ComponentFixture<CategoryEditor>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoryEditor],
    }).compileComponents();

    fixture = TestBed.createComponent(CategoryEditor);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
